// screens.jsx — Matchpoint mobile app screens
// Uses MP, LogoMark, Logo from brand.jsx and IOSDevice from ios-frame.jsx

const { useState } = React;

// ─── SHARED UI ─────────────────────────────────────────────
const sFont = 'Inter, -apple-system, system-ui, sans-serif';
const sDisplay = '"Bricolage Grotesque", system-ui';
const sMono = '"JetBrains Mono", monospace';

// striped placeholder for photos
function PhotoPlaceholder({ label = 'foto perfil', tone = 'green', children, style = {} }) {
  const tones = {
    green:  { bg: '#0B5D3B', stripe: 'rgba(212,255,58,0.10)', text: '#D4FF3A' },
    coral:  { bg: '#FF6B4A', stripe: 'rgba(255,255,255,0.12)', text: '#FFE4DC' },
    ink:    { bg: '#0E1B2C', stripe: 'rgba(212,255,58,0.10)', text: '#D4FF3A' },
    sand:   { bg: '#E8DFD0', stripe: 'rgba(14,27,44,0.06)',  text: '#5C5247' },
    cream:  { bg: '#F4F0E8', stripe: 'rgba(14,27,44,0.05)',  text: '#5C5247' },
  };
  const t = tones[tone] || tones.green;
  return (
    <div style={{
      background: `repeating-linear-gradient(135deg, ${t.bg}, ${t.bg} 14px, ${t.stripe} 14px, ${t.stripe} 28px)`,
      color: t.text,
      fontFamily: sMono,
      fontSize: 10,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      padding: 14,
      ...style,
    }}>
      {children || label}
    </div>
  );
}

// tiny line icons (no emoji)
const Icon = ({ d, size = 20, stroke = 'currentColor', fill = 'none', sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    {d}
  </svg>
);
const I = {
  home:    <path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z"/>,
  search:  <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
  cal:     <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
  chat:    <path d="M21 15a4 4 0 01-4 4H8l-5 4V7a4 4 0 014-4h10a4 4 0 014 4z"/>,
  user:    <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/></>,
  heart:   <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 5.5 5.5 5.5 0 0121.5 12C19 16.5 12 21 12 21z"/>,
  x:       <><path d="M5 5l14 14M19 5L5 19"/></>,
  pin:     <><path d="M12 22s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
  star:    <path d="M12 2l3 7 7 .8-5.5 4.7 1.7 7-6.2-3.8L5.8 21.5 7.5 14.5 2 9.8 9 9z"/>,
  bolt:    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>,
  check:   <path d="M5 13l4 4L20 6"/>,
  arrow:   <><path d="M5 12h14"/><path d="M13 5l7 7-7 7"/></>,
  filter:  <path d="M3 5h18M6 12h12M10 19h4"/>,
  send:    <><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></>,
};

// ─── 01 · ONBOARDING ──────────────────────────────────────
function ScreenOnboarding() {
  return (
    <div style={{ height: '100%', background: MP.court, color: MP.cream, fontFamily: sFont, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* decorative court lines */}
      <svg viewBox="0 0 390 600" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}>
        <rect x="20" y="60" width="350" height="540" rx="2" stroke={MP.lime} strokeWidth="1.5" fill="none"/>
        <line x1="20" y1="200" x2="370" y2="200" stroke={MP.lime} strokeWidth="1.5"/>
        <line x1="20" y1="460" x2="370" y2="460" stroke={MP.lime} strokeWidth="1.5"/>
        <line x1="195" y1="60" x2="195" y2="600" stroke={MP.lime} strokeWidth="1.5"/>
      </svg>
      <div style={{ flex: 1, padding: '60px 28px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
        <div>
          <LogoMark size={56} color={MP.cream} ball={MP.lime} />
          <div style={{ marginTop: 56 }}>
            <div style={{ fontFamily: sMono, fontSize: 11, color: MP.lime, letterSpacing: '0.18em', marginBottom: 18 }}>CARTAGENA · 2026</div>
            <h1 style={{ fontFamily: sDisplay, fontSize: 56, lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 700, margin: 0, textWrap: 'balance' }}>
              Encuentra <span style={{ color: MP.lime, fontStyle: 'italic' }}>tu match</span> en la cancha.
            </h1>
            <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.5, color: 'rgba(244,240,232,0.78)', maxWidth: 300 }}>
              Tenis y pádel para la comunidad costera. Encuentra rivales de tu nivel, agenda canchas y juega más.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button style={{ background: MP.lime, color: MP.ink, border: 'none', borderRadius: 999, padding: '18px 24px', fontSize: 16, fontWeight: 600, fontFamily: sFont, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Crear mi perfil <Icon d={I.arrow} size={18} stroke={MP.ink}/>
          </button>
          <button style={{ background: 'transparent', color: MP.cream, border: '1px solid rgba(244,240,232,0.3)', borderRadius: 999, padding: '18px 24px', fontSize: 16, fontWeight: 500, fontFamily: sFont }}>
            Ya tengo cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── 02 · SWIPE FEED ──────────────────────────────────────
function ScreenSwipe() {
  return (
    <div style={{ height: '100%', background: MP.cream, fontFamily: sFont, display: 'flex', flexDirection: 'column' }}>
      {/* top bar */}
      <div style={{ padding: '12px 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <LogoMark size={32} />
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 38, height: 38, borderRadius: 999, background: MP.bone, border: `1px solid ${MP.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MP.ink }}>
            <Icon d={I.filter} size={18}/>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: 999, background: MP.bone, border: `1px solid ${MP.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MP.ink }}>
            <Icon d={I.bolt} size={18}/>
          </div>
        </div>
      </div>

      {/* sport toggle */}
      <div style={{ padding: '0 20px', display: 'flex', gap: 8, marginBottom: 12 }}>
        <Pill active>Tenis</Pill>
        <Pill>Pádel</Pill>
        <Pill>Ambos</Pill>
      </div>

      {/* card stack */}
      <div style={{ flex: 1, padding: '0 20px', position: 'relative' }}>
        {/* back card */}
        <div style={{ position: 'absolute', inset: '0 32px 12px 32px', background: MP.sand, borderRadius: 28, transform: 'translateY(8px) scale(0.96)', opacity: 0.7 }}/>
        {/* front card */}
        <div style={{ position: 'absolute', inset: '0 20px 0 20px', borderRadius: 28, overflow: 'hidden', boxShadow: '0 12px 40px rgba(14,27,44,0.18)', background: MP.ink }}>
          <PhotoPlaceholder tone="coral" style={{ height: '100%' }}>foto · daniela m.</PhotoPlaceholder>
          {/* gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(14,27,44,0.85) 100%)' }}/>
          {/* level badge */}
          <div style={{ position: 'absolute', top: 16, left: 16, background: MP.lime, color: MP.ink, padding: '6px 12px', borderRadius: 999, fontFamily: sMono, fontSize: 10, fontWeight: 600, letterSpacing: '0.1em' }}>
            NIVEL 4.5 · INTERMEDIO+
          </div>
          <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(14,27,44,0.55)', backdropFilter: 'blur(10px)', color: MP.cream, padding: '6px 12px', borderRadius: 999, fontFamily: sMono, fontSize: 10, letterSpacing: '0.1em' }}>
            2.4 KM
          </div>
          {/* info */}
          <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22, color: MP.cream }}>
            <div style={{ fontFamily: sDisplay, fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 8 }}>
              Daniela M. <span style={{ fontSize: 22, fontWeight: 400, color: 'rgba(244,240,232,0.7)' }}>28</span>
            </div>
            <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(244,240,232,0.85)' }}>
              <Icon d={I.pin} size={13}/> Manga · Cartagena
            </div>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.4, color: 'rgba(244,240,232,0.9)' }}>
              "Saco con efecto y revés a una mano. Busco contrincante constante para entrenar martes y jueves al amanecer."
            </p>
            <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <Tag>Tenis</Tag>
              <Tag>Karibana</Tag>
              <Tag>AM persona</Tag>
            </div>
          </div>
        </div>
      </div>

      {/* action buttons */}
      <div style={{ padding: '20px 20px 8px', display: 'flex', justifyContent: 'center', gap: 18 }}>
        <ActionBtn bg={MP.bone} border={MP.line} color={MP.ink}><Icon d={I.x} size={22}/></ActionBtn>
        <ActionBtn bg={MP.ink} color={MP.lime} size={68}><Icon d={I.bolt} size={26} fill={MP.lime} stroke={MP.lime}/></ActionBtn>
        <ActionBtn bg={MP.lime} color={MP.ink}><Icon d={I.heart} size={22} fill={MP.ink}/></ActionBtn>
      </div>

      <BottomNav active="search"/>
    </div>
  );
}

function Pill({ children, active }) {
  return (
    <div style={{
      padding: '8px 16px',
      borderRadius: 999,
      background: active ? MP.ink : 'transparent',
      color: active ? MP.cream : MP.ash,
      border: active ? 'none' : `1px solid ${MP.line}`,
      fontSize: 13,
      fontWeight: 500,
    }}>{children}</div>
  );
}
function Tag({ children }) {
  return (
    <span style={{
      padding: '5px 10px',
      borderRadius: 6,
      background: 'rgba(244,240,232,0.15)',
      backdropFilter: 'blur(8px)',
      color: MP.cream,
      fontFamily: sMono,
      fontSize: 10,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      border: '1px solid rgba(244,240,232,0.18)',
    }}>{children}</span>
  );
}
function ActionBtn({ children, bg, color, border, size = 56 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: bg,
      border: border ? `1px solid ${border}` : 'none',
      color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 6px 18px rgba(14,27,44,0.12)',
    }}>{children}</div>
  );
}
function BottomNav({ active = 'home' }) {
  const items = [
    { id: 'home', d: I.home }, { id: 'search', d: I.search }, { id: 'cal', d: I.cal }, { id: 'chat', d: I.chat }, { id: 'user', d: I.user },
  ];
  return (
    <div style={{ borderTop: `1px solid ${MP.line}`, padding: '12px 20px 28px', display: 'flex', justifyContent: 'space-between', background: MP.bone }}>
      {items.map(it => (
        <div key={it.id} style={{ width: 44, height: 44, borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: active === it.id ? MP.court : 'transparent', color: active === it.id ? MP.lime : MP.ash }}>
          <Icon d={it.d} size={22}/>
        </div>
      ))}
    </div>
  );
}

// ─── 03 · PROFILE ─────────────────────────────────────────
function ScreenProfile() {
  return (
    <div style={{ height: '100%', background: MP.cream, fontFamily: sFont, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {/* photo header */}
        <div style={{ height: 240, position: 'relative' }}>
          <PhotoPlaceholder tone="green" style={{ height: '100%' }}>foto principal</PhotoPlaceholder>
          <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: 'rgba(14,27,44,0.55)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: MP.cream }}>
              <Icon d={<path d="M15 18l-6-6 6-6"/>} size={18}/>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{ width: 28, height: 4, borderRadius: 2, background: i === 0 ? MP.lime : 'rgba(244,240,232,0.4)' }}/>
              ))}
            </div>
            <div style={{ width: 36, height: 36 }}/>
          </div>
        </div>

        {/* info card */}
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontFamily: sDisplay, fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', color: MP.ink, lineHeight: 1 }}>Andrés Vélez, 32</div>
              <div style={{ marginTop: 6, fontSize: 13, color: MP.ash, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon d={I.pin} size={13}/> Bocagrande · 1.8 km
              </div>
            </div>
            <div style={{ background: MP.court, color: MP.lime, padding: '8px 12px', borderRadius: 10, fontFamily: sMono, fontSize: 11, letterSpacing: '0.06em', fontWeight: 600, lineHeight: 1.2, textAlign: 'center' }}>
              <div style={{ fontSize: 16, color: MP.cream }}>4.0</div>
              <div style={{ opacity: 0.8 }}>NIVEL</div>
            </div>
          </div>

          {/* stat strip */}
          <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', background: MP.bone, border: `1px solid ${MP.line}`, borderRadius: 14, padding: '14px 0' }}>
            {[
              { k: '47',  v: 'partidos' },
              { k: '68%', v: 'victorias' },
              { k: '12',  v: 'matches' },
            ].map((s,i) => (
              <div key={i} style={{ borderLeft: i ? `1px solid ${MP.line}` : 'none', textAlign: 'center', padding: '0 8px' }}>
                <div style={{ fontFamily: sDisplay, fontSize: 22, fontWeight: 700, color: MP.ink, letterSpacing: '-0.02em' }}>{s.k}</div>
                <div style={{ fontFamily: sMono, fontSize: 9, letterSpacing: '0.12em', color: MP.ash, textTransform: 'uppercase' }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* sports */}
          <div style={{ marginTop: 18 }}>
            <SectionLabel>Deportes</SectionLabel>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <SportChip name="Tenis" level="4.0" active/>
              <SportChip name="Pádel" level="3.5"/>
            </div>
          </div>

          {/* bio */}
          <div style={{ marginTop: 18 }}>
            <SectionLabel>Bio</SectionLabel>
            <p style={{ marginTop: 6, fontSize: 14, lineHeight: 1.5, color: MP.ink }}>
              Ingeniero, juego desde los 12. Saque sólido, le voy al revés cruzado. Buscando partidos competitivos los fines de semana.
            </p>
          </div>

          {/* favorite courts */}
          <div style={{ marginTop: 18, marginBottom: 20 }}>
            <SectionLabel>Canchas favoritas</SectionLabel>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {['Club Cartagena', 'Karibana Beach', 'Las Velas', 'Hotel Las Américas'].map(c => (
                <span key={c} style={{ padding: '6px 12px', borderRadius: 999, background: MP.sand, color: MP.ink, fontSize: 12 }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontFamily: sMono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: MP.ash }}>{children}</div>;
}
function SportChip({ name, level, active }) {
  return (
    <div style={{
      flex: 1,
      padding: '12px 14px',
      borderRadius: 14,
      background: active ? MP.ink : MP.bone,
      color: active ? MP.cream : MP.ink,
      border: active ? 'none' : `1px solid ${MP.line}`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontWeight: 600, fontSize: 15 }}>{name}</span>
      <span style={{ fontFamily: sMono, fontSize: 12, color: active ? MP.lime : MP.ash, fontWeight: 600 }}>{level}</span>
    </div>
  );
}

// ─── 04 · BOOK COURT ──────────────────────────────────────
function ScreenBook() {
  const courts = [
    { name: 'Club Cartagena',    zone: 'Manga',     dist: '1.2 km', surf: 'Polvo de ladrillo', price: '$45.000', avail: 'Hoy 18:00', tone: 'green' },
    { name: 'Karibana Beach',    zone: 'Manzanillo',dist: '8.5 km', surf: 'Hard court',         price: '$60.000', avail: 'Mañana 7:00', tone: 'coral' },
    { name: 'Las Velas Pádel',   zone: 'Bocagrande',dist: '2.1 km', surf: 'Pádel · cristal',    price: '$50.000', avail: 'Hoy 20:00', tone: 'ink' },
    { name: 'Hotel Las Américas',zone: 'Anillo Vial',dist:'6.3 km', surf: 'Pádel · resina',     price: '$55.000', avail: 'Hoy 19:30', tone: 'sand' },
  ];
  return (
    <div style={{ height: '100%', background: MP.cream, fontFamily: sFont, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '14px 20px 8px' }}>
        <div style={{ fontFamily: sMono, fontSize: 10, letterSpacing: '0.14em', color: MP.ash }}>AGENDAR</div>
        <h1 style={{ fontFamily: sDisplay, fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', margin: '4px 0 0', color: MP.ink }}>Canchas en Cartagena</h1>
      </div>

      {/* mini map */}
      <div style={{ margin: '14px 20px 0', height: 130, borderRadius: 18, overflow: 'hidden', position: 'relative', background: MP.ink }}>
        <svg viewBox="0 0 350 130" style={{ width: '100%', height: '100%' }}>
          {/* coastline suggestion */}
          <path d="M0 80 Q60 55 130 70 T260 60 T350 75 L350 130 L0 130Z" fill={MP.court} opacity="0.6"/>
          <path d="M0 95 Q70 75 140 85 T280 80 T350 90 L350 130 L0 130Z" fill={MP.court}/>
          {/* grid */}
          {[20,60,100].map(y => <line key={y} x1="0" y1={y} x2="350" y2={y} stroke={MP.lime} strokeOpacity="0.08"/>)}
          {[60,140,220,300].map(x => <line key={x} x1={x} y1="0" x2={x} y2="130" stroke={MP.lime} strokeOpacity="0.08"/>)}
          {/* pins */}
          {[
            { x: 90,  y: 50, c: MP.lime },
            { x: 180, y: 35, c: MP.coral },
            { x: 260, y: 60, c: MP.lime },
            { x: 130, y: 85, c: MP.lime },
            { x: 220, y: 95, c: MP.cream },
          ].map((p,i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="9" fill={p.c} opacity="0.25"/>
              <circle cx={p.x} cy={p.y} r="4" fill={p.c}/>
            </g>
          ))}
        </svg>
        <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(244,240,232,0.95)', padding: '6px 10px', borderRadius: 8, fontFamily: sMono, fontSize: 10, letterSpacing: '0.1em', color: MP.ink }}>
          14 CANCHAS
        </div>
      </div>

      {/* filters */}
      <div style={{ padding: '14px 20px 6px', display: 'flex', gap: 8, overflow: 'hidden' }}>
        <Pill active>Todas</Pill>
        <Pill>Tenis</Pill>
        <Pill>Pádel</Pill>
        <Pill>Hoy</Pill>
      </div>

      {/* list */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '6px 20px 0' }}>
        {courts.slice(0, 3).map(c => (
          <div key={c.name} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: `1px solid ${MP.line}` }}>
            <div style={{ width: 64, height: 64, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
              <PhotoPlaceholder tone={c.tone} style={{ height: '100%', padding: 6, fontSize: 8 }}>{c.name.split(' ')[0]}</PhotoPlaceholder>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 6 }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: MP.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                <div style={{ fontFamily: sMono, fontSize: 11, color: MP.ash, flexShrink: 0 }}>{c.dist}</div>
              </div>
              <div style={{ fontSize: 12, color: MP.ash, marginTop: 2 }}>{c.zone} · {c.surf}</div>
              <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ background: MP.lime, color: MP.ink, padding: '3px 8px', borderRadius: 6, fontFamily: sMono, fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}>
                  {c.avail.toUpperCase()}
                </span>
                <span style={{ fontFamily: sDisplay, fontWeight: 600, fontSize: 14, color: MP.ink }}>{c.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="cal"/>
    </div>
  );
}

// ─── 05 · MATCH + CHAT ─────────────────────────────────────
function ScreenChat() {
  const messages = [
    { from: 'her', t: '¡Match! Por fin alguien que también juega de mañana 😅', time: '8:14' },
    { from: 'me',  t: '¡Hola Daniela! Vi tu nivel, juegas en Karibana?', time: '8:22' },
    { from: 'her', t: 'Sí, soy socia. ¿Te animas el jueves a las 6am?', time: '8:25' },
    { from: 'me',  t: 'Hecho. ¿Reservo yo la cancha desde la app?', time: '8:31' },
  ];
  return (
    <div style={{ height: '100%', background: MP.cream, fontFamily: sFont, display: 'flex', flexDirection: 'column' }}>
      {/* header */}
      <div style={{ padding: '12px 16px 10px', borderBottom: `1px solid ${MP.line}`, background: MP.bone, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Icon d={<path d="M15 18l-6-6 6-6"/>} size={20} stroke={MP.ink}/>
        <div style={{ width: 38, height: 38, borderRadius: 999, overflow: 'hidden' }}>
          <PhotoPlaceholder tone="coral" style={{ height: '100%', padding: 0 }}>{' '}</PhotoPlaceholder>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: MP.ink, lineHeight: 1.1 }}>Daniela M.</div>
          <div style={{ fontFamily: sMono, fontSize: 10, color: MP.court, letterSpacing: '0.1em', marginTop: 2 }}>● ACTIVA · NIVEL 4.5</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: MP.cream, border: `1px solid ${MP.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MP.ink }}>
            <Icon d={I.cal} size={16}/>
          </div>
        </div>
      </div>

      {/* match banner */}
      <div style={{ margin: '12px 16px 4px', padding: '12px 14px', borderRadius: 14, background: MP.court, color: MP.cream, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: sMono, fontSize: 9, letterSpacing: '0.16em', color: MP.lime }}>MATCH PROGRAMADO</div>
          <div style={{ fontFamily: sDisplay, fontSize: 17, fontWeight: 600, marginTop: 2 }}>Jue 23 · 6:00 AM · Karibana</div>
        </div>
        <Icon d={I.arrow} size={18} stroke={MP.lime}/>
      </div>

      {/* messages */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ textAlign: 'center', fontFamily: sMono, fontSize: 9, letterSpacing: '0.14em', color: MP.ash }}>HOY · MATCH HACE 2H</div>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.from === 'me' ? 'flex-end' : 'flex-start', maxWidth: '78%' }}>
            <div style={{
              padding: '10px 14px',
              borderRadius: 18,
              background: m.from === 'me' ? MP.ink : MP.bone,
              color: m.from === 'me' ? MP.cream : MP.ink,
              fontSize: 14, lineHeight: 1.4,
              border: m.from === 'me' ? 'none' : `1px solid ${MP.line}`,
              borderBottomRightRadius: m.from === 'me' ? 6 : 18,
              borderBottomLeftRadius: m.from === 'me' ? 18 : 6,
            }}>{m.t}</div>
            <div style={{ fontFamily: sMono, fontSize: 9, color: MP.ash, marginTop: 4, textAlign: m.from === 'me' ? 'right' : 'left', letterSpacing: '0.08em' }}>{m.time}</div>
          </div>
        ))}
      </div>

      {/* input */}
      <div style={{ padding: '10px 14px 18px', borderTop: `1px solid ${MP.line}`, background: MP.bone, display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1, background: MP.cream, border: `1px solid ${MP.line}`, borderRadius: 999, padding: '10px 16px', color: MP.ash, fontSize: 14 }}>Escribe un mensaje…</div>
        <div style={{ width: 40, height: 40, borderRadius: 999, background: MP.lime, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MP.ink }}>
          <Icon d={I.send} size={18}/>
        </div>
      </div>
    </div>
  );
}

// ─── 06 · SUBSCRIPTION / PAYWALL ──────────────────────────
function ScreenPaywall() {
  return (
    <div style={{ height: '100%', background: MP.ink, color: MP.cream, fontFamily: sFont, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* glow */}
      <div style={{ position: 'absolute', top: -120, right: -80, width: 320, height: 320, borderRadius: 999, background: 'radial-gradient(circle, rgba(212,255,58,0.35), transparent 70%)' }}/>

      <div style={{ padding: '18px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Icon d={I.x} size={22} stroke={MP.cream}/>
        <span style={{ fontFamily: sMono, fontSize: 11, letterSpacing: '0.14em', color: MP.lime }}>4 PLAY+</span>
        <span style={{ width: 22 }}/>
      </div>

      <div style={{ flex: 1, padding: '40px 24px 16px', position: 'relative' }}>
        <h1 style={{ fontFamily: sDisplay, fontSize: 44, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 0.95, margin: 0, textWrap: 'balance' }}>
          Juega más,<br/><span style={{ color: MP.lime, fontStyle: 'italic' }}>conecta más.</span>
        </h1>
        <p style={{ marginTop: 14, color: 'rgba(244,240,232,0.7)', fontSize: 14, lineHeight: 1.5, maxWidth: 300 }}>
          Una membresía simple para todos los jugadores de Cartagena. Sin contrato, cancela cuando quieras.
        </p>

        {/* price card */}
        <div style={{ marginTop: 28, padding: '22px 22px', borderRadius: 22, background: 'rgba(244,240,232,0.06)', border: '1px solid rgba(212,255,58,0.25)', backdropFilter: 'blur(10px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontFamily: sMono, fontSize: 10, letterSpacing: '0.18em', color: MP.lime }}>MENSUAL</div>
              <div style={{ fontFamily: sDisplay, fontSize: 48, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginTop: 4 }}>
                $20.000
              </div>
              <div style={{ fontSize: 12, color: 'rgba(244,240,232,0.6)', marginTop: 4 }}>COP / mes · sin contrato</div>
            </div>
            <div style={{ background: MP.lime, color: MP.ink, padding: '6px 10px', borderRadius: 6, fontFamily: sMono, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>
              7 DÍAS GRATIS
            </div>
          </div>
        </div>

        {/* benefits */}
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            'Matches ilimitados con jugadores de tu nivel',
            'Reserva canchas en 14 clubes de la ciudad',
            'Chat directo y agenda compartida',
            'Ranking y stats de tus partidos',
          ].map((b,i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 26, height: 26, borderRadius: 999, background: MP.court, display: 'flex', alignItems: 'center', justifyContent: 'center', color: MP.lime }}>
                <Icon d={I.check} size={14} sw={2.4}/>
              </div>
              <span style={{ fontSize: 14, color: 'rgba(244,240,232,0.92)' }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 22px 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button style={{ background: MP.lime, color: MP.ink, border: 'none', borderRadius: 999, padding: '18px', fontSize: 16, fontWeight: 600, fontFamily: sFont }}>
          Empezar prueba gratis
        </button>
        <div style={{ fontFamily: sMono, fontSize: 9, letterSpacing: '0.1em', color: 'rgba(244,240,232,0.5)', textAlign: 'center', textTransform: 'uppercase' }}>
          Después $20.000/mes · cancela en 1 toque
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScreenOnboarding, ScreenSwipe, ScreenProfile, ScreenBook, ScreenChat, ScreenPaywall });
