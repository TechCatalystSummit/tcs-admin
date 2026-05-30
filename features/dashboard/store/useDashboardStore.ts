"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  activityFeed,
  dashboardKPIs,
  memberGrowthData,
  pendingApprovals,
  revenueChartData,
} from "../data/mockDashboard";
import type { ActivityItem, ChartPoint, DashboardKPI, PendingApproval } from "../data/mockDashboard.types";

interface DashboardState {
  kpis: DashboardKPI[];
  activity: ActivityItem[];
  revenueData: ChartPoint[];
  growthData: ChartPoint[];
  pendingApprovals: PendingApproval[];
  approvePending: (id: string) => void;
  declinePending: (id: string) => void;
}

export const useDashboardStore = create<DashboardState>()(
  immer((set) => ({
    kpis: dashboardKPIs,
    activity: activityFeed,
    revenueData: revenueChartData,
    growthData: memberGrowthData,
    pendingApprovals,
    approvePending: (id) =>
      set((state) => {
        state.pendingApprovals = state.pendingApprovals.filter((a) => a.id !== id);
        const pending = state.kpis.find((k) => k.label === "Pending Approvals");
        if (pending && typeof pending.value === "number") pending.value -= 1;
      }),
    declinePending: (id) =>
      set((state) => {
        state.pendingApprovals = state.pendingApprovals.filter((a) => a.id !== id);
        const pending = state.kpis.find((k) => k.label === "Pending Approvals");
        if (pending && typeof pending.value === "number") pending.value -= 1;
      }),
  })),
);
