import { createAdminClient } from '@/lib/supabase/admin';
import { type WompiEvent, isValidEvent } from '@/lib/wompi';
import { NextResponse } from 'next/server';

/**
 * Wompi events webhook. Verifies HMAC, then updates payments and
 * downstream rows (subscriptions / bookings) idempotently.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  const header = req.headers.get('x-event-checksum') ?? req.headers.get('x-signature') ?? null;

  if (!isValidEvent(raw, header)) {
    return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
  }

  let event: WompiEvent;
  try {
    event = JSON.parse(raw) as WompiEvent;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const tx = event.data?.transaction;
  if (!tx?.reference || !tx?.id) {
    return NextResponse.json({ ok: true }); // ignore malformed
  }

  const admin = createAdminClient();

  // Find the payments row by reference. Reference format:
  //   sub_{user_id}_{ts}                  → subscription
  //   bk_{user_id}_{booking_id}           → booking
  const isSubscription = tx.reference.startsWith('sub_');
  const isBooking = tx.reference.startsWith('bk_');

  // Update or insert the payments row keyed by wompi_transaction_id.
  const { data: existing } = await admin
    .from('payments')
    .select('id, wompi_status, purpose, reference_id, profile_id')
    .eq('wompi_transaction_id', tx.id)
    .maybeSingle();

  if (existing && existing.wompi_status === tx.status) {
    return NextResponse.json({ ok: true, dedup: true });
  }

  if (existing) {
    await admin
      .from('payments')
      .update({
        wompi_status: tx.status,
        raw_response: tx as unknown as never,
      })
      .eq('id', existing.id);
  } else {
    // First sighting — link by reference if we created the row in checkout.
    const purpose = isSubscription ? 'subscription' : isBooking ? 'booking' : 'unknown';
    const referenceId = isBooking ? tx.reference.split('_').slice(2).join('_') : tx.reference;
    await admin.from('payments').insert({
      profile_id: extractUserId(tx.reference) ?? '00000000-0000-0000-0000-000000000000',
      amount: tx.amount_in_cents,
      currency: tx.currency,
      purpose,
      reference_id: referenceId,
      wompi_transaction_id: tx.id,
      wompi_status: tx.status,
      raw_response: tx as unknown as never,
    });
  }

  if (tx.status !== 'APPROVED') {
    return NextResponse.json({ ok: true });
  }

  // APPROVED → activate the matching downstream row.
  if (isSubscription) {
    const userId = extractUserId(tx.reference);
    if (userId) {
      const periodStart = new Date();
      const periodEnd = new Date(periodStart);
      periodEnd.setMonth(periodEnd.getMonth() + 1);
      await admin.from('subscriptions').upsert({
        profile_id: userId,
        status: 'active',
        plan: 'monthly_basic',
        current_period_start: periodStart.toISOString(),
        current_period_end: periodEnd.toISOString(),
        wompi_subscription_id: tx.id,
      });
    }
  } else if (isBooking) {
    const bookingId = tx.reference.split('_').slice(2).join('_');
    if (bookingId) {
      await admin
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', bookingId)
        .eq('status', 'pending');
    }
  }

  return NextResponse.json({ ok: true });
}

function extractUserId(reference: string): string | null {
  // Either "sub_<uuid>_<ts>" or "bk_<uuid>_<bookingId>".
  const parts = reference.split('_');
  if (parts.length < 3) return null;
  const candidate = parts[1];
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(candidate ?? '')
    ? (candidate ?? null)
    : null;
}
