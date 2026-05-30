"use client";

import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Textarea } from "@/shared/components/ui/Textarea";
import { useState } from "react";
import { useIntrosStore } from "../store/useIntrosStore";
import { INTRO_REASON_LABELS, type IntroReason } from "../types";

const reasons: IntroReason[] = [
  "investment",
  "partnership",
  "mentorship",
  "hiring",
  "customer-intro",
  "advisory",
  "other",
];

export function CreateIntroModal() {
  const createModalOpen = useIntrosStore((s) => s.createModalOpen);
  const closeCreateModal = useIntrosStore((s) => s.closeCreateModal);
  const createIntro = useIntrosStore((s) => s.createIntro);
  const members = useIntrosStore((s) => s.members);

  const [fromMemberId, setFromMemberId] = useState("");
  const [toMemberId, setToMemberId] = useState("");
  const [reason, setReason] = useState<IntroReason>("partnership");
  const [reasonDetail, setReasonDetail] = useState("");

  const resetForm = () => {
    setFromMemberId("");
    setToMemberId("");
    setReason("partnership");
    setReasonDetail("");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeCreateModal();
      resetForm();
    }
  };

  const canSubmit =
    fromMemberId &&
    toMemberId &&
    fromMemberId !== toMemberId &&
    reasonDetail.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    createIntro({ fromMemberId, toMemberId, reason, reasonDetail: reasonDetail.trim() });
    resetForm();
  };

  return (
    <Dialog open={createModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Intro</DialogTitle>
          <DialogDescription>
            Manually create a curated introduction between two members.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="from-member" className="text-xs font-medium text-ink2">
              Member A (From)
            </label>
            <select
              id="from-member"
              value={fromMemberId}
              onChange={(e) => setFromMemberId(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
            >
              <option value="">Select member...</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} · {m.company}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="to-member" className="text-xs font-medium text-ink2">
              Member B (To)
            </label>
            <select
              id="to-member"
              value={toMemberId}
              onChange={(e) => setToMemberId(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
            >
              <option value="">Select member...</option>
              {members.map((m) => (
                <option key={m.id} value={m.id} disabled={m.id === fromMemberId}>
                  {m.name} · {m.company}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reason" className="text-xs font-medium text-ink2">
              Reason
            </label>
            <select
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value as IntroReason)}
              className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
            >
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {INTRO_REASON_LABELS[r]}
                </option>
              ))}
            </select>
          </div>

          <Textarea
            label="Reason details"
            placeholder="Why should these members be connected?"
            value={reasonDetail}
            onChange={(e) => setReasonDetail(e.target.value)}
            rows={4}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!canSubmit}>
              Create Intro
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
