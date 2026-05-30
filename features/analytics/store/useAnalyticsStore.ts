"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockAnalyticsData, mockAnalyticsKPIs } from "../data/mockAnalytics";
import type { AnalyticsChartSeries, AnalyticsKPIs, DateRange } from "../types";

interface AnalyticsState {
  kpis: AnalyticsKPIs;
  data: AnalyticsChartSeries;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

export const useAnalyticsStore = create<AnalyticsState>()(
  immer((set) => ({
    kpis: mockAnalyticsKPIs,
    data: mockAnalyticsData,
    dateRange: "30d",
    setDateRange: (range) =>
      set((state) => {
        state.dateRange = range;
      }),
  })),
);
