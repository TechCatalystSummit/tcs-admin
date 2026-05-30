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
import { useState } from "react";
import { useDinnersStore } from "../store/useDinnersStore";
import type { CreditAdjustReason, CreditRecord } from "../types";

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
  const credits = useDinnersStore((s) => s.credits);
  const closeAdjust = useDinnersStore((s) => s.closeAdjust);
  const adjustCredits = useDinnersStore((s) => s.adjustCredits);

  const record = credits.find((c) => c.memberId === memberId);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeAdjust()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Adjust credits</DialogTitle>
          <DialogDescription>
            {record
              ? `${record.memberName} — current balance: ${record.balance}`
              : "Select a member to adjust credits."}
          </DialogDescription>
        </DialogHeader>

        {record && memberId && (
          <AdjustCreditsForm
            key={memberId}
            record={record}
            memberId={memberId}
            onSubmit={adjustCredits}
            onClose={closeAdjust}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function AdjustCreditsForm({
  record,
  memberId,
  onSubmit,
  onClose,
}: {
  record: CreditRecord;
  memberId: string;
  onSubmit: (
    memberId: string,
    delta: number,
    reason: CreditAdjustReason,
    note?: string,
  ) => void;
  onClose: () => void;
}) {
  const [delta, setDelta] = useState(1);
  const [reason, setReason] = useState<CreditAdjustReason>("annual_allocation");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (delta === 0) return;
    onSubmit(memberId, delta, reason, note.trim() || undefined);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-ink2">Adjustment</p>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => setDelta((d) => d - 1)}>
            −
          </Button>
          <Input
            type="number"
            value={delta}
            onChange={(e) => setDelta(Number(e.target.value) || 0)}
            className="text-center"
          />
          <Button type="button" variant="outline" size="sm" onClick={() => setDelta((d) => d + 1)}>
            +
          </Button>
        </div>
        <p className="text-xs text-muted">
          New balance:{" "}
          <span className="font-semibold text-ink">
            {Math.max(0, record.balance + delta)}
          </span>
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="adjust-reason" className="text-xs font-medium text-ink2">
          Reason
        </label>
        <select
          id="adjust-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value as CreditAdjustReason)}
          className={cn(
            "flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink",
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
        label="Note (optional)"
        placeholder="Internal note for this adjustment"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={delta === 0}>
          Apply adjustment
        </Button>
      </div>
    </div>
  );
}
