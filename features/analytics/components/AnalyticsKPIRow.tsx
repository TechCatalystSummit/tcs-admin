"use client";

import { StatCard } from "@/shared/components/data-display/StatCard";
import { formatCurrency } from "@/shared/utils/formatters";
import { useAnalyticsStore } from "../store/useAnalyticsStore";

export function AnalyticsKPIRow() {
  const kpis = useAnalyticsStore((s) => s.kpis);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Connections Made" value={kpis.connectionsMade} topColor="#0D9E75" delta="+12% vs last period" deltaType="positive" />
      <StatCard label="Intros Accepted" value={kpis.introsAccepted} topColor="#1A73E8" delta="+8% vs last period" deltaType="positive" />
      <StatCard label="Meetings Completed" value={kpis.meetingsCompleted} topColor="#6B3AC9" delta="+5% vs last period" deltaType="positive" />
      <StatCard label="Revenue Influenced" value={formatCurrency(kpis.revenueInfluenced)} topColor="#D0A84A" delta="+18% vs last period" deltaType="positive" />
    </div>
  );
}
