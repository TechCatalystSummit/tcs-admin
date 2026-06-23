"use client";

import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useDashboardData } from "../api/queries";

const dotColors = {
  member: "bg-green",
  event: "bg-blue1",
  intro: "bg-purple",
  payment: "bg-gold",
};

export function ActivityFeed() {
  const { activity, isLoading, isError, error, refetchAll } = useDashboardData();

  return (
    <Card className="h-full">
      <CardHeader>
        <SectionLabel>Recent Activity</SectionLabel>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 max-h-[320px] overflow-y-auto">
          {isError ? (
            <li>
              <QueryErrorState error={error} onRetry={refetchAll} title="Couldn't load activity" />
            </li>
          ) : isLoading ? (
            <li className="text-sm text-muted">Loading activity…</li>
          ) : activity.length === 0 ? (
            <li className="text-sm text-muted">No recent activity yet.</li>
          ) : (
            activity.map((item) => (
            <li key={item.id} className="flex gap-3">
              <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColors[item.type]}`} />
              <div>
                <p className="text-sm text-ink">{item.message}</p>
                <p className="text-[10px] text-hint mt-0.5">{item.time}</p>
              </div>
            </li>
            ))
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
