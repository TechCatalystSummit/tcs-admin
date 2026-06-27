import { describe, expect, it } from "vitest";
import { mapApiDinner } from "./mappers";
import type { ApiDinner } from "./mappers";

describe("dinner mappers", () => {
  it("maps API dinner to DinnerRequest with member and offering", () => {
    const row: ApiDinner = {
      id: "d1",
      userId: "u1",
      offeringId: "o1",
      offering: { id: "o1", title: "CTO Dinner", subtitle: "NYC" },
      whoToMeet: "Investor",
      dinnerPurpose: "Fundraise",
      budgetRange: "$200-300",
      status: "under_review",
      creditsUsed: 1,
      createdAt: "2025-06-01T00:00:00.000Z",
    };
    const dinner = mapApiDinner(row, { name: "Jane Doe", company: "Acme" });
    expect(dinner.status).toBe("under_review");
    expect(dinner.purpose).toBe("Fundraise");
    expect(dinner.requesterName).toBe("Jane Doe");
    expect(dinner.offeringTitle).toBe("CTO Dinner");
    expect(dinner.budgetRange).toBe("$200-300");
    expect(dinner.whoToMeet).toBe("Investor");
  });

  it("maps scheduled status", () => {
    const row: ApiDinner = {
      id: "d1",
      userId: "u1",
      dinnerPurpose: "Fundraise",
      status: "scheduled",
      scheduledAt: "2025-07-01T18:00:00.000Z",
      creditsUsed: 1,
      createdAt: "2025-06-01T00:00:00.000Z",
    };
    const dinner = mapApiDinner(row);
    expect(dinner.status).toBe("scheduled");
    expect(dinner.scheduledDate).toBe("2025-07-01T18:00:00.000Z");
  });
});
