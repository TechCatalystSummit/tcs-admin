"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useDashboardData } from "../api/queries";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { formatTier } from "@/shared/utils/formatters";
import Link from "next/link";

export function PendingApprovalsWidget() {
  const {
    pendingApprovals,
    isLoading,
    isError,
    isMutating,
    approvePending,
    declinePending,
  } = useDashboardData();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <SectionLabel>Pending Approvals</SectionLabel>
        <Link href="/members/approvals" className="text-xs text-blue1 hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <Spinner className="h-6 w-6" />
        ) : isError ? (
          <p className="text-sm text-muted">Could not load approvals.</p>
        ) : pendingApprovals.length === 0 ? (
          <p className="text-sm text-muted">No pending approvals right now.</p>
        ) : (
          pendingApprovals.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 py-2 border-b border-border last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink truncate">{item.name}</p>
                <p className="text-xs text-muted truncate">{item.company}</p>
                <Badge variant="tier" className="mt-1">{formatTier(item.tier)}</Badge>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isMutating}
                  onClick={() => approvePending(item.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={isMutating}
                  onClick={() => declinePending(item.id)}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
