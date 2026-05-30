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
import { formatCurrency, formatDate } from "@/shared/utils/formatters";
import { useState, type ReactNode } from "react";
import { useDinnersStore } from "../store/useDinnersStore";
import { DinnerStatusBadge } from "./DinnerStatusBadge";

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-border last:border-0">
      <span className="text-xs text-hint shrink-0">{label}</span>
      <span className="text-sm text-ink text-right">{value}</span>
    </div>
  );
}

export function DinnerDetailModal() {
  const open = useDinnersStore((s) => s.detailOpen);
  const selectedId = useDinnersStore((s) => s.selectedRequestId);
  const requests = useDinnersStore((s) => s.requests);
  const closeDetail = useDinnersStore((s) => s.closeDetail);
  const approveRequest = useDinnersStore((s) => s.approveRequest);
  const scheduleRequest = useDinnersStore((s) => s.scheduleRequest);
  const completeRequest = useDinnersStore((s) => s.completeRequest);
  const logOutcome = useDinnersStore((s) => s.logOutcome);
  const appendAdminNote = useDinnersStore((s) => s.appendAdminNote);

  const request = requests.find((r) => r.id === selectedId);
  const [outcomeDraft, setOutcomeDraft] = useState("");
  const [noteDraft, setNoteDraft] = useState("");

  const handleLogOutcome = () => {
    if (!request || !outcomeDraft.trim()) return;
    logOutcome(request.id, outcomeDraft.trim());
    setOutcomeDraft("");
  };

  const handleAddNote = () => {
    if (!request || !noteDraft.trim()) return;
    appendAdminNote(request.id, noteDraft.trim());
    setNoteDraft("");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          closeDetail();
          setOutcomeDraft("");
          setNoteDraft("");
        }
      }}
    >
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        {request && (
          <>
            <DialogHeader>
              <DialogTitle>{request.purpose}</DialogTitle>
              <DialogDescription>
                {request.requesterName} · {request.requesterCompany}
              </DialogDescription>
            </DialogHeader>

            <div className="mb-4">
              <DinnerStatusBadge status={request.status} />
            </div>

            <div className="rounded-xl border border-border bg-surf/50 px-4 mb-4">
              <DetailRow label="Preferred date" value={formatDate(request.preferredDate)} />
              {request.scheduledDate && (
                <DetailRow label="Scheduled" value={formatDate(request.scheduledDate)} />
              )}
              <DetailRow label="Budget" value={formatCurrency(request.budget)} />
              <DetailRow label="Guests" value={request.guestCount} />
              <DetailRow label="Credits used" value={request.creditsUsed} />
              {request.location && <DetailRow label="Location" value={request.location} />}
              <DetailRow label="Submitted" value={formatDate(request.createdAt)} />
            </div>

            {request.adminNotes && (
              <div className="mb-4 rounded-xl border border-border bg-white p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-hint mb-1">
                  Admin notes
                </p>
                <p className="text-sm text-ink whitespace-pre-wrap">{request.adminNotes}</p>
              </div>
            )}

            {request.outcome && (
              <div className="mb-4 rounded-xl border border-green/20 bg-green-l/30 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-green mb-1">
                  Outcome
                </p>
                <p className="text-sm text-ink">{request.outcome}</p>
              </div>
            )}

            <div className="space-y-3 mb-4">
              <Textarea
                label="Add admin note"
                placeholder="Internal note visible to admins"
                value={noteDraft}
                onChange={(e) => setNoteDraft(e.target.value)}
                rows={2}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddNote}
                disabled={!noteDraft.trim()}
              >
                Save note
              </Button>
            </div>

            {(request.status === "scheduled" || request.status === "completed") && (
              <div className="space-y-3 mb-4">
                <Textarea
                  label="Log outcome"
                  placeholder="Attendance, follow-ups, NPS, etc."
                  value={outcomeDraft}
                  onChange={(e) => setOutcomeDraft(e.target.value)}
                  rows={2}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleLogOutcome}
                  disabled={!outcomeDraft.trim()}
                >
                  Log outcome
                </Button>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
              {(request.status === "requested" || request.status === "under_review") && (
                <Button type="button" size="sm" onClick={() => approveRequest(request.id)}>
                  Approve
                </Button>
              )}
              {request.status === "approved" && (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => scheduleRequest(request.id)}
                >
                  Schedule
                </Button>
              )}
              {request.status === "scheduled" && (
                <Button type="button" size="sm" onClick={() => completeRequest(request.id)}>
                  Mark complete
                </Button>
              )}
              <Button type="button" variant="ghost" size="sm" onClick={closeDetail}>
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
