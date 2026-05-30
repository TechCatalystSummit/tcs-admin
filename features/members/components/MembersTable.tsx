"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import type { AdminMember } from "../types";
import { StatusBadge } from "./StatusBadge";
import { TierBadge } from "./TierBadge";
import { useMembersStore } from "../store/useMembersStore";

export function MembersTable() {
  const getFilteredMembers = useMembersStore((s) => s.getFilteredMembers);
  const members = getFilteredMembers();

  const columns = useMemo<ColumnDef<AdminMember>[]>(
    () => [
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
    [],
  );

  return <DataTable columns={columns} data={members} />;
}
