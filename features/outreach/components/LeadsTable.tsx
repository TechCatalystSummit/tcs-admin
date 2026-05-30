"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Button } from "@/shared/components/ui/Button";
import { exportToCsv } from "@/shared/utils/csvExport";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useOutreachStore } from "../store/useOutreachStore";
import type { Lead } from "../types";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { StageBadge } from "./StageBadge";

export function LeadsTable() {
  const getFilteredLeads = useOutreachStore((s) => s.getFilteredLeads);
  const openLeadDetail = useOutreachStore((s) => s.openLeadDetail);
  const selectedLeadIds = useOutreachStore((s) => s.selectedLeadIds);
  const toggleLeadSelect = useOutreachStore((s) => s.toggleLeadSelect);
  const selectAllLeads = useOutreachStore((s) => s.selectAllLeads);
  const clearLeadSelection = useOutreachStore((s) => s.clearLeadSelection);
  const deleteLeads = useOutreachStore((s) => s.deleteLeads);
  const leads = getFilteredLeads();

  const columns = useMemo<ColumnDef<Lead>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <input
            type="checkbox"
            checked={selectedLeadIds.length === leads.length && leads.length > 0}
            onChange={(e) => {
              if (e.target.checked) selectAllLeads(leads.map((l) => l.id));
              else clearLeadSelection();
            }}
            className="rounded border-border"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedLeadIds.includes(row.original.id)}
            onChange={() => toggleLeadSelect(row.original.id)}
            className="rounded border-border"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted">{row.original.email}</p>
          </div>
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
    ],
    [leads, selectedLeadIds, openLeadDetail, selectAllLeads, clearLeadSelection, toggleLeadSelect],
  );

  const handleExport = () => {
    const exportData = leads.map((l) => ({
      name: l.name,
      email: l.email,
      company: l.company,
      title: l.title,
      industry: l.industry,
      status: l.status,
      stage: l.stage,
      source: l.source,
      lastContacted: l.lastContacted,
      opens: l.opens,
      clicks: l.clicks,
    }));
    exportToCsv(exportData, "leads-export");
  };

  return (
    <div className="space-y-4">
      {selectedLeadIds.length > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-blue1/20 bg-blue-l px-4 py-3">
          <span className="text-sm text-ink">{selectedLeadIds.length} selected</span>
          <Button variant="outline" size="sm" onClick={handleExport}>Export CSV</Button>
          <Button variant="danger" size="sm" onClick={() => deleteLeads(selectedLeadIds)}>Delete</Button>
          <Button variant="ghost" size="sm" onClick={clearLeadSelection}>Clear</Button>
        </div>
      )}
      <DataTable columns={columns} data={leads} />
    </div>
  );
}
