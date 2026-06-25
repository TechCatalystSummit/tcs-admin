"use client";

import { useAdminEvents } from "@/features/events/api/queries";
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
import { useMemo, useState } from "react";
import { QR_TYPE_LABELS, SHORT_CODE_RE, type QRType } from "../types";

const QR_TYPES = Object.keys(QR_TYPE_LABELS) as QRType[];

export function GenerateQRModal() {
  const open = useQRStore((s) => s.generateOpen);
  const closeGenerate = useQRStore((s) => s.closeGenerate);
  const createQR = useCreateQRCode();
  const { data: eventsData } = useAdminEvents();

  const [shortCode, setShortCode] = useState("");
  const [type, setType] = useState<QRType>("general_signup");
  const [source, setSource] = useState("");
  const [campaign, setCampaign] = useState("");
  const [eventId, setEventId] = useState("");

  const events = eventsData?.events ?? [];
  const shortCodeError = useMemo(() => {
    const v = shortCode.trim();
    if (!v) return null;
    if (!SHORT_CODE_RE.test(v)) return "Use letters, numbers, hyphens, and underscores only";
    return null;
  }, [shortCode]);

  const reset = () => {
    setShortCode("");
    setType("general_signup");
    setSource("");
    setCampaign("");
    setEventId("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = shortCode.trim();
    if (!code || !SHORT_CODE_RE.test(code) || !source.trim() || !campaign.trim()) return;
    createQR.mutate(
      {
        shortCode: code,
        type,
        source: source.trim(),
        campaign: campaign.trim(),
        eventId: eventId || undefined,
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
          <DialogDescription>
            Create a trackable QR code. The image encodes the short code for scanning in the Summit app.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              label="Short code"
              placeholder="summit26-checkin"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              required
              error={shortCodeError ?? undefined}
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
              label="Campaign label"
              placeholder="Summit 2026 Check-in"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              required
            />
            <Input
              label="Source"
              placeholder="Website, Booth, Email…"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              required
            />
            {events.length > 0 && (
              <div>
                <label className="text-xs font-medium text-ink2 block mb-1.5">Event (optional)</label>
                <select
                  className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                >
                  <option value="">None</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                size="sm"
                disabled={createQR.isPending || Boolean(shortCodeError)}
              >
                Generate
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={closeGenerate}>
                Cancel
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-surf p-6">
            <div className="w-32 h-32 rounded-xl bg-white border border-border flex items-center justify-center mb-4">
              <span className="text-hint text-xs text-center px-2">
                {shortCode.trim() ? `Encodes: ${shortCode.trim()}` : "Enter a short code to preview payload"}
              </span>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
