'use client';

import { IconCheck, colors } from '@4play/ui';
import { useState } from 'react';

type CheckoutPayload = {
  publicKey: string;
  currency: string;
  amountInCents: number;
  reference: string;
  signature: string;
  redirectUrl: string;
};

export default function SubscriptionCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const start = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch('/api/wompi/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ purpose: 'subscription', reference_id: 'self' }),
      });
      if (!resp.ok) {
        const j = (await resp.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? `HTTP ${resp.status}`);
      }
      const data = (await resp.json()) as CheckoutPayload;
      if (!data.publicKey) {
        throw new Error('wompi_not_configured');
      }
      // Build Wompi Web Checkout URL.
      const params = new URLSearchParams({
        'public-key': data.publicKey,
        currency: data.currency,
        'amount-in-cents': String(data.amountInCents),
        reference: data.reference,
        'signature:integrity': data.signature,
        'redirect-url': data.redirectUrl,
      });
      window.location.href = `https://checkout.wompi.co/p/?${params.toString()}`;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'unknown_error');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink text-cream">
      <div className="mx-auto max-w-md px-6 pt-12">
        <div className="font-mono text-mono-m uppercase text-lime tracking-mono">4 PLAY+</div>
        <h1
          className="mt-2 font-display font-bold leading-none"
          style={{ fontSize: 56, letterSpacing: '-0.04em' }}
        >
          Juega más,
          <br />
          <span style={{ color: colors.lime, fontStyle: 'italic' }}>conecta más.</span>
        </h1>
        <p className="mt-4 max-w-[320px] text-body-s text-cream/70">
          Una membresía simple para todos los jugadores de Cartagena. Sin contrato, cancela cuando
          quieras.
        </p>

        <div
          className="mt-7 rounded-hero p-6"
          style={{
            backgroundColor: 'rgba(244,240,232,0.06)',
            border: '1px solid rgba(212,255,58,0.25)',
          }}
        >
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-mono text-mono-m uppercase text-lime tracking-mono-wide">
                MENSUAL
              </div>
              <div
                className="mt-1 font-display font-bold leading-none"
                style={{ fontSize: 48, letterSpacing: '-0.04em' }}
              >
                $20.000
              </div>
              <div className="mt-1 text-body-xs text-cream/60">COP / mes · sin contrato</div>
            </div>
            <div
              className="rounded-chip px-2.5 py-1.5 font-mono"
              style={{
                backgroundColor: colors.lime,
                color: colors.ink,
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              7 DÍAS GRATIS
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3.5">
          {[
            'Matches ilimitados con jugadores de tu nivel',
            'Reserva canchas en 14 clubes de la ciudad',
            'Chat directo y agenda compartida',
            'Ranking y stats de tus partidos',
          ].map((b) => (
            <div key={b} className="flex items-center gap-3">
              <span
                className="flex h-[26px] w-[26px] items-center justify-center rounded-pill"
                style={{ backgroundColor: colors.court }}
              >
                <IconCheck size={14} stroke={colors.lime} strokeWidth={2.4} />
              </span>
              <span className="text-body-s text-cream/90">{b}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="mt-6 rounded-card bg-coral/15 px-3 py-2 text-body-s text-coral">
            {error === 'wompi_not_configured'
              ? 'Wompi aún no está configurado en este entorno. Configura WOMPI_PUBLIC_KEY y vuelve a intentar.'
              : error}
          </div>
        )}

        <button
          type="button"
          onClick={start}
          disabled={loading}
          className="mt-7 w-full rounded-pill bg-lime py-4 text-body-l font-semibold text-ink disabled:opacity-50"
        >
          {loading ? 'Abriendo Wompi…' : 'Empezar prueba gratis'}
        </button>
        <div className="mt-2 text-center font-mono text-mono-s uppercase text-cream/50 tracking-mono">
          Después $20.000/mes · cancela en 1 toque
        </div>
      </div>
    </div>
  );
}
