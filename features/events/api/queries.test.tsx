import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHookWithClient, waitFor } from "@/test/test-utils";
import { useAdminEvents, useEvent } from "./queries";

vi.mock("@/features/auth/api/session", () => ({
  getAccessToken: vi.fn().mockResolvedValue("test-token"),
}));

describe("useAdminEvents", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:4000");
  });

  it("loads admin events", async () => {
    const { result } = await renderHookWithClient(() => useAdminEvents());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.events[0]?.title).toBe("Demo Night");
  });
});

describe("useEvent", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:4000");
  });

  it("loads admin event detail including draft status", async () => {
    const { result } = await renderHookWithClient(() => useEvent("e1"));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.title).toBe("Demo Night");
    expect(result.current.data?.status).toBe("draft");
    expect(result.current.data?.speakers).toHaveLength(1);
  });
});
