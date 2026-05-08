// 4 PLAY · push-fanout edge function
//
// Triggered by a Postgres webhook on INSERT into `messages` or `matches`.
// Reads the recipient's push tokens and pings the Expo Push API.
//
// Deploy:  supabase functions deploy push-fanout
// Secrets: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (Supabase manages those
//          inside the project; nothing else is required).
//
// Wire the Postgres webhook (Database > Webhooks) to call this function on
// INSERT for `public.messages` and `public.matches`.

// @ts-expect-error Deno-only ESM imports — type-checked by `deno check` at deploy time.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.10';

declare const Deno: { env: { get(name: string): string | undefined }; serve: (handler: (req: Request) => Promise<Response>) => void };

type WebhookPayload = {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: 'messages' | 'matches' | string;
  record: Record<string, unknown>;
};

type ExpoPushMessage = {
  to: string;
  title?: string;
  body?: string;
  data?: Record<string, unknown>;
  sound?: 'default';
  channelId?: string;
};

const EXPO_API = 'https://exp.host/--/api/v2/push/send';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response('method_not_allowed', { status: 405 });
  }

  let payload: WebhookPayload;
  try {
    payload = (await req.json()) as WebhookPayload;
  } catch {
    return new Response('invalid_json', { status: 400 });
  }

  if (payload.type !== 'INSERT') {
    return new Response('ignored', { status: 200 });
  }

  const messages: ExpoPushMessage[] = [];

  if (payload.table === 'messages') {
    const m = payload.record as {
      conversation_id: string;
      sender_id: string;
      body: string;
    };
    const { data: convo } = await supabase
      .from('conversations')
      .select('match:matches(profile_a, profile_b)')
      .eq('id', m.conversation_id)
      .maybeSingle();
    const match = (convo as { match?: { profile_a: string; profile_b: string } } | null)?.match;
    if (match) {
      const recipientId = match.profile_a === m.sender_id ? match.profile_b : match.profile_a;
      const tokens = await loadTokens(recipientId);
      const sender = await loadDisplayName(m.sender_id);
      for (const t of tokens) {
        messages.push({
          to: t,
          title: sender ?? 'Nuevo mensaje',
          body: m.body.slice(0, 140),
          sound: 'default',
          channelId: 'default',
          data: { kind: 'message', conversation_id: m.conversation_id },
        });
      }
    }
  } else if (payload.table === 'matches') {
    const m = payload.record as { id: string; profile_a: string; profile_b: string; sport: string };
    const conversationId = await lookupConversationId(m.id);
    for (const userId of [m.profile_a, m.profile_b]) {
      const tokens = await loadTokens(userId);
      const partnerId = userId === m.profile_a ? m.profile_b : m.profile_a;
      const partner = await loadDisplayName(partnerId);
      for (const t of tokens) {
        messages.push({
          to: t,
          title: '¡Match!',
          body: partner ? `Conectaste con ${partner}.` : 'Tienes un nuevo match.',
          sound: 'default',
          channelId: 'default',
          data: { kind: 'match', conversation_id: conversationId, match_id: m.id },
        });
      }
    }
  } else {
    return new Response('ignored', { status: 200 });
  }

  if (messages.length === 0) {
    return new Response(JSON.stringify({ ok: true, sent: 0 }), {
      headers: { 'content-type': 'application/json' },
    });
  }

  // Expo accepts arrays up to 100 messages per call.
  const chunks: ExpoPushMessage[][] = [];
  for (let i = 0; i < messages.length; i += 100) chunks.push(messages.slice(i, i + 100));

  const results: unknown[] = [];
  for (const chunk of chunks) {
    const resp = await fetch(EXPO_API, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate',
      },
      body: JSON.stringify(chunk),
    });
    results.push(await resp.json());
  }

  return new Response(JSON.stringify({ ok: true, sent: messages.length, results }), {
    headers: { 'content-type': 'application/json' },
  });
});

async function loadTokens(profileId: string): Promise<string[]> {
  const { data } = await supabase
    .from('push_tokens')
    .select('token')
    .eq('profile_id', profileId);
  return (data ?? []).map((r) => r.token);
}

async function loadDisplayName(profileId: string): Promise<string | null> {
  const { data } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', profileId)
    .maybeSingle();
  return data?.full_name ?? null;
}

async function lookupConversationId(matchId: string): Promise<string | null> {
  const { data } = await supabase
    .from('conversations')
    .select('id')
    .eq('match_id', matchId)
    .maybeSingle();
  return data?.id ?? null;
}
