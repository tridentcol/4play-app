/**
 * Reads NEXT_PUBLIC_* env vars by their literal name so Next.js can
 * inline them into client bundles. `process.env[dynamic]` does NOT
 * get replaced at build time — keep the access static.
 */
function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing env var ${name}`);
  return value;
}

export const env = {
  supabaseUrl: required('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
  supabaseAnonKey: required(
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
} as const;
