"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { PaymentFilters } from "../components/PaymentFilters";
import { PaymentsTable } from "../components/PaymentsTable";
import { RefundModal } from "../components/RefundModal";
import { TierPricingTable } from "../components/TierPricingTable";
import { useFilteredPayments } from "../hooks/useFilteredPayments";

const exportColumns = [
  { key: "memberName" as const, header: "Member" },
  { key: "amount" as const, header: "Amount" },
  { key: "tier" as const, header: "Tier" },
  { key: "date" as const, header: "Date" },
  { key: "method" as const, header: "Method" },
  { key: "status" as const, header: "Status" },
];

export default function PaymentsPage() {
  const { payments, isLoading, isError, error, refetch } = useFilteredPayments();
  const exportData = payments.map((p) => ({
    memberName: p.memberName,
    amount: p.amount,
    tier: p.tier,
    date: p.paidAt,
    method: p.method,
    status: p.status,
  }));

  return (
    <>
      <PageHeader
        title="Payments"
        subtitle="Membership billing and subscription management"
        action={
          <ExportButton data={exportData} filename="tcs-payments" columns={exportColumns} />
        }
      />

      <section className="mb-10 space-y-4">
        <SectionLabel>Payment history</SectionLabel>
        <PaymentFilters />
        <QueryBoundary
          isLoading={isLoading}
          isError={isError}
          error={error}
          onRetry={() => void refetch()}
          isEmpty={!isLoading && !isError && payments.length === 0}
          emptyTitle="No payments found"
          emptyDescription="Paid transactions will appear here."
        >
          <PaymentsTable payments={payments} />
        </QueryBoundary>
      </section>

      <section className="space-y-4">
        <SectionLabel>Tier pricing</SectionLabel>
        <TierPricingTable />
      </section>

      <RefundModal payments={payments} />
    </>
  );
}
