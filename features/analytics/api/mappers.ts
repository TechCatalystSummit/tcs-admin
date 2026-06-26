import { TIERS } from "@/core/constants/tiers";
import type { TierId } from "@/core/constants/tiers";
import type {
  AnalyticsChartSeries,
  AnalyticsKPIs,
  FunnelStep,
  RevenueByTierPoint,
  TopEventRow,
} from "../types";
import type { ApiAnalyticsSummary } from "./queries";

const FUNNEL_COLORS = ["#888899", "#1A73E8", "#0DCAF0", "#0D9E75", "#D0A84A"];

const TIER_COLORS: Record<string, string> = {
  community: "#888899",
  builder: "#1A73E8",
  executive: "#D0A84A",
  partner: "#6B3AC9",
  legacy: "#0D9E75",
};

const tierLabelById = Object.fromEntries(TIERS.map((t) => [t.id, t.label]));

export function formatDeltaPct(pct: number): string {
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct}% vs prior period`;
}

export function deltaTypeFromPct(pct: number): "positive" | "negative" | "neutral" {
  if (pct > 0) return "positive";
  if (pct < 0) return "negative";
  return "neutral";
}

export function mapAnalyticsKpis(summary: ApiAnalyticsSummary): AnalyticsKPIs & {
  deltas: ApiAnalyticsSummary["kpis"]["deltas"];
} {
  return {
    connectionsMade: summary.kpis.connectionsMade,
    introsAccepted: summary.kpis.introsAccepted,
    meetingsCompleted: summary.kpis.meetingsCompleted,
    revenueInfluenced: summary.kpis.revenueInfluenced,
    deltas: summary.kpis.deltas,
  };
}

export function mapAnalyticsChartSeries(summary: ApiAnalyticsSummary): AnalyticsChartSeries {
  const revenueByTier: RevenueByTierPoint[] = summary.revenueByTier.map((row) => {
    const tier = row.tier as TierId;
    return {
      tier,
      label: tierLabelById[tier] ?? row.tier,
      value: Math.round(row.valueCents / 100),
      color: TIER_COLORS[row.tier] ?? "#888899",
    };
  });

  for (const tier of TIERS) {
    if (!revenueByTier.some((r) => r.tier === tier.id)) {
      revenueByTier.push({
        tier: tier.id,
        label: tier.label,
        value: 0,
        color: TIER_COLORS[tier.id] ?? "#888899",
      });
    }
  }

  const funnel: FunnelStep[] = summary.funnel.map((step, index) => ({
    label: step.label,
    count: step.count,
    color: FUNNEL_COLORS[index] ?? "#888899",
  }));

  const topEvents: TopEventRow[] = summary.topEvents.map((event) => ({
    id: event.id,
    event: event.name,
    date: event.date,
    attendance: event.attendance,
    intros: event.intros,
    deals: event.deals,
    estimatedRoi: event.estimatedRoi,
  }));

  return {
    weeklyGrowth: summary.weeklyGrowth,
    funnel,
    revenueByTier,
    topEvents,
    outcomes: [],
  };
}
