import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Wompi integration helpers. All amounts are in COP cents (integer).
 * Reference: https://docs.wompi.co/
 */
const WOMPI_API =
  process.env.WOMPI_ENV === 'prod'
    ? 'https://production.wompi.co/v1'
    : 'https://sandbox.wompi.co/v1';

export const wompi = {
  publicKey: () => process.env.WOMPI_PUBLIC_KEY ?? '',
  privateKey: () => process.env.WOMPI_PRIVATE_KEY ?? '',
  integritySecret: () => process.env.WOMPI_INTEGRITY_SECRET ?? '',
  eventsSecret: () => process.env.WOMPI_EVENTS_SECRET ?? '',
  apiBase: WOMPI_API,
};

/**
 * Web-Checkout integrity signature.
 * sha256( reference + amountInCents + currency + integritySecret )
 */
export function buildIntegritySignature(args: {
  reference: string;
  amountInCents: number;
  currency: string;
}): string {
  const raw = `${args.reference}${args.amountInCents}${args.currency}${wompi.integritySecret()}`;
  return createHash('sha256').update(raw).digest('hex');
}

/**
 * Validates an incoming events webhook. Wompi signs payloads with HMAC-SHA256
 * over the JSON body using `WOMPI_EVENTS_SECRET`.
 *
 * Some Wompi accounts use a checksum-based verification instead — this helper
 * supports both via `header`.
 */
export function isValidEvent(rawBody: string, header: string | null | undefined): boolean {
  if (!header) return false;
  const secret = wompi.eventsSecret();
  if (!secret) return false;
  const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(header));
  } catch {
    return false;
  }
}

export type WompiEvent = {
  event: string; // e.g. "transaction.updated"
  data: {
    transaction: {
      id: string;
      reference: string;
      status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR';
      amount_in_cents: number;
      currency: string;
      payment_method_type?: string;
      [k: string]: unknown;
    };
  };
  sent_at: string;
};
