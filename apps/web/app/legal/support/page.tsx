export const metadata = { title: '4 PLAY · Soporte' };

export default function Support() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-ink">
      <div className="font-mono text-mono-s uppercase text-ash" style={{ letterSpacing: '0.14em' }}>
        SOPORTE
      </div>
      <h1
        className="mt-2 font-display font-bold"
        style={{ fontSize: 56, letterSpacing: '-0.04em' }}
      >
        ¿Cómo te ayudamos?
      </h1>

      <div className="mt-10 flex flex-col gap-6 text-body-l leading-7">
        <p>
          Escríbenos a{' '}
          <a href="mailto:hola@4play.co" className="text-court underline">
            hola@4play.co
          </a>
          . Respondemos en menos de 24 horas hábiles.
        </p>

        <Section title="Problemas con tu cuenta">
          <p>
            Si no puedes iniciar sesión o quieres recuperar tu contraseña, escríbenos desde el email
            registrado para verificar la identidad.
          </p>
        </Section>

        <Section title="Pagos y reservas">
          <p>
            Para reembolsos o problemas con un pago, indícanos el número de transacción Wompi (lo
            ves en el correo de confirmación) y la fecha. Wompi procesa los reembolsos en 10 días
            hábiles.
          </p>
        </Section>

        <Section title="Reportes urgentes">
          <p>
            Si presenciaste comportamiento abusivo o ilegal, repórtalo desde la app (perfil → menú →
            Reportar). Para emergencias contacta a las autoridades locales.
          </p>
        </Section>

        <Section title="Eliminar mi cuenta">
          <p>
            Envíanos un correo desde el email registrado con el asunto{' '}
            <strong>&quot;Eliminar mi cuenta&quot;</strong>. La baja es definitiva — todos los datos
            se borran a los 30 días, plazo durante el cual puedes deshacer la operación.
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
