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
import { useState } from "react";
import { useIntrosStore } from "../store/useIntrosStore";
import { INTRO_REASON_LABELS } from "../types";
import { IntroStatusBadge } from "./IntroStatusBadge";

export function IntroDetailModal() {
  const detailModalOpen = useIntrosStore((s) => s.detailModalOpen);
  const closeDetail = useIntrosStore((s) => s.closeDetail);
  const getActiveIntro = useIntrosStore((s) => s.getActiveIntro);
  const approveIntro = useIntrosStore((s) => s.approveIntro);
  const declineIntro = useIntrosStore((s) => s.declineIntro);
  const completeIntro = useIntrosStore((s) => s.completeIntro);
  const setFollowUp = useIntrosStore((s) => s.setFollowUp);
  const addNote = useIntrosStore((s) => s.addNote);
  const assignIntro = useIntrosStore((s) => s.assignIntro);

  const intro = getActiveIntro();
  const [note, setNote] = useState("");
  const [assignee, setAssignee] = useState("");
  const [outcome, setOutcome] = useState("");

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeDetail();
      setNote("");
      setAssignee("");
      setOutcome("");
    }
  };

  if (!intro) {
    return (
      <Dialog open={detailModalOpen} onOpenChange={handleOpenChange}>
        <DialogContent />
      </Dialog>
    );
  }

  return (
    <Dialog open={detailModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Intro Request</DialogTitle>
          <DialogDescription>
            {intro.fromMember.name} → {intro.toMember.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <IntroStatusBadge status={intro.status} />
            <span className="text-xs text-muted">Requested {formatDate(intro.requestedAt)}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-border p-3">
              <p className="text-[10px] uppercase text-hint font-semibold">From</p>
              <p className="font-medium text-ink mt-1">{intro.fromMember.name}</p>
              <p className="text-xs text-muted">{intro.fromMember.title}</p>
              <p className="text-xs text-muted">{intro.fromMember.company}</p>
            </div>
            <div className="rounded-xl border border-border p-3">
              <p className="text-[10px] uppercase text-hint font-semibold">To</p>
              <p className="font-medium text-ink mt-1">{intro.toMember.name}</p>
              <p className="text-xs text-muted">{intro.toMember.title}</p>
              <p className="text-xs text-muted">{intro.toMember.company}</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] uppercase text-hint font-semibold">Reason</p>
            <p className="text-sm font-medium text-ink mt-1">
              {INTRO_REASON_LABELS[intro.reason]}
            </p>
            <p className="text-sm text-muted mt-1">{intro.reasonDetail}</p>
          </div>

          {intro.outcome && (
            <div>
              <p className="text-[10px] uppercase text-hint font-semibold">Outcome</p>
              <p className="text-sm text-ink2 mt-1">{intro.outcome}</p>
            </div>
          )}

          {intro.assignedTo && (
            <div>
              <p className="text-[10px] uppercase text-hint font-semibold">Assigned To</p>
              <p className="text-sm text-ink2 mt-1">{intro.assignedTo}</p>
            </div>
          )}

          {intro.adminNotes && (
            <div>
              <p className="text-[10px] uppercase text-hint font-semibold">Admin Notes</p>
              <p className="text-sm text-ink2 mt-1 whitespace-pre-wrap">{intro.adminNotes}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            {intro.status === "pending" && (
              <>
                <Button size="sm" onClick={() => approveIntro(intro.id)}>Approve</Button>
                <Button size="sm" variant="danger" onClick={() => declineIntro(intro.id)}>
                  Decline
                </Button>
              </>
            )}
            {intro.status === "approved" && (
              <>
                <Button size="sm" onClick={() => completeIntro(intro.id, outcome || undefined)}>
                  Mark Complete
                </Button>
                <Button size="sm" variant="outline" onClick={() => setFollowUp(intro.id)}>
                  Set Follow-up
                </Button>
              </>
            )}
          </div>

          {intro.status === "approved" && (
            <Input
              placeholder="Outcome notes (optional)"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            />
          )}

          <div className="space-y-2">
            <Input
              label="Assign to"
              placeholder="Admin name or team"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
            />
            <Button
              size="sm"
              variant="outline"
              disabled={!assignee.trim()}
              onClick={() => {
                assignIntro(intro.id, assignee.trim());
                setAssignee("");
              }}
            >
              Assign
            </Button>
          </div>

          <div className="space-y-2">
            <Textarea
              label="Add note"
              placeholder="Internal admin note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
            <Button
              size="sm"
              variant="outline"
              disabled={!note.trim()}
              onClick={() => {
                addNote(intro.id, note.trim());
                setNote("");
              }}
            >
              Add Note
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
