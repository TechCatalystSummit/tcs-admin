import { describe, expect, it } from "vitest";
import { buildActivityFeedFromStats } from "./mappers";
import type { ApiDashboardStats } from "./dashboardQueries";

const stats: ApiDashboardStats = {
  members: { total: 10, approved: 8, pending: 2 },
  events: { upcoming: 1, totalRsvps: 5 },
  intros: { pending: 0, approved: 0, completed: 0 },
  revenue: { mtdCents: 0, activeSubscriptions: 0 },
  trends: { revenueByMonth: [], signupsByWeek: [] },
  recentSignups: [
    { id: "m1", name: "Jane", company: "Acme", joinedAt: new Date().toISOString() },
  ],
  recentOutcomes: [
    {
      id: "o1",
      outcomeType: "meeting_completed",
      createdAt: new Date().toISOString(),
    },
  ],
  outreach: { activeCampaigns: 0, emailsSent30d: 0 },
  outcomes: { estimatedValueTotal: 0 },
};

describe("dashboard activity feed", () => {
  it("includes outcomes, signups, and pending summary", () => {
    const items = buildActivityFeedFromStats(stats);
    expect(items.some((i) => i.message.includes("awaiting approval"))).toBe(true);
    expect(items.some((i) => i.message.includes("Jane"))).toBe(true);
    expect(items.some((i) => i.message.includes("Meeting Completed"))).toBe(true);
  });
});
