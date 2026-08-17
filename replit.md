# Добро Даром (DobroDarom)

A charitable organization web platform. The project has a pre-built static frontend (`dobrodarom-site.zip`) and an Express API server scaffold ready to be extended.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port via `$PORT`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string (not yet configured)

## Stack

- pnpm workspaces, Node.js 20, TypeScript 5.9
- API: Express 5 (`artifacts/api-server`)
- DB: PostgreSQL + Drizzle ORM (`lib/db`) — schema not yet defined
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec in `lib/api-spec`)
- Build: esbuild

## Where things live

- `artifacts/dobrodarom/` — React + Vite frontend (the main site)
- `artifacts/api-server/` — Express API server (currently only a `/health` route)
- `artifacts/dobrodarom/src/components/DonateWidget.tsx` — CloudPayments floating donate button
- `artifacts/dobrodarom/src/components/DonationsFeed.tsx` — live donations list for Reports page
- `artifacts/dobrodarom/src/pages/Events.tsx` — `/events` page (VK + Telegram news feed)
- `dobrodarom-site.zip` — pre-built static site archive (legacy, not used in dev)
- `attached_assets/` — brand assets: logos (SVG), photos, PDF brand guide
- `lib/db/` — Drizzle ORM setup (no schema defined yet)
- `lib/api-spec/` — OpenAPI spec (source of truth for API contracts)
- `lib/api-zod/` — Zod schemas generated from spec
- `lib/api-client-react/` — React query hooks generated from spec

## Architecture decisions

- API-first design: OpenAPI spec in `lib/api-spec` drives codegen for both client hooks and Zod validators
- Static site and API are separate artifacts — the zip contains the current deployed static site

## Product

Добро Даром ("Goodness for Free") is a Russian charitable organization. The static site serves as the public-facing website with a hero video, program info, and contact details.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `DATABASE_URL` must be set before any DB operations or the API server will fail on startup
- The static site in `dobrodarom-site.zip` is a compiled build — the source code is not included in this repo

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
