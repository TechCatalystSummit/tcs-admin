import { describe, expect, it } from "vitest";
import { mapDashboardKpis } from "./mappers";
import type { ApiDashboardStats } from "./dashboardQueries";

describe("useDashboardStats integration", () => {
  it("maps stats independently of pending approvals data", () => {
    const stats: ApiDashboardStats = {
      members: { total: 50, approved: 45, pending: 5 },
      events: { upcoming: 2, totalRsvps: 10 },
      intros: { pending: 1, approved: 0, completed: 0 },
      revenue: { mtdCents: 99_900, activeSubscriptions: 3 },
      trends: {
        revenueByMonth: Array.from({ length: 6 }, (_, i) => ({
          label: `M${i}`,
          valueCents: i * 1000,
        })),
        signupsByWeek: Array.from({ length: 6 }, (_, i) => ({
          label: `W${i}`,
          count: i,
        })),
      },
      recentSignups: [],
      recentOutcomes: [],
      outreach: { activeCampaigns: 0, emailsSent30d: 0 },
      outcomes: { estimatedValueTotal: 0 },
    };

    const kpis = mapDashboardKpis(stats);
    expect(kpis[0]?.value).toBe(50);
    expect(kpis[1]?.value).toBe(5);
    // Stats KPIs do not depend on pending list fetch succeeding
    expect(kpis.every((k) => k.label.length > 0)).toBe(true);
  });
});
