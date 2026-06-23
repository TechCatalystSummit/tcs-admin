import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { apiFetch } from "./client";
import { ApiError } from "./types";

describe("apiFetch", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:4000");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("parses success envelope", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true, data: { id: "1" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const result = await apiFetch<{ id: string }>("/api/me", { token: "test-token" });
    expect(result.data).toEqual({ id: "1" });
  });

  it("parses paginated meta", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: true,
          data: [],
          meta: { page: 1, perPage: 25, total: 0 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    const result = await apiFetch<unknown[]>("/api/members", { token: "t" });
    expect(result.meta).toEqual({ page: 1, perPage: 25, total: 0 });
  });

  it("throws ApiError on failure envelope", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: false,
          error: { code: "UNAUTHORIZED", message: "Invalid token" },
        }),
        { status: 401, headers: { "Content-Type": "application/json" } },
      ),
    );

    await expect(apiFetch("/api/me", { token: "bad" })).rejects.toMatchObject({
      status: 401,
      code: "UNAUTHORIZED",
    } satisfies Partial<ApiError>);
  });

  it("appends query params", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true, data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await apiFetch("/api/members", { token: "t", params: { page: 1, search: "austin" } });

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:4000/api/members?page=1&search=austin",
      expect.objectContaining({
        headers: expect.any(Headers),
      }),
    );
  });

  it("returns empty data for 204 No Content", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 204 }));

    const result = await apiFetch<null>("/api/resource", { token: "t" });
    expect(result.data).toBeUndefined();
  });

  it("throws ApiError on 403", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          success: false,
          error: { code: "FORBIDDEN", message: "Forbidden" },
        }),
        { status: 403, headers: { "Content-Type": "application/json" } },
      ),
    );

    await expect(apiFetch("/api/admin", { token: "t" })).rejects.toMatchObject({
      status: 403,
      code: "FORBIDDEN",
    });
  });

  it("throws on invalid JSON body", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response("not json", { status: 200, headers: { "Content-Type": "application/json" } }),
    );

    await expect(apiFetch("/api/me", { token: "t" })).rejects.toThrow();
  });
});
