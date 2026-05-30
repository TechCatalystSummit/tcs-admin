"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Button } from "@/shared/components/ui/Button";
import { formatDate } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { useEventsStore } from "../store/useEventsStore";
import type { Event } from "../types";
import { EventStatusBadge } from "./EventStatusBadge";

export function EventsTable() {
  const getFilteredEvents = useEventsStore((s) => s.getFilteredEvents);
  const events = getFilteredEvents();

  const columns = useMemo<ColumnDef<Event>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.title}</p>
            <p className="text-xs text-muted capitalize">{row.original.type}</p>
          </div>
        ),
      },
      {
        accessorKey: "startDate",
        header: "Date",
        cell: ({ row }) => (
          <span>
            {formatDate(row.original.startDate)}
            {row.original.endDate !== row.original.startDate && (
              <span className="text-muted"> – {formatDate(row.original.endDate)}</span>
            )}
          </span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <div>
            <p>{row.original.location}</p>
            <p className="text-xs text-muted">{row.original.venue}</p>
          </div>
        ),
      },
      {
        accessorKey: "rsvpCount",
        header: "RSVPs",
      },
      {
        accessorKey: "checkedInCount",
        header: "Checked In",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <EventStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Link href={`/events/${row.original.id}`}>
            <Button variant="ghost" size="sm">View</Button>
          </Link>
        ),
        enableSorting: false,
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={events} />;
}
