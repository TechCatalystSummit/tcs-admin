# TCS Admin

Web admin dashboard for **TechCatalyst Summit** — manage members, events, sponsors, outreach, and more.

Phase 1 UI is complete. Phase 2 API integration connects to **tcs-api** (`http://localhost:4000`) via Supabase JWT auth.

## Stack (Phase 2 additions)

| Layer | Package |
|---|---|
| Server state | `@tanstack/react-query` |
| Auth | `@supabase/supabase-js` |
| Tests | `vitest`, `msw`, `@playwright/test` |

## Stack

| Layer | Package |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand + immer |
| Tables | TanStack Table v8 |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| UI | Radix primitives + custom TCS design system |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/dashboard`. Sign in at `/login` (Phase 1: any email works).

## Commands

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
npx tsc --noEmit # type check
```

## Architecture

```
app/        → App Router pages (thin wrappers)
features/   → Domain logic by module (12 admin modules)
shared/     → Reusable components, hooks, utils
core/       → Design tokens, constants
```

**Dependency rule:** `features/* → shared/* → core/*` — features never import from each other.

Each feature contains `pages/`, `components/`, `store/`, `data/mock*.ts`, and `types.ts`.

## Modules

`auth` · `dashboard` · `members` · `events` · `intros` · `dinners` · `sponsors` · `qr` · `payments` · `notifications` · `outreach` · `analytics`

## Design

Branding matches the [Summit-App](https://github.com/Diallo222/Summit-App) mobile client — DM Sans, TCS color tokens, and logo from `public/logo.png`.

Full build spec: `docs/TCS_Web_Admin_Build_Plan.md`  
Sprint tracker: `docs/IMPLEMENTATION_PLAN.md`

## Phase 2 (API integrated)

- tcs-api REST at `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`)
- Supabase email/password auth for admins
- Deferred modules (notifications, outreach, analytics) show `MockDataBanner` until tcs-api sprints S16–S20

See `docs/IMPLEMENTATION_PLAN.md` § Phase 2 and `docs/PHASE2_VALIDATION.md`.
