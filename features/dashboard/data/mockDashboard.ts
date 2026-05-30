import type { ActivityItem, ChartPoint, DashboardKPI, PendingApproval } from "./mockDashboard.types";

export type { ActivityItem, ChartPoint, DashboardKPI, PendingApproval };

export const dashboardKPIs: DashboardKPI[] = [
  {
    label: "Total Members",
    value: "1,247",
    delta: "+12% vs last month",
    deltaType: "positive",
    topColor: "#0D9E75",
  },
  {
    label: "Pending Approvals",
    value: 47,
    delta: "+8 today",
    deltaType: "neutral",
    topColor: "#F37D18",
  },
  {
    label: "Monthly Recurring Revenue",
    value: "$84,200",
    delta: "+5.2% MoM",
    deltaType: "positive",
    topColor: "#D0A84A",
  },
  {
    label: "Active Events",
    value: 6,
    delta: "2 live now",
    deltaType: "neutral",
    topColor: "#1A73E8",
  },
];

export const activityFeed: ActivityItem[] = [
  { id: "1", message: "Sarah Chen approved for Executive tier", time: "2 min ago", type: "member" },
  { id: "2", message: "TCS Miami 2026 RSVP count hit 200", time: "15 min ago", type: "event" },
  { id: "3", message: "Intro approved: Marcus Webb → Elena Rodriguez", time: "32 min ago", type: "intro" },
  { id: "4", message: "New payment: $833 from James Park", time: "1 hr ago", type: "payment" },
  { id: "5", message: "Victoria Hayes submitted membership application", time: "2 hr ago", type: "member" },
  { id: "6", message: "QR scan spike: Sponsor booth +45 scans", time: "3 hr ago", type: "event" },
  { id: "7", message: "Intro completed: David Kim ↔ Aisha Patel", time: "4 hr ago", type: "intro" },
  { id: "8", message: "Executive dinner request from Ryan O'Brien", time: "5 hr ago", type: "member" },
  { id: "9", message: "New Builder tier signup: Amy Liu", time: "6 hr ago", type: "member" },
  { id: "10", message: "TCS Summit 2026 agenda published", time: "8 hr ago", type: "event" },
];

export const revenueChartData: ChartPoint[] = [
  { label: "May 1", value: 72000 },
  { label: "May 5", value: 73500 },
  { label: "May 10", value: 74800 },
  { label: "May 15", value: 76200 },
  { label: "May 20", value: 78100 },
  { label: "May 25", value: 82000 },
  { label: "May 30", value: 84200 },
];

export const memberGrowthData: ChartPoint[] = [
  { label: "W1", value: 18, tier: "builder" },
  { label: "W2", value: 24, tier: "executive" },
  { label: "W3", value: 31, tier: "builder" },
  { label: "W4", value: 22, tier: "community" },
  { label: "W5", value: 28, tier: "executive" },
  { label: "W6", value: 35, tier: "builder" },
];

export const pendingApprovals: PendingApproval[] = [
  { id: "apr_001", name: "Victoria Hayes", company: "Innovate.io", tier: "executive", submittedAt: "2026-05-28" },
  { id: "apr_002", name: "Michael Torres", company: "FinTech Co", tier: "builder", submittedAt: "2026-05-27" },
  { id: "apr_003", name: "Jennifer Walsh", company: "HealthTech Solutions", tier: "executive", submittedAt: "2026-05-26" },
  { id: "apr_004", name: "Robert Chen", company: "AI Startup", tier: "builder", submittedAt: "2026-05-25" },
  { id: "apr_005", name: "Amanda Foster", company: "Summit Ventures", tier: "executive", submittedAt: "2026-05-24" },
];
