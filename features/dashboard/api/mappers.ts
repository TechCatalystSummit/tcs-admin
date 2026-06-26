import type { ActivityItem } from "@/shared/types/activity";
import type { ChartPoint, DashboardKPI } from "../types";
import type { ApiDashboardStats } from "./dashboardQueries";

const KPI_COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", "#EC4899"];

function formatDashboardDelta(pct: number | undefined, fallback: string): string {
  if (pct === undefined) return fallback;
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct}% vs prior 30d`;
}

function deltaTypeFromPct(pct: number | undefined): "positive" | "negative" | "neutral" {
  if (pct === undefined) return "neutral";
  if (pct > 0) return "positive";
  if (pct < 0) return "negative";
  return "neutral";
}

export function mapDashboardKpis(stats: ApiDashboardStats): DashboardKPI[] {
  const mtdDollars = Math.round(stats.revenue.mtdCents / 100);
  return [
    {
      label: "Total Members",
      value: stats.members.total,
      delta: formatDashboardDelta(stats.members.totalDeltaPct, "All time"),
      deltaType:
        stats.members.totalDeltaPct !== undefined
          ? deltaTypeFromPct(stats.members.totalDeltaPct)
          : "positive",
      topColor: KPI_COLORS[0]!,
    },
    {
      label: "Pending Approvals",
      value: stats.members.pending,
      delta: stats.members.pending > 0 ? "In queue" : "Clear",
      deltaType: stats.members.pending > 0 ? "neutral" : "positive",
      topColor: KPI_COLORS[1]!,
    },
    {
      label: "Upcoming Events",
      value: stats.events.upcoming,
      delta: formatDashboardDelta(stats.events.rsvpsDeltaPct, "Scheduled"),
      deltaType:
        stats.events.rsvpsDeltaPct !== undefined
          ? deltaTypeFromPct(stats.events.rsvpsDeltaPct)
          : "positive",
      topColor: KPI_COLORS[2]!,
    },
    {
      label: "Pending Intros",
      value: stats.intros.pending,
      delta: stats.intros.pending > 0 ? "In queue" : "Clear",
      deltaType: stats.intros.pending > 0 ? "neutral" : "positive",
      topColor: KPI_COLORS[3]!,
    },
    {
      label: "Revenue (MTD)",
      value: `$${mtdDollars.toLocaleString()}`,
      delta: formatDashboardDelta(stats.revenue.mtdDeltaPct, "Month to date"),
      deltaType:
        stats.revenue.mtdDeltaPct !== undefined
          ? deltaTypeFromPct(stats.revenue.mtdDeltaPct)
          : "positive",
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
