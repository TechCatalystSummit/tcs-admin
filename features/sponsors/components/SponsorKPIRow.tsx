import { StatCard } from "@/shared/components/data-display/StatCard";
import { formatCurrency, formatPercent } from "@/shared/utils/formatters";
import type { Sponsor } from "../types";

export function SponsorKPIRow({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="QR Scans"
        value={sponsor.qrScans.toLocaleString("en-US")}
        delta="+12% vs last event"
        deltaType="positive"
        topColor="#1A73E8"
      />
      <StatCard
        label="Leads Captured"
        value={sponsor.leadsCount}
        delta={`${sponsor.leads.length} this month`}
        deltaType="neutral"
        topColor="#0D9E75"
      />
      <StatCard
        label="Pipeline Value"
        value={formatCurrency(sponsor.pipelineValue)}
        delta="Est. deal value"
        deltaType="neutral"
        topColor="#D0A84A"
      />
      <StatCard
        label="Engagement Rate"
        value={formatPercent(sponsor.engagementRate)}
        delta={sponsor.engagementRate >= 0.6 ? "Above avg" : "Below avg"}
        deltaType={sponsor.engagementRate >= 0.6 ? "positive" : "negative"}
        topColor="#6B3AC9"
      />
    </div>
  );
}
