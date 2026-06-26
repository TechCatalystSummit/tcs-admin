import type { ActivityItem } from "@/shared/types/activity";
import type { ChartPoint, DashboardKPI } from "../types";
import type { ApiDashboardStats } from "./dashboardQueries";

const KPI_COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", "#EC4899"];

export function mapDashboardKpis(stats: ApiDashboardStats): DashboardKPI[] {
  const mtdDollars = Math.round(stats.revenue.mtdCents / 100);
  return [
    {
      label: "Total Members",
      value: stats.members.total,
      delta: "Live",
      deltaType: "positive",
      topColor: KPI_COLORS[0]!,
    },
    {
      label: "Pending Approvals",
      value: stats.members.pending,
      delta: "Queue",
      deltaType: "neutral",
      topColor: KPI_COLORS[1]!,
    },
    {
      label: "Upcoming Events",
      value: stats.events.upcoming,
      delta: "Scheduled",
      deltaType: "positive",
      topColor: KPI_COLORS[2]!,
    },
    {
      label: "Pending Intros",
      value: stats.intros.pending,
      delta: "Queue",
      deltaType: "neutral",
      topColor: KPI_COLORS[3]!,
    },
    {
      label: "Revenue (MTD)",
      value: `$${mtdDollars.toLocaleString()}`,
      delta: "MTD",
      deltaType: "positive",
      topColor: KPI_COLORS[4]!,
    },
  ];
}

export function mapRevenueTrend(stats: ApiDashboardStats): ChartPoint[] {
  return stats.trends.revenueByMonth.map((m) => ({
    label: m.label,
    value: Math.round(m.valueCents / 100),
  }));
}

export function mapSignupTrend(stats: ApiDashboardStats): ChartPoint[] {
  return stats.trends.signupsByWeek.map((w) => ({
    label: w.label,
    value: w.count,
  }));
}

function formatOutcomeType(type: string): string {
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function outcomeActivityType(outcomeType: string): ActivityItem["type"] {
  const t = outcomeType.toLowerCase();
  if (t.includes("payment") || t.includes("deal") || t.includes("revenue")) return "payment";
  if (t.includes("event")) return "event";
  return "intro";
}

export function buildActivityFeedFromStats(stats: ApiDashboardStats): ActivityItem[] {
  type Sortable = ActivityItem & { sortAt: string };
  const items: Sortable[] = [];

  for (const o of stats.recentOutcomes) {
    items.push({
      id: `outcome-${o.id}`,
      message: `${formatOutcomeType(o.outcomeType)} logged`,
      time: o.createdAt,
      sortAt: o.createdAt,
      type: outcomeActivityType(o.outcomeType),
    });
  }

  for (const m of stats.recentSignups) {
    items.push({
      id: `member-${m.id}`,
      message: `${m.name} joined (${m.company || "—"})`,
      time: m.joinedAt,
      sortAt: m.joinedAt,
      type: "member",
    });
  }

  if (stats.members.pending > 0) {
    const now = new Date().toISOString();
    items.push({
      id: "pending-approvals",
      message: `${stats.members.pending} member${stats.members.pending === 1 ? "" : "s"} awaiting approval`,
      time: now,
      sortAt: now,
      type: "member",
    });
  }

  return items
    .sort((a, b) => b.sortAt.localeCompare(a.sortAt))
    .slice(0, 8)
    .map(({ sortAt: _sortAt, time, ...item }) => ({
      ...item,
      time: item.id === "pending-approvals" ? "Now" : formatActivityTime(time),
    }));
}

function formatActivityTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}
