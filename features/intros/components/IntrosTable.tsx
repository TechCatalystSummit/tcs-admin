"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useFilteredIntros } from "../hooks/useFilteredIntros";
import { useIntrosStore } from "../store/useIntrosStore";
import { INTRO_REASON_LABELS, type IntroRequest } from "../types";
import { IntroStatusBadge } from "./IntroStatusBadge";

export function IntrosTable() {
  const { intros: filteredIntros } = useFilteredIntros();
  const openDetail = useIntrosStore((s) => s.openDetail);

  const columns = useMemo<ColumnDef<IntroRequest>[]>(
    () => [
      {
        id: "from",
        accessorFn: (row) => row.fromMember.name,
        header: "From",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar name={row.original.fromMember.name} size="sm" />
            <div>
              <p className="font-medium">{row.original.fromMember.name}</p>
              <p className="text-xs text-muted">{row.original.fromMember.company}</p>
            </div>
          </div>
        ),
      },
      {
        id: "to",
        accessorFn: (row) => row.toMember.name,
        header: "To",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Avatar name={row.original.toMember.name} size="sm" />
            <div>
              <p className="font-medium">{row.original.toMember.name}</p>
              <p className="text-xs text-muted">{row.original.toMember.company}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "reason",
        header: "Reason",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{INTRO_REASON_LABELS[row.original.reason]}</p>
            <p className="text-xs text-muted line-clamp-1 max-w-[200px]">
              {row.original.reasonDetail}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <IntroStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "requestedAt",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.requestedAt),
      },
      {
        accessorKey: "outcome",
        header: "Outcome",
        cell: ({ row }) => (
          <span className="text-muted text-xs line-clamp-2 max-w-[180px]">
            {row.original.outcome ?? "—"}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button variant="ghost" size="sm" onClick={() => openDetail(row.original.id)}>
            View
          </Button>
        ),
        enableSorting: false,
      },
    ],
    [openDetail],
  );

  return <DataTable columns={columns} data={filteredIntros} />;
}
