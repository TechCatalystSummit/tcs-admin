"use client";

import { BulkActionBar } from "@/shared/components/layout/BulkActionBar";
import { DataTable } from "@/shared/components/data-display/DataTable";
import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { Checkbox } from "@/shared/components/ui/Checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/DropdownMenu";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useApproveMember, useBulkApproveMembers } from "../api/mutations";
import { useFilteredMembers } from "../hooks/useFilteredMembers";
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
  const { members: filteredMembers } = useFilteredMembers();
  const selectedIds = useMembersStore((s) => s.selectedIds);
  const toggleSelect = useMembersStore((s) => s.toggleSelect);
  const selectAll = useMembersStore((s) => s.selectAll);
  const clearSelection = useMembersStore((s) => s.clearSelection);
  const openMemberSheet = useMembersStore((s) => s.openMemberSheet);
  const approveMember = useApproveMember();
  const bulkApprove = useBulkApproveMembers();

  const selectedMembers = filteredMembers.filter((m) => selectedIds.includes(m.id));
  const allSelected = selectedIds.length === filteredMembers.length && filteredMembers.length > 0;

  const columns = useMemo<ColumnDef<AdminMember>[]>(
    () => [
      {
        id: "select",
        header: () => (
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => {
              if (checked) selectAll(filteredMembers.map((m) => m.id));
              else clearSelection();
            }}
            aria-label="Select all members"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={selectedIds.includes(row.original.id)}
            onCheckedChange={() => toggleSelect(row.original.id)}
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
            className="flex items-center gap-3 text-left hover:opacity-80"
            onClick={() => openMemberSheet(row.original.id)}
          >
            <Avatar name={row.original.name} size="sm" executive={row.original.tier === "executive"} />
            <div>
              <p className="font-medium">{row.original.name}</p>
              <p className="text-xs text-muted">{row.original.email}</p>
            </div>
          </button>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" aria-label="Member actions">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => openMemberSheet(row.original.id)}>
                Quick view
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/members/${row.original.id}`}>Open full profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => approveMember.mutate({ id: row.original.id })}
              >
                Approve member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableSorting: false,
      },
    ],
    [
      filteredMembers,
      selectedIds,
      allSelected,
      selectAll,
      clearSelection,
      toggleSelect,
      openMemberSheet,
      approveMember,
    ],
  );

  const handleBulkApprove = () => {
    const ids = [...selectedIds];
    bulkApprove.mutate(ids, { onSuccess: () => clearSelection() });
  };

  return (
    <>
      <BulkActionBar count={selectedIds.length} onClear={clearSelection}>
        <Button size="sm" onClick={handleBulkApprove} disabled={bulkApprove.isPending}>
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
        data={filteredMembers}
        emptyTitle="No members found"
        emptyDescription="Try adjusting your filters or search query."
      />
    </>
  );
}
