# Phase 2 — Validation Checklists

Track manual validation per integration phase. Mark items `[x]` when verified.

## Phase 0 — Infrastructure

- [ ] `curl localhost:4000/health` returns `{ "status": "ok" }`
- [ ] Login with `admin1@tcs.dev` / `TcsDev2026!` → dashboard
- [ ] Wrong password shows error
- [ ] Member login (`member1@tcs.dev`) rejected (non-admin)
- [ ] `npx tsc --noEmit && npm run lint && npm run build`
- [ ] `npm test`

## Phase 1 — Members

- [ ] Members table loads paginated API data
- [ ] Approve/decline on approvals page persists
- [ ] Member detail loads from API
- [ ] Edit member modal saves via PATCH
- [ ] E2E: approve pending member

## Phase 2 — Events

- [ ] Events list from `/api/events/admin`
- [ ] Create event form works
- [ ] Event detail shows attendees
- [ ] E2E: create event appears in list

## Phase 3 — Intros

- [ ] Intros table shows API data
- [ ] Approve/decline modals work
- [ ] E2E: approve intro

## Phase 4 — Dinners + Sponsors

- [ ] Dinners credit adjustment works
- [ ] Sponsor CRUD on list + detail

## Phase 5 — QR + Payments

- [ ] Generate QR via API
- [ ] Payments table loads admin data

## Phase 6 — Dashboard

- [ ] KPI counts match module pages
- [ ] Admin notes on member detail

## Phase 7 — Deferred

- [ ] MockDataBanner visible on notifications, outreach, analytics
- [ ] `docs/PHASE2_DEFERRED.md` documents missing endpoints

## Phase 2b — Partial wiring

- [ ] Event detail loads attendees from `GET /api/events/:id/attendees`
- [ ] Event status PATCH and DELETE work on detail page
- [ ] Sponsor create/edit/deactivate modals wired
- [ ] Dashboard charts derive from payments + members; activity from outcomes
- [ ] Analytics outcome log from `GET /api/outcomes`
- [ ] Tier pricing from `GET /api/membership/tiers`
- [ ] Dinner credit adjust via `POST /api/dinners/credits` (ledger remains illustrative)

## Phase 2 QA — Loading, error, and success hardening

### Shared infrastructure

- [x] Global `401` → sign out, clear cache, redirect `/login`
- [x] Global `403` → forbidden toast
- [x] `QueryErrorState` + `QueryBoundary` reusable components
- [x] `handleApiError` / `showMutationError` wired in query client

### List pages (error + empty + retry)

| Page | Loading | Error + retry | Empty state |
|------|---------|---------------|-------------|
| Members | [x] | [x] | [x] |
| Approvals | [x] | [x] | [x] |
| Events | [x] | [x] | [x] |
| Intros | [x] | [x] | [x] |
| Dinners | [x] | [x] | [x] |
| Sponsors | [x] | [x] | [x] |
| QR codes | [x] | [x] | [x] |
| Payments | [x] | [x] | [x] |

### Detail / modals

- [x] Event detail: fetch error vs not-found; attendee error banner
- [x] Member profile panel / sheet: error vs not-found
- [x] Sponsor detail: offers loading/error
- [x] Intro / dinner modals: loading; actions disabled while pending
- [x] Event form: submit disabled while creating
- [x] Admin notes: loading + create error toast
- [x] Outcome log: error + retry
- [x] Tier pricing: API failure banner + static fallback
- [x] QR analytics chart: error state (no silent list fallback on failure)
- [x] Refund modal: honest “not available via API” stub

### Dashboard + mutations

- [x] Dashboard aggregates query errors; KPI/charts/activity show `QueryErrorState`
- [x] Pending approvals widget: empty queue + disabled approve/decline while pending
- [x] Bulk approve uses batch mutation with toast
- [x] Event status / intro patch success toasts
- [x] Removed dead `useDashboardStore` mock

### Automated tests

- [x] MSW wired in `vitest.setup.ts` (`test/msw/handlers.ts`)
- [x] 32 unit/hook tests: errors, apiFetch edge cases, aggregations, mappers, `fetchMe`, React Query hooks
- [x] E2E specs: auth (login, invalid password, logout), dashboard KPIs, sponsors create, dinners credits modal, events/members smoke

### Build gate (2026-06-23)

```bash
npx tsc --noEmit && npm run lint && npm test && npm run build
```

- [x] All passing (32 tests)

### Manual smoke (live stack)

Prereq: `tcs-api` on `:4000`, admin on `:3000`, `admin1@tcs.dev` / `TcsDev2026!`

- [x] `curl localhost:4000/health` → `{ "status": "ok" }`
- [ ] API down: list pages show error (not empty table); retry after restart
- [ ] Per module: one list load, one detail, one mutation with toast + refresh
- [ ] Empty approvals queue when seed has no pending

Run E2E when Supabase env is set:

```bash
npx playwright install   # first time only
npm run test:e2e
```

