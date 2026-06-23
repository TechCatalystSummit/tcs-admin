"use client";

import { useCreateAdminNote, useAdminNotes } from "@/features/admin-notes/api/queries";
import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { useState } from "react";

export function AdminNotesPanel({ memberId }: { memberId: string }) {
  const { data: notes = [], isLoading, isError, error, refetch } = useAdminNotes("user", memberId);
  const createNote = useCreateAdminNote();
  const [draft, setDraft] = useState("");

  const handleSave = () => {
    if (!draft.trim()) return;
    createNote.mutate(
      { targetType: "user", targetId: memberId, note: draft.trim() },
      { onSuccess: () => setDraft("") },
    );
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <p className="text-sm font-semibold text-ink">Admin Notes</p>
        {isLoading ? (
          <Spinner className="h-5 w-5" />
        ) : isError ? (
          <QueryErrorState error={error} onRetry={() => void refetch()} title="Couldn't load notes" />
        ) : (
          <>
            {notes.length > 0 && (
              <ul className="space-y-2 text-sm text-ink2 max-h-40 overflow-y-auto">
                {notes.map((n) => (
                  <li key={n.id} className="border-b border-border pb-2 last:border-0">
                    {n.note}
                  </li>
                ))}
              </ul>
            )}
            <textarea
              className="w-full min-h-[100px] rounded-xl border border-border bg-surf p-3 text-sm text-ink resize-y"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Add an admin note..."
            />
            <Button size="sm" onClick={handleSave} disabled={createNote.isPending || !draft.trim()}>
              {createNote.isPending ? "Saving…" : "Save note"}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
