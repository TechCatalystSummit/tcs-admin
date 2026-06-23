import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHookWithClient, waitFor } from "@/test/test-utils";
import { useAdminEvents } from "./queries";

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
