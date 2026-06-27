"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/Tabs";
import { useDinnersList } from "../api/queries";
import { AdjustCreditsModal } from "../components/AdjustCreditsModal";
import { CreditLedger } from "../components/CreditLedger";
import { DinnerDetailModal } from "../components/DinnerDetailModal";
import { DinnerFilters } from "../components/DinnerFilters";
import { DinnersTable } from "../components/DinnersTable";
import { OfferingsTab } from "../pages/OfferingsTab";
import { useDinnersStore } from "../store/useDinnersStore";

const exportColumns = [
  { key: "requesterName" as const, header: "Requester" },
  { key: "requesterCompany" as const, header: "Company" },
  { key: "offeringTitle" as const, header: "Offering" },
  { key: "purpose" as const, header: "Purpose" },
  { key: "preferredDate" as const, header: "Preferred Date" },
  { key: "budgetRange" as const, header: "Budget" },
  { key: "status" as const, header: "Status" },
  { key: "creditsUsed" as const, header: "Credits Used" },
];

export default function DinnersPage() {
  const statusFilter = useDinnersStore((s) => s.statusFilter);
  const { data, isLoading, isError, error, refetch } = useDinnersList(
    statusFilter || undefined,
  );
  const requests = data?.requests ?? [];
  const exportData = requests.map((r) => ({
    requesterName: r.requesterName,
    requesterCompany: r.requesterCompany,
    offeringTitle: r.offeringTitle ?? "",
    purpose: r.purpose,
    preferredDate: r.preferredDate,
    budgetRange: r.budgetRange ?? "",
    status: r.status,
    creditsUsed: r.creditsUsed,
  }));

  return (
    <>
      <PageHeader
        title="Executive Dinners"
        subtitle="Catalog, concierge requests, and member credits"
        action={
          <ExportButton data={exportData} filename="tcs-dinners" columns={exportColumns} />
        }
      />
      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="offerings">Offerings</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
        </TabsList>

        <TabsContent value="offerings">
          <OfferingsTab />
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <DinnerFilters />
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
        </TabsContent>

        <TabsContent value="credits">
          <CreditLedger />
        </TabsContent>
      </Tabs>

      <DinnerDetailModal requests={requests} />
      <AdjustCreditsModal />
    </>
  );
}
