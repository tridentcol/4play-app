import { installAnalytics, installErrors } from '@4play/core';

/**
 * Web observability bootstrap. Stays a no-op until the SDKs are
 * installed AND their env vars are set.
 *
 * To enable Sentry:
 *   1. pnpm -F @4play/web add @sentry/nextjs
 *   2. set NEXT_PUBLIC_SENTRY_DSN in apps/web/.env.local
 *   3. uncomment the Sentry block below.
 *
 * To enable PostHog:
 *   1. pnpm -F @4play/web add posthog-js
 *   2. set NEXT_PUBLIC_POSTHOG_KEY in apps/web/.env.local
 *   3. uncomment the PostHog block below.
 */
export async function initWebObservability() {
  if (typeof window === 'undefined') return;
  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

  // --- Sentry (uncomment after installing @sentry/nextjs) ---------------
  // if (sentryDsn) {
  //   const Sentry = require('@sentry/nextjs');
  //   Sentry.init({ dsn: sentryDsn, tracesSampleRate: 0.2 });
  //   installErrors({
  //     captureException: (e, ctx) => Sentry.captureException(e, { extra: ctx }),
  //     captureMessage: (m, ctx) => Sentry.captureMessage(m, { extra: ctx }),
  //   });
  // }

  // --- PostHog (uncomment after installing posthog-js) ------------------
  // if (posthogKey) {
  //   const ph = require('posthog-js').default;
  //   const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';
  //   ph.init(posthogKey, { api_host: host, capture_pageview: 'history_change' });
  //   installAnalytics({
  //     capture: (event, props) => ph.capture(event, props),
  //     identify: (userId, traits) => ph.identify(userId, traits),
  //     reset: () => ph.reset(),
  //   });
  // }

  if ((sentryDsn || posthogKey) && process.env.NODE_ENV !== 'production') {
    console.warn(
      '[observability] DSN/key present but SDK not wired yet — see lib/observability.ts.',
    );
  }
  void installAnalytics;
  void installErrors;
}
