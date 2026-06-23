import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHookWithClient, waitFor } from "@/test/test-utils";
import { useOutcomesList } from "./queries";

vi.mock("@/features/auth/api/session", () => ({
  getAccessToken: vi.fn().mockResolvedValue("test-token"),
}));

describe("useOutcomesList", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:4000");
  });

  it("loads outcomes list", async () => {
    const { result } = await renderHookWithClient(() => useOutcomesList({ perPage: 10 }));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.outcomes).toEqual([]);
  });
});
