import { describe, expect, it } from "vitest";
import { mapApiDinner } from "./mappers";
import type { ApiDinner } from "./mappers";

describe("dinner mappers", () => {
  it("maps API dinner to DinnerRequest", () => {
    const row: ApiDinner = {
      id: "d1",
      userId: "u1",
      whoToMeet: "Investor",
      dinnerPurpose: "Fundraise",
      status: "scheduled",
      scheduledAt: "2025-07-01T18:00:00.000Z",
      creditsUsed: 1,
      createdAt: "2025-06-01T00:00:00.000Z",
    };
    const dinner = mapApiDinner(row);
    expect(dinner.status).toBe("scheduled");
    expect(dinner.purpose).toBe("Fundraise");
    expect(dinner.creditsUsed).toBe(1);
  });
});
