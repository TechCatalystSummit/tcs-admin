# TechCatalyst Summit — Web Admin Dashboard Build Plan
**Static UI (No API) · Phase 1**
*Next.js 15 · Tailwind CSS v4 · Zustand · TypeScript*

---

## 1. Technology Stack — Recommendation & Rationale

### Core

| Layer | Choice | Why |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | File-based routing matches admin section structure; RSC for static shells; `"use client"` only where interaction is needed |
| **Language** | TypeScript | Same type contracts as the mobile app — shared `types/` can be extracted to a package later |
| **Styling** | Tailwind CSS v4 | Same design tokens as NativeWind on mobile; `tailwind.config.ts` is nearly identical; no context switching for the team |
| **State** | Zustand | Same rationale as mobile — zero boilerplate, TypeScript-native, trivial API swap in Phase 2. See §1.1 |
| **UI Components** | shadcn/ui (unstyled base) | Radix UI primitives (accessible dialogs, dropdowns, tables, tooltips) + our own TCS Tailwind skin on top — no fighting a component library's opinions |
| **Charts** | Recharts | Lightweight, React-native, composable — covers bar charts, line charts, funnel charts needed across sponsor + admin screens. No D3 overhead |
| **Tables** | TanStack Table v8 | Headless table logic (sorting, filtering, pagination, column visibility) for the Leads and Member tables; we supply the Tailwind markup |
| **Icons** | Lucide React | Clean, consistent, tree-shakeable; pairs well with shadcn/ui |
| **Fonts** | `next/font` (Google Fonts) | DM Sans loaded via `next/font/google` — zero layout shift, automatic subsetting |
| **Forms** | React Hook Form + Zod | Lightweight form state + schema validation for create/edit modals. No Formik overhead |
| **Date handling** | date-fns | Used for billing dates, event dates, last-contacted — no moment.js weight |

### 1.1 Zustand — Same Choice, Different Context

The web admin dashboard needs shared state across sidebar navigation, modal state, filter state, and table selection. Zustand handles all of this without a Redux `Provider` tree or context drilling:

- **Modal management** — `useModalStore` opens any modal from any component; one global source of truth
- **Table filters** — filter state lives in the feature store, not component state; survives navigation
- **Optimistic actions** — approve a member, swipe-update a status — reflected immediately in the store, synced to API in Phase 2
- **Devtools** — Zustand devtools in the browser matches Reactotron on mobile; consistent debugging across both platforms

### 1.2 Why Not Redux, tRPC, or React Query Yet

- **Redux** — same verdict as mobile: significant ceremony for what is, in Phase 1, a static UI
- **tRPC** — excellent choice for Phase 2 when the Next.js API routes connect to Supabase; premature for Phase 1
- **React Query / TanStack Query** — add in Phase 2. Zustand stores act as the cache layer in Phase 1; the swap is one file per feature

---

## 2. Feature-Based Project Structure

Same architectural principle as the mobile app:

```
app/               ← Next.js App Router — thin layout + page files only
features/          ← All domain logic, co-located by feature
shared/            ← Components, hooks, utils used by 2+ features
core/              ← Global config: tokens, types, lib adapters
```

Dependency rule: `features/* → shared/* → core/*`. Features never import from each other.

### Full Folder Map

```
tcs-admin/
│
├── app/                                    # Next.js App Router
│   ├── layout.tsx                          # Root layout: DM Sans, sidebar, providers
│   ├── page.tsx                            # Redirect → /dashboard
│   ├── (auth)/
│   │   ├── layout.tsx                      # Centered auth layout (no sidebar)
│   │   └── login/
│   │       └── page.tsx                    # → features/auth/screens/AdminLoginPage
│   │
│   └── (admin)/
│       ├── layout.tsx                      # Sidebar + topbar shell layout
│       │
│       ├── dashboard/
│       │   └── page.tsx                    # → features/dashboard/pages/DashboardPage
│       │
│       ├── members/
│       │   ├── page.tsx                    # → features/members/pages/MembersPage
│       │   ├── approvals/
│       │   │   └── page.tsx                # → features/members/pages/ApprovalsPage
│       │   └── [id]/
│       │       └── page.tsx                # → features/members/pages/MemberDetailPage
│       │
│       ├── events/
│       │   ├── page.tsx                    # → features/events/pages/EventsPage
│       │   ├── new/
│       │   │   └── page.tsx                # → features/events/pages/NewEventPage
│       │   └── [id]/
│       │       └── page.tsx                # → features/events/pages/EventDetailPage
│       │
│       ├── intros/
│       │   └── page.tsx                    # → features/intros/pages/IntrosPage
│       │
│       ├── dinners/
│       │   └── page.tsx                    # → features/dinners/pages/DinnersPage
│       │
│       ├── sponsors/
│       │   ├── page.tsx                    # → features/sponsors/pages/SponsorsPage
│       │   └── [id]/
│       │       └── page.tsx                # → features/sponsors/pages/SponsorDetailPage
│       │
│       ├── qr-codes/
│       │   └── page.tsx                    # → features/qr/pages/QRCodesPage
│       │
│       ├── payments/
│       │   └── page.tsx                    # → features/payments/pages/PaymentsPage
│       │
│       ├── notifications/
│       │   └── page.tsx                    # → features/notifications/pages/NotificationsPage
│       │
│       ├── outreach/
│       │   ├── page.tsx                    # → features/outreach/pages/OutreachPage
│       │   ├── leads/
│       │   │   └── page.tsx                # → features/outreach/pages/LeadsPage
│       │   ├── sequences/
│       │   │   └── page.tsx                # → features/outreach/pages/SequencesPage
│       │   ├── templates/
│       │   │   └── page.tsx                # → features/outreach/pages/TemplatesPage
│       │   └── decks/
│       │       └── page.tsx                # → features/outreach/pages/DecksPage
│       │
│       └── analytics/
│           └── page.tsx                    # → features/analytics/pages/AnalyticsPage
│
├── features/                               # ── FEATURE MODULES ──────────────────
│   │
│   ├── auth/                               # Admin authentication
│   │   ├── pages/
│   │   │   └── AdminLoginPage.tsx          # TCS logo + email + magic link button
│   │   ├── components/
│   │   │   └── LoginCard.tsx
│   │   ├── store/
│   │   │   └── useAuthStore.ts             # Admin user, role, session
│   │   └── types.ts
│   │
│   ├── dashboard/                          # Module 10 — Admin Dashboard (screen 09)
│   │   ├── pages/
│   │   │   └── DashboardPage.tsx           # Overview page — all widgets assembled
│   │   ├── components/
│   │   │   ├── KPIGrid.tsx                 # 4-card responsive grid (Members/Pending/MRR/Events)
│   │   │   ├── KPICard.tsx                 # Single metric card: value + label + delta badge
│   │   │   ├── QuickActions.tsx            # Shortcut cards: Approve, Create Event, Generate QR, Intros
│   │   │   ├── ActivityFeed.tsx            # Real-time recent activity list with gradient dot
│   │   │   ├── RevenueChart.tsx            # Recharts AreaChart — MRR trend (30 days)
│   │   │   ├── MemberGrowthChart.tsx       # Recharts BarChart — weekly new signups
│   │   │   └── PendingApprovalsWidget.tsx  # Top 5 pending members with approve/decline inline
│   │   ├── store/
│   │   │   └── useDashboardStore.ts        # KPI values, activity feed, chart data
│   │   └── data/
│   │       └── mockDashboard.ts            # KPI numbers, activity rows, chart series
│   │
│   ├── members/                            # Module 2 (Onboarding) + Module 3 (Profiles)
│   │   ├── pages/
│   │   │   ├── MembersPage.tsx             # Full member table with search + filters
│   │   │   ├── ApprovalsPage.tsx           # Pending approvals queue (screen 10 expanded)
│   │   │   └── MemberDetailPage.tsx        # Single member full profile + admin notes
│   │   ├── components/
│   │   │   ├── MembersTable.tsx            # TanStack Table — sortable, filterable, paginated
│   │   │   ├── MemberTableRow.tsx          # Avatar + name + role + tier + status + actions
│   │   │   ├── MemberFilters.tsx           # Tier / Role / Status / City filter bar
│   │   │   ├── MemberSearch.tsx            # Debounced search input
│   │   │   ├── ApprovalCard.tsx            # Expanded approval card (Approve/Decline/View profile)
│   │   │   ├── ApprovalFilterTabs.tsx      # All / Pending / Approved / Declined tabs
│   │   │   ├── TierBadge.tsx               # Community / Builder / Executive / Partner / Legacy
│   │   │   ├── StatusBadge.tsx             # Active / Pending / Suspended
│   │   │   ├── MemberProfilePanel.tsx      # Slide-over panel with full profile view
│   │   │   ├── EditMemberModal.tsx         # Modal with React Hook Form — edit tier/status/notes
│   │   │   ├── AdminNotesPanel.tsx         # Internal notes textarea + history list
│   │   │   └── BulkActionBar.tsx           # Appears when rows are selected — approve all / export
│   │   ├── store/
│   │   │   └── useMembersStore.ts          # Member list, filters, pagination, selected rows
│   │   ├── data/
│   │   │   ├── mockMembers.ts              # 25+ members across all tiers
│   │   │   └── mockApprovals.ts            # 10 pending approvals with full profile data
│   │   └── types.ts                        # Member, MemberStatus, ApprovalRequest types
│   │
│   ├── events/                             # Module 6 — Event Hub
│   │   ├── pages/
│   │   │   ├── EventsPage.tsx              # Events table with status + RSVP counts
│   │   │   ├── NewEventPage.tsx            # Multi-step event creation form
│   │   │   └── EventDetailPage.tsx         # Event detail + attendees + check-ins + QR
│   │   ├── components/
│   │   │   ├── EventsTable.tsx             # TanStack Table — date / title / type / RSVPs / status
│   │   │   ├── EventStatusBadge.tsx        # Draft / Published / Live / Past
│   │   │   ├── EventForm.tsx               # React Hook Form — all event fields from brief §2.6.1
│   │   │   ├── AgendaBuilder.tsx           # Add/remove/reorder agenda items (drag not required in Phase 1)
│   │   │   ├── SpeakerManager.tsx          # Add/remove speakers with name + bio + photo
│   │   │   ├── AttendeeTable.tsx           # RSVP list with check-in status
│   │   │   ├── EventQRCard.tsx             # QR code display card for check-in
│   │   │   └── EventStatsRow.tsx           # RSVPs / Checked-in / VIP / No-show counts
│   │   ├── store/
│   │   │   └── useEventsStore.ts           # Events list, filters, draft form state
│   │   ├── data/
│   │   │   └── mockEvents.ts               # 8+ events with full detail, attendees, agenda
│   │   └── types.ts                        # Event, Agenda, Speaker, RSVP, CheckIn types
│   │
│   ├── intros/                             # Module 5 — Curated Intro Workflow
│   │   ├── pages/
│   │   │   └── IntrosPage.tsx              # All intro requests — filterable table
│   │   ├── components/
│   │   │   ├── IntrosTable.tsx             # From / To / Reason / Status / Date / Actions
│   │   │   ├── IntroStatusBadge.tsx        # Pending / Approved / Declined / Completed
│   │   │   ├── IntroFilters.tsx            # Status / Date range / Member search
│   │   │   ├── IntroDetailModal.tsx        # Full intro record with approve/decline/note actions
│   │   │   └── CreateIntroModal.tsx        # Admin manually creates an intro (brief §2.5)
│   │   ├── store/
│   │   │   └── useIntrosStore.ts           # Intro list, filters, modal state
│   │   ├── data/
│   │   │   └── mockIntros.ts               # 15+ intro requests across all statuses
│   │   └── types.ts                        # IntroRequest, IntroStatus, IntroReason types
│   │
│   ├── dinners/                            # Module 7 — Executive Dinner
│   │   ├── pages/
│   │   │   └── DinnersPage.tsx             # Dinner requests table + credit management
│   │   ├── components/
│   │   │   ├── DinnersTable.tsx            # Requester / Purpose / Date / Status / Credits
│   │   │   ├── DinnerStatusBadge.tsx       # Requested / Under Review / Approved / Scheduled / Completed
│   │   │   ├── DinnerDetailModal.tsx       # Full dinner request + approve + notes + outcome log
│   │   │   ├── CreditLedger.tsx            # Per-member credit balance table
│   │   │   └── AdjustCreditsModal.tsx      # Add / subtract credits with reason
│   │   ├── store/
│   │   │   └── useDinnersStore.ts          # Dinner list, credit balances, modal state
│   │   ├── data/
│   │   │   └── mockDinners.ts              # 10 dinner requests, credit ledger per member
│   │   └── types.ts                        # DinnerRequest, DinnerStatus, CreditRecord types
│   │
│   ├── sponsors/                           # Module 9 — Sponsor Portal
│   │   ├── pages/
│   │   │   ├── SponsorsPage.tsx            # Sponsor list table
│   │   │   └── SponsorDetailPage.tsx       # Sponsor profile + leads + QR + event perf
│   │   ├── components/
│   │   │   ├── SponsorsTable.tsx           # Logo / Name / Tier / Events / Leads / Status
│   │   │   ├── SponsorForm.tsx             # Create / edit sponsor profile (§2.9.1 fields)
│   │   │   ├── SponsorLeadsPanel.tsx       # Leads table filtered to this sponsor
│   │   │   ├── SponsorKPIRow.tsx           # QR scans / leads / pipeline / engagement row
│   │   │   └── SponsorOfferCard.tsx        # Active perk/offer display + edit
│   │   ├── store/
│   │   │   └── useSponsorsStore.ts         # Sponsor list, active sponsor, modal
│   │   ├── data/
│   │   │   └── mockSponsors.ts             # 6 sponsor companies with full data
│   │   └── types.ts                        # Sponsor, SponsorOffer, SponsorUser types
│   │
│   ├── qr/                                 # Module 1 — QR Code System
│   │   ├── pages/
│   │   │   └── QRCodesPage.tsx             # All QR codes — generate + scan log
│   │   ├── components/
│   │   │   ├── QRCodesTable.tsx            # Type / Source / Campaign / Scans / Conversions
│   │   │   ├── QRTypeCard.tsx              # Visual card for each QR type (§2.1.1)
│   │   │   ├── GenerateQRModal.tsx         # Form to create new QR: type + source + campaign
│   │   │   ├── QRCodeDisplay.tsx           # Large QR with download button (PNG/SVG)
│   │   │   ├── ScanLogTable.tsx            # Per-QR scan history: time + user + conversion
│   │   │   └── QRAnalyticsChart.tsx        # Recharts BarChart — 7-day scan trend (screen 22)
│   │   ├── store/
│   │   │   └── useQRStore.ts               # QR list, selected QR, scan log, generate modal
│   │   ├── data/
│   │   │   └── mockQRCodes.ts              # 8 QR codes across all types, scan history
│   │   └── types.ts                        # QRCode, QRType, QRScan, QRConversion types
│   │
│   ├── payments/                           # Module 8 — Membership & Billing
│   │   ├── pages/
│   │   │   └── PaymentsPage.tsx            # Payment history + subscription management
│   │   ├── components/
│   │   │   ├── PaymentsTable.tsx           # Member / Amount / Tier / Date / Status / Receipt
│   │   │   ├── PaymentStatusBadge.tsx      # Paid / Failed / Refunded / Pending
│   │   │   ├── RefundModal.tsx             # Initiate refund with reason (Phase 1: static)
│   │   │   ├── SubscriptionCard.tsx        # Active subscription summary per member
│   │   │   └── TierPricingTable.tsx        # All 5 tiers with prices + feature matrix
│   │   ├── store/
│   │   │   └── usePaymentsStore.ts         # Payment list, filters, refund modal
│   │   ├── data/
│   │   │   └── mockPayments.ts             # 20+ payment records across tiers
│   │   └── types.ts                        # Payment, Subscription, Refund types
│   │
│   ├── notifications/                      # Core — Notification Center
│   │   ├── pages/
│   │   │   └── NotificationsPage.tsx       # Send + manage all notifications
│   │   ├── components/
│   │   │   ├── SendNotificationForm.tsx    # Compose: type + audience + message + CTA
│   │   │   ├── NotificationLog.tsx         # Sent notifications history table
│   │   │   └── AudienceSelector.tsx        # Target: All / By tier / By event / Specific member
│   │   ├── store/
│   │   │   └── useNotificationsStore.ts
│   │   └── data/
│   │       └── mockNotifications.ts
│   │
│   ├── outreach/                           # Add-On Module — Sponsor Outreach Command Center
│   │   │                                   # Screens 23 (Outreach), 21 (Leads), 25 (Pitch Deck Send)
│   │   ├── pages/
│   │   │   ├── OutreachPage.tsx            # Command center overview — quick send + stats
│   │   │   ├── LeadsPage.tsx               # Full CRM leads table (screen 21 expanded)
│   │   │   ├── SequencesPage.tsx           # Follow-up sequence builder + status
│   │   │   ├── TemplatesPage.tsx           # Email template library
│   │   │   └── DecksPage.tsx               # Sponsor deck library
│   │   ├── components/
│   │   │   ├── QuickSendCard.tsx           # Email input + one-click send (brief §3.1)
│   │   │   ├── OutreachStatsStrip.tsx      # Sent / Opens / Clicks / Replies today
│   │   │   ├── LeadsTable.tsx              # TanStack Table — full CRM fields (§3.6.1)
│   │   │   ├── LeadDetailPanel.tsx         # Slide-over: full contact + activity history
│   │   │   ├── LeadStatusBadge.tsx         # New / Contacted / Opened / Clicked / Replied / Booked / Confirmed
│   │   │   ├── StageBadge.tsx              # Hot / Warm / New / Contacted (from screen 21)
│   │   │   ├── LeadFilters.tsx             # Stage / Status / Source / Industry filters + search
│   │   │   ├── AddLeadModal.tsx            # New CRM contact form (§3.6.1 fields)
│   │   │   ├── SequenceCard.tsx            # Sequence with step dots + on/off toggle
│   │   │   ├── SequenceStepList.tsx        # Day 0/2/5/8/12 steps — individually editable
│   │   │   ├── TemplateCard.tsx            # Template name + type + preview snippet
│   │   │   ├── TemplateEditor.tsx          # Rich text area + dynamic variable chips (§3.4.2)
│   │   │   ├── DeckCard.tsx                # Deck title + type + version + last updated + active toggle
│   │   │   ├── UploadDeckModal.tsx         # File link + type + event association
│   │   │   └── OutreachAnalyticsChart.tsx  # Recharts BarChart — weekly emails sent + open rate
│   │   ├── store/
│   │   │   └── useOutreachStore.ts         # Leads, sequences, templates, decks, quick-send state
│   │   ├── data/
│   │   │   ├── mockLeads.ts                # 20+ CRM contacts across all statuses
│   │   │   ├── mockSequences.ts            # 3 follow-up sequences with step data
│   │   │   ├── mockTemplates.ts            # 10 email templates (§3.4.1 types)
│   │   │   └── mockDecks.ts                # Deck library (Sponsor / Vendor / Investor / Partner)
│   │   └── types.ts                        # Lead, Sequence, SequenceStep, Template, Deck types
│   │
│   └── analytics/                          # Module 12 — Outcome Tracking + Platform Analytics
│       ├── pages/
│       │   └── AnalyticsPage.tsx           # Full analytics view (screen 24 expanded for desktop)
│       ├── components/
│       │   ├── AnalyticsKPIRow.tsx         # 4 headline metrics: connections / intros / meetings / revenue
│       │   ├── WeeklyGrowthChart.tsx       # Recharts BarChart — new members per week
│       │   ├── IntroConversionFunnel.tsx   # Horizontal funnel: Requested → Approved → Connected → Deal
│       │   ├── TopEventsTable.tsx          # Event / Attendance / Intros / ROI table
│       │   ├── RevenueByTierChart.tsx      # Recharts PieChart — MRR split by tier
│       │   ├── OutcomeLogTable.tsx         # All outcome records: connection + result + value
│       │   └── DateRangePicker.tsx         # Global date range filter affecting all charts
│       ├── store/
│       │   └── useAnalyticsStore.ts        # Chart data, date range, filters
│       └── data/
│           └── mockAnalytics.ts            # KPI numbers, chart series, funnel data
│
├── shared/                                 # ── SHARED INFRASTRUCTURE ────────────
│   │
│   ├── components/
│   │   ├── ui/                             # Base UI atoms — TCS skin on shadcn/ui
│   │   │   ├── Button.tsx                  # variant: primary (gradient) / outline / ghost / danger
│   │   │   ├── GradientButton.tsx          # Blue gradient CTA — same design as mobile
│   │   │   ├── Input.tsx                   # Text input with label + error state
│   │   │   ├── Select.tsx                  # Styled select / combobox (Radix)
│   │   │   ├── Textarea.tsx
│   │   │   ├── Switch.tsx                  # Toggle (Radix) — tracking, sequence on/off
│   │   │   ├── Badge.tsx                   # variant: gradient / tier / status / stage
│   │   │   ├── Avatar.tsx                  # Photo + initials fallback + gold ring for Executive
│   │   │   ├── Card.tsx                    # White 1px border card base
│   │   │   ├── SectionLabel.tsx            # ALL CAPS 9pt hint color label
│   │   │   ├── Divider.tsx                 # Hairline divider
│   │   │   ├── Tooltip.tsx                 # Radix tooltip
│   │   │   ├── Dialog.tsx                  # Radix modal wrapper with TCS styling
│   │   │   ├── Sheet.tsx                   # Slide-over panel (member detail, lead detail)
│   │   │   ├── Tabs.tsx                    # Radix tabs with gradient active indicator
│   │   │   ├── DropdownMenu.tsx            # Radix dropdown (table row actions: ...)
│   │   │   ├── Checkbox.tsx                # Radix checkbox (table row selection)
│   │   │   └── Spinner.tsx                 # Loading indicator
│   │   │
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx            # Fixed left nav — all 12 sections with icons
│   │   │   ├── AdminTopbar.tsx             # Breadcrumb + search + user avatar + notifications bell
│   │   │   ├── PageHeader.tsx              # Page title + subtitle + primary action button
│   │   │   ├── FilterBar.tsx               # Horizontal filter strip (chips + search + date range)
│   │   │   └── EmptyState.tsx              # Empty table / no results illustration + CTA
│   │   │
│   │   └── data-display/
│   │       ├── StatCard.tsx                # KPI card: value + label + delta (reused across features)
│   │       ├── DataTable.tsx               # TanStack Table wrapper with TCS Tailwind skin
│   │       ├── TablePagination.tsx         # Page controls + results count
│   │       ├── SortableHeader.tsx          # Column header with sort indicator
│   │       └── ExportButton.tsx            # CSV export trigger (Phase 1: downloads mock data)
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts                  # Debounce search input
│   │   ├── useLocalStorage.ts              # Persist sidebar collapsed state
│   │   ├── useTableFilters.ts              # Generic filter state + URL sync logic
│   │   └── useModal.ts                     # Open/close modal with typed payload
│   │
│   └── utils/
│       ├── formatters.ts                   # formatCurrency, formatDate, formatPercent, formatTier
│       ├── cn.ts                           # clsx + twMerge utility (standard shadcn/ui pattern)
│       └── csvExport.ts                    # Convert table data → downloadable CSV blob
│
└── core/
    ├── constants/
    │   ├── colors.ts                       # Exact TCS palette — same as mobile constants
    │   ├── typography.ts                   # DM Sans type scale
    │   ├── tiers.ts                        # Tier names, prices, features, permission flags
    │   └── nav.ts                          # Sidebar nav items: label + icon + href + badge
    │
    ├── stores/
    │   └── index.ts                        # Re-export all stores
    │
    └── lib/
        └── localStorage.ts                 # Zustand persist adapter (localStorage for web)
```

---

## 3. Design System — Web Token Mapping

Same palette as the mobile app. Tailwind config is almost identical to `tailwind.config.js` on mobile.

### Color Palette (`core/constants/colors.ts`)

```typescript
export const colors = {
  // Backgrounds
  white:    '#FFFFFF',   // page bg, card bg
  surf:     '#F7F7F9',   // main content area bg (mirrors mobile admin screens)
  sidebar:  '#05112A',   // dark1 — sidebar bg (dark navy)

  // Text
  ink:      '#0D0D1A',   // headings, table data
  ink2:     '#444455',   // sub-headings
  muted:    '#888899',   // secondary text, table secondary rows
  hint:     '#BBBBC5',   // placeholders, section labels, chart axis labels

  // Borders
  border:   '#E8E8EB',   // card borders, table row dividers, input borders

  // Brand gradient — all primary CTAs
  blue1:    '#1A73E8',
  blue2:    '#0DCAF0',
  blueL:    '#EEF3FF',   // unread tint, active row highlight

  // Gold — Executive tier signals
  gold:     '#D0A84A',
  goldL:    '#FFF9EB',

  // Success
  green:    '#0D9E75',
  greenL:   '#F0FFF8',

  // Dark hero (sponsor headers)
  dark1:    '#05112A',
  dark2:    '#0A2050',

  // Semantic status
  red:      '#DC3230',  redL:    '#FEEDED',
  orange:   '#F37D18',  orangeL: '#FFF3E8',
  purple:   '#6B3AC9',  purpleL: '#F3EFFE',
};
```

### Tailwind Config (`tailwind.config.ts`)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './shared/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#0D0D1A', muted: '#888899', hint: '#BBBBC5',
        border: '#E8E8EB', surf:  '#F7F7F9',
        blue1:  '#1A73E8', blue2: '#0DCAF0', blueL: '#EEF3FF',
        gold:   '#D0A84A', goldL: '#FFF9EB',
        green:  '#0D9E75', greenL: '#F0FFF8',
        dark1:  '#05112A', dark2: '#0A2050',
        sidebar:'#05112A',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],  // loaded via next/font
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(to right, #1A73E8, #0DCAF0)',
        'dark-gradient':  'linear-gradient(to right, #05112A, #0A2050)',
        'gold-gradient':  'linear-gradient(to bottom, #D0A84A, #E8C46A)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')], // for shadcn/ui transitions
};

export default config;
```

### KPI Card Color Coding (from Figma screens 09 + 20)

Each KPI card has a colored 3px top bar. The color maps to the metric type:

| Metric | Top Bar Color |
|---|---|
| Members / Growth | `green` `#0D9E75` |
| QR Scans / Activity | `blue1` `#1A73E8` |
| Revenue / Pipeline | `gold` `#D0A84A` |
| Engagement / Misc | `purple` `#6B3AC9` |
| Pending / Alerts | `orange` `#F37D18` |

---

## 4. Sidebar Navigation Structure

The sidebar is the global nav for the entire admin. It maps exactly to the modules in the brief.

```typescript
// core/constants/nav.ts
export const navItems = [
  { label: 'Dashboard',        href: '/dashboard',              icon: LayoutDashboard,  badge: null },
  { label: 'Members',          href: '/members',                icon: Users,            badge: null,
    children: [
      { label: 'All Members',  href: '/members' },
      { label: 'Approvals',    href: '/members/approvals',      badge: '47' },  // pending count
    ]
  },
  { label: 'Events',           href: '/events',                 icon: Calendar,         badge: null },
  { label: 'Intros',           href: '/intros',                 icon: ArrowLeftRight,   badge: null },
  { label: 'Dinners',          href: '/dinners',                icon: UtensilsCrossed,  badge: null },
  { label: 'Sponsors',         href: '/sponsors',               icon: Building2,        badge: null },
  { label: 'QR Codes',         href: '/qr-codes',               icon: QrCode,           badge: null },
  { label: 'Payments',         href: '/payments',               icon: CreditCard,       badge: null },
  { label: 'Notifications',    href: '/notifications',          icon: Bell,             badge: null },
  { label: 'Outreach',         href: '/outreach',               icon: Send,             badge: null,
    children: [
      { label: 'Command Center', href: '/outreach' },
      { label: 'Leads / CRM',    href: '/outreach/leads' },
      { label: 'Sequences',      href: '/outreach/sequences' },
      { label: 'Templates',      href: '/outreach/templates' },
      { label: 'Deck Library',   href: '/outreach/decks' },
    ]
  },
  { label: 'Analytics',        href: '/analytics',              icon: BarChart3,        badge: null },
];
```

**Sidebar design spec (from brief + Figma mobile admin):**
- Background: `dark1` `#05112A`
- Active item: `blueL` text + `blueL/10` background + blue1 left border 2px
- Inactive item: `hint` text
- Hover: `white/5` background
- TCS logo at top (gradient square + "TCS Admin" text)
- User avatar + name + "Admin" gold badge at bottom
- Collapsible to icon-only on small desktop viewports

---

## 5. Page-by-Page Build Plan

### Phase 1A — Core Layout & Auth

| Page | Route | Key Components | Notes |
|---|---|---|---|
| Login | `/login` | `LoginCard`, `GradientButton` | TCS logo + email input + magic link CTA. Ghost button for Google SSO placeholder. |
| Shell | `(admin)/layout` | `AdminSidebar`, `AdminTopbar` | Sidebar fixed left (240px). Main content: `ml-60 bg-surf min-h-screen`. Topbar: breadcrumb + search + avatar. |

---

### Phase 1B — Dashboard (Screen 09 → Desktop)

The mobile Admin Dashboard (screen 09) expands to a full desktop overview page.

**Route:** `/dashboard`

**Layout:** 3-column grid at `xl:`, 2-column at `lg:`, 1-column on mobile.

| Component | Description |
|---|---|
| `KPIGrid` | 4-card row: Total Members (green) / Pending Approvals (orange) / MRR (gold) / Active Events (blue) |
| `KPICard` | Value + label + colored top bar + delta badge (from Figma design token) |
| `PendingApprovalsWidget` | Top 5 pending members with inline Approve/Decline/View — mirrors screen 10 mini |
| `ActivityFeed` | Scrollable recent activity with gradient dot markers |
| `RevenueChart` | Recharts `AreaChart` — 30-day MRR trend line with gradient fill |
| `MemberGrowthChart` | Recharts `BarChart` — weekly new signups, colored bars by tier |
| `QuickActions` | 4 shortcut cards: Approve members / Create event / Generate QR / Manage intros |

---

### Phase 1C — Members (Screen 10 → Full Table)

**Routes:** `/members`, `/members/approvals`, `/members/[id]`

The mobile Approvals screen (screen 10) becomes a full data management section.

| Page | Key UI |
|---|---|
| All Members | `MembersTable` (TanStack): Avatar + Name + Role + Tier + City + Status + Joined. Sortable all cols. Paginated 25/page. Bulk select → bulk approve / export CSV. `MemberFilters`: Tier dropdown + Role dropdown + Status chips + search. |
| Approvals | `ApprovalCard` grid (not a table — card layout matches mobile screen 10). Filter tabs: All / Pending / Approved / Declined. Approve/Decline buttons with confirmation tooltip. |
| Member Detail | `MemberProfilePanel` full page: photo + bio + goals/offers + events + intro history. `AdminNotesPanel` on right: internal notes + history. `EditMemberModal`: change tier/status. |

**Table column order (from brief §5.1 `profiles` table):**
Name · Role · Company · City · Tier · Status · Joined · Events Attended · Intros · Actions

---

### Phase 1D — Events

**Routes:** `/events`, `/events/new`, `/events/[id]`

| Page | Key UI |
|---|---|
| Events List | `EventsTable`: Title + Date + Type + Location + RSVPs + Checked-In + Status. Filter: Status / Type / Date range. "Create Event" button → new page. |
| Create Event | Multi-section form: Basic info → Date & Venue → Speakers → Agenda → Sponsors → VIP Rules → Publish. `AgendaBuilder`: add/remove timeline items. Progress steps indicator at top. |
| Event Detail | Stats row (RSVPs / Checked-in / VIP / Capacity). `AttendeeTable` (name + tier + RSVP status + check-in time). `EventQRCard` for check-in QR. Sponsors section. Post-event recap editor. |

---

### Phase 1E — Intros

**Route:** `/intros`

Single page — full table + detail modal.

| Component | Description |
|---|---|
| `IntrosTable` | From → To → Reason → Status → Date → Outcome. Sortable + filterable. |
| `IntroDetailModal` | Full intro record. Admin actions: Approve / Decline / Edit / Assign / Add note. |
| `CreateIntroModal` | Manually create intro — Member A + Member B + Reason fields. |
| `IntroStatusBadge` | Pending (amber) / Approved (green) / Declined (red) / Completed (blue) / Follow-up (purple) |

---

### Phase 1F — Dinners

**Route:** `/dinners`

| Component | Description |
|---|---|
| `DinnersTable` | Requester + Purpose + Preferred Date + Budget + Status + Credits used. |
| `DinnerDetailModal` | Full request. Admin actions: Approve / Schedule / Mark Complete / Log outcome. |
| `CreditLedger` | Table: Member + Tier + Balance + Used + Expires. "Adjust" button per row. |
| `AdjustCreditsModal` | +/- credits + reason + optional note. |

---

### Phase 1G — Sponsors

**Routes:** `/sponsors`, `/sponsors/[id]`

| Page | Key UI |
|---|---|
| Sponsors List | `SponsorsTable`: Logo + Company + Tier + Events + QR Scans + Leads + Status. Create new sponsor button. |
| Sponsor Detail | `SponsorKPIRow` (4 metrics from Figma screen 20). `SponsorLeadsPanel` (filtered leads for this sponsor). Active offers. Assigned events. Contact users. Edit form. |

---

### Phase 1H — QR Codes

**Route:** `/qr-codes`

| Component | Description |
|---|---|
| `QRCodesTable` | Code Name + Type + Source + Campaign + Scans + Conv. Rate + Created. |
| `GenerateQRModal` | Type selector (9 types from §2.1.1) + Source + Campaign + Event link. Preview QR on right. |
| `QRCodeDisplay` | Large QR code + Copy link + Download PNG/SVG buttons. |
| `ScanLogTable` | Per-QR: Timestamp + User (if captured) + Conversion status. |
| `QRAnalyticsChart` | 7-day Recharts BarChart — matches mobile screen 22. |

---

### Phase 1I — Payments

**Route:** `/payments`

| Component | Description |
|---|---|
| `PaymentsTable` | Member + Amount + Tier + Date + Method + Status + Receipt link. Sortable + date range filter. |
| `TierPricingTable` | Read-only: all 5 tiers + prices + key features (from brief §2.8). |
| `RefundModal` | Member lookup + amount + reason. Phase 1: static confirmation dialog. |

---

### Phase 1J — Outreach Command Center (Screens 23, 21, 25 → Desktop)

The mobile Outreach screen (screen 23) becomes the most feature-rich section of the admin.

**Routes:** `/outreach`, `/outreach/leads`, `/outreach/sequences`, `/outreach/templates`, `/outreach/decks`

#### Outreach Overview (`/outreach`)

| Component | Description |
|---|---|
| `QuickSendCard` | Large card: Email input + optional name/company + Event (auto-detected) + Deck (auto-linked) + Template (auto-selected) + **Send Now** gradient button. Matches brief §3.1 exactly. |
| `OutreachStatsStrip` | Today: Sent + Opens + Clicks + Replies — 4 inline stats |
| `ActiveSequencesList` | Top 3 active sequences with step progress and on/off toggle |
| `OutreachAnalyticsChart` | Recharts `ComposedChart` — sent (bars) + open rate (line) over 30 days |

#### Leads / CRM (`/outreach/leads`)

Full CRM table — the most data-dense page in the admin.

| Component | Description |
|---|---|
| `LeadsTable` | TanStack Table: Name + Company + Title + Industry + Status + Stage + Source + Last Contacted + Opens + Clicks + Next Follow-up + Actions. All columns sortable. |
| `LeadFilters` | Stage chips (Hot/Warm/New/Contacted) + Status dropdown + Source + Industry + Date range + Search. Filter count badge shows active filters. |
| `LeadDetailPanel` | Slide-over (Sheet): Full contact fields + Activity history (opens/clicks/replies timeline) + Notes + Status change dropdown + "Add to sequence" button |
| `AddLeadModal` | All §3.6.1 fields: Name / Email / Company / Title / Phone / Industry / Source / Event interest / Sponsor type / Status / Notes |
| `StageBadge` | Hot (red) / Warm (orange) / New (blue) / Contacted (muted) — matches Figma screen 21 |
| `BulkActionBar` | Appears when rows checked: Add to sequence / Export CSV / Change status / Delete |

#### Sequences (`/outreach/sequences`)

| Component | Description |
|---|---|
| `SequenceCard` | Name + Contact count + Status (Active/Paused) + On/Off toggle + Step count. |
| `SequenceStepList` | Day 0/2/5/8/12 steps (brief §3.5.1). Each step: delay + template selector + edit/delete. "Add step" button. |

#### Templates (`/outreach/templates`)

| Component | Description |
|---|---|
| `TemplateCard` | Name + Type + Last used + Preview snippet. Duplicate / Edit / Delete actions. |
| `TemplateEditor` | Rich text area + dynamic variable chip palette (all §3.4.2 variables) + subject line input + preview panel. |

#### Deck Library (`/outreach/decks`)

| Component | Description |
|---|---|
| `DeckCard` | Title + Type + Version + Last Updated + Active toggle + Default deck toggle. |
| `UploadDeckModal` | Title + Type selector + Event association + File link input + Active toggle. |

---

### Phase 1K — Analytics Dashboard (Screen 24 → Desktop)

**Route:** `/analytics`

| Component | Description |
|---|---|
| `AnalyticsKPIRow` | 4 headline cards: Connections Made / Intros Accepted / Meetings Completed / Revenue Influenced |
| `DateRangePicker` | Global filter: Last 7d / 30d / 90d / Custom |
| `WeeklyGrowthChart` | Recharts BarChart — new members by week, colored by tier |
| `IntroConversionFunnel` | Horizontal funnel: Requested → Approved → Connected → Outcome Logged → Deal Made |
| `RevenueByTierChart` | Recharts PieChart — MRR breakdown by tier |
| `TopEventsTable` | Event / Date / Attendance / Intros / Deals / Est. ROI |
| `OutcomeLogTable` | All outcome entries: Connection + Date + Outcome type + Est. Value + Notes |

---

## 6. Zustand Store Architecture

### Pattern — same as mobile

```typescript
// features/members/store/useMembersStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MembersState {
  members: Member[];
  filters: MemberFilters;
  pagination: { page: number; perPage: number; total: number };
  selectedIds: string[];
  modalOpen: 'edit' | 'detail' | null;
  activeMemberId: string | null;

  setFilter: (key: keyof MemberFilters, value: string) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  toggleSelect: (id: string) => void;
  selectAll: () => void;
  clearSelection: () => void;
  openModal: (type: 'edit' | 'detail', id: string) => void;
  closeModal: () => void;
  approveMember: (id: string) => void;
  declineMember: (id: string) => void;
  updateTier: (id: string, tier: Tier) => void;
}
```

### Global Modal Store (`shared/hooks/useModal.ts`)

```typescript
// Typed modal manager — prevents prop-drilling modal state
interface ModalStore {
  open: string | null;            // modal key
  payload: Record<string, any>;   // typed payload (member ID, lead ID etc.)
  openModal: (key: string, payload?: Record<string, any>) => void;
  closeModal: () => void;
}
```

### Store per Feature

| Feature | Store | Key State |
|---|---|---|
| `auth` | `useAuthStore` | Admin user, session |
| `dashboard` | `useDashboardStore` | KPI values, activity feed, chart series |
| `members` | `useMembersStore` | Member list, filters, pagination, selection |
| `events` | `useEventsStore` | Events list, form state, draft |
| `intros` | `useIntrosStore` | Intro list, filters, active intro |
| `dinners` | `useDinnersStore` | Dinner list, credit ledger |
| `sponsors` | `useSponsorsStore` | Sponsor list, active sponsor |
| `qr` | `useQRStore` | QR list, scan log, generate modal |
| `payments` | `usePaymentsStore` | Payment list, refund modal |
| `outreach` | `useOutreachStore` | Leads, sequences, templates, decks, quick-send |
| `analytics` | `useAnalyticsStore` | Chart data, date range |

---

## 7. Mock Data Strategy

Same principle as mobile — each feature owns its mock data, co-located in `features/<name>/data/`. All shapes match the data model in brief §5.

```typescript
// features/members/data/mockMembers.ts
export const mockMembers: AdminMember[] = [
  {
    id: 'usr_001',
    name: 'Sarah Chen',
    email: 'sarah@nexusventures.com',
    phone: '+1 415 555 0192',
    title: 'Chief Technology Officer',
    company: 'Nexus Ventures',
    city: 'San Francisco, CA',
    tier: 'executive',
    role: 'CTO',
    status: 'active',
    isVerified: true,
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    bio: 'Building the future of enterprise AI.',
    lookingFor: ['investors', 'enterprise-buyers'],
    canOffer: ['technical-expertise', 'ai-expertise'],
    joinedAt: '2026-02-14',
    eventsAttended: 3,
    introsRequested: 7,
    introsReceived: 12,
    mrr: 833,  // $10k/yr executive tier
  },
];

// features/outreach/data/mockLeads.ts — CRM contacts §3.6.1
export const mockLeads: Lead[] = [
  {
    id: 'lead_001',
    name: 'Marcus Webb',
    email: 'marcus@apexcapital.com',
    company: 'Apex Capital',
    title: 'Managing Partner',
    phone: '+1 212 555 0188',
    industry: 'Finance',
    source: 'TCS Miami Event',
    sponsorType: 'Financial Services',
    status: 'opened',
    stage: 'hot',
    eventInterest: 'TCS Summit 2026',
    notes: 'Very interested in the Founder dinner sponsorship.',
    lastContacted: '2026-05-28',
    nextFollowUp: '2026-05-31',
    opens: 3,
    clicks: 2,
    replies: 1,
    meetingBooked: false,
  },
];
```

**Mock data sets required per feature:**

| Feature | Volume |
|---|---|
| `members` | 25+ members (all tiers), 10 pending approvals |
| `events` | 8+ events (past, live, upcoming, draft), full agenda + speaker data |
| `intros` | 20+ intro requests across all statuses |
| `dinners` | 12 dinner requests, credit ledger for 10 members |
| `sponsors` | 6 sponsor companies with full KPI data |
| `qr` | 10 QR codes across all 9 types, 30+ scan log entries |
| `payments` | 25+ payment records across tiers |
| `outreach/leads` | 20+ CRM contacts, all statuses/stages |
| `outreach/sequences` | 3 sequences with step definitions |
| `outreach/templates` | 10 templates (all §3.4.1 types) |
| `outreach/decks` | 4 decks (Sponsor/Vendor/Investor/Partner) |
| `analytics` | Chart series data (30-90 days), funnel counts, outcome log entries |
| `dashboard` | KPI snapshot values, 10 activity feed items |

---

## 8. Responsive Layout

The admin is desktop-first (the brief names it a web admin), but should not break on laptop screens.

| Breakpoint | Sidebar | Content Grid | Notes |
|---|---|---|---|
| `xl` (1280px+) | 240px fixed | 3-col dashboard, full tables | Full layout |
| `lg` (1024px+) | 240px fixed | 2-col dashboard | Comfortable laptop |
| `md` (768px+) | 64px icons only (collapsed) | 1-col stacked | iPad landscape |
| `sm` (< 768px) | Hidden (hamburger toggle) | 1-col | Not a priority but shouldn't break |

Sidebar collapsed state persists in localStorage via `useLocalStorage` hook.

---

## 9. Key Technical Patterns

### TanStack Table — Data Table Pattern

```tsx
// shared/components/data-display/DataTable.tsx
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getFilteredRowModel, getPaginationRowModel,
  flexRender, ColumnDef
} from '@tanstack/react-table';

// Usage in any feature:
// <DataTable columns={memberColumns} data={filteredMembers} />
// Columns define: header, accessorKey, cell renderer, enableSorting
```

### Gradient Button

```tsx
// shared/components/ui/GradientButton.tsx
export function GradientButton({ children, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-brand-gradient text-white font-semibold rounded-full px-6 h-11',
        'hover:opacity-90 active:scale-[0.98] transition-all',
        className
      )}
    >
      {children}
    </button>
  );
}
```

### KPI Card (with colored top bar)

```tsx
// shared/components/data-display/StatCard.tsx
export function StatCard({ label, value, delta, deltaType, topColor }: Props) {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden">
      <div className="h-[3px] w-full" style={{ backgroundColor: topColor }} />
      <div className="p-4">
        <p className="text-[24px] font-bold text-ink">{value}</p>
        <p className="text-[10px] text-muted mt-1">{label}</p>
        <span className={cn('text-[9px] font-semibold px-2 py-0.5 rounded-full mt-2 inline-block', deltaStyles[deltaType])}>
          {delta}
        </span>
      </div>
    </div>
  );
}
```

### Slide-Over Sheet Pattern (Member / Lead Detail)

```tsx
// Using shadcn/ui Sheet (Radix Dialog with side="right")
// Triggered from table row "..." menu or row click
// Width: 480px at xl, 400px at lg, full width on md
<Sheet open={modalOpen === 'detail'} onOpenChange={closeModal}>
  <SheetContent side="right" className="w-[480px]">
    <MemberProfilePanel memberId={activeMemberId} />
  </SheetContent>
</Sheet>
```

### Recharts Bar Chart (matching Figma screens 20, 22, 24)

```tsx
// features/dashboard/components/MemberGrowthChart.tsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={180}>
  <BarChart data={weeklyData} barSize={16}>
    <XAxis dataKey="week" tick={{ fontSize: 9, fill: '#BBBBC5' }} />
    <YAxis hide />
    <Tooltip
      contentStyle={{ borderRadius: 8, border: '1px solid #E8E8EB', fontSize: 12 }}
    />
    <Bar dataKey="members" fill="url(#brandGradient)" radius={[4,4,0,0]} />
    <defs>
      <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#1A73E8" />
        <stop offset="100%" stopColor="#0DCAF0" />
      </linearGradient>
    </defs>
  </BarChart>
</ResponsiveContainer>
```

---

## 10. Sprint Execution Order

### Sprint 1 — Foundation + Shell
- Project scaffold: Next.js 15 App Router, Tailwind v4, Zustand, DM Sans
- `core/constants/` token setup
- All `shared/components/ui/` atoms: Button, Input, Badge, Card, Avatar, Dialog, Sheet, Tabs
- `AdminSidebar` + `AdminTopbar` + `(admin)/layout.tsx` — full shell renders
- `AdminLoginPage` — auth form (static, no real auth)
- `features/auth` store with dev role switcher
- `shared/components/data-display/DataTable.tsx` — TanStack Table base

### Sprint 2 — Dashboard + Members
- `features/dashboard` — full dashboard page with all widgets + charts
- `features/members` — Members table + Approvals page + Member detail slide-over
- All KPI cards, activity feed, growth chart, approval cards

### Sprint 3 — Events + Intros + Dinners
- `features/events` — Events table + Create event form + Event detail page
- `features/intros` — Intros table + detail modal + create modal
- `features/dinners` — Dinners table + credit ledger + adjust credits

### Sprint 4 — Sponsors + QR + Payments
- `features/sponsors` — Sponsor list + sponsor detail page
- `features/qr` — QR codes table + generate modal + QR display + scan log + analytics chart
- `features/payments` — Payments table + tier pricing table

### Sprint 5 — Outreach + Analytics + Polish
- `features/outreach` — All 5 sub-pages (command center, leads, sequences, templates, decks)
- `features/analytics` — Full analytics page with all charts + funnel + outcome log
- `features/notifications` — Send notification form + log
- Responsive audit (sidebar collapse, table horizontal scroll on laptop)
- CSV export functionality
- Empty state components for all tables
- Loading skeleton states (for Phase 2 API prep)

---

## 11. Additional Recommended Libraries

| Library | Purpose | Phase |
|---|---|---|
| `@tanstack/react-table` | Headless table logic for all data tables | 1 |
| `recharts` | Bar, area, line, pie, funnel charts | 1 |
| `react-hook-form` | Event creation form, add lead form, template editor | 1 |
| `zod` | Schema validation for all forms | 1 |
| `date-fns` | Format dates across all tables and event pages | 1 |
| `lucide-react` | All icons (sidebar, table actions, badges) | 1 |
| `clsx` + `tailwind-merge` | Conditional class merging (standard shadcn/ui util) | 1 |
| `tailwindcss-animate` | shadcn/ui animation primitives (dialog slide-in, etc.) | 1 |
| `@radix-ui/*` | Via shadcn/ui: Dialog, Sheet, Dropdown, Tabs, Checkbox, Switch, Tooltip | 1 |
| `cmdk` | Command palette — `Cmd+K` quick nav between admin sections | 1 |
| `sonner` | Toast notifications for approve/decline/save actions | 1 |
| `@tanstack/react-query` | Server state, caching, mutations when API arrives | 2 |
| `@supabase/supabase-js` | Direct Supabase client for auth + data | 2 |
| `next-themes` | Dark mode support (future enhancement) | Later |

---

## 12. Phase 2 — API Transition Plan

The feature-based structure makes the Phase 1 → Phase 2 swap surgical:

- Each `features/<name>/data/mock*.ts` → replaced by a `features/<name>/api/*.ts` file with `useQuery()` hooks
- Zustand store shapes stay identical — only data source changes
- Add `@tanstack/react-query` as the async data layer; Zustand keeps only UI state (filters, modals, selection)
- **Backend (brief §9 recommendation):** Supabase for auth + Postgres data layer
- **Auth:** Replace static login with Supabase magic link → `supabase.auth.signInWithOtp()`
- **Data:** Replace mock imports with `supabase.from('members').select()` etc.
- **Real-time:** Supabase `channel().on()` subscriptions power live activity feed and LIVE dot on sponsor dashboard
- **QR codes:** Connect `GenerateQRModal` to a Dub.co API call (brief §9 recommendation for branded short links)
- **Email sending:** Wire `QuickSendCard` to SendGrid / Resend (brief §6 integrations)
- **Payments:** Add Stripe dashboard links from `PaymentsTable` rows

---

## 13. File Naming Conventions

Same conventions as mobile for consistency:

| Type | Convention | Example |
|---|---|---|
| Next.js pages | `page.tsx` (App Router convention) | `app/(admin)/members/page.tsx` |
| Feature pages | PascalCase + `Page` suffix | `MembersPage.tsx` |
| Feature components | PascalCase | `ApprovalCard.tsx` |
| Shared UI atoms | PascalCase | `GradientButton.tsx` |
| Zustand stores | camelCase + `use` + `Store` | `useMembersStore.ts` |
| Mock data | camelCase + `mock` prefix | `mockMembers.ts` |
| Types | `types.ts` per feature | `features/members/types.ts` |
| Hooks | camelCase + `use` prefix | `useTableFilters.ts` |
| Utils | camelCase | `formatters.ts` |

---

## 14. Setup Commands

```bash
# Bootstrap
npx create-next-app@latest tcs-admin --typescript --tailwind --app --src-dir=false
cd tcs-admin

# State
npm install zustand immer

# UI base (shadcn/ui setup)
npx shadcn@latest init
# → Base color: neutral, CSS variables: yes
# Add components as needed:
npx shadcn@latest add button input dialog sheet tabs dropdown-menu checkbox switch tooltip

# Tables
npm install @tanstack/react-table

# Charts
npm install recharts

# Forms
npm install react-hook-form zod @hookform/resolvers

# Utilities
npm install date-fns clsx tailwind-merge lucide-react

# Extras
npm install cmdk sonner tailwindcss-animate

# Dev tools
npm install --save-dev @types/node
```

---

*Built from: Figma Summit file — Admin screens 09, 10 + Sponsor screens 20–25 (reference designs for component fidelity) + TechCatalystSummit_DeveloperBuildBrief.docx v1.0 (Modules 1–12 + Add-On Outreach Module)*

*Architecture: Feature-based — same dependency rule as mobile (`features → shared → core`). App Router pages are thin wrappers. All domain logic, mock data, and store slices co-located per feature. Phase 2 API swap is one file per feature — no architectural change required.*
