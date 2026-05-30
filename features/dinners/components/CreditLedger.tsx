"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Button } from "@/shared/components/ui/Button";
import { formatDate, formatTier } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useDinnersStore } from "../store/useDinnersStore";
import type { CreditRecord } from "../types";

export function CreditLedger() {
  const credits = useDinnersStore((s) => s.credits);
  const openAdjust = useDinnersStore((s) => s.openAdjust);

  const columns = useMemo<ColumnDef<CreditRecord>[]>(
    () => [
      { accessorKey: "memberName", header: "Member" },
      {
        accessorKey: "tier",
        header: "Tier",
        cell: ({ row }) => formatTier(row.original.tier),
      },
      {
        accessorKey: "balance",
        header: "Balance",
        cell: ({ row }) => (
          <span className="tabular-nums font-semibold text-green">{row.original.balance}</span>
        ),
      },
      {
        accessorKey: "used",
        header: "Used",
        cell: ({ row }) => (
          <span className="tabular-nums text-muted">{row.original.used}</span>
        ),
      },
      {
        accessorKey: "expiresAt",
        header: "Expires",
        cell: ({ row }) => formatDate(row.original.expiresAt),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <Button variant="outline" size="sm" onClick={() => openAdjust(row.original.memberId)}>
            Adjust
          </Button>
        ),
      },
    ],
    [openAdjust],
  );

  return <DataTable columns={columns} data={credits} pageSize={10} />;
}
