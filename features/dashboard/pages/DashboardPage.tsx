import { PageHeader } from "@/shared/components/layout/PageHeader";
import { ActivityFeed } from "../components/ActivityFeed";
import { MemberGrowthChart, RevenueChart } from "../components/Charts";
import { KPIGrid } from "../components/KPIGrid";
import { PendingApprovalsWidget } from "../components/PendingApprovalsWidget";
import { QuickActions } from "../components/QuickActions";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Overview of platform activity and key metrics"
      />
      <div className="space-y-6">
        <KPIGrid />
        <QuickActions />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <RevenueChart />
            <MemberGrowthChart />
          </div>
          <div className="space-y-6">
            <PendingApprovalsWidget />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </>
  );
}
