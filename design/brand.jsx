// brand.jsx — Matchpoint brand system

// ─── COLOR TOKENS ──────────────────────────────────────────
const MP = {
  // primaries
  court:    '#0B5D3B',  // verde cancha profundo (clay/grass hybrid)
  lime:     '#D4FF3A',  // lima eléctrico (pelota, energía)
  cream:    '#F4F0E8',  // crema cálida (papel, arena Cartagena)
  ink:      '#0E1B2C',  // azul carbón (caribe nocturno)
  // neutrals
  bone:     '#FAF7F1',
  ash:      '#5C5247',
  line:     '#E2DCCF',
  // accents
  coral:    '#FF6B4A',  // acento cálido (Cartagena murallas)
  sand:     '#E8DFD0',
};

// ─── LOGO MARK ─────────────────────────────────────────────
// The "4" is the hero — geometric, blocky, with a tennis ball perched
// in the negative-space triangle of the numeral. Reads as both
// "for play" and the number 4 (cancha cuadrada / 4 jugadores en pádel).
function LogoMark({ size = 96, color = MP.court, ball = MP.lime, bg = 'transparent' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block' }}>
      {bg !== 'transparent' && <rect width="100" height="100" rx="22" fill={bg} />}
      {/* The 4 — built as a thick L + diagonal, geometric and confident */}
      {/* vertical right stroke */}
      <rect x="62" y="14" width="14" height="72" rx="2" fill={color}/>
      {/* horizontal crossbar */}
      <rect x="20" y="54" width="56" height="14" rx="2" fill={color}/>
      {/* diagonal of the 4 (creates the triangle negative space) */}
      <path d="M62 14 L20 54 L20 68 L34 68 L62 40 Z" fill={color}/>
      {/* the ball — sits inside the triangle of the 4 */}
      <circle cx="38" cy="42" r="8" fill={ball} stroke={color} strokeWidth="1.5"/>
      <path d="M31.5 41 Q38 46.5 44.5 41" stroke={color} strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.55"/>
    </svg>
  );
}

// Wordmark — "4 PLAY" with tight tracking, the 4 as logo glyph
function Logo({ size = 32, color = MP.court, ball = MP.lime, dark = false, stacked = false }) {
  const txt = dark ? MP.cream : color;
  if (stacked) {
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: size * 0.15 }}>
        <LogoMark size={size * 2.2} color={color} ball={ball}/>
        <span style={{
          fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700,
          fontSize: size * 0.85, letterSpacing: '0.02em', color: txt, lineHeight: 1,
        }}>PLAY</span>
      </div>
    );
  }
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.22 }}>
      <LogoMark size={size * 1.15} color={color} ball={ball}/>
      <span style={{
        fontFamily: '"Bricolage Grotesque", system-ui',
        fontWeight: 700,
        fontSize: size * 1.05,
        letterSpacing: '-0.02em',
        color: txt,
        lineHeight: 1,
      }}>PLAY</span>
    </div>
  );
}

// ─── TYPE SCALE PREVIEW ────────────────────────────────────
function TypeSpec() {
  const Row = ({ font, weight, label, sample, size, tracking = '-0.02em' }) => (
    <div style={{ borderTop: `1px solid ${MP.line}`, padding: '20px 0', display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, alignItems: 'baseline' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: MP.ash, lineHeight: 1.5 }}>
        <div>{label}</div>
        <div style={{ opacity: 0.7 }}>{size}px / {weight}</div>
      </div>
      <div style={{ fontFamily: font, fontWeight: weight, fontSize: size, color: MP.ink, letterSpacing: tracking, lineHeight: 1.05 }}>{sample}</div>
    </div>
  );
  return (
    <div style={{ background: MP.bone, padding: 56, fontFamily: 'Inter, system-ui', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: MP.ash, marginBottom: 8 }}>Tipografía</div>
      <h2 style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 36, margin: 0, color: MP.ink, letterSpacing: '-0.03em', fontWeight: 600 }}>Bricolage Grotesque + Inter</h2>
      <p style={{ color: MP.ash, fontSize: 14, lineHeight: 1.6, maxWidth: 520, marginTop: 12 }}>
        Display de personalidad cálida para 4 PLAY, con una grotesque utilitaria para UI. Tracking apretado en titulares; Inter para todo lo funcional.
      </p>
      <div style={{ marginTop: 28 }}>
        <Row font='"Bricolage Grotesque"' weight={700} label="DISPLAY" size={72} sample="4 PLAY · juega." />
        <Row font='"Bricolage Grotesque"' weight={600} label="HEADING" size={40} sample="Cartagena juega." />
        <Row font='Inter' weight={600} label="SUBHEAD" size={22} sample="Tenis y pádel para la comunidad costera." tracking="-0.01em" />
        <Row font='Inter' weight={400} label="BODY" size={16} sample="Conecta con jugadores de tu nivel, agenda canchas y no vuelvas a quedarte sin partido el sábado." tracking="0" />
        <Row font='JetBrains Mono' weight={500} label="MONO" size={13} sample="MATCH 04 · JUEVES 19:00 · KARIBANA" tracking="0.04em" />
      </div>
    </div>
  );
}

// ─── COLOR PALETTE BOARD ───────────────────────────────────
function PaletteBoard() {
  const swatches = [
    { name: 'Court Green',  hex: MP.court, role: 'Primary',   light: false },
    { name: 'Volt Lime',    hex: MP.lime,  role: 'Action',    light: true },
    { name: 'Caribbean Ink',hex: MP.ink,   role: 'Text',      light: false },
    { name: 'Bone Cream',   hex: MP.cream, role: 'Surface',   light: true },
    { name: 'Coral',        hex: MP.coral, role: 'Accent',    light: false },
    { name: 'Sand',         hex: MP.sand,  role: 'Subtle',    light: true },
  ];
  return (
    <div style={{ background: MP.bone, padding: 48, fontFamily: 'Inter, system-ui', height: '100%', boxSizing: 'border-box' }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: MP.ash, marginBottom: 8 }}>Paleta</div>
      <h2 style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 36, margin: 0, color: MP.ink, letterSpacing: '-0.03em', fontWeight: 600 }}>Verde cancha, lima eléctrico</h2>
      <p style={{ color: MP.ash, fontSize: 14, lineHeight: 1.6, maxWidth: 520, marginTop: 12, marginBottom: 32 }}>
        El verde de la cancha como base institucional; el lima de la pelota como llamado a la acción. Crema cálida y coral evocan las murallas de Cartagena al atardecer.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {swatches.map(s => (
          <div key={s.hex} style={{ background: s.hex, borderRadius: 14, padding: 20, height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: s.light ? MP.ink : MP.cream, border: s.light ? `1px solid ${MP.line}` : 'none' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.1em', opacity: 0.7 }}>{s.role.toUpperCase()}</div>
            <div>
              <div style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em' }}>{s.name}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, opacity: 0.8, marginTop: 4 }}>{s.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOGO LOCKUP BOARD ─────────────────────────────────────
function LogoBoard() {
  return (
    <div style={{ background: MP.bone, padding: 48, fontFamily: 'Inter, system-ui', height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: MP.ash, marginBottom: 8 }}>Logotipo</div>
        <h2 style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 36, margin: 0, color: MP.ink, letterSpacing: '-0.03em', fontWeight: 600 }}>El 4 es la marca.</h2>
        <p style={{ color: MP.ash, fontSize: 14, lineHeight: 1.6, maxWidth: 520, marginTop: 12 }}>
          Un "4" geométrico con la pelota anidada en su triángulo negativo. Lee como número, como cancha y como guiño caribeño a "for play". Doble lectura: 4 jugadores en un dobles de pádel.
        </p>
      </div>
      {/* primary lockup */}
      <div style={{ flex: 1, marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: MP.cream, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, border: `1px solid ${MP.line}` }}>
          <Logo size={48} />
        </div>
        <div style={{ background: MP.court, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <Logo size={48} color={MP.cream} ball={MP.lime} dark />
        </div>
        <div style={{ background: MP.ink, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <Logo size={48} color={MP.lime} ball={MP.cream} dark />
        </div>
        <div style={{ background: MP.lime, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <Logo size={48} color={MP.ink} ball={MP.court} />
        </div>
      </div>
      {/* construction & app icon */}
      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <div style={{ background: MP.cream, borderRadius: 14, padding: 20, border: `1px solid ${MP.line}`, position: 'relative' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: MP.ash, letterSpacing: '0.1em' }}>SÍMBOLO</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
            <LogoMark size={100} />
          </div>
        </div>
        <div style={{ background: MP.cream, borderRadius: 14, padding: 20, border: `1px solid ${MP.line}` }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: MP.ash, letterSpacing: '0.1em' }}>APP ICON</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
            <div style={{ width: 100, height: 100, borderRadius: 22, background: MP.court, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(0,0,0,0.15)' }}>
              <LogoMark size={80} color={MP.cream} ball={MP.lime} />
            </div>
          </div>
        </div>
        <div style={{ background: MP.cream, borderRadius: 14, padding: 20, border: `1px solid ${MP.line}` }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: MP.ash, letterSpacing: '0.1em' }}>FAVICON 32px</div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, gap: 12, alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: 7, background: MP.court, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogoMark size={26} color={MP.cream} ball={MP.lime} />
            </div>
            <div style={{ width: 64, height: 64, borderRadius: 14, background: MP.court, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LogoMark size={52} color={MP.cream} ball={MP.lime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// expose to window
Object.assign(window, { MP, LogoMark, Logo, TypeSpec, PaletteBoard, LogoBoard });
