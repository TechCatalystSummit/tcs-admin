import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { AdjustCreditsModal } from "../components/AdjustCreditsModal";
import { CreditLedger } from "../components/CreditLedger";
import { DinnerDetailModal } from "../components/DinnerDetailModal";
import { DinnersTable } from "../components/DinnersTable";

export default function DinnersPage() {
  return (
    <>
      <PageHeader
        title="Executive Dinners"
        subtitle="Dinner requests and member credit management"
      />
      <div className="space-y-10">
        <section className="space-y-4">
          <SectionLabel>Dinner requests</SectionLabel>
          <DinnersTable />
        </section>
        <section className="space-y-4">
          <SectionLabel>Credit ledger</SectionLabel>
          <CreditLedger />
        </section>
      </div>
      <DinnerDetailModal />
      <AdjustCreditsModal />
    </>
  );
}
