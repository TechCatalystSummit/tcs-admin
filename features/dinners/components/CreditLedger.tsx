"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useCreditsLedger } from "../api/queries";
import { useDinnersStore } from "../store/useDinnersStore";
import type { CreditRecord } from "../types";

export function CreditLedger() {
  const openAdjust = useDinnersStore((s) => s.openAdjust);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error, refetch } = useCreditsLedger(search);
  const credits = data?.credits ?? [];

  const columns = useMemo<ColumnDef<CreditRecord>[]>(
    () => [
      {
        accessorKey: "memberName",
        header: "Member",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.memberName}</p>
            <p className="text-xs text-muted">{row.original.memberEmail}</p>
          </div>
        ),
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
        cell: ({ row }) =>
          row.original.expiresAt ? formatDate(row.original.expiresAt) : "—",
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => openAdjust(row.original.memberId, row.original.balance)}
          >
            Adjust
          </Button>
        ),
      },
    ],
    [openAdjust],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 items-end">
        <Input
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button variant="outline" size="sm" onClick={() => openAdjust("")}>
          Adjust member credits
        </Button>
      </div>
      <QueryBoundary
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => void refetch()}
        isEmpty={!isLoading && !isError && credits.length === 0}
        emptyTitle="No credit records"
        emptyDescription="Member dinner credits will appear here."
      >
        <DataTable columns={columns} data={credits} pageSize={10} />
      </QueryBoundary>
    </div>
  );
}
