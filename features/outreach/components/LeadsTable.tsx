"use client";

import { BulkActionBar } from "@/shared/components/layout/BulkActionBar";
import { DataTable } from "@/shared/components/data-display/DataTable";
import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { Button } from "@/shared/components/ui/Button";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useOutreachStore } from "../store/useOutreachStore";
import type { Lead } from "../types";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { StageBadge } from "./StageBadge";

const exportColumns = [
  { key: "name" as const, header: "Name" },
  { key: "email" as const, header: "Email" },
  { key: "company" as const, header: "Company" },
  { key: "title" as const, header: "Title" },
  { key: "industry" as const, header: "Industry" },
  { key: "status" as const, header: "Status" },
  { key: "stage" as const, header: "Stage" },
  { key: "source" as const, header: "Source" },
];

export function LeadsTable() {
  useOutreachStore((s) => s.filters);
  useOutreachStore((s) => s.leads);
  const getFilteredLeads = useOutreachStore((s) => s.getFilteredLeads);
  const openLeadDetail = useOutreachStore((s) => s.openLeadDetail);
  const selectedLeadIds = useOutreachStore((s) => s.selectedLeadIds);
  const toggleLeadSelect = useOutreachStore((s) => s.toggleLeadSelect);
  const selectAllLeads = useOutreachStore((s) => s.selectAllLeads);
  const clearLeadSelection = useOutreachStore((s) => s.clearLeadSelection);
  const deleteLeads = useOutreachStore((s) => s.deleteLeads);
  const filteredLeads = getFilteredLeads();
  const selectedLeads = filteredLeads.filter((l) => selectedLeadIds.includes(l.id));
  const allSelected = selectedLeadIds.length === filteredLeads.length && filteredLeads.length > 0;

  const columns: ColumnDef<Lead>[] = [
      {
        id: "select",
        header: () => (
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => {
              if (checked) selectAllLeads(filteredLeads.map((l) => l.id));
              else clearLeadSelection();
            }}
            aria-label="Select all leads"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={selectedLeadIds.includes(row.original.id)}
            onCheckedChange={() => toggleLeadSelect(row.original.id)}
            aria-label={`Select ${row.original.name}`}
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <button
            type="button"
            className="text-left hover:opacity-80"
            onClick={() => openLeadDetail(row.original.id)}
          >
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted">{row.original.email}</p>
          </button>
        ),
      },
      { accessorKey: "company", header: "Company" },
      { accessorKey: "title", header: "Title" },
      { accessorKey: "industry", header: "Industry" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <LeadStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "stage",
        header: "Stage",
        cell: ({ row }) => <StageBadge stage={row.original.stage} />,
      },
      { accessorKey: "source", header: "Source" },
      {
        accessorKey: "lastContacted",
        header: "Last Contacted",
        cell: ({ row }) => formatDate(row.original.lastContacted),
      },
      { accessorKey: "opens", header: "Opens" },
      { accessorKey: "clicks", header: "Clicks" },
      {
        accessorKey: "nextFollowUp",
        header: "Next Follow-up",
        cell: ({ row }) => row.original.nextFollowUp ? formatDate(row.original.nextFollowUp) : "—",
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button variant="ghost" size="sm" onClick={() => openLeadDetail(row.original.id)}>
            View
          </Button>
        ),
        enableSorting: false,
      },
    ];

  const exportData = selectedLeads.map((l) => ({
    name: l.name,
    email: l.email,
    company: l.company,
    title: l.title,
    industry: l.industry,
    status: l.status,
    stage: l.stage,
    source: l.source,
  }));

  return (
    <>
      <BulkActionBar count={selectedLeadIds.length} onClear={clearLeadSelection}>
        <ExportButton
          data={exportData}
          filename="tcs-leads-selected"
          columns={exportColumns}
          label="Export selected"
        />
        <Button variant="danger" size="sm" onClick={() => deleteLeads(selectedLeadIds)}>
          Delete
        </Button>
      </BulkActionBar>
      <DataTable columns={columns} data={filteredLeads} />
    </>
  );
}
