"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { useState } from "react";
import { SponsorFilters } from "../components/SponsorFilters";
import { SponsorFormModal } from "../components/SponsorFormModal";
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
  const [createOpen, setCreateOpen] = useState(false);
  const { sponsors, isLoading, isError, error, refetch } = useFilteredSponsors();
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
            <GradientButton onClick={() => setCreateOpen(true)}>Add Sponsor</GradientButton>
          </div>
        }
      />
      <SponsorFilters />
      <QueryBoundary
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => void refetch()}
        isEmpty={!isLoading && !isError && sponsors.length === 0}
        emptyTitle="No sponsors found"
        emptyDescription="Add a sponsor or adjust your filters."
        emptyActionLabel="Add sponsor"
        onEmptyAction={() => setCreateOpen(true)}
      >
        <SponsorsTable />
      </QueryBoundary>
      <SponsorFormModal mode="create" open={createOpen} onClose={() => setCreateOpen(false)} />
    </>
  );
}
