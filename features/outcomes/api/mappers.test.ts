import { describe, expect, it } from "vitest";
import { mapApiOutcome } from "./mappers";
import type { ApiOutcome } from "./mappers";

const baseOutcome: ApiOutcome = {
  id: "o1111111-1111-4111-8111-111111111111",
  userAId: "a1111111-1111-4111-8111-111111111111",
  userBId: "b2222222-2222-4222-8222-222222222222",
  outcomeType: "meeting_completed",
  estimatedValue: 50000,
  notes: "Productive meeting",
  createdAt: "2025-06-18T10:00:00.000Z",
};

describe("outcome mappers", () => {
  it("maps API outcome to OutcomeLogEntry", () => {
    const entry = mapApiOutcome(baseOutcome);
    expect(entry.id).toBe(baseOutcome.id);
    expect(entry.outcomeType).toBe("Meeting Completed");
    expect(entry.estimatedValue).toBe(50000);
    expect(entry.connection).toContain("a1111111");
    expect(entry.connection).toContain("b2222222");
  });
});
