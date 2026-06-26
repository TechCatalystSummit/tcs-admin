import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { server } from "@/test/msw/handlers";
import { createTestQueryClient, createWrapper, waitFor } from "@/test/test-utils";
import { DashboardProvider, useDashboardContext } from "../components/DashboardProvider";
import type { ReactNode } from "react";

vi.mock("@/features/auth/api/session", () => ({
  getAccessToken: vi.fn().mockResolvedValue("test-token"),
}));

function useDashboard() {
  return useDashboardContext();
}

function createDashboardWrapper() {
  const client = createTestQueryClient();
  const QueryWrapper = createWrapper(client);
  return function DashboardWrapper({ children }: { children: ReactNode }) {
    return (
      <QueryWrapper>
        <DashboardProvider>{children}</DashboardProvider>
      </QueryWrapper>
    );
  };
}

describe("DashboardProvider", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:4000");
  });

  it("loads stats and pending approvals independently", async () => {
    const { result } = renderHook(() => useDashboard(), {
      wrapper: createDashboardWrapper(),
    });

    await waitFor(() => expect(result.current.statsLoading).toBe(false));
    await waitFor(() => expect(result.current.pendingLoading).toBe(false));

    expect(result.current.statsError).toBe(false);
    expect(result.current.pendingError).toBe(false);
    expect(result.current.kpis[0]?.value).toBe(42);
    expect(result.current.pendingApprovals[0]?.name).toBe("Pending User");
  });

  it("still loads pending approvals when stats API fails", async () => {
    server.use(
      http.get("http://localhost:4000/api/analytics/dashboard", () =>
        HttpResponse.json(
          { success: false, error: { code: "INTERNAL_ERROR", message: "Stats down" } },
          { status: 500 },
        ),
      ),
    );

    const { result } = renderHook(() => useDashboard(), {
      wrapper: createDashboardWrapper(),
    });

    await waitFor(() => expect(result.current.statsError).toBe(true));
    await waitFor(() => expect(result.current.pendingLoading).toBe(false));

    expect(result.current.kpis).toHaveLength(0);
    expect(result.current.pendingError).toBe(false);
    expect(result.current.pendingApprovals[0]?.name).toBe("Pending User");
  });
});
