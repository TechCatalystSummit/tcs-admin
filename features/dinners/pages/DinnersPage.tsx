"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useDinnersList } from "../api/queries";
import { AdjustCreditsModal } from "../components/AdjustCreditsModal";
import { CreditLedger } from "../components/CreditLedger";
import { DinnerDetailModal } from "../components/DinnerDetailModal";
import { DinnersTable } from "../components/DinnersTable";

const exportColumns = [
  { key: "requesterName" as const, header: "Requester" },
  { key: "requesterCompany" as const, header: "Company" },
  { key: "purpose" as const, header: "Purpose" },
  { key: "preferredDate" as const, header: "Preferred Date" },
  { key: "budget" as const, header: "Budget" },
  { key: "status" as const, header: "Status" },
  { key: "creditsUsed" as const, header: "Credits Used" },
];

export default function DinnersPage() {
  const { data, isLoading, isError, error, refetch } = useDinnersList();
  const requests = data?.requests ?? [];
  const exportData = requests.map((r) => ({
    requesterName: r.requesterName,
    requesterCompany: r.requesterCompany,
    purpose: r.purpose,
    preferredDate: r.preferredDate,
    budget: r.budget,
    status: r.status,
    creditsUsed: r.creditsUsed,
  }));

  return (
    <>
      <PageHeader
        title="Executive Dinners"
        subtitle="Dinner requests and member credit management"
        action={
          <ExportButton data={exportData} filename="tcs-dinners" columns={exportColumns} />
        }
      />
      <div className="space-y-10">
        <section className="space-y-4">
          <SectionLabel>Dinner requests</SectionLabel>
          <QueryBoundary
            isLoading={isLoading}
            isError={isError}
            error={error}
            onRetry={() => void refetch()}
            isEmpty={!isLoading && !isError && requests.length === 0}
            emptyTitle="No dinner requests"
            emptyDescription="Executive dinner requests will appear here."
          >
            <DinnersTable requests={requests} />
          </QueryBoundary>
        </section>
        <section className="space-y-4">
          <SectionLabel>Credit ledger</SectionLabel>
          <CreditLedger />
        </section>
      </div>
      <DinnerDetailModal requests={requests} />
      <AdjustCreditsModal />
    </>
  );
}
