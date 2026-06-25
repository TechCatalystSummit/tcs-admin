"use client";

import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { useQRStore } from "../store/useQRStore";
import { useQRAnalytics } from "../api/queries";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel, Spinner } from "@/shared/components/ui/SectionLabel";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function QRAnalyticsChart() {
  const selectedCodeId = useQRStore((s) => s.selectedCodeId);
  const { data: analytics, isLoading, isError, error, refetch } = useQRAnalytics(selectedCodeId);

  const chartData = analytics?.dailyScans ?? [];

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Scan analytics</SectionLabel>
        {analytics && (
          <p className="text-xs text-muted mt-1">
            {analytics.totalScans} total · {analytics.uniqueScans} unique ·{" "}
            {analytics.conversions} conversions
          </p>
        )}
      </CardHeader>
      <CardContent className="h-64">
        {!selectedCodeId ? (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            Select a QR code to view analytics
          </div>
        ) : isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        ) : isError ? (
          <QueryErrorState error={error} onRetry={() => void refetch()} className="h-full" />
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            No scans recorded yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="scans" fill="var(--color-blue1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
