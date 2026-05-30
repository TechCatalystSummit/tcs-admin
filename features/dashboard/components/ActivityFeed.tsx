"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useDashboardStore } from "../store/useDashboardStore";

const dotColors = {
  member: "bg-green",
  event: "bg-blue1",
  intro: "bg-purple",
  payment: "bg-gold",
};

export function ActivityFeed() {
  const activity = useDashboardStore((s) => s.activity);

  return (
    <Card className="h-full">
      <CardHeader>
        <SectionLabel>Recent Activity</SectionLabel>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4 max-h-[320px] overflow-y-auto">
          {activity.map((item) => (
            <li key={item.id} className="flex gap-3">
              <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColors[item.type]}`} />
              <div>
                <p className="text-sm text-ink">{item.message}</p>
                <p className="text-[10px] text-hint mt-0.5">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
