"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { CreateIntroModal } from "../components/CreateIntroModal";
import { IntroDetailModal } from "../components/IntroDetailModal";
import { IntroFilters } from "../components/IntroFilters";
import { IntrosTable } from "../components/IntrosTable";
import { useIntrosStore } from "../store/useIntrosStore";

const exportColumns = [
  { key: "fromMemberName" as const, header: "From" },
  { key: "toMemberName" as const, header: "To" },
  { key: "reason" as const, header: "Reason" },
  { key: "status" as const, header: "Status" },
  { key: "requestedAt" as const, header: "Date" },
  { key: "outcome" as const, header: "Outcome" },
];

export default function IntrosPage() {
  const openCreateModal = useIntrosStore((s) => s.openCreateModal);
  const intros = useIntrosStore((s) => s.getFilteredIntros());
  const exportData = intros.map((i) => ({
    fromMemberName: i.fromMember.name,
    toMemberName: i.toMember.name,
    reason: i.reason,
    status: i.status,
    requestedAt: i.requestedAt,
    outcome: i.outcome ?? "",
  }));

  return (
    <>
      <PageHeader
        title="Intros"
        subtitle="Curated introduction workflow"
        action={
          <div className="flex items-center gap-2">
            <ExportButton data={exportData} filename="tcs-intros" columns={exportColumns} />
            <GradientButton onClick={openCreateModal}>Create Intro</GradientButton>
          </div>
        }
      />
      <IntroFilters />
      <IntrosTable />
      <IntroDetailModal />
      <CreateIntroModal />
    </>
  );
}
