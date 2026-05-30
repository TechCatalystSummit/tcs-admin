"use client";

import { TIERS } from "@/core/constants/tiers";
import { cn } from "@/shared/utils/cn";
import type { NotificationAudience } from "../types";
import { AUDIENCE_LABELS } from "../types";

interface AudienceSelectorProps {
  audience: NotificationAudience;
  audienceDetail: string;
  onAudienceChange: (audience: NotificationAudience) => void;
  onDetailChange: (detail: string) => void;
}

export function AudienceSelector({
  audience,
  audienceDetail,
  onAudienceChange,
  onDetailChange,
}: AudienceSelectorProps) {
  const audiences: NotificationAudience[] = ["all", "tier", "event", "member"];

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-medium text-ink2 mb-2">Target Audience</p>
        <div className="grid grid-cols-2 gap-2">
          {audiences.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => onAudienceChange(a)}
              className={cn(
                "rounded-xl border px-4 py-3 text-sm font-medium text-left transition-colors",
                audience === a
                  ? "border-blue1 bg-blue-l text-blue1"
                  : "border-border bg-white text-muted hover:bg-surf",
              )}
            >
              {AUDIENCE_LABELS[a]}
            </button>
          ))}
        </div>
      </div>

      {audience === "tier" && (
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-ink2">Select Tier</label>
          <select
            className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm"
            value={audienceDetail}
            onChange={(e) => onDetailChange(e.target.value)}
          >
            <option value="">Choose tier...</option>
            {TIERS.map((tier) => (
              <option key={tier.id} value={tier.label}>{tier.label}</option>
            ))}
          </select>
        </div>
      )}

      {audience === "event" && (
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-ink2">Select Event</label>
          <select
            className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm"
            value={audienceDetail}
            onChange={(e) => onDetailChange(e.target.value)}
          >
            <option value="">Choose event...</option>
            <option value="TCS Summit 2026">TCS Summit 2026</option>
            <option value="TCS Miami 2026">TCS Miami 2026</option>
            <option value="TCS Austin 2026">TCS Austin 2026</option>
            <option value="TCS Denver 2026">TCS Denver 2026</option>
          </select>
        </div>
      )}

      {audience === "member" && (
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-ink2">Member Name</label>
          <input
            type="text"
            placeholder="Search member..."
            className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm"
            value={audienceDetail}
            onChange={(e) => onDetailChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
