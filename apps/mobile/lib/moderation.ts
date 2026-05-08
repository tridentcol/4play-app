import { supabase } from './supabase';

export async function blockUser(blockerId: string, blockedId: string, reason?: string) {
  const { error } = await supabase
    .from('blocks')
    .insert({ blocker_id: blockerId, blocked_id: blockedId, reason: reason ?? null });
  if (error && !error.message.includes('duplicate')) throw error;
}

export async function unblockUser(blockerId: string, blockedId: string) {
  const { error } = await supabase
    .from('blocks')
    .delete()
    .eq('blocker_id', blockerId)
    .eq('blocked_id', blockedId);
  if (error) throw error;
}

export async function pauseAccount(userId: string) {
  const { error } = await supabase.from('profiles').update({ is_active: false }).eq('id', userId);
  if (error) throw error;
}

export async function resumeAccount(userId: string) {
  const { error } = await supabase.from('profiles').update({ is_active: true }).eq('id', userId);
  if (error) throw error;
}
