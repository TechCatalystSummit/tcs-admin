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
