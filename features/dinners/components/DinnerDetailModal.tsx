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
import { formatDate } from "@/shared/utils/formatters";
import Link from "next/link";
import { useState } from "react";
import { useUpdateDinner } from "../api/mutations";
import { useDinnersStore } from "../store/useDinnersStore";
import type { DinnerRequest } from "../types";
import { DinnerStatusBadge } from "./DinnerStatusBadge";

export function DinnerDetailModal({ requests }: { requests: DinnerRequest[] }) {
  const open = useDinnersStore((s) => s.detailOpen);
  const selectedId = useDinnersStore((s) => s.selectedRequestId);
  const closeDetail = useDinnersStore((s) => s.closeDetail);
  const updateDinner = useUpdateDinner();

  const request = requests.find((r) => r.id === selectedId);
  const [noteDraft, setNoteDraft] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [outcomeDraft, setOutcomeDraft] = useState("");

  if (!request) {
    return (
      <Dialog open={open} onOpenChange={(v) => !v && closeDetail()}>
        <DialogContent />
      </Dialog>
    );
  }

  const patch = (body: Record<string, unknown>) =>
    updateDinner.mutate({ id: request.id, body });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDetail()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dinner Request</DialogTitle>
          <DialogDescription>{request.purpose}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <DinnerStatusBadge status={request.status} />

          <div className="text-sm space-y-1">
            <p>
              <span className="text-muted">Member: </span>
              <Link href={`/members/${request.memberId}`} className="text-blue1 hover:underline">
                {request.requesterName}
              </Link>
              {request.requesterCompany ? ` · ${request.requesterCompany}` : null}
            </p>
            {request.offeringTitle && (
              <p>
                <span className="text-muted">Offering: </span>
                {request.offeringTitle}
              </p>
            )}
            {request.whoToMeet && (
              <p>
                <span className="text-muted">Who to meet: </span>
                {request.whoToMeet}
              </p>
            )}
            {request.budgetRange && (
              <p>
                <span className="text-muted">Budget: </span>
                {request.budgetRange}
              </p>
            )}
            <p className="text-muted">Preferred {formatDate(request.preferredDate)}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {request.status === "requested" && (
              <Button
                size="sm"
                disabled={updateDinner.isPending}
                onClick={() => patch({ status: "under_review" })}
              >
                Review
              </Button>
            )}
            {request.status === "under_review" && (
              <Button
                size="sm"
                disabled={updateDinner.isPending}
                onClick={() => patch({ status: "approved" })}
              >
                Approve
              </Button>
            )}
            {request.status === "approved" && (
              <>
                <Input
                  label="Schedule (ISO datetime)"
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
                <Button
                  size="sm"
                  className="self-end"
                  disabled={updateDinner.isPending || !scheduledAt}
                  onClick={() =>
                    patch({
                      status: "scheduled",
                      scheduledAt: new Date(scheduledAt).toISOString(),
                    })
                  }
                >
                  Schedule
                </Button>
              </>
            )}
            {request.status === "scheduled" && (
              <Button
                size="sm"
                disabled={updateDinner.isPending}
                onClick={() => patch({ status: "completed" })}
              >
                Mark completed
              </Button>
            )}
            {request.status === "completed" && (
              <>
                <Textarea
                  label="Outcome notes"
                  value={outcomeDraft}
                  onChange={(e) => setOutcomeDraft(e.target.value)}
                  rows={2}
                />
                <Button
                  size="sm"
                  disabled={updateDinner.isPending || !outcomeDraft.trim()}
                  onClick={() =>
                    patch({
                      status: "outcome_logged",
                      outcomeNotes: outcomeDraft.trim(),
                    })
                  }
                >
                  Log outcome
                </Button>
              </>
            )}
            {request.status !== "declined" && request.status !== "completed" && (
              <Button
                size="sm"
                variant="outline"
                disabled={updateDinner.isPending}
                onClick={() => patch({ status: "canceled" })}
              >
                Cancel
              </Button>
            )}
          </div>

          {request.adminNotes && (
            <p className="text-sm rounded-lg bg-surface/80 border border-border p-3">
              <span className="text-muted text-xs block mb-1">Admin note</span>
              {request.adminNotes}
            </p>
          )}

          <Textarea
            label="Admin note"
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            rows={3}
          />
          <Button
            size="sm"
            variant="outline"
            disabled={!noteDraft.trim() || updateDinner.isPending}
            onClick={() => {
              patch({ adminNote: noteDraft.trim() });
              setNoteDraft("");
            }}
          >
            Save note
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
