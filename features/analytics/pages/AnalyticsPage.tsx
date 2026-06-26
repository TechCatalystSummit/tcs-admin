import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { AnalyticsKPIRow } from "../components/AnalyticsKPIRow";
import { AnalyticsProvider } from "../components/AnalyticsProvider";
import { DateRangePicker } from "../components/DateRangePicker";
import { IntroConversionFunnel } from "../components/IntroConversionFunnel";
import { OutcomeLogTable } from "../components/OutcomeLogTable";
import { RevenueByTierChart } from "../components/RevenueByTierChart";
import { TopEventsTable } from "../components/TopEventsTable";
import { WeeklyGrowthChart } from "../components/WeeklyGrowthChart";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Platform outcomes, growth, and revenue metrics"
      />
      <AnalyticsProvider>
        <div className="space-y-8">
          <DateRangePicker />
          <AnalyticsKPIRow />
          <div className="grid gap-6 lg:grid-cols-2">
            <WeeklyGrowthChart />
            <RevenueByTierChart />
          </div>
          <IntroConversionFunnel />
          <section className="space-y-4">
            <SectionLabel>Top Events by ROI</SectionLabel>
            <TopEventsTable />
          </section>
          <section className="space-y-4">
            <SectionLabel>Outcome log</SectionLabel>
            <OutcomeLogTable />
          </section>
        </div>
      </AnalyticsProvider>
    </>
  );
}
