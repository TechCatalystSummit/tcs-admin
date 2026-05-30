# TCS Admin — Implementation Plan

Phased execution aligned with `TCS_Web_Admin_Build_Plan.md` §10 Sprint Order.

## Phase 0 — Documentation Discovery ✓

| Source | Finding |
|---|---|
| `docs/TCS_Web_Admin_Build_Plan.md` | Full folder map, 5 sprints, 12 modules |
| `package.json` | Next.js 16.2.6, Tailwind v4, only core deps installed |
| `app/globals.css` | Tailwind v4 `@theme inline` — tokens go in CSS, not `tailwind.config.ts` |
| Architecture rule | `features/* → shared/* → core/*`, no cross-feature imports |

## Sprint 1 — Foundation + Shell

**Goal:** Runnable admin shell with login, sidebar, topbar, design tokens, base UI.

| Task | Deliverable |
|---|---|
| 1.1 | Install: zustand, immer, @tanstack/react-table, recharts, RHF, zod, date-fns, lucide, clsx, tailwind-merge, sonner |
| 1.2 | `core/constants/` — colors, typography, tiers, nav |
| 1.3 | `shared/utils/cn.ts`, formatters |
| 1.4 | `globals.css` — TCS tokens + gradient utilities |
| 1.5 | `shared/components/ui/*` — Button, Input, Badge, Card, Avatar, Dialog, Sheet, Tabs |
| 1.6 | `shared/components/layout/*` — AdminSidebar, AdminTopbar, PageHeader |
| 1.7 | `shared/components/data-display/DataTable.tsx` |
| 1.8 | `features/auth` — login page + store |
| 1.9 | Route groups: `(auth)/login`, `(admin)/*` placeholder pages |
| 1.10 | Root redirect `/` → `/dashboard` |

**Verify:** `npm run build`, `npx tsc --noEmit`, `npm run lint`

**Commit:** `feat: foundation — design tokens, shared UI, admin shell, login`

---

## Sprint 2 — Dashboard + Members

**Goal:** Full dashboard widgets + members CRUD views.

| Task | Deliverable |
|---|---|
| 2.1 | `features/dashboard` — KPI grid, charts, activity feed, approvals widget |
| 2.2 | `features/members` — table, filters, approvals cards, detail page |
| 2.3 | Routes: `/dashboard`, `/members`, `/members/approvals`, `/members/[id]` |

**Verify:** Build + manual route check

**Commit:** `feat: dashboard and members modules`

---

## Sprint 3 — Events + Intros + Dinners

| Task | Deliverable |
|---|---|
| 3.1 | `features/events` — list, create form, detail |
| 3.2 | `features/intros` — table + modals |
| 3.3 | `features/dinners` — table + credit ledger |

**Commit:** `feat: events, intros, and dinners modules`

---

## Sprint 4 — Sponsors + QR + Payments

| Task | Deliverable |
|---|---|
| 4.1 | `features/sponsors` — list + detail |
| 4.2 | `features/qr` — table, generate modal, analytics |
| 4.3 | `features/payments` — table + tier pricing |

**Commit:** `feat: sponsors, qr codes, and payments modules`

---

## Sprint 5 — Outreach + Analytics + Notifications + Polish

| Task | Deliverable |
|---|---|
| 5.1 | `features/outreach` — 5 sub-pages |
| 5.2 | `features/analytics` — full analytics page |
| 5.3 | `features/notifications` — send form + log |
| 5.4 | Empty states, CSV export, responsive sidebar |

**Commit:** `feat: outreach, analytics, notifications, and polish`

---

## Sprint 6 — UX Polish ✓

| Task | Deliverable |
|---|---|
| 6.1 | Responsive admin shell — mobile hamburger, sidebar overlay, collapsed margin sync |
| 6.2 | `ExportButton` wired to Members, Events, Payments, Intros, Sponsors, Leads |
| 6.3 | `useDebounce` on member search, auth guard, login redirect |
| 6.4 | `Skeleton` components, enhanced DataTable empty states |

**Commit:** `feat: responsive shell, csv export, auth guard, and ux polish`

---

## Per-Sprint Workflow

1. Implement phase deliverables
2. Run `npx tsc --noEmit && npm run lint && npm run build`
3. Review against build plan component inventory
4. Git commit with conventional message (no tool names)
