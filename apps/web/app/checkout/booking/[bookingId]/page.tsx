'use client';

import { colors } from '@4play/ui';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type CheckoutPayload = {
  publicKey: string;
  currency: string;
  amountInCents: number;
  reference: string;
  signature: string;
  redirectUrl: string;
};

export default function BookingCheckoutPage() {
  const params = useParams<{ bookingId: string }>();
  const bookingId = params.bookingId;
  const [payload, setPayload] = useState<CheckoutPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const resp = await fetch('/api/wompi/checkout', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ purpose: 'booking', reference_id: bookingId }),
        });
        if (!resp.ok) {
          const j = (await resp.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error ?? `HTTP ${resp.status}`);
        }
        const data = (await resp.json()) as CheckoutPayload;
        if (!cancelled) setPayload(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'unknown_error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  const launch = () => {
    if (!payload) return;
    const params = new URLSearchParams({
      'public-key': payload.publicKey,
      currency: payload.currency,
      'amount-in-cents': String(payload.amountInCents),
      reference: payload.reference,
      'signature:integrity': payload.signature,
      'redirect-url': payload.redirectUrl,
    });
    window.location.href = `https://checkout.wompi.co/p/?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-md px-6 pt-12">
        <div
          className="font-mono text-mono-m uppercase text-court"
          style={{ letterSpacing: '0.14em' }}
        >
          CHECKOUT
        </div>
        <h1
          className="mt-2 font-display font-bold text-ink"
          style={{ fontSize: 40, letterSpacing: '-0.03em' }}
        >
          Tu reserva
        </h1>

        {error && (
          <div className="mt-6 rounded-card bg-coral/10 px-3 py-2 text-body-s text-coral">
            {error}
          </div>
        )}

        {payload && (
          <div className="mt-6 rounded-card border border-line bg-bone p-5">
            <div className="font-mono text-mono-s uppercase text-ash">TOTAL</div>
            <div
              className="mt-1 font-display font-bold text-ink"
              style={{ fontSize: 36, letterSpacing: '-0.04em' }}
            >
              ${(payload.amountInCents / 100).toLocaleString('es-CO')}
            </div>
            <div className="mt-1 text-body-xs text-ash">COP · una vez</div>
          </div>
        )}

        <button
          type="button"
          onClick={launch}
          disabled={!payload}
          className="mt-6 w-full rounded-pill py-4 text-body-l font-semibold disabled:opacity-50"
          style={{ backgroundColor: colors.court, color: colors.cream }}
        >
          {payload ? 'Pagar con Wompi' : 'Cargando…'}
        </button>
      </div>
    </div>
  );
}
