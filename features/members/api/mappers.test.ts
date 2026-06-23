import { describe, expect, it } from "vitest";
import { deriveStatus, mapPendingToApproval, mapProfileToAdminMember } from "./mappers";
import type { ApiProfile } from "./types";

const baseProfile: ApiProfile = {
  id: "a1111111-1111-4111-8111-111111111111",
  role: "member",
  name: "Jane Doe",
  email: "jane@example.com",
  title: "CEO",
  company: "Acme Inc",
  city: "Austin",
  bio: "Building fintech.",
  isVerified: true,
  isApproved: true,
  createdAt: "2025-01-15T10:00:00.000Z",
  tier: "builder",
  membership: {
    id: "m1",
    status: "active",
    tier: { id: "t1", name: "builder", annualPrice: 99900 },
  },
};

describe("member mappers", () => {
  it("maps profile to AdminMember", () => {
    const member = mapProfileToAdminMember(baseProfile);
    expect(member.name).toBe("Jane Doe");
    expect(member.tier).toBe("builder");
    expect(member.status).toBe("active");
    expect(member.mrr).toBe(83);
  });

  it("derives pending status", () => {
    expect(deriveStatus({ ...baseProfile, isApproved: false })).toBe("pending");
  });

  it("maps pending to approval request", () => {
    const approval = mapPendingToApproval({ ...baseProfile, isApproved: false });
    expect(approval.status).toBe("pending");
    expect(approval.memberId).toBe(baseProfile.id);
  });
});
