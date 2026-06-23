"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { formatCurrency, formatDate, formatTier } from "@/shared/utils/formatters";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePaymentsStore } from "../store/usePaymentsStore";
import type { Payment } from "../types";
import { PaymentStatusBadge } from "./PaymentStatusBadge";

export function PaymentsTable({ payments }: { payments: Payment[] }) {
  const openRefund = usePaymentsStore((s) => s.openRefund);

  const columns = useMemo<ColumnDef<Payment>[]>(
    () => [
      {
        accessorKey: "memberName",
        header: "Member",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.memberName}</p>
            <p className="text-xs text-muted">{row.original.memberEmail}</p>
          </div>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => formatCurrency(row.original.amount),
      },
      {
        accessorKey: "tier",
        header: "Tier",
        cell: ({ row }) => (
          <Badge variant={row.original.tier === "executive" ? "gold" : "tier"}>
            {formatTier(row.original.tier)}
          </Badge>
        ),
      },
      {
        accessorKey: "paidAt",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.paidAt),
      },
      {
        accessorKey: "method",
        header: "Method",
        cell: ({ row }) => (
          <span className="uppercase text-xs">{row.original.method}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <PaymentStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) =>
          row.original.status === "paid" ? (
            <Button variant="ghost" size="sm" onClick={() => openRefund(row.original.id)}>
              Refund
            </Button>
          ) : null,
        enableSorting: false,
      },
    ],
    [openRefund],
  );

  return <DataTable columns={columns} data={payments} />;
}
