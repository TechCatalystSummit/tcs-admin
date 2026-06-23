import { describe, expect, it } from "vitest";
import {
  bucketMembersByWeek,
  bucketPaymentsByMonth,
  buildActivityFeed,
} from "./aggregations";
import type { AdminMember } from "@/features/members/types";
import type { Payment } from "@/features/payments/types";
import type { ApiOutcome } from "@/features/outcomes/api/mappers";

const member: AdminMember = {
  id: "m1",
  name: "Jane",
  email: "j@x.com",
  phone: "",
  title: "CEO",
  company: "Acme",
  city: "Austin",
  tier: "builder",
  role: "member",
  status: "active",
  isVerified: true,
  joinedAt: new Date().toISOString(),
  eventsAttended: 0,
  introsRequested: 0,
  introsReceived: 0,
  mrr: 83,
  bio: "",
  lookingFor: [],
  canOffer: [],
};

const payment: Payment = {
  id: "p1",
  memberId: "m1",
  memberName: "Jane",
  memberEmail: "",
  amount: 100,
  tier: "builder",
  status: "paid",
  method: "card",
  paidAt: new Date().toISOString().slice(0, 10),
};

describe("dashboard aggregations", () => {
  it("buckets payments by month", () => {
    const rows = bucketPaymentsByMonth([payment]);
    expect(rows).toHaveLength(6);
    expect(rows.some((r) => r.value > 0)).toBe(true);
  });

  it("buckets members by week", () => {
    const rows = bucketMembersByWeek([member]);
    expect(rows).toHaveLength(6);
  });

  it("builds activity feed from outcomes and members", () => {
    const outcome: ApiOutcome = {
      id: "o1",
      userAId: "a1111111-1111-4111-8111-111111111111",
      userBId: "b2222222-2222-4222-8222-222222222222",
      outcomeType: "meeting_completed",
      createdAt: new Date().toISOString(),
    };
    const items = buildActivityFeed({
      members: [member],
      outcomes: [outcome],
      pendingCount: 2,
    });
    expect(items.length).toBeGreaterThan(0);
    expect(items.some((i) => i.message.includes("awaiting approval"))).toBe(true);
  });
});
