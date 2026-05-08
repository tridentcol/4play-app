import type { Tables } from '@4play/db';
import { useQuery } from '@tanstack/react-query';
import { useAuthState } from './auth';
import { supabase } from './supabase';

export type Profile = Tables<'profiles'>;
export type PlayerSport = Tables<'player_sports'>;

export type ProfileBundle = {
  profile: Profile;
  sports: PlayerSport[];
};

export function useProfile(profileId?: string) {
  const auth = useAuthState();
  const id = profileId ?? (auth.status === 'authenticated' ? auth.session.user.id : undefined);

  return useQuery({
    queryKey: ['profile', id],
    enabled: !!id,
    queryFn: async (): Promise<ProfileBundle | null> => {
      if (!id) return null;
      const [profileResp, sportsResp] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', id).maybeSingle(),
        supabase.from('player_sports').select('*').eq('profile_id', id),
      ]);
      if (profileResp.error) throw profileResp.error;
      if (sportsResp.error) throw sportsResp.error;
      if (!profileResp.data) return null;
      return { profile: profileResp.data, sports: sportsResp.data ?? [] };
    },
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}
