"use client";

import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { Input } from "@/shared/components/ui/Input";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Textarea } from "@/shared/components/ui/Textarea";
import { useState } from "react";
import { useNotificationsStore } from "../store/useNotificationsStore";
import { NOTIFICATION_TYPE_LABELS, type NotificationAudience, type NotificationType } from "../types";
import { AudienceSelector } from "./AudienceSelector";

const types: NotificationType[] = ["announcement", "event", "intro", "reminder", "promotion"];

export function SendNotificationForm() {
  const sendNotification = useNotificationsStore((s) => s.sendNotification);

  const [type, setType] = useState<NotificationType>("announcement");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState<NotificationAudience>("all");
  const [audienceDetail, setAudienceDetail] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [ctaUrl, setCtaUrl] = useState("");
  const [sent, setSent] = useState(false);

  const canSubmit = title.trim() && message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    sendNotification({
      type,
      title: title.trim(),
      message: message.trim(),
      audience,
      audienceDetail: audienceDetail.trim() || undefined,
      ctaLabel: ctaLabel.trim() || undefined,
      ctaUrl: ctaUrl.trim() || undefined,
    });
    setTitle("");
    setMessage("");
    setAudienceDetail("");
    setCtaLabel("");
    setCtaUrl("");
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Send Notification</SectionLabel>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink2">Type</label>
            <select
              className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value as NotificationType)}
            >
              {types.map((t) => (
                <option key={t} value={t}>{NOTIFICATION_TYPE_LABELS[t]}</option>
              ))}
            </select>
          </div>

          <AudienceSelector
            audience={audience}
            audienceDetail={audienceDetail}
            onAudienceChange={setAudience}
            onDetailChange={setAudienceDetail}
          />

          <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <Textarea label="Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} required />

          <div className="grid grid-cols-2 gap-4">
            <Input label="CTA Label (optional)" value={ctaLabel} onChange={(e) => setCtaLabel(e.target.value)} />
            <Input label="CTA URL (optional)" value={ctaUrl} onChange={(e) => setCtaUrl(e.target.value)} />
          </div>

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={!canSubmit}>Send Notification</Button>
            {sent && <span className="text-sm text-green">Notification sent!</span>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
