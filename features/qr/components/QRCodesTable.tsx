"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Button } from "@/shared/components/ui/Button";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useQRStore } from "../store/useQRStore";
import type { QRCode } from "../types";
import { QR_TYPE_LABELS } from "../types";

export function QRCodesTable({ codes }: { codes: QRCode[] }) {
  const selectedCodeId = useQRStore((s) => s.selectedCodeId);
  const selectCode = useQRStore((s) => s.selectCode);

  const columns = useMemo<ColumnDef<QRCode>[]>(
    () => [
      { accessorKey: "shortCode", header: "Code" },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => QR_TYPE_LABELS[row.original.type],
      },
      { accessorKey: "source", header: "Source" },
      { accessorKey: "campaign", header: "Campaign" },
      { accessorKey: "scans", header: "Scans" },
      { accessorKey: "conversions", header: "Conversions" },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button
            variant={selectedCodeId === row.original.id ? "primary" : "ghost"}
            size="sm"
            onClick={() => selectCode(row.original.id)}
          >
            Select
          </Button>
        ),
        enableSorting: false,
      },
    ],
    [selectedCodeId, selectCode],
  );

  return <DataTable columns={columns} data={codes} />;
}
