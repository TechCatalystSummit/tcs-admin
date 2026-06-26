"use client";

import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { StatCard } from "@/shared/components/data-display/StatCard";
import { StaggerGroup, StaggerItem } from "@/shared/components/motion/Stagger";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { useDashboardContext } from "./DashboardProvider";

export function KPIGrid() {
  const { kpis, statsLoading, statsError, statsErrorDetail, refetchStats } = useDashboardContext();

  if (statsLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (statsError) {
    return <QueryErrorState error={statsErrorDetail} onRetry={refetchStats} />;
  }

  return (
    <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {kpis.map((kpi) => (
        <StaggerItem key={kpi.label}>
          <StatCard {...kpi} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
