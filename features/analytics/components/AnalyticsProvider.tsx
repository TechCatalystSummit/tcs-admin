"use client";

import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import {
  mapAnalyticsChartSeries,
  mapAnalyticsKpis,
} from "../api/mappers";
import { useAnalyticsSummary } from "../api/queries";
import type { AnalyticsChartSeries, AnalyticsKPIs, DateRange } from "../types";
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface AnalyticsKPIsWithDeltas extends AnalyticsKPIs {
  deltas: {
    connectionsMade: number;
    introsAccepted: number;
    meetingsCompleted: number;
    revenueInfluenced: number;
  };
}

interface AnalyticsContextValue {
  kpis: AnalyticsKPIsWithDeltas;
  data: AnalyticsChartSeries;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

const emptyKpis: AnalyticsKPIsWithDeltas = {
  connectionsMade: 0,
  introsAccepted: 0,
  meetingsCompleted: 0,
  revenueInfluenced: 0,
  deltas: {
    connectionsMade: 0,
    introsAccepted: 0,
    meetingsCompleted: 0,
    revenueInfluenced: 0,
  },
};

const emptyData: AnalyticsChartSeries = {
  weeklyGrowth: [],
  funnel: [],
  revenueByTier: [],
  topEvents: [],
  outcomes: [],
};

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const summaryQuery = useAnalyticsSummary(dateRange);

  const value = useMemo((): AnalyticsContextValue => {
    const summary = summaryQuery.data;
    return {
      kpis: summary ? mapAnalyticsKpis(summary) : emptyKpis,
      data: summary ? mapAnalyticsChartSeries(summary) : emptyData,
      dateRange,
      setDateRange,
      isLoading: summaryQuery.isPending,
      isError: summaryQuery.isError,
      error: summaryQuery.error,
      refetch: () => void summaryQuery.refetch(),
    };
  }, [
    summaryQuery.data,
    summaryQuery.isPending,
    summaryQuery.isError,
    summaryQuery.error,
    summaryQuery.refetch,
    dateRange,
  ]);

  if (summaryQuery.isPending && !summaryQuery.data) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (summaryQuery.isError && !summaryQuery.data) {
    return (
      <QueryErrorState
        error={summaryQuery.error}
        onRetry={() => void summaryQuery.refetch()}
        title="Couldn't load analytics"
      />
    );
  }

  return (
    <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) {
    throw new Error("useAnalyticsContext must be used within AnalyticsProvider");
  }
  return ctx;
}
