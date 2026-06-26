import { describe, expect, it } from "vitest";
import {
  buildActivityFeedFromStats,
  mapDashboardKpis,
  mapRevenueTrend,
  mapSignupTrend,
} from "./mappers";
import type { ApiDashboardStats } from "./dashboardQueries";

const baseStats: ApiDashboardStats = {
  members: { total: 120, approved: 100, pending: 3 },
  events: { upcoming: 4, totalRsvps: 50 },
  intros: { pending: 2, approved: 1, completed: 5 },
  revenue: { mtdCents: 150_000, activeSubscriptions: 10 },
  trends: {
    revenueByMonth: [
      { label: "Jan", valueCents: 0 },
      { label: "Feb", valueCents: 5000 },
      { label: "Mar", valueCents: 0 },
      { label: "Apr", valueCents: 0 },
      { label: "May", valueCents: 0 },
      { label: "Jun", valueCents: 10000 },
    ],
    signupsByWeek: [
      { label: "May 1", count: 1 },
      { label: "May 8", count: 0 },
      { label: "May 15", count: 2 },
      { label: "May 22", count: 0 },
      { label: "May 29", count: 0 },
      { label: "Jun 5", count: 1 },
    ],
  },
  recentSignups: [
    {
      id: "m1",
      name: "Jane",
      company: "Acme",
      joinedAt: "2026-06-20T10:00:00.000Z",
    },
  ],
  recentOutcomes: [
    {
      id: "o1",
      outcomeType: "meeting_completed",
      createdAt: "2026-06-21T10:00:00.000Z",
    },
  ],
  outreach: { activeCampaigns: 0, emailsSent30d: 0 },
  outcomes: { estimatedValueTotal: 0 },
};

describe("dashboard mappers", () => {
  it("maps KPIs from stats", () => {
    const kpis = mapDashboardKpis(baseStats);
    expect(kpis).toHaveLength(5);
    expect(kpis[0]?.value).toBe(120);
    expect(kpis[2]?.label).toBe("Upcoming Events");
    expect(kpis[4]?.value).toBe("$1,500");
  });

  it("maps revenue and signup trends", () => {
    expect(mapRevenueTrend(baseStats)).toHaveLength(6);
    expect(mapSignupTrend(baseStats)).toHaveLength(6);
    expect(mapRevenueTrend(baseStats).some((p) => p.value > 0)).toBe(true);
  });

  it("builds sorted activity feed with pending summary", () => {
    const items = buildActivityFeedFromStats(baseStats);
    expect(items.length).toBeGreaterThan(0);
    expect(items.some((i) => i.message.includes("awaiting approval"))).toBe(true);
    expect(items.some((i) => i.message.includes("Jane"))).toBe(true);
  });
});
