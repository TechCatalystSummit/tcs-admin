"use client";

import { StatCard } from "@/shared/components/data-display/StatCard";
import { useOutreachStore } from "../store/useOutreachStore";

export function OutreachStatsStrip() {
  const stats = useOutreachStore((s) => s.stats);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="Sent Today" value={stats.sentToday} topColor="#1A73E8" delta="+4 vs yesterday" deltaType="positive" />
      <StatCard label="Opens Today" value={stats.opensToday} topColor="#0DCAF0" delta="64% open rate" deltaType="neutral" />
      <StatCard label="Clicks Today" value={stats.clicksToday} topColor="#6B3AC9" delta="36% click rate" deltaType="neutral" />
      <StatCard label="Replies Today" value={stats.repliesToday} topColor="#0D9E75" delta="+1 vs yesterday" deltaType="positive" />
    </div>
  );
}
