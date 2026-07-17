"use client";

import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { FileUploadField } from "@/shared/components/ui/ImageUploadField";
import { Input } from "@/shared/components/ui/Input";
import { useState } from "react";
import { useOutreachStore } from "../store/useOutreachStore";
import { DECK_TYPE_LABELS, type DeckType } from "../types";

const deckTypes: DeckType[] = ["sponsor", "vendor", "investor", "partner"];

export function UploadDeckModal() {
  const uploadDeckModalOpen = useOutreachStore((s) => s.uploadDeckModalOpen);
  const closeUploadDeckModal = useOutreachStore((s) => s.closeUploadDeckModal);
  const addDeck = useOutreachStore((s) => s.addDeck);
  const events = useOutreachStore((s) => s.events);

  const [title, setTitle] = useState("");
  const [type, setType] = useState<DeckType>("sponsor");
  const [fileUrl, setFileUrl] = useState("");
  const [eventAssociation, setEventAssociation] = useState("");
  const [isActive, setIsActive] = useState(true);

  const resetForm = () => {
    setTitle(""); setType("sponsor"); setFileUrl(""); setEventAssociation(""); setIsActive(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) { closeUploadDeckModal(); resetForm(); }
  };

  const canSubmit = title.trim() && fileUrl.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    addDeck({
      title: title.trim(),
      type,
      version: "1.0",
      fileUrl: fileUrl.trim(),
      eventAssociation: eventAssociation || undefined,
      isActive,
      isDefault: false,
    });
    resetForm();
  };

  return (
    <Dialog open={uploadDeckModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Deck</DialogTitle>
          <DialogDescription>Add a new pitch deck to the library.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink2">Type</label>
            <select
              className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value as DeckType)}
            >
              {deckTypes.map((t) => (
                <option key={t} value={t}>{DECK_TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink2">Event Association</label>
            <select
              className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm"
              value={eventAssociation}
              onChange={(e) => setEventAssociation(e.target.value)}
            >
              <option value="">None</option>
              {events.map((evt) => (
                <option key={evt.id} value={evt.label}>{evt.label}</option>
              ))}
            </select>
          </div>
          <FileUploadField label="Deck file" value={fileUrl} onChange={setFileUrl} />
          <label className="flex items-center gap-2 text-sm text-ink2">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="rounded" />
            Active
          </label>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={!canSubmit}>Upload Deck</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
