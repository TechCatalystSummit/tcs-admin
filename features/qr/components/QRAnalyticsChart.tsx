"use client";

import { useQRStore } from "../store/useQRStore";
import { useQRAnalytics } from "../api/queries";
import type { QRCode } from "../types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
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
  const { data: analytics = [] } = useQRAnalytics(codeId);

  const chartData = analytics.length
    ? analytics
    : codes.slice(0, 7).map((c) => ({ day: c.name.slice(0, 8), scans: c.scans }));

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Scan analytics</SectionLabel>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="day" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="scans" fill="var(--color-blue1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
