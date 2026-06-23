import { describe, expect, it, vi, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/handlers";
import { renderHookWithClient, waitFor } from "@/test/test-utils";
import { useMembersList } from "./queries";

vi.mock("@/features/auth/api/session", () => ({
  getAccessToken: vi.fn().mockResolvedValue("test-token"),
}));

describe("useMembersList", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:4000");
  });

  it("loads members on success", async () => {
    const { result } = await renderHookWithClient(() => useMembersList());

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.members).toHaveLength(1);
    expect(result.current.data?.members[0]?.name).toBe("Jane Doe");
  });

  it("surfaces API errors", async () => {
    server.use(
      http.get("http://localhost:4000/api/members", () =>
        HttpResponse.json(
          { success: false, error: { code: "INTERNAL_ERROR", message: "Server down" } },
          { status: 500 },
        ),
      ),
    );

    const { result } = await renderHookWithClient(() => useMembersList());

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeTruthy();
  });
});
