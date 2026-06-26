"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAnalyticsContext } from "./AnalyticsProvider";

export function WeeklyGrowthChart() {
  const { data } = useAnalyticsContext();

  return (
    <Card>
      <CardHeader>
        <SectionLabel>New Members by Week</SectionLabel>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data.weeklyGrowth} barSize={12}>
            <XAxis dataKey="week" tick={{ fontSize: 9, fill: "#BBBBC5" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E8E8EB", fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 10 }} />
            <Bar dataKey="community" stackId="a" fill="#888899" radius={[0, 0, 0, 0]} />
            <Bar dataKey="builder" stackId="a" fill="#1A73E8" />
            <Bar dataKey="executive" stackId="a" fill="#D0A84A" />
            <Bar dataKey="partner" stackId="a" fill="#6B3AC9" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
