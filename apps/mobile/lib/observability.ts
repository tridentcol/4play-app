import { installAnalytics, installErrors } from '@4play/core';

/**
 * Mobile observability bootstrap. Stays a no-op until the SDKs are
 * installed AND their env vars are set.
 *
 * Metro disallows `import(name)` with a variable, so we don't try to
 * lazy-load the SDKs from this file. When you install them, this is the
 * single place to wire them — no other change elsewhere needed.
 *
 * To enable Sentry:
 *   1. pnpm -F @4play/mobile add @sentry/react-native
 *   2. set EXPO_PUBLIC_SENTRY_DSN in apps/mobile/.env
 *   3. uncomment the Sentry block below.
 *
 * To enable PostHog:
 *   1. pnpm -F @4play/mobile add posthog-react-native
 *   2. set EXPO_PUBLIC_POSTHOG_KEY in apps/mobile/.env
 *   3. uncomment the PostHog block below.
 */
export async function initObservability() {
  const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
  const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;

  // --- Sentry (uncomment after installing @sentry/react-native) ---------
  // if (sentryDsn) {
  //   const Sentry = require('@sentry/react-native');
  //   Sentry.init({ dsn: sentryDsn, tracesSampleRate: 0.2 });
  //   installErrors({
  //     captureException: (e, ctx) => Sentry.captureException(e, { extra: ctx }),
  //     captureMessage: (m, ctx) => Sentry.captureMessage(m, { extra: ctx }),
  //   });
  // }

  // --- PostHog (uncomment after installing posthog-react-native) --------
  // if (posthogKey) {
  //   const { PostHog } = require('posthog-react-native');
  //   const host = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';
  //   const client = new PostHog(posthogKey, { host });
  //   installAnalytics({
  //     capture: (event, props) => client.capture(event, props),
  //     identify: (userId, traits) => client.identify(userId, traits),
  //     reset: () => client.reset(),
  //   });
  // }

  if ((sentryDsn || posthogKey) && __DEV__) {
    console.warn(
      '[observability] DSN/key present but SDK not wired yet — see lib/observability.ts.',
    );
  }
  void installAnalytics;
  void installErrors;
}
