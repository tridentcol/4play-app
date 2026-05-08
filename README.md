# 4 PLAY

Red social vertical para tenis y pádel — Cartagena primero, Colombia después.
Matchmaking estilo swipe, DM en tiempo real, reservas de cancha y membresía
4 PLAY+ a $20.000 COP/mes.

## Stack

- Turborepo + pnpm workspaces
- **Web:** Next.js 15 + React 18 + Tailwind 3 + `@supabase/ssr`
- **Mobile:** Expo SDK 54 + Expo Router + NativeWind 4 + `@supabase/supabase-js`
- **Backend:** Supabase (Postgres + PostGIS + Realtime + Auth + Storage + Edge
  Functions)
- **Pagos:** Wompi (sandbox/prod)
- **Notificaciones:** Expo Push + Resend (transaccionales)
- **Observabilidad:** Sentry + PostHog (gated por env vars)

## Layout

- `apps/web` — landing, auth, checkout, legal, `/dev/design-check`
- `apps/mobile` — onboarding, tabs, swipe, chat, bookings, paywall
- `packages/ui` — tokens + LogoMark + Logo + 14 iconos data-driven (web + RN)
- `packages/core` — zod schemas, analytics facade, microcopy, types
- `packages/db` — `Database` regenerada de Supabase
- `packages/config` — `tsconfig.base` + `biome.json` compartidos
- `supabase/migrations` — schema versionado
- `supabase/functions` — `push-fanout`, `send-email`
- `design/` — mockups React verbatim (fuente de verdad visual)
- `docs/DESIGN-AUDIT.md` — gate visual antes de submission
- `docs/LAUNCH.md` — playbook App Store / Play
- `DEPLOY.md` — runbook Vercel / EAS / Supabase / Wompi

## Requisitos

- Node.js 20+
- pnpm 9 (`npm i -g pnpm@9.15.0`)

## Setup

```bash
pnpm install
cp .env.example .env             # rellena las claves listadas en DEPLOY.md
pnpm -F @4play/web dev           # http://localhost:3000
pnpm -F @4play/mobile dev        # luego `i` (iOS) o `a` (Android)
```

## Workflows

```bash
pnpm -r typecheck                # tsc --noEmit en todos los paquetes
pnpm -r lint                     # biome check
pnpm -F @4play/web build         # next build
pnpm -F @4play/mobile dev        # expo start
```

## Build order

Sigue `BLUEPRINT.md` sección 9. Los 17 steps están commiteados en orden y
verificables desde `git log --oneline`. Cualquier desviación está documentada
en el commit message correspondiente.

## Próximos pasos

1. Provisionar cuentas externas (Vercel, EAS, Apple Developer, Google Play,
   Wompi prod, Sentry, PostHog, Resend) siguiendo `DEPLOY.md`.
2. Correr el audit visual en `docs/DESIGN-AUDIT.md` con la app en simulador.
3. Submission a App Store y Play siguiendo `docs/LAUNCH.md`.
