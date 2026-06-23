"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { formatCurrency, formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useOutcomesList } from "../api/queries";
import type { OutcomeLogEntry } from "../types";

export function OutcomeLogTable() {
  const { data, isLoading } = useOutcomesList({ perPage: 50 });
  const outcomes = data?.outcomes ?? [];

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

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  return <DataTable columns={columns} data={outcomes} pageSize={10} />;
}
