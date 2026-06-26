"use client";

import { useApproveMember, useDeclineMember } from "@/features/members/api/mutations";
import { usePendingMembers } from "@/features/members/api/queries";
import {
  buildActivityFeedFromStats,
  mapDashboardKpis,
  mapRevenueTrend,
  mapSignupTrend,
} from "../api/mappers";
import { useDashboardStats } from "../api/dashboardQueries";
import type { ActivityItem, ChartPoint, DashboardKPI, PendingApproval } from "../types";
import { createContext, useContext, useMemo, type ReactNode } from "react";

interface DashboardContextValue {
  kpis: DashboardKPI[];
  revenueData: ChartPoint[];
  growthData: ChartPoint[];
  activity: ActivityItem[];
  pendingApprovals: PendingApproval[];
  statsLoading: boolean;
  statsError: boolean;
  statsErrorDetail: unknown;
  refetchStats: () => void;
  pendingLoading: boolean;
  pendingError: boolean;
  pendingErrorDetail: unknown;
  refetchPending: () => void;
  isMutating: boolean;
  approvePending: (id: string) => void;
  declinePending: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const statsQuery = useDashboardStats();
  const pendingQuery = usePendingMembers();
  const approveMember = useApproveMember();
  const declineMember = useDeclineMember();

  const value = useMemo((): DashboardContextValue => {
    const stats = statsQuery.data;
    return {
      kpis: stats ? mapDashboardKpis(stats) : [],
      revenueData: stats ? mapRevenueTrend(stats) : [],
      growthData: stats ? mapSignupTrend(stats) : [],
      activity: stats ? buildActivityFeedFromStats(stats) : [],
      pendingApprovals: (pendingQuery.data?.approvals ?? []).slice(0, 5).map((a) => ({
        id: a.id,
        name: a.name,
        company: a.company,
        tier: a.tier,
        submittedAt: a.submittedAt,
      })),
      statsLoading: statsQuery.isPending,
      statsError: statsQuery.isError,
      statsErrorDetail: statsQuery.error,
      refetchStats: () => void statsQuery.refetch(),
      pendingLoading: pendingQuery.isPending,
      pendingError: pendingQuery.isError,
      pendingErrorDetail: pendingQuery.error,
      refetchPending: () => void pendingQuery.refetch(),
      isMutating: approveMember.isPending || declineMember.isPending,
      approvePending: (id) => approveMember.mutate({ id }),
      declinePending: (id) => declineMember.mutate({ id }),
    };
  }, [
    statsQuery.data,
    statsQuery.isPending,
    statsQuery.isError,
    statsQuery.error,
    statsQuery.refetch,
    pendingQuery.data?.approvals,
    pendingQuery.isPending,
    pendingQuery.isError,
    pendingQuery.error,
    pendingQuery.refetch,
    approveMember,
    declineMember,
  ]);

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboardContext must be used within DashboardProvider");
  }
  return ctx;
}
