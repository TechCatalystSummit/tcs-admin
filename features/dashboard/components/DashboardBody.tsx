"use client";

import { FadeUp } from "@/shared/components/motion/FadeUp";
import { StaggerGroup, StaggerItem } from "@/shared/components/motion/Stagger";
import { ActivityFeed } from "./ActivityFeed";
import { MemberGrowthChart, RevenueChart } from "./Charts";
import { DashboardProvider } from "./DashboardProvider";
import { KPIGrid } from "./KPIGrid";
import { PendingApprovalsWidget } from "./PendingApprovalsWidget";
import { QuickActions } from "./QuickActions";

export function DashboardBody() {
  return (
    <DashboardProvider>
      <div className="space-y-6">
        <KPIGrid />
        <FadeUp delay={0.1}>
          <QuickActions />
        </FadeUp>
        <StaggerGroup className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <StaggerItem className="xl:col-span-2 space-y-6">
            <RevenueChart />
            <MemberGrowthChart />
          </StaggerItem>
          <StaggerItem className="space-y-6">
            <PendingApprovalsWidget />
            <ActivityFeed />
          </StaggerItem>
        </StaggerGroup>
      </div>
    </DashboardProvider>
  );
}
