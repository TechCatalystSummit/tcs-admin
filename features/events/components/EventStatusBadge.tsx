import { Badge } from "@/shared/components/ui/Badge";
import type { EventStatus } from "../types";

const statusConfig: Record<
  EventStatus,
  { label: string; variant: "default" | "status" | "stage" | "gradient" | "gold" }
> = {
  draft: { label: "Draft", variant: "default" },
  published: { label: "Published", variant: "gradient" },
  live: { label: "Live", variant: "status" },
  past: { label: "Past", variant: "default" },
};

export function EventStatusBadge({ status }: { status: EventStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
