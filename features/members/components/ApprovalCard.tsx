"use client";

import { Avatar } from "@/shared/components/ui/Avatar";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { formatDate } from "@/shared/utils/formatters";
import Link from "next/link";
import { useApproveMember, useDeclineMember } from "../api/mutations";
import type { ApprovalRequest } from "../types";
import { TierBadge } from "./TierBadge";

export function ApprovalCard({ approval }: { approval: ApprovalRequest }) {
  const approve = useApproveMember();
  const decline = useDeclineMember();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar name={approval.name} size="md" executive={approval.tier === "executive"} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink">{approval.name}</p>
                <p className="text-xs text-muted">{approval.title} · {approval.company}</p>
                <p className="text-xs text-hint mt-0.5">{approval.city}</p>
              </div>
              <TierBadge tier={approval.tier} />
            </div>
            <p className="text-sm text-ink2 mt-3 line-clamp-2">{approval.bio}</p>
            <p className="text-[10px] text-hint mt-2">Submitted {formatDate(approval.submittedAt)}</p>
            {approval.status === "pending" && (
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  disabled={approve.isPending}
                  onClick={() => approve.mutate({ id: approval.id })}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={decline.isPending}
                  onClick={() => decline.mutate({ id: approval.id })}
                >
                  Decline
                </Button>
                <Link href={`/members/${approval.memberId}`}>
                  <Button size="sm" variant="ghost">View profile</Button>
                </Link>
              </div>
            )}
            {approval.status !== "pending" && (
              <p className="text-xs font-medium mt-3 capitalize text-muted">
                Status: {approval.status}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
