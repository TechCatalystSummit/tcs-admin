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

---

## Sprint 7 — Command Palette + Loading States ✓

| Task | Deliverable |
|---|---|
| 7.1 | `cmdk` command palette — Cmd/Ctrl+K, nav + quick actions |
| 7.2 | Topbar search trigger with keyboard hint |
| 7.3 | `PageSkeleton` + admin/dashboard `loading.tsx` |

**Commit:** `feat: command palette and route loading skeletons`

---

## Sprint 8 — Shared Infrastructure + Bulk Actions ✓

| Task | Deliverable |
|---|---|
| 8.1 | `useLocalStorage`, `useModal`, `useTableFilters` hooks |
| 8.2 | `FilterBar`, `BulkActionBar` shared components |
| 8.3 | Members table row selection + bulk approve/export |
| 8.4 | URL-synced member filters |

**Commit:** `feat: shared hooks, filter bar, and member bulk actions`

---

## Sprint 9 — Member Edit + Lead Filter Polish ✓

| Task | Deliverable |
|---|---|
| 9.1 | `EditMemberModal` — RHF + Zod tier/status/notes |
| 9.2 | Member detail reads from store; notes persist |
| 9.3 | Lead filters — debounce, FilterBar, URL sync |

**Commit:** `feat: edit member modal and lead filter polish`

---

## Sprint 10 — Phase 1 Completion ✓

**Goal:** Close remaining Phase 1 gaps from build plan inventory.

| Task | Deliverable |
|---|---|
| 10.1 | `EventQRCard` + `EventSpeakers` on event detail page |
| 10.2 | FilterBar + debounce + URL sync on Events, Intros, Payments, Sponsors |
| 10.3 | CSV export on Dinners and QR Codes pages |
| 10.4 | Suspense wrappers for filter pages (events, intros, payments) |
| 10.5 | `.env.example` for Phase 2 integration prep |

**Verify:** `npx tsc --noEmit && npm run lint && npm run build`

**Commit:** `feat: phase 1 completion — filters, event detail, exports`

---

## Phase 1 — Complete ✓

All 12 admin modules ship with mock data, Zustand stores, responsive shell, command palette, CSV export on key tables, URL-synced filters, bulk member actions, and edit member flow.

### Deferred to Phase 2 (per build plan §12)

**Note:** API / database (Supabase, Postgres) work is intentionally deferred. Phase 2 starts when backend is ready.

| Area | Work |
|---|---|
| Data layer | Replace `mock*.ts` with Supabase API modules |
| Auth | Magic link via Supabase Auth |
| Real-time | Postgres subscriptions for live dashboards |
| Integrations | Dub.co (QR), SendGrid/Resend (outreach), Stripe (payments) |
| Shared UI | shadcn Select, Switch, Checkbox, DropdownMenu, Tooltip |
| Optional UX | Member profile Sheet slide-over, AgendaBuilder, SpeakerManager |

---

## Sprint 11 — Mobile Brand Alignment ✓

**Goal:** Match Summit-App branding (logo, colors, auth hero) without API/DB changes.

| Task | Deliverable |
|---|---|
| 11.1 | Copy `Summit-App/assets/logo.png` → `public/logo.png` |
| 11.2 | `core/constants/brand.ts` — app name, tagline, auth copy |
| 11.3 | `AppLogo`, `AuthBrandHero` — mobile-matched auth gradient |
| 11.4 | Login split layout, sidebar logo, favicon metadata |
| 11.5 | Gold gradient token aligned to mobile (`#C9952A` → `#D0A84A`) |

**Verify:** `npx tsc --noEmit && npm run lint && npm run build`

**Commit:** `feat: align admin branding with mobile app`

---

## Per-Sprint Workflow
2. Run `npx tsc --noEmit && npm run lint && npm run build`
3. Review against build plan component inventory
4. Git commit with conventional message (no tool names)
