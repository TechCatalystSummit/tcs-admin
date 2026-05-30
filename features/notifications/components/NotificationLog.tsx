"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Badge } from "@/shared/components/ui/Badge";
import { formatDateTime, formatPercent } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useNotificationsStore } from "../store/useNotificationsStore";
import {
  AUDIENCE_LABELS,
  NOTIFICATION_TYPE_LABELS,
  type NotificationRecord,
} from "../types";

export function NotificationLog() {
  const notifications = useNotificationsStore((s) => s.notifications);

  const columns = useMemo<ColumnDef<NotificationRecord>[]>(
    () => [
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant="gradient">{NOTIFICATION_TYPE_LABELS[row.original.type]}</Badge>
        ),
      },
      { accessorKey: "title", header: "Title" },
      {
        accessorKey: "audience",
        header: "Audience",
        cell: ({ row }) => (
          <div>
            <p className="text-sm">{AUDIENCE_LABELS[row.original.audience]}</p>
            {row.original.audienceDetail && (
              <p className="text-xs text-muted">{row.original.audienceDetail}</p>
            )}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={row.original.status === "sent" ? "status" : "default"}
            className={
              row.original.status === "scheduled"
                ? "bg-orange-l text-orange border-orange/20"
                : undefined
            }
          >
            {row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}
          </Badge>
        ),
      },
      {
        accessorKey: "sentAt",
        header: "Sent At",
        cell: ({ row }) => row.original.sentAt ? formatDateTime(row.original.sentAt) : "—",
      },
      { accessorKey: "recipientCount", header: "Recipients" },
      {
        accessorKey: "openRate",
        header: "Open Rate",
        cell: ({ row }) =>
          row.original.openRate != null ? formatPercent(row.original.openRate) : "—",
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={notifications} pageSize={10} />;
}
