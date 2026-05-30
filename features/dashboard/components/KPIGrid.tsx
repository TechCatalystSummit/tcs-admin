"use client";

import { StatCard } from "@/shared/components/data-display/StatCard";
import { useDashboardStore } from "../store/useDashboardStore";

export function KPIGrid() {
  const kpis = useDashboardStore((s) => s.kpis);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <StatCard key={kpi.label} {...kpi} />
      ))}
    </div>
  );
}
