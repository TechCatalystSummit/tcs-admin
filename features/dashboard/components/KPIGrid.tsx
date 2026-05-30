"use client";

import { StatCard } from "@/shared/components/data-display/StatCard";
import { StaggerGroup, StaggerItem } from "@/shared/components/motion/Stagger";
import { useDashboardStore } from "../store/useDashboardStore";

export function KPIGrid() {
  const kpis = useDashboardStore((s) => s.kpis);
  return (
    <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <StaggerItem key={kpi.label}>
          <StatCard {...kpi} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
