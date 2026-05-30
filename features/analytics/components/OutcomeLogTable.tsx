"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { formatCurrency, formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useAnalyticsStore } from "../store/useAnalyticsStore";
import type { OutcomeLogEntry } from "../types";

export function OutcomeLogTable() {
  const outcomes = useAnalyticsStore((s) => s.data.outcomes);

  const columns = useMemo<ColumnDef<OutcomeLogEntry>[]>(
    () => [
      { accessorKey: "connection", header: "Connection" },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.date),
      },
      { accessorKey: "outcomeType", header: "Outcome Type" },
      {
        accessorKey: "estimatedValue",
        header: "Est. Value",
        cell: ({ row }) => formatCurrency(row.original.estimatedValue),
      },
      {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => (
          <span className="text-muted text-xs line-clamp-2 max-w-[200px]">
            {row.original.notes ?? "—"}
          </span>
        ),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={outcomes} pageSize={10} />;
}
