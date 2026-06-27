"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useDeactivateOffering } from "../api/offerings-mutations";
import { useDinnersStore } from "../store/useDinnersStore";
import type { DinnerOffering } from "../types";

export function OfferingsTable({ offerings }: { offerings: DinnerOffering[] }) {
  const openOfferingForm = useDinnersStore((s) => s.openOfferingForm);
  const deactivate = useDeactivateOffering();

  const columns = useMemo<ColumnDef<DinnerOffering>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Offering",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.title}</p>
            <p className="text-xs text-muted truncate max-w-[280px]">{row.original.subtitle}</p>
          </div>
        ),
      },
      {
        accessorKey: "tagLabel",
        header: "Tag",
        cell: ({ row }) => (
          <Badge variant={row.original.tagVariant === "gold" ? "gold" : "default"}>
            {row.original.tagLabel || row.original.tierRequirement}
          </Badge>
        ),
      },
      {
        id: "seats",
        header: "Seats",
        cell: ({ row }) => (
          <span className="tabular-nums text-sm">
            {row.original.seatsAvailable}/{row.original.seatsTotal}
          </span>
        ),
      },
      {
        accessorKey: "eventDate",
        header: "Date",
        cell: ({ row }) =>
          row.original.eventDate ? formatDate(row.original.eventDate) : "—",
      },
      {
        id: "flags",
        header: "Flags",
        cell: ({ row }) => (
          <div className="flex gap-1">
            {row.original.isFeatured && <Badge variant="gradient">Featured</Badge>}
            {!row.original.isActive && <Badge variant="default">Inactive</Badge>}
          </div>
        ),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => openOfferingForm(row.original.id)}>
              Edit
            </Button>
            {row.original.isActive && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red"
                disabled={deactivate.isPending}
                onClick={() => deactivate.mutate(row.original.id)}
              >
                Deactivate
              </Button>
            )}
          </div>
        ),
      },
    ],
    [deactivate, openOfferingForm],
  );

  return <DataTable columns={columns} data={offerings} pageSize={10} />;
}
