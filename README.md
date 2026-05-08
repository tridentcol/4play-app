# 4 PLAY

Red social vertical para tenis y pádel — Cartagena primero, Colombia después.

Monorepo (pnpm + Turborepo):

- `apps/mobile` — Expo (React Native) — _por crear en Step 5_
- `apps/web` — Next.js 15 — _por crear en Step 4_
- `packages/ui` — design tokens, brand y componentes compartidos
- `packages/core` — schemas Zod, lógica pura compartida
- `packages/db` — tipos Supabase + queries reutilizables
- `packages/config` — base TypeScript + Biome

## Requisitos

- Node.js 20+ (recomendado 20 LTS o 24)
- pnpm 9 (vía corepack: `corepack pnpm <cmd>`)

## Comandos

```bash
corepack pnpm install
corepack pnpm dev        # turbo run dev en todos los workspaces
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm format
```

Ver `BLUEPRINT.md` para el plan completo y `docs/` (a partir del Step 14) para deployment.
