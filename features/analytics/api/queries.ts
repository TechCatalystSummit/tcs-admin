import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import type { DateRange } from "../types";

export const analyticsKeys = {
  all: ["analytics"] as const,
  summary: (range: DateRange) => [...analyticsKeys.all, "summary", range] as const,
};

export interface ApiAnalyticsSummary {
  kpis: {
    connectionsMade: number;
    introsAccepted: number;
    meetingsCompleted: number;
    revenueInfluenced: number;
    deltas: {
      connectionsMade: number;
      introsAccepted: number;
      meetingsCompleted: number;
      revenueInfluenced: number;
    };
  };
  weeklyGrowth: Array<{
    week: string;
    community: number;
    builder: number;
    executive: number;
    partner: number;
  }>;
  funnel: Array<{ label: string; count: number }>;
  revenueByTier: Array<{ tier: string; valueCents: number }>;
  topEvents: Array<{
    id: string;
    name: string;
    date: string;
    attendance: number;
    intros: number;
    deals: number;
    estimatedRoi: number;
  }>;
}

export type ApiAnalyticsRange = "7d" | "30d" | "90d";

function toApiRange(range: DateRange): ApiAnalyticsRange {
  if (range === "7d" || range === "90d") return range;
  return "30d";
}

export function useAnalyticsSummary(range: DateRange) {
  const apiRange = toApiRange(range);
  return useQuery({
    queryKey: analyticsKeys.summary(range),
    queryFn: async () => {
      const { data } = await apiFetch<ApiAnalyticsSummary>("/api/analytics/summary", {
        params: { range: apiRange },
      });
      return data;
    },
    enabled: range !== "custom",
  });
}

export { useOutcomesList } from "@/features/outcomes/api/queries";
