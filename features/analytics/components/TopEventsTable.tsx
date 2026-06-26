"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { formatCurrency, formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import type { TopEventRow } from "../types";
import { useAnalyticsContext } from "./AnalyticsProvider";

export function TopEventsTable() {
  const { data } = useAnalyticsContext();
  const topEvents = data.topEvents;

  const columns = useMemo<ColumnDef<TopEventRow>[]>(
    () => [
      { accessorKey: "event", header: "Event" },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.date),
      },
      { accessorKey: "attendance", header: "Attendance" },
      { accessorKey: "intros", header: "Intros" },
      { accessorKey: "deals", header: "Deals" },
      {
        accessorKey: "estimatedRoi",
        header: "Est. ROI",
        cell: ({ row }) => formatCurrency(row.original.estimatedRoi),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={topEvents} pageSize={10} />;
}
