"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { AddLeadModal } from "../components/AddLeadModal";
import { LeadDetailPanel } from "../components/LeadDetailPanel";
import { LeadFilters } from "../components/LeadFilters";
import { LeadsTable } from "../components/LeadsTable";
import { useOutreachStore } from "../store/useOutreachStore";

export default function LeadsPage() {
  const openAddLeadModal = useOutreachStore((s) => s.openAddLeadModal);

  return (
    <>
      <PageHeader
        title="Leads / CRM"
        subtitle="Full CRM contact management"
        actionLabel="Add Lead"
        onAction={openAddLeadModal}
      />
      <LeadFilters />
      <LeadsTable />
      <LeadDetailPanel />
      <AddLeadModal />
    </>
  );
}
