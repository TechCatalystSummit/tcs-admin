"use client";

import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { formatDate } from "@/shared/utils/formatters";
import { useMember } from "../api/queries";
import { StatusBadge } from "./StatusBadge";
import { TierBadge } from "./TierBadge";

export function MemberProfilePanel({
  memberId,
  onEdit,
}: {
  memberId: string;
  onEdit?: () => void;
}) {
  const { data: member, isLoading } = useMember(memberId);

  if (isLoading) {
    return <Spinner className="h-6 w-6" />;
  }

  if (!member) {
    return <p className="text-muted">Member not found</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Avatar name={member.name} size="lg" executive={member.tier === "executive"} />
          <div>
            <h2 className="text-xl font-bold text-ink">{member.name}</h2>
            <p className="text-sm text-muted">{member.title} · {member.company}</p>
            <p className="text-xs text-hint mt-1">{member.city}</p>
            <div className="flex gap-2 mt-2">
              <TierBadge tier={member.tier} />
              <StatusBadge status={member.status} />
              {member.isVerified && <Badge variant="gradient">Verified</Badge>}
            </div>
          </div>
        </div>
        {onEdit && (
          <Button variant="outline" size="sm" onClick={onEdit}>
            Edit
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-4 space-y-3">
          <div>
            <p className="text-[10px] uppercase text-hint font-semibold">Bio</p>
            <p className="text-sm text-ink2 mt-1">{member.bio}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-[10px] uppercase text-hint font-semibold">Email</p>
              <p className="text-ink2">{member.email}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-hint font-semibold">Phone</p>
              <p className="text-ink2">{member.phone}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-hint font-semibold">Joined</p>
              <p className="text-ink2">{formatDate(member.joinedAt)}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-hint font-semibold">MRR</p>
              <p className="text-ink2">{member.mrr > 0 ? `$${member.mrr}/mo` : "Free"}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
            <div className="text-center">
              <p className="text-lg font-bold text-ink">{member.eventsAttended}</p>
              <p className="text-[10px] text-hint">Events</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-ink">{member.introsRequested}</p>
              <p className="text-[10px] text-hint">Intros out</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-ink">{member.introsReceived}</p>
              <p className="text-[10px] text-hint">Intros in</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
