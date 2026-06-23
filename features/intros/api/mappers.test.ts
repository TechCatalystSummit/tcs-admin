import { describe, expect, it } from "vitest";
import { mapApiIntro } from "./mappers";
import type { ApiIntro } from "./mappers";

const base: ApiIntro = {
  id: "i1",
  from_user_id: "a",
  to_user_id: "b",
  reason: "partnership",
  status: "pending",
  created_at: "2025-06-01T00:00:00.000Z",
  from: { id: "a", name: "Alice", title: "CEO", company: "A Inc" },
  to: { id: "b", name: "Bob", title: "CTO", company: "B LLC" },
};

describe("intro mappers", () => {
  it("maps API intro to IntroRequest", () => {
    const intro = mapApiIntro(base);
    expect(intro.fromMember.name).toBe("Alice");
    expect(intro.toMember.name).toBe("Bob");
    expect(intro.reason).toBe("partnership");
    expect(intro.status).toBe("pending");
  });

  it("maps unknown reason to other", () => {
    const intro = mapApiIntro({ ...base, reason: "dinner_meeting" });
    expect(intro.reason).toBe("other");
  });
});
