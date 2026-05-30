"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useDashboardStore } from "../store/useDashboardStore";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function RevenueChart() {
  const data = useDashboardStore((s) => s.revenueData);

  return (
    <Card>
      <CardHeader>
        <SectionLabel>MRR Trend — 30 Days</SectionLabel>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A73E8" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0DCAF0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fontSize: 9, fill: "#BBBBC5" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #E8E8EB", fontSize: 12 }}
              formatter={(v) => [`$${Number(v).toLocaleString()}`, "MRR"]}
            />
            <Area type="monotone" dataKey="value" stroke="#1A73E8" fill="url(#revenueGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function MemberGrowthChart() {
  const data = useDashboardStore((s) => s.growthData);

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Weekly New Signups</SectionLabel>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} barSize={16}>
            <defs>
              <linearGradient id="brandGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1A73E8" />
                <stop offset="100%" stopColor="#0DCAF0" />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fontSize: 9, fill: "#BBBBC5" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E8E8EB", fontSize: 12 }} />
            <Bar dataKey="value" fill="url(#brandGradient)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
