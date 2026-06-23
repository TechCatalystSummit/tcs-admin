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
import { formatDate } from "@/shared/utils/formatters";
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

  if (!request) {
    return (
      <Dialog open={open} onOpenChange={(v) => !v && closeDetail()}>
        <DialogContent />
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeDetail()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Dinner Request</DialogTitle>
          <DialogDescription>{request.purpose}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <DinnerStatusBadge status={request.status} />
          <p className="text-sm text-muted">Preferred {formatDate(request.preferredDate)}</p>

          <div className="flex flex-wrap gap-2">
            {request.status === "requested" && (
              <Button
                size="sm"
                onClick={() => updateDinner.mutate({ id: request.id, body: { status: "approved" } })}
              >
                Approve
              </Button>
            )}
            {request.status === "approved" && (
              <Button
                size="sm"
                onClick={() =>
                  updateDinner.mutate({
                    id: request.id,
                    body: { status: "scheduled", scheduledAt: request.preferredDate },
                  })
                }
              >
                Schedule
              </Button>
            )}
          </div>

          <Textarea
            label="Admin note"
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
            rows={3}
          />
          <Button
            size="sm"
            variant="outline"
            disabled={!noteDraft.trim()}
            onClick={() => {
              updateDinner.mutate({ id: request.id, body: { adminNote: noteDraft.trim() } });
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
