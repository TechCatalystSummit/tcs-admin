"use client";

import { useCreateQRCode } from "../api/mutations";
import { useQRStore } from "../store/useQRStore";
import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Input } from "@/shared/components/ui/Input";
import { useState } from "react";
import { QR_TYPE_LABELS, type QRType } from "../types";

const QR_TYPES = Object.keys(QR_TYPE_LABELS) as QRType[];

export function GenerateQRModal() {
  const open = useQRStore((s) => s.generateOpen);
  const closeGenerate = useQRStore((s) => s.closeGenerate);
  const createQR = useCreateQRCode();

  const [name, setName] = useState("");
  const [type, setType] = useState<QRType>("event_check_in");
  const [source, setSource] = useState("");
  const [campaign, setCampaign] = useState("");
  const [eventName, setEventName] = useState("");

  const reset = () => {
    setName("");
    setType("event_check_in");
    setSource("");
    setCampaign("");
    setEventName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !source.trim() || !campaign.trim()) return;
    createQR.mutate(
      {
        name: name.trim(),
        type,
        source: source.trim(),
        campaign: campaign.trim(),
        eventName: eventName.trim() || undefined,
      },
      {
        onSuccess: () => {
          reset();
          closeGenerate();
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          closeGenerate();
          reset();
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generate QR Code</DialogTitle>
          <DialogDescription>Create a new trackable QR code for events, sponsors, or campaigns.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Code name"
              placeholder="Summit 2026 Check-in"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div>
              <label className="text-xs font-medium text-ink2 block mb-1.5">Type</label>
              <select
                className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
                value={type}
                onChange={(e) => setType(e.target.value as QRType)}
              >
                {QR_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {QR_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Source"
              placeholder="Website, Booth, Email…"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
            <Input
              label="Campaign slug"
              placeholder="summit-2026-checkin"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              required
            />
            <Input
              label="Event (optional)"
              placeholder="TCS Summit 2026"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
            <div className="flex gap-2 pt-2">
              <Button type="submit" size="sm" disabled={createQR.isPending}>Generate</Button>
              <Button type="button" variant="ghost" size="sm" onClick={closeGenerate}>
                Cancel
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surf p-6">
            <div className="w-32 h-32 rounded-xl bg-white border border-border flex items-center justify-center mb-4">
              <span className="text-hint text-xs text-center px-2">Preview updates after generate</span>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
