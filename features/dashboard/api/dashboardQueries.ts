import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
};

export interface ApiDashboardStats {
  members: { total: number; approved: number; pending: number; totalDeltaPct?: number };
  events: { upcoming: number; totalRsvps: number; rsvpsDeltaPct?: number };
  intros: { pending: number; approved: number; completed: number; completedDeltaPct?: number };
  revenue: { mtdCents: number; activeSubscriptions: number; mtdDeltaPct?: number };
  trends: {
    revenueByMonth: { label: string; valueCents: number }[];
    signupsByWeek: { label: string; count: number }[];
  };
  recentSignups: { id: string; name: string; company: string; joinedAt: string }[];
  recentOutcomes: { id: string; outcomeType: string; createdAt: string }[];
  outreach: { activeCampaigns: number; emailsSent30d: number };
  outcomes: { estimatedValueTotal: number };
}

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const { data } = await apiFetch<ApiDashboardStats>("/api/analytics/dashboard");
      return data;
    },
  });
}
