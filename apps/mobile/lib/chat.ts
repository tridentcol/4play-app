import type { Tables } from '@4play/db';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { supabase } from './supabase';

export type Conversation = Tables<'conversations'>;
export type Message = Tables<'messages'>;
export type MatchRow = Tables<'matches'>;
export type Profile = Tables<'profiles'>;

export type ConversationListItem = {
  conversation: Conversation;
  match: MatchRow;
  other: Pick<Profile, 'id' | 'username' | 'full_name' | 'photos'>;
};

/** List of conversations the current user is part of. */
export function useConversations(userId: string | undefined) {
  return useQuery({
    queryKey: ['conversations', userId],
    enabled: !!userId,
    queryFn: async (): Promise<ConversationListItem[]> => {
      if (!userId) return [];
      // Pull conversations + matches in one shot via FK relation.
      const { data, error } = await supabase
        .from('conversations')
        .select('*, match:matches(*)')
        .order('last_message_at', { ascending: false });
      if (error) throw error;

      const items = (data ?? []) as Array<Conversation & { match: MatchRow }>;
      // Fetch the "other" profile for each match.
      const otherIds = items.map((i) =>
        i.match.profile_a === userId ? i.match.profile_b : i.match.profile_a,
      );
      const unique = Array.from(new Set(otherIds));
      const { data: profiles, error: pErr } = await supabase
        .from('profiles')
        .select('id, username, full_name, photos')
        .in('id', unique);
      if (pErr) throw pErr;
      const byId = new Map((profiles ?? []).map((p) => [p.id, p]));

      return items
        .map((row) => {
          const otherId =
            row.match.profile_a === userId ? row.match.profile_b : row.match.profile_a;
          const other = byId.get(otherId);
          if (!other) return null;
          return {
            conversation: { ...row, match: undefined } as unknown as Conversation,
            match: row.match,
            other,
          } satisfies ConversationListItem;
        })
        .filter((x): x is ConversationListItem => !!x);
    },
  });
}

/** Messages of a conversation with realtime subscription. */
export function useMessages(conversationId: string | undefined) {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ['messages', conversationId],
    enabled: !!conversationId,
    queryFn: async (): Promise<Message[]> => {
      if (!conversationId) return [];
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(200);
      if (error) throw error;
      return (data ?? []) as Message[];
    },
  });

  useEffect(() => {
    if (!conversationId) return;
    const channel = supabase
      .channel(`msgs:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const msg = payload.new as Message;
          qc.setQueryData<Message[]>(['messages', conversationId], (prev) => {
            if (!prev) return [msg];
            if (prev.some((m) => m.id === msg.id)) return prev;
            return [...prev, msg];
          });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, qc]);

  return query;
}

export function useSendMessage(conversationId: string | undefined, senderId: string | undefined) {
  return useMutation({
    mutationFn: async (body: string) => {
      if (!conversationId || !senderId) throw new Error('Sin contexto');
      const trimmed = body.trim();
      if (!trimmed) throw new Error('Mensaje vacío');
      if (trimmed.length > 2000) throw new Error('Mensaje muy largo');
      const { error } = await supabase.from('messages').insert({
        conversation_id: conversationId,
        sender_id: senderId,
        body: trimmed,
      });
      if (error) throw error;
    },
  });
}

/** Marks every unread message addressed to me in this conversation as read. */
export async function markRead(conversationId: string, userId: string) {
  await supabase
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('conversation_id', conversationId)
    .neq('sender_id', userId)
    .is('read_at', null);
}

/** Subscribes to typing + presence in a conversation. */
export function useChatPresence(conversationId: string | undefined, userId: string | undefined) {
  const [typing, setTyping] = useState(false);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (!conversationId || !userId) return;
    const channel = supabase
      .channel(`presence:${conversationId}`, { config: { presence: { key: userId } } })
      .on('broadcast', { event: 'typing' }, ({ payload }) => {
        const senderId = (payload as { user_id?: string }).user_id;
        if (senderId && senderId !== userId) {
          setTyping(true);
          setTimeout(() => setTyping(false), 2500);
        }
      })
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const others = Object.keys(state).filter((k) => k !== userId);
        setOnline(others.length > 0);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ user_id: userId });
        }
      });
    return () => {
      void channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [conversationId, userId]);

  const broadcastTyping = async () => {
    if (!conversationId || !userId) return;
    const channel = supabase.channel(`presence:${conversationId}`);
    await channel.send({ type: 'broadcast', event: 'typing', payload: { user_id: userId } });
  };

  return { typing, online, broadcastTyping };
}
