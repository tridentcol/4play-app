// landing.jsx — Matchpoint marketing landing page

function LandingPage() {
  return (
    <div style={{ background: MP.cream, fontFamily: 'Inter, system-ui', color: MP.ink, minHeight: '100%' }}>
      {/* nav */}
      <div style={{ padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${MP.line}` }}>
        <Logo size={26} />
        <nav style={{ display: 'flex', gap: 32, fontSize: 14, color: MP.ink }}>
          <span>Cómo funciona</span>
          <span>Canchas</span>
          <span>Comunidad</span>
          <span>Precio</span>
        </nav>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 14, color: MP.ash }}>Iniciar sesión</span>
          <button style={{ background: MP.ink, color: MP.cream, border: 'none', borderRadius: 999, padding: '10px 18px', fontSize: 14, fontWeight: 500 }}>Descargar app</button>
        </div>
      </div>

      {/* hero */}
      <div style={{ padding: '72px 48px 48px', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: '0.18em', color: MP.court }}>● CARTAGENA · 2026</div>
          <h1 style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 92, lineHeight: 0.92, letterSpacing: '-0.05em', fontWeight: 700, margin: '20px 0 0', textWrap: 'balance' }}>
            La cancha es el<br/>nuevo <span style={{ fontStyle: 'italic', color: MP.court }}>plan</span>.
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: MP.ash, maxWidth: 480, marginTop: 24 }}>
4 PLAY conecta a los jugadores de tenis y pádel de Cartagena. Encuentra rivales de tu nivel, agenda canchas en los mejores clubes, y deja de quedarte sin partido el sábado.
          </p>
          <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
            <button style={{ background: MP.court, color: MP.cream, border: 'none', borderRadius: 999, padding: '16px 26px', fontSize: 15, fontWeight: 600 }}>
              Probar gratis 7 días
            </button>
            <button style={{ background: 'transparent', color: MP.ink, border: `1.5px solid ${MP.ink}`, borderRadius: 999, padding: '16px 26px', fontSize: 15, fontWeight: 500 }}>
              Ver cómo funciona →
            </button>
          </div>
          <div style={{ marginTop: 28, display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ display: 'flex' }}>
              {['coral','green','ink','sand'].map((t,i) => (
                <div key={i} style={{ width: 36, height: 36, borderRadius: 999, marginLeft: i ? -10 : 0, border: `2px solid ${MP.cream}`, overflow: 'hidden' }}>
                  <PhotoPlaceholder tone={t} style={{ height: '100%', padding: 0 }}>{' '}</PhotoPlaceholder>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, color: MP.ash, lineHeight: 1.4 }}>
              <strong style={{ color: MP.ink }}>+1.200 jugadores</strong> ya juegan en<br/>Cartagena con 4 PLAY
            </div>
          </div>
        </div>

        {/* phone mock visual */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 580 }}>
          {/* halo */}
          <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: 999, background: `radial-gradient(circle, ${MP.lime}40, transparent 70%)` }}/>
          {/* device */}
          <div style={{ width: 280, height: 560, borderRadius: 44, background: MP.ink, padding: 8, boxShadow: '0 30px 80px rgba(14,27,44,0.25)', position: 'relative', zIndex: 1 }}>
            <div style={{ width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden', background: MP.cream, position: 'relative' }}>
              <PhotoPlaceholder tone="green" style={{ height: '100%' }}>swipe · jugadores</PhotoPlaceholder>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(14,27,44,0.85) 100%)' }}/>
              <div style={{ position: 'absolute', top: 16, left: 16, background: MP.lime, color: MP.ink, padding: '5px 10px', borderRadius: 999, fontFamily: '"JetBrains Mono", monospace', fontSize: 9, fontWeight: 600, letterSpacing: '0.1em' }}>
                NIVEL 4.5
              </div>
              <div style={{ position: 'absolute', bottom: 24, left: 18, right: 18, color: MP.cream }}>
                <div style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 24, fontWeight: 700, letterSpacing: '-0.03em' }}>Daniela M., 28</div>
                <div style={{ fontSize: 11, marginTop: 4, opacity: 0.85 }}>Manga · 2.4 km · Tenis</div>
              </div>
            </div>
          </div>
          {/* floating cards */}
          <div style={{ position: 'absolute', top: 40, right: 0, background: MP.bone, padding: '12px 14px', borderRadius: 14, boxShadow: '0 12px 30px rgba(14,27,44,0.12)', border: `1px solid ${MP.line}`, display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: MP.lime, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={MP.ink} strokeWidth="2.4" strokeLinecap="round"><path d="M5 13l4 4L20 6"/></svg>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>¡Match!</div>
              <div style={{ fontSize: 11, color: MP.ash }}>con Daniela M.</div>
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 56, left: -10, background: MP.court, color: MP.cream, padding: '12px 14px', borderRadius: 14, boxShadow: '0 12px 30px rgba(14,27,44,0.18)', display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
            <div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 9, letterSpacing: '0.14em', color: MP.lime }}>JUEVES 6:00</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 2 }}>Karibana · cancha 2</div>
            </div>
          </div>
        </div>
      </div>

      {/* stat strip */}
      <div style={{ background: MP.ink, color: MP.cream, padding: '28px 48px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
        {[
          { k: '14',     v: 'Canchas en la ciudad' },
          { k: '1.2K+',  v: 'Jugadores activos' },
          { k: '$20K',   v: 'Mensual · sin contrato' },
          { k: '4.8★',   v: 'Promedio en App Store' },
        ].map((s,i) => (
          <div key={i}>
            <div style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 48, fontWeight: 700, letterSpacing: '-0.04em', color: MP.lime }}>{s.k}</div>
            <div style={{ fontSize: 13, color: 'rgba(244,240,232,0.7)', marginTop: 4 }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* how it works */}
      <div style={{ padding: '72px 48px' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: '0.18em', color: MP.ash }}>03 PASOS</div>
        <h2 style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', margin: '8px 0 40px' }}>Así funciona.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { n: '01', t: 'Crea tu perfil', d: 'Cuéntanos tu nivel, deportes y zona. Te emparejamos con jugadores afines.' , bg: MP.bone, color: MP.ink },
            { n: '02', t: 'Haz match', d: 'Desliza por jugadores cerca tuyo. Si hay química y nivel, conectan.', bg: MP.lime, color: MP.ink },
            { n: '03', t: 'Reserva y juega', d: 'Agenda la cancha desde el chat. Pago integrado con la membresía.', bg: MP.court, color: MP.cream },
          ].map(s => (
            <div key={s.n} style={{ background: s.bg, color: s.color, borderRadius: 22, padding: 28, minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: s.bg === MP.bone ? `1px solid ${MP.line}` : 'none' }}>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 14, fontWeight: 600 }}>{s.n}</div>
              <div>
                <div style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }}>{s.t}</div>
                <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5, opacity: 0.85 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* canchas grid */}
      <div style={{ padding: '0 48px 72px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: '0.18em', color: MP.ash }}>CLUBES ALIADOS</div>
            <h2 style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 48, fontWeight: 700, letterSpacing: '-0.04em', margin: '8px 0 0' }}>Las mejores canchas<br/>de la ciudad.</h2>
          </div>
          <span style={{ fontSize: 14, color: MP.ink, textDecoration: 'underline' }}>Ver todas →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { n: 'Club Cartagena',     z: 'Manga',       s: 'Tenis · 6 canchas',   t: 'green' },
            { n: 'Karibana Beach',     z: 'Manzanillo',  s: 'Tenis · 4 canchas',   t: 'coral' },
            { n: 'Las Velas Pádel',    z: 'Bocagrande',  s: 'Pádel · 8 canchas',   t: 'ink' },
            { n: 'Hotel Las Américas', z: 'Anillo Vial', s: 'Pádel · 3 canchas',   t: 'sand' },
          ].map(c => (
            <div key={c.n} style={{ borderRadius: 18, overflow: 'hidden', border: `1px solid ${MP.line}` }}>
              <div style={{ height: 160 }}>
                <PhotoPlaceholder tone={c.t} style={{ height: '100%' }}>foto · {c.n.toLowerCase()}</PhotoPlaceholder>
              </div>
              <div style={{ padding: 16, background: MP.bone }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{c.n}</div>
                <div style={{ fontSize: 12, color: MP.ash, marginTop: 4 }}>{c.z}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.08em', color: MP.court, marginTop: 10, textTransform: 'uppercase' }}>{c.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pricing */}
      <div style={{ padding: '0 48px 72px' }}>
        <div style={{ background: MP.court, color: MP.cream, borderRadius: 28, padding: '56px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* court lines decoration */}
          <svg viewBox="0 0 600 400" style={{ position: 'absolute', right: -80, top: -40, width: 540, opacity: 0.18 }}>
            <rect x="20" y="20" width="560" height="360" stroke={MP.lime} strokeWidth="2" fill="none"/>
            <line x1="300" y1="20" x2="300" y2="380" stroke={MP.lime} strokeWidth="2"/>
            <line x1="20" y1="200" x2="580" y2="200" stroke={MP.lime} strokeWidth="2"/>
          </svg>
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, letterSpacing: '0.18em', color: MP.lime }}>MEMBRESÍA ÚNICA</div>
            <h2 style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 64, fontWeight: 700, letterSpacing: '-0.04em', margin: '8px 0 0', lineHeight: 1 }}>Una tarifa,<br/>cero fricción.</h2>
            <p style={{ fontSize: 16, lineHeight: 1.5, color: 'rgba(244,240,232,0.8)', marginTop: 16, maxWidth: 380 }}>
              Acceso completo a la comunidad, matches ilimitados y reservas en todos los clubes aliados.
            </p>
          </div>
          <div style={{ background: MP.cream, color: MP.ink, borderRadius: 22, padding: 36, position: 'relative' }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.14em', color: MP.court }}>4 PLAY+ MENSUAL</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12 }}>
              <span style={{ fontFamily: '"Bricolage Grotesque"', fontSize: 80, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>$20.000</span>
              <span style={{ fontSize: 14, color: MP.ash }}>COP / mes</span>
            </div>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Matches ilimitados','Reservas en 14 clubes','Chat directo y agenda','Stats y ranking'].map(b => (
                <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 999, background: MP.court, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={MP.lime} strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L20 6"/></svg>
                  </div>
                  {b}
                </div>
              ))}
            </div>
            <button style={{ marginTop: 24, width: '100%', background: MP.ink, color: MP.cream, border: 'none', borderRadius: 999, padding: '16px', fontSize: 15, fontWeight: 600 }}>
              Empezar 7 días gratis
            </button>
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{ padding: '40px 48px', background: MP.ink, color: 'rgba(244,240,232,0.7)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
        <Logo size={22} color={MP.cream} ball={MP.lime} dark/>
        <span>Hecho en Cartagena · 2026</span>
        <span>Privacidad · Términos · Soporte</span>
      </div>
    </div>
  );
}

Object.assign(window, { LandingPage });
