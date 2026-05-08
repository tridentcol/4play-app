// 4 PLAY · transactional email edge function
//
// Wraps Resend (https://resend.com) so other edge functions and the
// Wompi webhook can send "booking confirmed" / "payment received"
// emails without baking the API key into client code.
//
// Deploy: supabase functions deploy send-email
// Secrets: RESEND_API_KEY, RESEND_FROM (e.g. "4 PLAY <hola@4play.co>")

declare const Deno: { env: { get(name: string): string | undefined }; serve: (h: (req: Request) => Promise<Response>) => void };

type Payload = {
  to: string | string[];
  subject: string;
  // Either html or text — at least one required.
  html?: string;
  text?: string;
  reply_to?: string;
  tags?: { name: string; value: string }[];
};

const RESEND_API = 'https://api.resend.com/emails';

Deno.serve(async (req: Request) => {
  if (req.method !== 'POST') return new Response('method_not_allowed', { status: 405 });

  const apiKey = Deno.env.get('RESEND_API_KEY');
  const from = Deno.env.get('RESEND_FROM') ?? '4 PLAY <hola@4play.co>';
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'resend_not_configured' }), {
      status: 503,
      headers: { 'content-type': 'application/json' },
    });
  }

  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return new Response('invalid_json', { status: 400 });
  }

  if (!payload.to || !payload.subject || (!payload.html && !payload.text)) {
    return new Response('missing_fields', { status: 400 });
  }

  const resp = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
      reply_to: payload.reply_to,
      tags: payload.tags,
    }),
  });

  const body = await resp.text();
  return new Response(body, {
    status: resp.status,
    headers: { 'content-type': 'application/json' },
  });
});
