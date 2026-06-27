"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Button } from "@/shared/components/ui/Button";
import { formatDate } from "@/shared/utils/formatters";
import Link from "next/link";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useDinnersStore } from "../store/useDinnersStore";
import type { DinnerRequest } from "../types";
import { DinnerStatusBadge } from "./DinnerStatusBadge";

export function DinnersTable({ requests }: { requests: DinnerRequest[] }) {
  const openDetail = useDinnersStore((s) => s.openDetail);

  const columns = useMemo<ColumnDef<DinnerRequest>[]>(
    () => [
      {
        accessorKey: "requesterName",
        header: "Requester",
        cell: ({ row }) => (
          <div>
            <Link
              href={`/members/${row.original.memberId}`}
              className="font-medium text-blue1 hover:underline"
            >
              {row.original.requesterName}
            </Link>
            <p className="text-xs text-muted">{row.original.requesterCompany}</p>
          </div>
        ),
      },
      {
        accessorKey: "offeringTitle",
        header: "Offering",
        cell: ({ row }) => row.original.offeringTitle ?? "—",
      },
      {
        accessorKey: "purpose",
        header: "Purpose",
        cell: ({ row }) => (
          <p className="max-w-[240px] truncate" title={row.original.purpose}>
            {row.original.purpose}
          </p>
        ),
      },
      {
        accessorKey: "preferredDate",
        header: "Preferred Date",
        cell: ({ row }) => formatDate(row.original.preferredDate),
      },
      {
        accessorKey: "budgetRange",
        header: "Budget",
        cell: ({ row }) => row.original.budgetRange ?? "—",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <DinnerStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "creditsUsed",
        header: "Credits Used",
        cell: ({ row }) => (
          <span className="tabular-nums font-medium">{row.original.creditsUsed}</span>
        ),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <Button variant="ghost" size="sm" onClick={() => openDetail(row.original.id)}>
            View
          </Button>
        ),
      },
    ],
    [openDetail],
  );

  return <DataTable columns={columns} data={requests} />;
}
