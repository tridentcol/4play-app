import type { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export type AuthState =
  | { status: 'loading' }
  | { status: 'authenticated'; session: Session }
  | { status: 'unauthenticated' };

export function useAuthState(): AuthState {
  const [state, setState] = useState<AuthState>({ status: 'loading' });

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setState(
        data.session
          ? { status: 'authenticated', session: data.session }
          : { status: 'unauthenticated' },
      );
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setState(session ? { status: 'authenticated', session } : { status: 'unauthenticated' });
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return state;
}
