"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { formatDateTime, formatTier } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import type { EventAttendee } from "../types";

export function AttendeeTable({ attendees }: { attendees: EventAttendee[] }) {
  const columns = useMemo<ColumnDef<EventAttendee>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar name={row.original.name} size="sm" executive={row.original.tier === "executive"} />
            <div>
              <p className="font-medium">{row.original.name}</p>
              <p className="text-xs text-muted">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "tier",
        header: "Tier",
        cell: ({ row }) => (
          <Badge variant={row.original.tier === "executive" ? "tier" : "default"}>
            {formatTier(row.original.tier)}
          </Badge>
        ),
      },
      {
        accessorKey: "rsvpStatus",
        header: "RSVP",
        cell: ({ row }) => (
          <Badge variant={row.original.rsvpStatus === "confirmed" ? "status" : "stage"}>
            {row.original.rsvpStatus}
          </Badge>
        ),
      },
      {
        accessorKey: "isVip",
        header: "VIP",
        cell: ({ row }) =>
          row.original.isVip ? <Badge variant="gold">VIP</Badge> : <span className="text-muted">—</span>,
      },
      {
        accessorKey: "checkedInAt",
        header: "Check-in",
        cell: ({ row }) =>
          row.original.checkedInAt ? (
            formatDateTime(row.original.checkedInAt)
          ) : (
            <span className="text-muted">Not checked in</span>
          ),
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={attendees} pageSize={10} />;
}
