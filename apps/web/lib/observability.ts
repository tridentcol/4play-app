import { installAnalytics, installErrors } from '@4play/core';

/**
 * Web-side analytics + error tracking. Runs once on the client, gated
 * by env vars so the integrations only kick in once provisioned.
 *
 * Required env (apps/web/.env.local):
 *   NEXT_PUBLIC_SENTRY_DSN
 *   NEXT_PUBLIC_POSTHOG_KEY
 *   NEXT_PUBLIC_POSTHOG_HOST   (defaults to https://app.posthog.com)
 *
 * Install when ready:
 *   pnpm -F @4play/web add @sentry/nextjs posthog-js
 */

type SentryLike = {
  init: (options: { dsn: string; tracesSampleRate?: number }) => void;
  captureException: (e: unknown, hint?: { extra?: Record<string, unknown> }) => void;
  captureMessage: (m: string, hint?: { extra?: Record<string, unknown> }) => void;
};

type PosthogLike = {
  default: {
    init: (key: string, opts: { api_host: string; capture_pageview: string }) => void;
    capture: (event: string, props?: Record<string, unknown>) => void;
    identify: (userId: string, traits?: Record<string, unknown>) => void;
    reset: () => void;
  };
};

async function tryImport<T>(name: string): Promise<T | null> {
  try {
    return (await import(/* webpackIgnore: true */ /* @vite-ignore */ name)) as T;
  } catch {
    return null;
  }
}

export async function initWebObservability() {
  if (typeof window === 'undefined') return;

  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';

  if (sentryDsn) {
    const Sentry = await tryImport<SentryLike>('@sentry/nextjs');
    if (Sentry) {
      Sentry.init({ dsn: sentryDsn, tracesSampleRate: 0.2 });
      installErrors({
        captureException: (e, ctx) => Sentry.captureException(e, { extra: ctx }),
        captureMessage: (m, ctx) => Sentry.captureMessage(m, { extra: ctx }),
      });
    }
  }

  if (posthogKey) {
    const mod = await tryImport<PosthogLike>('posthog-js');
    if (mod) {
      mod.default.init(posthogKey, {
        api_host: posthogHost,
        capture_pageview: 'history_change',
      });
      installAnalytics({
        capture: (event, props) =>
          mod.default.capture(event, props as Record<string, unknown> | undefined),
        identify: (userId, traits) =>
          mod.default.identify(userId, traits as Record<string, unknown> | undefined),
        reset: () => mod.default.reset(),
      });
    }
  }
}
