import type { Database } from '@4play/db';
import { createBrowserClient } from '@supabase/ssr';
import { env } from '../env';

export function createClient() {
  return createBrowserClient<Database>(env.supabaseUrl, env.supabaseAnonKey);
}
