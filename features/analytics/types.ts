import type { TierId } from "@/core/constants/tiers";

export type DateRange = "7d" | "30d" | "90d" | "custom";

export interface AnalyticsKPIs {
  connectionsMade: number;
  introsAccepted: number;
  meetingsCompleted: number;
  revenueInfluenced: number;
}

export interface WeeklyGrowthPoint {
  week: string;
  community: number;
  builder: number;
  executive: number;
  partner: number;
}

export interface FunnelStep {
  label: string;
  count: number;
  color: string;
}

export interface RevenueByTierPoint {
  tier: TierId;
  label: string;
  value: number;
  color: string;
}

export interface TopEventRow {
  id: string;
  event: string;
  date: string;
  attendance: number;
  intros: number;
  deals: number;
  estimatedRoi: number;
}

export interface OutcomeLogEntry {
  id: string;
  connection: string;
  date: string;
  outcomeType: string;
  estimatedValue: number;
  notes?: string;
}

export interface AnalyticsChartSeries {
  weeklyGrowth: WeeklyGrowthPoint[];
  funnel: FunnelStep[];
  revenueByTier: RevenueByTierPoint[];
  topEvents: TopEventRow[];
  outcomes: OutcomeLogEntry[];
}
