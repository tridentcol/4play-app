export const metadata = { title: '4 PLAY · Términos de uso' };

export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-ink">
      <div className="font-mono text-mono-s uppercase text-ash" style={{ letterSpacing: '0.14em' }}>
        LEGAL
      </div>
      <h1
        className="mt-2 font-display font-bold"
        style={{ fontSize: 56, letterSpacing: '-0.04em' }}
      >
        Términos de uso
      </h1>
      <p className="mt-2 text-body-s text-ash">Última actualización · 2026-05-07</p>

      <div className="mt-10 flex flex-col gap-6 text-body-l leading-7">
        <p>
          Bienvenido a 4 PLAY. Al usar la app aceptas estos términos. 4 PLAY es una red social
          vertical para tenis y pádel en Cartagena, Colombia, operada bajo la entidad legal
          correspondiente registrada en Colombia.
        </p>

        <Section title="1. Edad mínima">
          <p>
            Debes tener al menos 16 años para usar 4 PLAY. Si eres menor de edad, el uso requiere
            consentimiento de tu acudiente.
          </p>
        </Section>

        <Section title="2. Cuenta">
          <p>
            Eres responsable de la información que subes y de la actividad en tu cuenta. Mantén tu
            contraseña segura. Notifícanos si crees que tu cuenta fue comprometida.
          </p>
        </Section>

        <Section title="3. Conducta">
          <p>
            No uses 4 PLAY para acoso, suplantación, contenido ilegal o actividades fraudulentas.
            Reportes son revisados en menos de 24 horas y pueden derivar en suspensión.
          </p>
        </Section>

        <Section title="4. Membresía">
          <p>
            La suscripción 4 PLAY+ tiene un precio mensual en COP. Puedes cancelar en cualquier
            momento; el acceso continúa hasta el fin del periodo facturado.
          </p>
        </Section>

        <Section title="5. Reservas">
          <p>
            Las reservas de cancha se pagan al club aliado vía Wompi. Las políticas de cambio o
            cancelación dependen de cada club. 4 PLAY no es responsable de la disponibilidad ni del
            servicio prestado por el club.
          </p>
        </Section>

        <Section title="6. Limitación de responsabilidad">
          <p>
            4 PLAY se entrega &quot;tal cual&quot;. No garantizamos que la app esté libre de
            errores.
          </p>
        </Section>

        <Section title="7. Cambios">
          <p>
            Podemos actualizar estos términos. Te avisaremos por correo o en la app cuando haya
            cambios materiales.
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
