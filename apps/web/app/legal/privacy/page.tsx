export const metadata = { title: '4 PLAY · Política de privacidad' };

export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-ink">
      <div className="font-mono text-mono-s uppercase text-ash" style={{ letterSpacing: '0.14em' }}>
        LEGAL
      </div>
      <h1
        className="mt-2 font-display font-bold"
        style={{ fontSize: 56, letterSpacing: '-0.04em' }}
      >
        Política de privacidad
      </h1>
      <p className="mt-2 text-body-s text-ash">Última actualización · 2026-05-07</p>

      <div className="mt-10 flex flex-col gap-6 text-body-l leading-7">
        <p>
          En 4 PLAY tratamos los datos personales bajo la Ley 1581 de 2012 de Colombia. Esta
          política explica qué datos recolectamos, por qué y cómo los proteges tú también.
        </p>

        <Section title="Datos que recolectamos">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Identidad: nombre, email, fecha de nacimiento, género (opcional).</li>
            <li>Perfil deportivo: nivel, deporte, años jugando, biografía, fotos.</li>
            <li>Ubicación: latitud/longitud para encontrar rivales cercanos. Es opcional.</li>
            <li>Actividad: swipes, matches, conversaciones, reservas, pagos.</li>
            <li>Dispositivo: token de notificaciones push, plataforma (iOS/Android).</li>
          </ul>
        </Section>

        <Section title="Cómo los usamos">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>Para emparejarte con jugadores afines (matchmaking).</li>
            <li>Para procesar reservas y pagos vía Wompi.</li>
            <li>Para enviar notificaciones de matches y mensajes.</li>
            <li>Para moderar la plataforma y responder reportes.</li>
          </ul>
        </Section>

        <Section title="Compartir con terceros">
          <p>
            No vendemos tus datos. Compartimos con: Supabase (alojamiento), Wompi (pagos), Expo
            (push), proveedor de email transaccional. Cada uno tiene su propio acuerdo de
            tratamiento.
          </p>
        </Section>

        <Section title="Tus derechos">
          <p>
            Puedes acceder, rectificar, actualizar o eliminar tus datos escribiendo a{' '}
            <a href="mailto:hola@4play.co" className="text-court underline">
              hola@4play.co
            </a>
            . La eliminación implica baja de la cuenta.
          </p>
        </Section>

        <Section title="Seguridad">
          <p>
            Los tokens de autenticación se guardan en el Keychain (iOS) o EncryptedSharedPreferences
            (Android). Las contraseñas nunca se almacenan en texto plano. Las APIs corren sobre
            HTTPS.
          </p>
        </Section>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-semibold text-ink" style={{ fontSize: 22 }}>
        {title}
      </h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}
