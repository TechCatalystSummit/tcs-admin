"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { PaymentFilters } from "../components/PaymentFilters";
import { PaymentsTable } from "../components/PaymentsTable";
import { RefundModal } from "../components/RefundModal";
import { TierPricingTable } from "../components/TierPricingTable";
import { usePaymentsStore } from "../store/usePaymentsStore";

const exportColumns = [
  { key: "memberName" as const, header: "Member" },
  { key: "amount" as const, header: "Amount" },
  { key: "tier" as const, header: "Tier" },
  { key: "date" as const, header: "Date" },
  { key: "method" as const, header: "Method" },
  { key: "status" as const, header: "Status" },
];

export default function PaymentsPage() {
  usePaymentsStore((s) => s.filters);
  usePaymentsStore((s) => s.payments);
  const getFilteredPayments = usePaymentsStore((s) => s.getFilteredPayments);
  const filteredPayments = getFilteredPayments();
  const exportData = filteredPayments.map((p) => ({
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
        <PaymentsTable />
      </section>

      <section className="space-y-4">
        <SectionLabel>Tier pricing</SectionLabel>
        <TierPricingTable />
      </section>

      <RefundModal />
    </>
  );
}
