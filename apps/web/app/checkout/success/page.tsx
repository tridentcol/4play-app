import { IconCheck, colors } from '@4play/ui';

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; id?: string }>;
}) {
  const params = await searchParams;
  const ref = params.ref ?? params.id ?? '';
  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-md px-6 pt-16 text-center">
        <span
          className="inline-flex h-16 w-16 items-center justify-center rounded-pill"
          style={{ backgroundColor: colors.court }}
        >
          <IconCheck size={32} stroke={colors.lime} strokeWidth={2.6} />
        </span>
        <h1
          className="mt-6 font-display font-bold text-ink"
          style={{ fontSize: 48, letterSpacing: '-0.04em' }}
        >
          ¡Pago en proceso!
        </h1>
        <p className="mt-4 text-body-s text-ash">
          Wompi nos avisará cuando se confirme y activaremos tu membresía o reserva automáticamente.
          Puedes cerrar esta ventana.
        </p>
        {ref && <p className="mt-4 font-mono text-mono-s text-ash break-all">REFERENCIA · {ref}</p>}
      </div>
    </div>
  );
}
