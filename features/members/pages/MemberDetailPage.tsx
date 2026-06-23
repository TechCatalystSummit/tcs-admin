"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { useState } from "react";
import { AdminNotesPanel } from "../components/AdminNotesPanel";
import { MemberProfilePanel } from "../components/MemberProfilePanel";
import { EditMemberModal } from "../components/EditMemberModal";
import { useMember } from "../api/queries";

export default function MemberDetailPage({ memberId }: { memberId: string }) {
  const [editOpen, setEditOpen] = useState(false);
  const { data: member, isLoading } = useMember(memberId);

  return (
    <>
      <PageHeader
        title={member?.name ?? "Member Profile"}
        subtitle={member ? `${member.title} · ${member.company}` : `ID: ${memberId}`}
        action={
          member ? (
            <GradientButton onClick={() => setEditOpen(true)}>Edit member</GradientButton>
          ) : undefined
        }
      />
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MemberProfilePanel memberId={memberId} onEdit={() => setEditOpen(true)} />
          </div>
          <div>
            <AdminNotesPanel
              key={`${memberId}-${member?.adminNotes ?? ""}`}
              memberId={memberId}
            />
          </div>
        </div>
      )}
      <EditMemberModal
        memberId={memberId}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}
