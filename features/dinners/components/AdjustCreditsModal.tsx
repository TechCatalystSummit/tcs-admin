"use client";

import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { cn } from "@/shared/utils/cn";
import { useMembersList } from "@/features/members/api/queries";
import { useState } from "react";
import { useAdjustDinnerCredits } from "../api/mutations";
import { useDinnersStore } from "../store/useDinnersStore";
import type { CreditAdjustReason } from "../types";

const REASONS: { value: CreditAdjustReason; label: string }[] = [
  { value: "annual_allocation", label: "Annual allocation" },
  { value: "promotional", label: "Promotional grant" },
  { value: "correction", label: "Balance correction" },
  { value: "penalty", label: "Penalty / deduction" },
  { value: "redemption", label: "Dinner redemption" },
  { value: "other", label: "Other" },
];

export function AdjustCreditsModal() {
  const open = useDinnersStore((s) => s.adjustOpen);
  const memberId = useDinnersStore((s) => s.adjustMemberId);
  const closeAdjust = useDinnersStore((s) => s.closeAdjust);
  const { data: membersData } = useMembersList();
  const members = membersData?.members ?? [];
  const selectedMember = members.find((m) => m.id === memberId);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeAdjust()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust credits</DialogTitle>
          <DialogDescription>
            Set a member&apos;s dinner credit balance via POST /api/dinners/credits.
          </DialogDescription>
        </DialogHeader>

        <AdjustCreditsForm
          key={memberId ?? "new"}
          members={members}
          initialMemberId={memberId}
          selectedMemberName={selectedMember?.name}
          onClose={closeAdjust}
        />
      </DialogContent>
    </Dialog>
  );
}

function AdjustCreditsForm({
  members,
  initialMemberId,
  selectedMemberName,
  onClose,
}: {
  members: { id: string; name: string; company: string }[];
  initialMemberId: string | null;
  selectedMemberName?: string;
  onClose: () => void;
}) {
  const adjustCredits = useAdjustDinnerCredits();
  const initialBalance = useDinnersStore((s) => s.adjustInitialBalance);
  const [userId, setUserId] = useState(initialMemberId ?? "");
  const [balance, setBalance] = useState(initialBalance ?? 1);
  const [reason, setReason] = useState<CreditAdjustReason>("annual_allocation");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!userId || balance < 0) return;
    adjustCredits.mutate(
      { userId, balance },
      {
        onSuccess: () => onClose(),
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="credit-member" className="text-xs font-medium text-ink2">
          Member
        </label>
        <select
          id="credit-member"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className={cn(
            "flex h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink",
            "focus:outline-none focus:ring-2 focus:ring-blue1/20 focus:border-blue1",
          )}
        >
          <option value="">Select member…</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name} · {m.company}
            </option>
          ))}
        </select>
        {selectedMemberName && !userId ? (
          <p className="text-xs text-muted">Previously selected: {selectedMemberName}</p>
        ) : null}
      </div>

      <Input
        label="New balance"
        type="number"
        min={0}
        value={balance}
        onChange={(e) => setBalance(Number(e.target.value) || 0)}
      />

      <div className="space-y-1.5">
        <label htmlFor="adjust-reason" className="text-xs font-medium text-ink2">
          Reason (internal)
        </label>
        <select
          id="adjust-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value as CreditAdjustReason)}
          className={cn(
            "flex h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink",
            "focus:outline-none focus:ring-2 focus:ring-blue1/20 focus:border-blue1",
          )}
        >
          {REASONS.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      <Textarea
        label="Note (optional, not sent to API)"
        placeholder="Internal note for this adjustment"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!userId || adjustCredits.isPending}
        >
          Set balance
        </Button>
      </div>
    </div>
  );
}
