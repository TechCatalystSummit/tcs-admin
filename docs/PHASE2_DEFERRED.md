# Phase 2 — Deferred Modules

These admin modules remain on mock data until the corresponding tcs-api sprints ship.

| Module | Admin routes | API status | Planned tcs-api sprint |
|--------|--------------|------------|------------------------|
| Notifications | `/notifications` | No REST endpoints | S16 — notifications API |
| Outreach | `/outreach/*` | No REST endpoints | S18–S19 — outreach CRM & sequences |

## What exists today

- QR per-code analytics: `GET /api/qr/:id/analytics` (wired in Phase 5)
- Dashboard KPIs, charts, and activity feed: `GET /api/analytics/dashboard` (wired in Phase 2b)
- Analytics page KPIs, charts, funnel, top events: `GET /api/analytics/summary` (wired with S20)
- Outcome log on `/analytics`: `GET /api/outcomes`
- Pending approvals widget: `GET /api/members/pending` (separate query from dashboard stats)

## Required endpoints (for API team)

### Notifications (S16)

- `GET /api/notifications` — admin broadcast log
- `POST /api/notifications` — send push/email to segment

### Outreach (S18–S19)

- `GET/POST /api/outreach/leads`
- `GET/POST /api/outreach/sequences`
- `GET/POST /api/outreach/templates`
- `GET/POST /api/outreach/decks`

## UI behavior

Pages for deferred modules display `MockDataBanner` until APIs are available.

## Partial gaps (Phase 2b)

These sub-features remain limited until additional tcs-api endpoints ship:

| Area | Wired today | Blocked on |
|------|-------------|------------|
| Dinner credit ledger | `POST /api/dinners/credits` adjust by member | `GET` admin list of all member balances |
| Analytics custom date range | 7d / 30d / 90d via `GET /api/analytics/summary?range=` | Custom date picker UI + `fromDate`/`toDate` params |
| Payment refunds | Read-only payment history | No refund POST endpoint |
