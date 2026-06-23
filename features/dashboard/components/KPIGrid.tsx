"use client";

import { StatCard } from "@/shared/components/data-display/StatCard";
import { StaggerGroup, StaggerItem } from "@/shared/components/motion/Stagger";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { useDashboardData } from "../api/queries";

export function KPIGrid() {
  const { kpis, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

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
