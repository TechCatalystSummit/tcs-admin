"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { type ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo } from "react";
import { useSponsorsStore } from "../store/useSponsorsStore";
import type { Sponsor } from "../types";
import { SponsorStatusBadge, SponsorTierBadge } from "./SponsorStatusBadge";

export function SponsorsTable() {
  useSponsorsStore((s) => s.filters);
  useSponsorsStore((s) => s.sponsors);
  const getFilteredSponsors = useSponsorsStore((s) => s.getFilteredSponsors);
  const filteredSponsors = getFilteredSponsors();

  const columns = useMemo<ColumnDef<Sponsor>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Company",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar name={row.original.name} size="sm" />
            <div>
              <p className="font-medium">{row.original.name}</p>
              <p className="text-xs text-muted">{row.original.industry}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "tier",
        header: "Tier",
        cell: ({ row }) => <SponsorTierBadge tier={row.original.tier} />,
      },
      {
        accessorKey: "eventsSponsored",
        header: "Events",
        cell: ({ row }) => row.original.eventsSponsored.length,
      },
      { accessorKey: "qrScans", header: "QR Scans" },
      { accessorKey: "leadsCount", header: "Leads" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <SponsorStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Link href={`/sponsors/${row.original.id}`}>
            <Button variant="ghost" size="sm">View</Button>
          </Link>
        ),
        enableSorting: false,
      },
    ],
    [],
  );

  return <DataTable columns={columns} data={filteredSponsors} />;
}
