"use client";

import { BulkActionBar } from "@/shared/components/layout/BulkActionBar";
import { DataTable } from "@/shared/components/data-display/DataTable";
import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { toast } from "sonner";
import type { AdminMember } from "../types";
import { StatusBadge } from "./StatusBadge";
import { TierBadge } from "./TierBadge";
import { useMembersStore } from "../store/useMembersStore";

const exportColumns = [
  { key: "name" as const, header: "Name" },
  { key: "email" as const, header: "Email" },
  { key: "company" as const, header: "Company" },
  { key: "tier" as const, header: "Tier" },
  { key: "status" as const, header: "Status" },
];

export function MembersTable() {
  const getFilteredMembers = useMembersStore((s) => s.getFilteredMembers);
  const selectedIds = useMembersStore((s) => s.selectedIds);
  const toggleSelect = useMembersStore((s) => s.toggleSelect);
  const selectAll = useMembersStore((s) => s.selectAll);
  const clearSelection = useMembersStore((s) => s.clearSelection);
  const bulkApproveMembers = useMembersStore((s) => s.bulkApproveMembers);
  const members = getFilteredMembers();

  const selectedMembers = members.filter((m) => selectedIds.includes(m.id));

  const columns = useMemo<ColumnDef<AdminMember>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <input
            type="checkbox"
            checked={selectedIds.length === members.length && members.length > 0}
            onChange={(e) => {
              if (e.target.checked) selectAll(members.map((m) => m.id));
              else clearSelection();
            }}
            className="rounded border-border"
            aria-label="Select all members"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedIds.includes(row.original.id)}
            onChange={() => toggleSelect(row.original.id)}
            className="rounded border-border"
            aria-label={`Select ${row.original.name}`}
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar name={row.original.name} size="sm" executive={row.original.tier === "executive"} />
            <div>
              <p className="font-medium">{row.original.name}</p>
              <p className="text-xs text-muted">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "company", header: "Company" },
      { accessorKey: "city", header: "City" },
      {
        accessorKey: "tier",
        header: "Tier",
        cell: ({ row }) => <TierBadge tier={row.original.tier} />,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "joinedAt",
        header: "Joined",
        cell: ({ row }) => formatDate(row.original.joinedAt),
      },
      { accessorKey: "eventsAttended", header: "Events" },
      { accessorKey: "introsRequested", header: "Intros" },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Link href={`/members/${row.original.id}`}>
            <Button variant="ghost" size="sm">View</Button>
          </Link>
        ),
        enableSorting: false,
      },
    ],
    [members, selectedIds, selectAll, clearSelection, toggleSelect],
  );

  return (
    <>
      <BulkActionBar count={selectedIds.length} onClear={clearSelection}>
        <Button
          size="sm"
          onClick={() => {
            const count = selectedIds.length;
            bulkApproveMembers(selectedIds);
            toast.success(`Approved ${count} member(s)`);
          }}
        >
          Approve all
        </Button>
        <ExportButton
          data={selectedMembers}
          filename="tcs-members-selected"
          columns={exportColumns}
          label="Export selected"
        />
      </BulkActionBar>
      <DataTable
        columns={columns}
        data={members}
        emptyTitle="No members found"
        emptyDescription="Try adjusting your filters or search query."
      />
    </>
  );
}
