import { installAnalytics, installErrors } from '@4play/core';

/**
 * Wires Sentry + PostHog into the @4play/core analytics facade. Falls
 * back to the default no-op when env vars are missing, so the app
 * keeps shipping events to console while the integrations are still
 * being provisioned.
 *
 * To enable, set these in apps/mobile/.env:
 *   EXPO_PUBLIC_SENTRY_DSN
 *   EXPO_PUBLIC_POSTHOG_KEY
 *   EXPO_PUBLIC_POSTHOG_HOST   (defaults to https://app.posthog.com)
 *
 * Then install the SDKs:
 *   pnpm -F @4play/mobile add @sentry/react-native posthog-react-native
 *
 * Both are kept out of the workspace by default to avoid pulling
 * native modules before the user wants telemetry on.
 */

type SentryLike = {
  init: (options: { dsn: string; tracesSampleRate?: number }) => void;
  captureException: (e: unknown, hint?: { extra?: Record<string, unknown> }) => void;
  captureMessage: (m: string, hint?: { extra?: Record<string, unknown> }) => void;
};

type PosthogLike = {
  capture: (event: string, props?: Record<string, unknown>) => void;
  identify: (userId: string, traits?: Record<string, unknown>) => void;
  reset: () => void;
};

async function tryImport<T>(name: string): Promise<T | null> {
  try {
    return (await import(/* @vite-ignore */ name)) as T;
  } catch {
    return null;
  }
}

export async function initObservability() {
  const sentryDsn = process.env.EXPO_PUBLIC_SENTRY_DSN;
  const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';

  if (sentryDsn) {
    const Sentry = await tryImport<SentryLike>('@sentry/react-native');
    if (Sentry) {
      Sentry.init({ dsn: sentryDsn, tracesSampleRate: 0.2 });
      installErrors({
        captureException: (e, ctx) => Sentry.captureException(e, { extra: ctx }),
        captureMessage: (m, ctx) => Sentry.captureMessage(m, { extra: ctx }),
      });
    }
  }

  if (posthogKey) {
    const mod = await tryImport<{
      PostHog: new (key: string, opts: { host: string }) => PosthogLike;
    }>('posthog-react-native');
    if (mod) {
      const client = new mod.PostHog(posthogKey, { host: posthogHost });
      installAnalytics({
        capture: (event, props) =>
          client.capture(event, props as Record<string, unknown> | undefined),
        identify: (userId, traits) =>
          client.identify(userId, traits as Record<string, unknown> | undefined),
        reset: () => client.reset(),
      });
    }
  }
}
