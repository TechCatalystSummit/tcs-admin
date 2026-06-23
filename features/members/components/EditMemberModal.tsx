"use client";

import { TIERS } from "@/core/constants/tiers";
import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Textarea } from "@/shared/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateMember } from "../api/mutations";
import { useMember } from "../api/queries";
import type { MemberStatus, MemberTier } from "../types";

const editMemberSchema = z.object({
  tier: z.enum(["community", "builder", "executive", "partner", "legacy"]),
  status: z.enum(["active", "pending", "suspended", "declined"]),
  adminNotes: z.string().optional(),
});

type EditMemberValues = z.infer<typeof editMemberSchema>;

interface EditMemberModalProps {
  memberId: string | null;
  open: boolean;
  onClose: () => void;
}

export function EditMemberModal({ memberId, open, onClose }: EditMemberModalProps) {
  const { data: member } = useMember(memberId);
  const updateMember = useUpdateMember();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditMemberValues>({
    resolver: zodResolver(editMemberSchema),
    values: member
      ? {
          tier: member.tier,
          status: member.status,
          adminNotes: member.adminNotes ?? "",
        }
      : undefined,
  });

  const onSubmit = (data: EditMemberValues) => {
    if (!memberId) return;
    updateMember.mutate(
      {
        id: memberId,
        tier: data.tier as MemberTier,
        status: data.status as MemberStatus,
        adminNotes: data.adminNotes,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>
        {member && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-sm text-muted">{member.name} · {member.company}</p>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink2">Tier</label>
              <select
                {...register("tier")}
                className="flex h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
              >
                {TIERS.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
              {errors.tier && <p className="text-xs text-red">{errors.tier.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink2">Status</label>
              <select
                {...register("status")}
                className="flex h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
                <option value="declined">Declined</option>
              </select>
              {errors.status && <p className="text-xs text-red">{errors.status.message}</p>}
            </div>

            <Textarea
              label="Admin notes"
              {...register("adminNotes")}
              rows={4}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={updateMember.isPending}>Save changes</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
