# Phase 2 — Deferred Modules

These admin modules remain on mock data until the corresponding tcs-api sprints ship.

| Module | Admin routes | API status | Planned tcs-api sprint |
|--------|--------------|------------|------------------------|
| Notifications | `/notifications` | No REST endpoints | S16 — notifications API |
| Outreach | `/outreach/*` | No REST endpoints | S18–S19 — outreach CRM & sequences |
| Analytics | `/analytics` | No dedicated analytics API | S20 — analytics feed |

## What exists today

- QR per-code analytics: `GET /api/qr/:id/analytics` (wired in Phase 5)
- Dashboard KPIs aggregate from members, events, intros, payments endpoints

## Required endpoints (for API team)

### Notifications (S16)

- `GET /api/notifications` — admin broadcast log
- `POST /api/notifications` — send push/email to segment

### Outreach (S18–S19)

- `GET/POST /api/outreach/leads`
- `GET/POST /api/outreach/sequences`
- `GET/POST /api/outreach/templates`
- `GET/POST /api/outreach/decks`

### Analytics (S20)

- `GET /api/analytics/summary` — platform-wide KPIs
- `GET /api/analytics/activity` — activity feed for dashboard

## UI behavior

Pages for deferred modules display `MockDataBanner` until APIs are available.

## Partial gaps (Phase 2b)

These sub-features remain limited until additional tcs-api endpoints ship:

| Area | Wired today | Blocked on |
|------|-------------|------------|
| Dinner credit ledger | `POST /api/dinners/credits` adjust by member | `GET` admin list of all member balances |
| Analytics KPIs/charts | `GET /api/outcomes` outcome log | S20 summary + activity feed |
| Payment refunds | Read-only payment history | No refund POST endpoint |
