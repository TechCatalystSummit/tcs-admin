import { describe, expect, it, vi, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/handlers";
import { renderHookWithClient, waitFor } from "@/test/test-utils";
import { useMembershipTiers } from "./tiers";

vi.mock("@/features/auth/api/session", () => ({
  getAccessToken: vi.fn().mockResolvedValue("test-token"),
}));

describe("useMembershipTiers", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:4000");
  });

  it("returns API tiers when available", async () => {
    const { result } = await renderHookWithClient(() => useMembershipTiers());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.fromApi).toBe(true);
    expect(result.current.data?.rows[0]?.id).toBe("builder");
  });

  it("falls back to static tiers when API fails", async () => {
    server.use(
      http.get("http://localhost:4000/api/membership/tiers", () =>
        HttpResponse.json(
          { success: false, error: { code: "INTERNAL_ERROR", message: "fail" } },
          { status: 500 },
        ),
      ),
    );

    const { result } = await renderHookWithClient(() => useMembershipTiers());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.apiFailed).toBe(true);
    expect(result.current.data?.fromApi).toBe(false);
    expect(result.current.data?.rows.length).toBeGreaterThan(0);
  });
});
