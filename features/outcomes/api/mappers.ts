import type { ActivityItem } from "@/features/dashboard/data/mockDashboard.types";
import type { OutcomeLogEntry } from "@/features/analytics/types";
import { formatRelative } from "@/shared/utils/formatters";

export interface ApiOutcome {
  id: string;
  introId?: string | null;
  userAId: string;
  userBId: string;
  outcomeType: string;
  strength?: string | null;
  estimatedValue?: number | null;
  notes?: string | null;
  eventId?: string | null;
  sponsorId?: string | null;
  loggedBy?: string;
  createdAt: string;
}

function formatOutcomeType(type: string): string {
  return type
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function mapApiOutcome(o: ApiOutcome): OutcomeLogEntry {
  return {
    id: o.id,
    connection: `${o.userAId.slice(0, 8)}… ↔ ${o.userBId.slice(0, 8)}…`,
    date: o.createdAt,
    outcomeType: formatOutcomeType(o.outcomeType),
    estimatedValue: o.estimatedValue ?? 0,
    notes: o.notes ?? undefined,
  };
}

export function mapOutcomeToActivity(o: ApiOutcome): ActivityItem {
  return {
    id: `outcome-${o.id}`,
    message: `${formatOutcomeType(o.outcomeType)} logged`,
    time: formatRelative(o.createdAt),
    type: "intro",
  };
}
