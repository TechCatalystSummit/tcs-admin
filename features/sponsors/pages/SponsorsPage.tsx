"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { SponsorFilters } from "../components/SponsorFilters";
import { SponsorsTable } from "../components/SponsorsTable";
import { useFilteredSponsors } from "../hooks/useFilteredSponsors";

const exportColumns = [
  { key: "name" as const, header: "Company" },
  { key: "tier" as const, header: "Tier" },
  { key: "eventsCount" as const, header: "Events" },
  { key: "qrScans" as const, header: "QR Scans" },
  { key: "leadsCount" as const, header: "Leads" },
  { key: "status" as const, header: "Status" },
];

export default function SponsorsPage() {
  const { sponsors, isLoading } = useFilteredSponsors();
  const exportData = sponsors.map((s) => ({
    name: s.name,
    tier: s.tier,
    eventsCount: s.eventsSponsored.length,
    qrScans: s.qrScans,
    leadsCount: s.leadsCount,
    status: s.status,
  }));

  return (
    <>
      <PageHeader
        title="Sponsors"
        subtitle="Sponsor companies and portal access"
        action={
          <div className="flex items-center gap-2">
            <ExportButton data={exportData} filename="tcs-sponsors" columns={exportColumns} />
            <GradientButton>Add Sponsor</GradientButton>
          </div>
        }
      />
      <SponsorFilters />
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <SponsorsTable />
      )}
    </>
  );
}
