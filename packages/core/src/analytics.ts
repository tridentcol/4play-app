/**
 * Cross-platform analytics + error tracking facade.
 *
 * The implementation defaults to a no-op + console.log so the app keeps
 * working before Sentry/PostHog credentials are configured. The web app
 * (Next.js) and mobile app (Expo) each call `installAnalytics({...})`
 * with their own platform-specific clients on boot.
 *
 * Event taxonomy (BLUEPRINT 14.2):
 *   signup_completed, swipe, match_created, message_sent, booking_started,
 *   booking_confirmed, paywall_viewed, subscription_activated.
 */

export type AnalyticsEvent =
  | 'signup_completed'
  | 'swipe'
  | 'match_created'
  | 'message_sent'
  | 'booking_started'
  | 'booking_confirmed'
  | 'paywall_viewed'
  | 'subscription_activated';

export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

export type AnalyticsClient = {
  capture: (event: AnalyticsEvent, props?: AnalyticsProps) => void;
  identify: (userId: string, traits?: AnalyticsProps) => void;
  reset: () => void;
};

export type ErrorClient = {
  captureException: (error: unknown, context?: AnalyticsProps) => void;
  captureMessage: (msg: string, context?: AnalyticsProps) => void;
};

const noopAnalytics: AnalyticsClient = {
  capture: (event, props) => {
    if (typeof console !== 'undefined') {
      console.debug(`[analytics] ${event}`, props ?? {});
    }
  },
  identify: () => {},
  reset: () => {},
};

const noopErrors: ErrorClient = {
  captureException: (error) => {
    if (typeof console !== 'undefined') console.error('[error]', error);
  },
  captureMessage: (msg) => {
    if (typeof console !== 'undefined') console.warn('[message]', msg);
  },
};

let activeAnalytics: AnalyticsClient = noopAnalytics;
let activeErrors: ErrorClient = noopErrors;

export function installAnalytics(client: AnalyticsClient) {
  activeAnalytics = client;
}

export function installErrors(client: ErrorClient) {
  activeErrors = client;
}

export const track = (event: AnalyticsEvent, props?: AnalyticsProps) =>
  activeAnalytics.capture(event, props);

export const identify = (userId: string, traits?: AnalyticsProps) =>
  activeAnalytics.identify(userId, traits);

export const resetAnalytics = () => activeAnalytics.reset();

export const captureException = (error: unknown, context?: AnalyticsProps) =>
  activeErrors.captureException(error, context);

export const captureMessage = (msg: string, context?: AnalyticsProps) =>
  activeErrors.captureMessage(msg, context);
