import { PhotoPlaceholder, type PhotoTone } from '@/components/marketing/PhotoPlaceholder';
import { IconCheck, Logo, colors } from '@4play/ui';

export default function LandingPage() {
  return (
    <div className="bg-cream text-ink min-h-screen">
      <Nav />
      <Hero />
      <StatStrip />
      <HowItWorks />
      <CanchasGrid />
      <Pricing />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <div className="flex items-center justify-between border-b border-line px-12 py-5">
      <Logo size={26} />
      <nav className="flex gap-8 text-body-s text-ink">
        <span>Cómo funciona</span>
        <span>Canchas</span>
        <span>Comunidad</span>
        <span>Precio</span>
      </nav>
      <div className="flex items-center gap-2.5">
        <span className="text-body-s text-ash">Iniciar sesión</span>
        <button
          type="button"
          className="rounded-pill bg-ink px-4 py-2.5 text-body-s font-medium text-cream"
        >
          Descargar app
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="grid grid-cols-1 items-center gap-12 px-12 pb-12 pt-[72px] md:grid-cols-[1.15fr_1fr]">
      <div>
        <div
          className="text-mono-m font-mono uppercase text-court"
          style={{ letterSpacing: '0.18em' }}
        >
          ● Cartagena · 2026
        </div>
        <h1
          className="mt-5 font-display font-bold text-ink"
          style={{ fontSize: 92, lineHeight: 0.92, letterSpacing: '-0.05em', textWrap: 'balance' }}
        >
          La cancha es el
          <br />
          nuevo{' '}
          <em className="text-court not-italic" style={{ fontStyle: 'italic' }}>
            plan
          </em>
          .
        </h1>
        <p className="mt-6 max-w-[480px] text-[19px] leading-[1.5] text-ash">
          4 PLAY conecta a los jugadores de tenis y pádel de Cartagena. Encuentra rivales de tu
          nivel, agenda canchas en los mejores clubes, y deja de quedarte sin partido el sábado.
        </p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            className="rounded-pill bg-court px-[26px] py-4 text-[15px] font-semibold text-cream"
          >
            Probar gratis 7 días
          </button>
          <button
            type="button"
            className="rounded-pill border-[1.5px] border-ink px-[26px] py-4 text-[15px] font-medium text-ink"
          >
            Ver cómo funciona →
          </button>
        </div>
        <div className="mt-7 flex items-center gap-6">
          <div className="flex">
            {(['coral', 'green', 'ink', 'sand'] as const satisfies readonly PhotoTone[]).map(
              (t, i) => (
                <div
                  key={t}
                  className="overflow-hidden rounded-pill border-2 border-cream"
                  style={{ width: 36, height: 36, marginLeft: i ? -10 : 0 }}
                >
                  <PhotoPlaceholder tone={t} style={{ height: '100%', padding: 0 }}>
                    {' '}
                  </PhotoPlaceholder>
                </div>
              ),
            )}
          </div>
          <div className="text-body-xs leading-[1.4] text-ash">
            <strong className="text-ink">+1.200 jugadores</strong> ya juegan en
            <br />
            Cartagena con 4 PLAY
          </div>
        </div>
      </div>

      {/* phone mock */}
      <div className="relative flex items-center justify-center" style={{ height: 580 }}>
        <div
          className="absolute"
          style={{
            width: 420,
            height: 420,
            borderRadius: 999,
            background: `radial-gradient(circle, ${colors.lime}40, transparent 70%)`,
          }}
        />
        <div
          className="relative z-10 shadow-hero"
          style={{ width: 280, height: 560, borderRadius: 44, background: colors.ink, padding: 8 }}
        >
          <div
            className="relative h-full w-full overflow-hidden bg-cream"
            style={{ borderRadius: 36 }}
          >
            <PhotoPlaceholder tone="green" style={{ height: '100%' }}>
              swipe · jugadores
            </PhotoPlaceholder>
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 55%, rgba(14,27,44,0.85) 100%)',
              }}
            />
            <div
              className="absolute font-mono font-semibold"
              style={{
                top: 16,
                left: 16,
                background: colors.lime,
                color: colors.ink,
                padding: '5px 10px',
                borderRadius: 999,
                fontSize: 9,
                letterSpacing: '0.1em',
              }}
            >
              NIVEL 4.5
            </div>
            <div className="absolute text-cream" style={{ bottom: 24, left: 18, right: 18 }}>
              <div
                className="font-display font-bold"
                style={{ fontSize: 24, letterSpacing: '-0.03em' }}
              >
                Daniela M., 28
              </div>
              <div className="mt-1 opacity-85" style={{ fontSize: 11 }}>
                Manga · 2.4 km · Tenis
              </div>
            </div>
          </div>
        </div>

        {/* match floating card */}
        <div
          className="absolute z-20 flex items-center gap-2.5 border border-line bg-bone shadow-float"
          style={{ top: 40, right: 0, padding: '12px 14px', borderRadius: 14 }}
        >
          <div
            className="flex items-center justify-center"
            style={{ width: 32, height: 32, borderRadius: 8, background: colors.lime }}
          >
            <IconCheck size={16} stroke={colors.ink} strokeWidth={2.4} />
          </div>
          <div>
            <div className="font-semibold" style={{ fontSize: 12 }}>
              ¡Match!
            </div>
            <div className="text-ash" style={{ fontSize: 11 }}>
              con Daniela M.
            </div>
          </div>
        </div>

        {/* schedule card */}
        <div
          className="absolute z-20 flex items-center gap-2.5 text-cream shadow-float"
          style={{
            bottom: 56,
            left: -10,
            background: colors.court,
            padding: '12px 14px',
            borderRadius: 14,
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{ fontSize: 9, letterSpacing: '0.14em', color: colors.lime }}
            >
              JUEVES 6:00
            </div>
            <div className="mt-0.5 font-semibold" style={{ fontSize: 13 }}>
              Karibana · cancha 2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatStrip() {
  const stats = [
    { k: '14', v: 'Canchas en la ciudad' },
    { k: '1.2K+', v: 'Jugadores activos' },
    { k: '$20K', v: 'Mensual · sin contrato' },
    { k: '4.8★', v: 'Promedio en App Store' },
  ];
  return (
    <div className="grid grid-cols-2 gap-8 bg-ink px-12 py-7 text-cream md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.v}>
          <div
            className="font-display font-bold text-lime"
            style={{ fontSize: 48, letterSpacing: '-0.04em' }}
          >
            {s.k}
          </div>
          <div className="mt-1 text-body-xs text-cream/70">{s.v}</div>
        </div>
      ))}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: '01',
      t: 'Crea tu perfil',
      d: 'Cuéntanos tu nivel, deportes y zona. Te emparejamos con jugadores afines.',
      bg: colors.bone,
      color: colors.ink,
      border: true,
    },
    {
      n: '02',
      t: 'Haz match',
      d: 'Desliza por jugadores cerca tuyo. Si hay química y nivel, conectan.',
      bg: colors.lime,
      color: colors.ink,
      border: false,
    },
    {
      n: '03',
      t: 'Reserva y juega',
      d: 'Agenda la cancha desde el chat. Pago integrado con la membresía.',
      bg: colors.court,
      color: colors.cream,
      border: false,
    },
  ];
  return (
    <div className="px-12 py-[72px]">
      <div className="text-mono-m font-mono uppercase text-ash" style={{ letterSpacing: '0.18em' }}>
        03 PASOS
      </div>
      <h2
        className="mb-10 mt-2 font-display font-bold"
        style={{ fontSize: 56, letterSpacing: '-0.04em' }}
      >
        Así funciona.
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="flex flex-col justify-between"
            style={{
              background: s.bg,
              color: s.color,
              borderRadius: 22,
              padding: 28,
              minHeight: 240,
              border: s.border ? `1px solid ${colors.line}` : 'none',
            }}
          >
            <div className="font-mono font-semibold" style={{ fontSize: 14 }}>
              {s.n}
            </div>
            <div>
              <div
                className="font-display font-bold"
                style={{ fontSize: 28, letterSpacing: '-0.03em' }}
              >
                {s.t}
              </div>
              <p className="mt-2.5 text-[14px] leading-[1.5] opacity-85">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CanchasGrid() {
  const canchas: { n: string; z: string; s: string; t: PhotoTone }[] = [
    { n: 'Club Cartagena', z: 'Manga', s: 'Tenis · 6 canchas', t: 'green' },
    { n: 'Karibana Beach', z: 'Manzanillo', s: 'Tenis · 4 canchas', t: 'coral' },
    { n: 'Las Velas Pádel', z: 'Bocagrande', s: 'Pádel · 8 canchas', t: 'ink' },
    { n: 'Hotel Las Américas', z: 'Anillo Vial', s: 'Pádel · 3 canchas', t: 'sand' },
  ];
  return (
    <div className="px-12 pb-[72px]">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div
            className="text-mono-m font-mono uppercase text-ash"
            style={{ letterSpacing: '0.18em' }}
          >
            CLUBES ALIADOS
          </div>
          <h2
            className="mt-2 font-display font-bold"
            style={{ fontSize: 48, letterSpacing: '-0.04em' }}
          >
            Las mejores canchas
            <br />
            de la ciudad.
          </h2>
        </div>
        <span className="text-body-s text-ink underline">Ver todas →</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {canchas.map((c) => (
          <div
            key={c.n}
            className="overflow-hidden border border-line"
            style={{ borderRadius: 18 }}
          >
            <div style={{ height: 160 }}>
              <PhotoPlaceholder tone={c.t} style={{ height: '100%' }}>
                foto · {c.n.toLowerCase()}
              </PhotoPlaceholder>
            </div>
            <div className="bg-bone p-4">
              <div className="font-semibold" style={{ fontSize: 15 }}>
                {c.n}
              </div>
              <div className="mt-1 text-[12px] text-ash">{c.z}</div>
              <div
                className="mt-2.5 font-mono uppercase text-court"
                style={{ fontSize: 10, letterSpacing: '0.08em' }}
              >
                {c.s}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pricing() {
  return (
    <div className="px-12 pb-[72px]">
      <div
        className="relative grid grid-cols-1 items-center gap-12 overflow-hidden bg-court text-cream md:grid-cols-2"
        style={{ borderRadius: 28, padding: 56 }}
      >
        <svg
          viewBox="0 0 600 400"
          className="pointer-events-none absolute"
          style={{ right: -80, top: -40, width: 540, opacity: 0.18 }}
          aria-hidden="true"
          focusable="false"
        >
          <rect
            x="20"
            y="20"
            width="560"
            height="360"
            stroke={colors.lime}
            strokeWidth="2"
            fill="none"
          />
          <line x1="300" y1="20" x2="300" y2="380" stroke={colors.lime} strokeWidth="2" />
          <line x1="20" y1="200" x2="580" y2="200" stroke={colors.lime} strokeWidth="2" />
        </svg>
        <div className="relative">
          <div
            className="text-mono-m font-mono uppercase text-lime"
            style={{ letterSpacing: '0.18em' }}
          >
            MEMBRESÍA ÚNICA
          </div>
          <h2
            className="mt-2 font-display font-bold leading-none"
            style={{ fontSize: 64, letterSpacing: '-0.04em' }}
          >
            Una tarifa,
            <br />
            cero fricción.
          </h2>
          <p className="mt-4 max-w-[380px] text-[16px] leading-[1.5] text-cream/80">
            Acceso completo a la comunidad, matches ilimitados y reservas en todos los clubes
            aliados.
          </p>
        </div>
        <div className="relative bg-cream text-ink" style={{ borderRadius: 22, padding: 36 }}>
          <div
            className="text-mono-m font-mono uppercase text-court"
            style={{ letterSpacing: '0.14em' }}
          >
            4 PLAY+ MENSUAL
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className="font-display font-bold leading-none"
              style={{ fontSize: 80, letterSpacing: '-0.05em' }}
            >
              $20.000
            </span>
            <span className="text-body-s text-ash">COP / mes</span>
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            {[
              'Matches ilimitados',
              'Reservas en 14 clubes',
              'Chat directo y agenda',
              'Stats y ranking',
            ].map((b) => (
              <div key={b} className="flex items-center gap-2.5 text-body-s">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 999,
                    background: colors.court,
                  }}
                >
                  <IconCheck size={11} stroke={colors.lime} strokeWidth={3} />
                </div>
                {b}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-6 w-full rounded-pill bg-ink px-4 py-4 text-[15px] font-semibold text-cream"
          >
            Empezar 7 días gratis
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="flex items-center justify-between bg-ink px-12 py-10 text-body-xs text-cream/70">
      <Logo size={22} color={colors.cream} ball={colors.lime} dark />
      <span>Hecho en Cartagena · 2026</span>
      <span>Privacidad · Términos · Soporte</span>
    </div>
  );
}
