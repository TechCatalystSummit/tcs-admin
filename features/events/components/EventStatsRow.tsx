"use client";

import { Card, CardContent } from "@/shared/components/ui/Card";
import type { Event } from "../types";

interface StatCardProps {
  label: string;
  value: number;
  sublabel?: string;
  accent?: "blue" | "green" | "gold" | "default";
}

const accentStyles = {
  blue: "text-blue1",
  green: "text-green",
  gold: "text-gold",
  default: "text-ink",
};

function StatCard({ label, value, sublabel, accent = "default" }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-hint">{label}</p>
        <p className={`text-2xl font-bold mt-1 ${accentStyles[accent]}`}>{value}</p>
        {sublabel && <p className="text-xs text-muted mt-1">{sublabel}</p>}
      </CardContent>
    </Card>
  );
}

export function EventStatsRow({ event }: { event: Event }) {
  const capacityPct = event.capacity > 0 ? Math.round((event.rsvpCount / event.capacity) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        label="RSVPs"
        value={event.rsvpCount}
        sublabel={`${capacityPct}% of ${event.capacity} capacity`}
        accent="blue"
      />
      <StatCard
        label="Checked In"
        value={event.checkedInCount}
        sublabel={event.rsvpCount > 0 ? `${Math.round((event.checkedInCount / event.rsvpCount) * 100)}% attendance` : undefined}
        accent="green"
      />
      <StatCard label="VIP" value={event.vipCount} accent="gold" />
      <StatCard label="No-Shows" value={event.noShowCount} />
    </div>
  );
}
