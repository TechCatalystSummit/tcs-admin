"use client";

import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { CardContent, CardHeader } from "@/shared/components/ui/Card";
import { LuxeCard } from "@/shared/components/motion/LuxeCard";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { useDashboardContext } from "./DashboardProvider";
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
  const { revenueData, statsLoading, statsError, statsErrorDetail, refetchStats } =
    useDashboardContext();

  return (
    <LuxeCard className="bg-white border border-border overflow-hidden">
      <CardHeader>
        <SectionLabel>Revenue Trend — 6 Months</SectionLabel>
      </CardHeader>
      <CardContent>
        {statsLoading ? (
          <div className="flex justify-center py-16">
            <Spinner className="h-8 w-8" />
          </div>
        ) : statsError ? (
          <QueryErrorState error={statsErrorDetail} onRetry={refetchStats} title="Couldn't load revenue data" />
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData}>
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
                formatter={(v) => [`$${Number(v).toLocaleString()}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="value" stroke="#1A73E8" fill="url(#revenueGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </LuxeCard>
  );
}

export function MemberGrowthChart() {
  const { growthData, statsLoading, statsError, statsErrorDetail, refetchStats } =
    useDashboardContext();

  return (
    <LuxeCard className="bg-white border border-border overflow-hidden">
      <CardHeader>
        <SectionLabel>Weekly New Signups</SectionLabel>
      </CardHeader>
      <CardContent>
        {statsLoading ? (
          <div className="flex justify-center py-16">
            <Spinner className="h-8 w-8" />
          </div>
        ) : statsError ? (
          <QueryErrorState error={statsErrorDetail} onRetry={refetchStats} title="Couldn't load member growth" />
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={growthData} barSize={16}>
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
        )}
      </CardContent>
    </LuxeCard>
  );
}
