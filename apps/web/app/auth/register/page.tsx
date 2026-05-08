'use client';

import { createClient } from '@/lib/supabase/client';
import { colors } from '@4play/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    const { data, error: err } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    if (!data.session) {
      setInfo('Te enviamos un correo para confirmar tu cuenta.');
      return;
    }
    router.push('/');
    router.refresh();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6">
      <div className="w-full">
        <div
          className="font-mono text-mono-m uppercase text-court"
          style={{ letterSpacing: '0.14em' }}
        >
          CREAR PERFIL
        </div>
        <h1
          className="mt-2 font-display font-bold text-ink"
          style={{ fontSize: 40, letterSpacing: '-0.03em' }}
        >
          Empezamos.
        </h1>
        <p className="mt-2 text-body-s text-ash">Tu email y una contraseña para entrar.</p>

        <form className="mt-8 flex flex-col gap-4" onSubmit={onSubmit}>
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="tu@email.co"
            required
          />
          <Field
            label="Contraseña"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="mínimo 8 caracteres"
            minLength={8}
            required
          />
          {error && (
            <div className="rounded-card bg-coral/10 px-3 py-2 text-body-s text-coral">{error}</div>
          )}
          {info && (
            <div className="rounded-card bg-court/10 px-3 py-2 text-body-s text-court">{info}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-pill bg-lime py-4 text-body-l font-semibold text-ink disabled:opacity-50"
          >
            {loading ? 'Creando…' : 'Crear cuenta'}
          </button>
        </form>

        <div className="mt-6 flex justify-center gap-1 text-body-s">
          <span className="text-ash">¿Ya tienes cuenta?</span>
          <a href="/auth/login" className="font-semibold" style={{ color: colors.court }}>
            Iniciar sesión
          </a>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  ...props
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-mono-s uppercase text-ash">{label}</span>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-card border border-line bg-bone px-4 py-3.5 text-body-l text-ink focus:border-court focus:outline-none"
      />
    </label>
  );
}
