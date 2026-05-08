# 4 PLAY · Launch playbook (Step 17)

This is the operator playbook for the public release. All code is
already shipped — what remains is store review, comms, and turning
on the analytics cohort.

## 0. Pre-flight (block submission until all yes)

- [ ] `pnpm -r typecheck && pnpm -r lint` clean on `main`.
- [ ] `next build` of `apps/web` green.
- [ ] `eas build --profile production --platform all` produced ipa +
      aab artifacts.
- [ ] Supabase prod project created (NOT dev `pfhaviqobpdzbvzuyqdo`),
      migrations applied via `supabase db push`, all 7 advisors-clean.
- [ ] Wompi prod credentials live (`WOMPI_ENV=prod`), webhook URL
      registered, sandbox parity test re-run on staging.
- [ ] `docs/DESIGN-AUDIT.md` rows all marked **pass**.

## 1. Apple App Store

1. App Store Connect → My Apps → New App.
   - Bundle ID: `co.fourplay.app`.
   - SKU: `4play-ios-001`.
   - Primary language: Spanish (Mexico) — closest to es-CO offered
     in App Store.
2. Listing assets:
   - Name: `4 PLAY`.
   - Subtitle: `Tenis y pádel en Cartagena`.
   - 5 screenshots per device (6.7" iPhone + 6.1" iPhone). Capture from
     onboarding, swipe, profile, chat, paywall.
   - Description (es): adapt from `apps/web/app/(marketing)/page.tsx`
     hero + how-it-works + pricing.
   - Keywords: `tenis, padel, cartagena, match, cancha, deporte,
     reserva, jugadores, comunidad`.
   - Support URL: `https://4play.co/legal/support` (TODO add page).
   - Privacy policy URL: `https://4play.co/legal/privacy` ✅.
3. App privacy labels: contact info (email), identifiers (user ID),
   usage data (analytics), location (precise — for matchmaking).
4. Age rating: 17+ (social interactions, user-generated content).
5. `eas submit --platform ios --profile production`.
6. Submit for review. Apple review SLA: 24-72 hours.

## 2. Google Play

1. Play Console → Create app.
   - Default language: Spanish (Latin America).
   - App or game: App.
   - Free / paid: Free with in-app purchases (subscription).
2. Listing assets:
   - Title: `4 PLAY · Tenis y pádel`.
   - Short description (80 chars): `Encuentra rivales de tenis y pádel
     en Cartagena. Match y agenda canchas.`
   - Long description: same source as App Store.
   - Hi-res icon: 512×512 (export from `assets/images/icon.png`).
   - Feature graphic: 1024×500 (build from logo + court bg).
   - 8 screenshots (phone) + tablet recommended.
3. Content rating questionnaire → Teen.
4. Data safety form: matches App Store privacy labels.
5. `eas submit --platform android --profile production`.
6. Roll out to **Internal testing** first (20-30 testers from the
   beta cohort). After 7 days clean, promote to **Production**.
   Google review SLA: hours-days.

## 3. Comms

- [ ] Email to clubes aliados (Club Cartagena, Karibana, Las Velas,
      Hotel Las Américas). Include link, screenshots, contact for
      partner-only support.
- [ ] WhatsApp broadcast to TestFlight cohort: app is live + ask for
      App Store rating.
- [ ] Instagram post: launch hero (animated logo + court lines).

## 4. Analytics turn-on

- [ ] PostHog: create cohort `installed-2026-W19` and dashboard
      tracking `signup_completed → match_created → message_sent →
      booking_started → subscription_activated` funnel.
- [ ] Sentry: alerts on >1% session crash rate.
- [ ] Wompi dashboard: weekly reconciliation.

## 5. Post-launch monitoring (first 14 days)

| Day | Check |
|-----|-------|
| +1  | Crash-free sessions ≥ 99% |
| +1  | Push delivery success ≥ 95% |
| +3  | Funnel conversion: signup → swipe ≥ 50% |
| +7  | Funnel conversion: swipe → match ≥ 8% |
| +7  | First reservas confirmadas (≥10) |
| +14 | Cohort retention D1 ≥ 60%, D7 ≥ 30% |

If any threshold misses by more than 30%, freeze the rollout to 50%
on Play and investigate before resuming 100%.

## Done

When the last row above passes 14-day retention, archive this file
and write `docs/POSTMORTEM-LAUNCH.md`.
