"use client";

import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { useQRStore } from "../store/useQRStore";
import { useQRAnalytics } from "../api/queries";
import type { QRCode } from "../types";
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

export function QRAnalyticsChart({ codes }: { codes: QRCode[] }) {
  const selectedCodeId = useQRStore((s) => s.selectedCodeId);
  const codeId = selectedCodeId ?? codes[0]?.id;
  const { data: analytics = [], isLoading, isError, error, refetch } = useQRAnalytics(codeId);

  const chartData =
    !isError && analytics.length
      ? analytics
      : !isError
        ? codes.slice(0, 7).map((c) => ({ day: c.name.slice(0, 8), scans: c.scans }))
        : [];

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Scan analytics</SectionLabel>
      </CardHeader>
      <CardContent className="h-64">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <Spinner className="h-6 w-6" />
          </div>
        ) : isError ? (
          <QueryErrorState error={error} onRetry={() => void refetch()} className="h-full" />
        ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="scans" fill="var(--color-blue1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
