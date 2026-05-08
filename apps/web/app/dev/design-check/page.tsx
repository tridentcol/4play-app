import {
  Icon,
  IconArrow,
  IconBolt,
  IconCalendar,
  IconChat,
  IconCheck,
  IconFilter,
  IconHeart,
  IconHome,
  IconPin,
  IconSearch,
  IconSend,
  IconStar,
  IconUser,
  IconX,
  Logo,
  LogoMark,
  colors,
} from '@4play/ui';

export const metadata = { title: '4 PLAY · /dev/design-check' };

export default function DesignCheckPage() {
  return (
    <main className="space-y-16 px-12 py-12">
      <header>
        <div className="text-mono-s font-mono uppercase text-ash">DEV · /dev/design-check</div>
        <h1 className="mt-2 font-display text-display-s font-bold text-ink">
          Tokens visualizados.
        </h1>
        <p className="mt-2 max-w-[640px] text-body-s text-ash">
          Compara contra <code className="font-mono">design/index.html</code> abierto al lado.
          Cualquier divergencia debe ajustarse en <code className="font-mono">@4play/ui</code>, no
          aquí.
        </p>
      </header>

      <Section title="Logo">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Tile bg={colors.cream}>
            <Logo size={48} />
          </Tile>
          <Tile bg={colors.court}>
            <Logo size={48} color={colors.cream} ball={colors.lime} dark />
          </Tile>
          <Tile bg={colors.ink}>
            <Logo size={48} color={colors.lime} ball={colors.cream} dark />
          </Tile>
          <Tile bg={colors.lime}>
            <Logo size={48} color={colors.ink} ball={colors.court} />
          </Tile>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <Tile bg={colors.cream} label="SÍMBOLO">
            <LogoMark size={100} />
          </Tile>
          <Tile bg={colors.cream} label="APP ICON">
            <div
              className="flex items-center justify-center"
              style={{
                width: 100,
                height: 100,
                borderRadius: 22,
                background: colors.court,
                boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
              }}
            >
              <LogoMark size={80} color={colors.cream} ball={colors.lime} />
            </div>
          </Tile>
          <Tile bg={colors.cream} label="STACKED">
            <Logo size={32} stacked />
          </Tile>
        </div>
      </Section>

      <Section title="Paleta">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {(
            [
              { hex: colors.court, name: 'Court Green', role: 'Primary', light: false },
              { hex: colors.lime, name: 'Volt Lime', role: 'Action', light: true },
              { hex: colors.ink, name: 'Caribbean Ink', role: 'Text', light: false },
              { hex: colors.cream, name: 'Bone Cream', role: 'Surface', light: true },
              { hex: colors.coral, name: 'Coral', role: 'Accent', light: false },
              { hex: colors.sand, name: 'Sand', role: 'Subtle', light: true },
            ] as const
          ).map((s) => (
            <div
              key={s.hex}
              className="flex flex-col justify-between"
              style={{
                background: s.hex,
                color: s.light ? colors.ink : colors.cream,
                padding: 20,
                height: 180,
                borderRadius: 14,
                border: s.light ? `1px solid ${colors.line}` : 'none',
              }}
            >
              <div
                className="font-mono uppercase opacity-70"
                style={{ fontSize: 10, letterSpacing: '0.1em' }}
              >
                {s.role}
              </div>
              <div>
                <div
                  className="font-display font-semibold"
                  style={{ fontSize: 22, letterSpacing: '-0.02em' }}
                >
                  {s.name}
                </div>
                <div className="font-mono opacity-80" style={{ fontSize: 12, marginTop: 4 }}>
                  {s.hex}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografía">
        <div className="space-y-6 border-t border-line pt-6">
          <TypeRow label="DISPLAY 72 / 700" font="display" size={72} sample="4 PLAY · juega." />
          <TypeRow label="HEADING 40 / 600" font="display" size={40} sample="Cartagena juega." />
          <TypeRow
            label="SUBHEAD 22 / 600"
            font="body"
            size={22}
            sample="Tenis y pádel para la comunidad costera."
          />
          <TypeRow
            label="BODY 16 / 400"
            font="body"
            size={16}
            sample="Conecta con jugadores de tu nivel, agenda canchas y no vuelvas a quedarte sin partido el sábado."
          />
          <TypeRow
            label="MONO 13 / 500"
            font="mono"
            size={13}
            sample="MATCH 04 · JUEVES 19:00 · KARIBANA"
          />
        </div>
      </Section>

      <Section title="Iconos">
        <div className="grid grid-cols-7 gap-4">
          {(
            [
              ['home', IconHome],
              ['search', IconSearch],
              ['cal', IconCalendar],
              ['chat', IconChat],
              ['user', IconUser],
              ['heart', IconHeart],
              ['x', IconX],
              ['pin', IconPin],
              ['star', IconStar],
              ['bolt', IconBolt],
              ['check', IconCheck],
              ['arrow', IconArrow],
              ['filter', IconFilter],
              ['send', IconSend],
            ] as const
          ).map(([name, IconCmp]) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center gap-2 border border-line bg-bone py-4 text-ash"
              style={{ borderRadius: 14 }}
            >
              <IconCmp size={24} stroke={colors.ink} />
              <div className="font-mono text-mono-s uppercase">{name}</div>
            </div>
          ))}
        </div>
        {/* Generic Icon usage */}
        <div className="mt-4 flex items-center gap-3 text-body-xs text-ash">
          <Icon shapes={[{ kind: 'path', d: 'M5 13l4 4L20 6' }]} stroke={colors.court} size={28} />
          <span>Generic Icon component (custom shapes)</span>
        </div>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div
        className="mb-3 font-mono uppercase text-ash"
        style={{ fontSize: 11, letterSpacing: '0.12em' }}
      >
        {title}
      </div>
      {children}
    </section>
  );
}

function Tile({
  bg,
  label,
  children,
}: {
  bg: string;
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        background: bg,
        borderRadius: 14,
        padding: 32,
        height: 180,
        border: bg === colors.cream || bg === colors.lime ? `1px solid ${colors.line}` : 'none',
      }}
    >
      {label && (
        <div
          className="mb-2 self-start font-mono uppercase text-ash"
          style={{ fontSize: 10, letterSpacing: '0.1em' }}
        >
          {label}
        </div>
      )}
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}

function TypeRow({
  label,
  font,
  size,
  sample,
}: {
  label: string;
  font: 'display' | 'body' | 'mono';
  size: number;
  sample: string;
}) {
  const fontClass = { display: 'font-display', body: 'font-body', mono: 'font-mono' }[font];
  return (
    <div className="grid items-baseline gap-6" style={{ gridTemplateColumns: '160px 1fr' }}>
      <div
        className="font-mono uppercase text-ash"
        style={{ fontSize: 11, letterSpacing: '0.1em' }}
      >
        {label}
      </div>
      <div
        className={fontClass}
        style={{
          fontSize: size,
          color: colors.ink,
          letterSpacing: font === 'mono' ? '0.04em' : '-0.02em',
          lineHeight: 1.05,
        }}
      >
        {sample}
      </div>
    </div>
  );
}
