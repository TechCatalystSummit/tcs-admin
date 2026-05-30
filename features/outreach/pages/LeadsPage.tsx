"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { AddLeadModal } from "../components/AddLeadModal";
import { LeadDetailPanel } from "../components/LeadDetailPanel";
import { LeadFilters } from "../components/LeadFilters";
import { LeadsTable } from "../components/LeadsTable";
import { useOutreachStore } from "../store/useOutreachStore";

const exportColumns = [
  { key: "name" as const, header: "Name" },
  { key: "email" as const, header: "Email" },
  { key: "company" as const, header: "Company" },
  { key: "title" as const, header: "Title" },
  { key: "industry" as const, header: "Industry" },
  { key: "status" as const, header: "Status" },
  { key: "stage" as const, header: "Stage" },
  { key: "source" as const, header: "Source" },
  { key: "lastContacted" as const, header: "Last Contacted" },
];

export default function LeadsPage() {
  const openAddLeadModal = useOutreachStore((s) => s.openAddLeadModal);
  useOutreachStore((s) => s.filters);
  useOutreachStore((s) => s.leads);
  const getFilteredLeads = useOutreachStore((s) => s.getFilteredLeads);
  const filteredLeads = getFilteredLeads();

  return (
    <>
      <PageHeader
        title="Leads / CRM"
        subtitle="Full CRM contact management"
        action={
          <div className="flex items-center gap-2">
            <ExportButton data={filteredLeads} filename="tcs-leads" columns={exportColumns} />
            <button
              type="button"
              onClick={openAddLeadModal}
              className="bg-brand-gradient text-white font-semibold rounded-full px-6 h-11 hover:opacity-90 text-sm"
            >
              Add Lead
            </button>
          </div>
        }
      />
      <LeadFilters />
      <LeadsTable />
      <LeadDetailPanel />
      <AddLeadModal />
    </>
  );
}
