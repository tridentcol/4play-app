import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { buildIntegritySignature, wompi } from '@/lib/wompi';
import type { TablesInsert } from '@4play/core';
import { NextResponse } from 'next/server';

type Body = {
  purpose: 'subscription' | 'booking';
  reference_id: string; // booking.id or "subscription:{user_id}"
};

const SUBSCRIPTION_AMOUNT_COP_CENTS = 20_000_00; // $20.000 COP

/**
 * Returns the data needed to launch Wompi Web Checkout from the browser.
 * The client receives publicKey + reference + amount + integrity signature
 * and renders the Wompi widget directly. We never accept the user's
 * card data — it goes straight to Wompi.
 */
export async function POST(req: Request) {
  const body = (await req.json()) as Body;
  if (!body.purpose || !body.reference_id) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  if (!user) return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });

  let amountInCents: number;
  let reference: string;

  if (body.purpose === 'subscription') {
    amountInCents = SUBSCRIPTION_AMOUNT_COP_CENTS;
    reference = `sub_${user.id}_${Date.now()}`;
  } else {
    // Booking: read amount from DB to avoid trusting the client.
    const admin = createAdminClient();
    const { data: booking, error } = await admin
      .from('bookings')
      .select('total_amount, booker_id, status')
      .eq('id', body.reference_id)
      .maybeSingle();
    if (error || !booking) {
      return NextResponse.json({ error: 'booking_not_found' }, { status: 404 });
    }
    if (booking.booker_id !== user.id) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }
    if (booking.status !== 'pending') {
      return NextResponse.json({ error: 'booking_already_processed' }, { status: 409 });
    }
    amountInCents = booking.total_amount;
    reference = `bk_${booking.booker_id}_${body.reference_id}`;
  }

  const signature = buildIntegritySignature({
    reference,
    amountInCents,
    currency: 'COP',
  });

  // Persist a payments row so the webhook can correlate.
  const admin = createAdminClient();
  const paymentInsert: TablesInsert<'payments'> = {
    profile_id: user.id,
    amount: amountInCents,
    currency: 'COP',
    purpose: body.purpose,
    reference_id: body.reference_id,
    wompi_status: 'PENDING',
  };
  await admin.from('payments').insert(paymentInsert);

  return NextResponse.json({
    publicKey: wompi.publicKey(),
    currency: 'COP',
    amountInCents,
    reference,
    signature,
    redirectUrl: `${new URL(req.url).origin}/checkout/success?ref=${encodeURIComponent(reference)}`,
  });
}
