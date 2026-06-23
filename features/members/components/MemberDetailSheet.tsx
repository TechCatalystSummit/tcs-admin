"use client";

import { AdminNotesPanel } from "@/features/members/components/AdminNotesPanel";
import { MemberProfilePanel } from "@/features/members/components/MemberProfilePanel";
import { EditMemberModal } from "@/features/members/components/EditMemberModal";
import { useMember } from "@/features/members/api/queries";
import { useMembersStore } from "@/features/members/store/useMembersStore";
import { Button } from "@/shared/components/ui/Button";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/ui/Sheet";
import Link from "next/link";
import { useState } from "react";

export function MemberDetailSheet() {
  const sheetMemberId = useMembersStore((s) => s.sheetMemberId);
  const closeMemberSheet = useMembersStore((s) => s.closeMemberSheet);
  const { data: member } = useMember(sheetMemberId);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Sheet open={!!sheetMemberId} onOpenChange={(open) => !open && closeMemberSheet()}>
        <SheetContent className="overflow-y-auto">
          {member && sheetMemberId && (
            <>
              <SheetHeader>
                <SheetTitle>{member.name}</SheetTitle>
                <p className="text-sm text-muted mt-1">{member.title} · {member.company}</p>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <MemberProfilePanel memberId={sheetMemberId} onEdit={() => setEditOpen(true)} />
                <AdminNotesPanel
                  key={`sheet-${sheetMemberId}-${member.adminNotes ?? ""}`}
                  memberId={sheetMemberId}
                />
                <div className="flex gap-2 pt-2">
                  <Link href={`/members/${sheetMemberId}`} className="flex-1" onClick={closeMemberSheet}>
                    <Button variant="outline" className="w-full">Open full profile</Button>
                  </Link>
                  <GradientButton className="flex-1" onClick={() => setEditOpen(true)}>
                    Edit
                  </GradientButton>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
      {sheetMemberId && (
        <EditMemberModal
          memberId={sheetMemberId}
          open={editOpen}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}
