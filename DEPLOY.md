# 4 PLAY · Deploy & operations

This is the operator runbook. The codebase ships everything needed to
build & deploy — the steps below assume external accounts are
configured.

## 1. Domain

- Buy `4play.co` (or `4play.app`) and point the apex + `www` records
  at Vercel after the project is imported.

## 2. Web (Vercel)

1. Import this repo into Vercel and pick `apps/web` as the root.
   `vercel.json` already overrides the install/build commands for
   pnpm-workspace builds.
2. Set the following env vars in **Project Settings → Environment
   Variables** (Production + Preview):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `WOMPI_PUBLIC_KEY` / `WOMPI_PRIVATE_KEY` /
     `WOMPI_INTEGRITY_SECRET` / `WOMPI_EVENTS_SECRET`
   - `WOMPI_ENV` (`sandbox` for staging, `prod` for production)
   - `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_POSTHOG_KEY` (optional)
3. After the first deploy, bind `4play.co` and `www.4play.co` to the
   project.
4. Add `https://4play.co/api/wompi/webhook` to Wompi events config.

## 3. Supabase (database + edge functions)

The `.github/workflows/supabase.yml` job runs `supabase db push` and
deploys every function on each push to `main`. Required repository
secrets:

- `SUPABASE_ACCESS_TOKEN` — personal access token for the CI bot.
- `SUPABASE_PROJECT_REF` — the project ref (e.g. `pfhaviqobpdzbvzuyqdo`
  for dev).
- `SUPABASE_DB_PASSWORD` — only needed for `db push`.

Set the **function secrets** once via the dashboard or CLI:

```bash
supabase secrets set RESEND_API_KEY=... RESEND_FROM='4 PLAY <hola@4play.co>'
```

Wire the Wompi webhook & push-fanout from the Database > Webhooks UI:

- `messages` INSERT → `push-fanout`
- `matches` INSERT → `push-fanout`

## 4. Mobile (EAS Build / Submit)

1. From `apps/mobile`, run `eas init` once. Save the resulting
   `extra.eas.projectId` into `app.json`.
2. `eas.json` already defines `development`, `preview`, `production`
   profiles. Set the placeholders under `submit.production` (Apple
   ID, ASC App ID, Apple Team ID, Google service-account path).
3. Provision certificates with `eas credentials` for both platforms.
4. Set EAS env vars / secrets for the build:
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `EXPO_PUBLIC_WEB_BASE_URL`
   - `EXPO_PUBLIC_PROJECT_ID` (the EAS project id, also used for
     Expo push tokens)
   - `EXPO_PUBLIC_SENTRY_DSN`, `EXPO_PUBLIC_POSTHOG_KEY` (optional)
5. The `eas-build` GitHub Action lets a maintainer kick a build from
   the Actions tab. Provide an `EXPO_TOKEN` repo secret.
6. Submit:
   - iOS — `eas submit --platform ios`. App Store Connect needs the
     listing (5 screenshots per device, description, keywords,
     privacy URL → `https://4play.co/legal/privacy`).
   - Android — `eas submit --platform android`. Google Play Console
     needs the listing + a service account JSON.

## 5. Domain & email

- DNS for `hola@4play.co` (Resend).
- Add SPF + DKIM + DMARC entries Resend gives you.

## 6. Smoke after each release

- Web build is green on `main`.
- iOS TestFlight / Android Internal Testing get a fresh build.
- Run `supabase functions invoke push-fanout --body '{...}'` against
  staging to verify Expo push works.
- Wompi sandbox: complete a test booking + a test subscription end
  to end and confirm `payments.wompi_status` flips to APPROVED.
