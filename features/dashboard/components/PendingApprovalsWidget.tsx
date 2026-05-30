"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useDashboardStore } from "../store/useDashboardStore";
import { Button } from "@/shared/components/ui/Button";
import { Badge } from "@/shared/components/ui/Badge";
import { formatTier } from "@/shared/utils/formatters";
import Link from "next/link";
import { toast } from "sonner";

export function PendingApprovalsWidget() {
  const pending = useDashboardStore((s) => s.pendingApprovals);
  const approve = useDashboardStore((s) => s.approvePending);
  const decline = useDashboardStore((s) => s.declinePending);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <SectionLabel>Pending Approvals</SectionLabel>
        <Link href="/members/approvals" className="text-xs text-blue1 hover:underline">
          View all
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {pending.map((item) => (
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
                onClick={() => {
                  approve(item.id);
                  toast.success(`${item.name} approved`);
                }}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  decline(item.id);
                  toast.error(`${item.name} declined`);
                }}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
