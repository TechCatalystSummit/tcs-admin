"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Badge } from "@/shared/components/ui/Badge";
import { formatDateTime } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import type { QRScan } from "../types";

const conversionStyles: Record<QRScan["conversionStatus"], string> = {
  none: "bg-surf text-muted border-border",
  signup: "bg-green-l text-green border-green/20",
  rsvp: "bg-blue-l text-blue1 border-blue1/20",
  lead: "bg-gold-l text-gold border-gold/20",
  payment: "bg-purple-l text-purple border-purple/20",
};

export function ScanLogTable({ scans }: { scans: QRScan[] }) {
  const columns = useMemo<ColumnDef<QRScan>[]>(
    () => [
      {
        accessorKey: "timestamp",
        header: "Timestamp",
        cell: ({ row }) => formatDateTime(row.original.timestamp),
      },
      {
        id: "user",
        header: "User",
        cell: ({ row }) =>
          row.original.userId ? (
            <span className="font-mono text-xs text-muted">{row.original.userId.slice(0, 8)}…</span>
          ) : (
            <span className="text-muted">Anonymous</span>
          ),
      },
      {
        accessorKey: "conversionStatus",
        header: "Conversion",
        cell: ({ row }) => (
          <Badge variant="default" className={conversionStyles[row.original.conversionStatus]}>
            {row.original.conversionStatus === "none" ? "No conversion" : row.original.conversionStatus}
          </Badge>
        ),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={scans} pageSize={10} />;
}
