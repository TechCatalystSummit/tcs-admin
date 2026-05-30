"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { formatPercent } from "@/shared/utils/formatters";
import { useOutreachStore } from "../store/useOutreachStore";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function OutreachAnalyticsChart() {
  const chartData = useOutreachStore((s) => s.chartData);

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Outreach Performance — 30 Days</SectionLabel>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E8EB" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 9, fill: "#BBBBC5" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" hide />
            <YAxis yAxisId="right" orientation="right" hide domain={[0, 1]} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #E8E8EB", fontSize: 12 }}
              formatter={(value, name) => {
                if (name === "openRate") return [formatPercent(Number(value)), "Open Rate"];
                return [value, "Sent"];
              }}
            />
            <Bar yAxisId="left" dataKey="sent" fill="#1A73E8" barSize={20} radius={[4, 4, 0, 0]} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="openRate"
              stroke="#0DCAF0"
              strokeWidth={2}
              dot={{ r: 3, fill: "#0DCAF0" }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
