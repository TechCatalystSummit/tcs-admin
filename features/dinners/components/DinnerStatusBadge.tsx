import { Badge } from "@/shared/components/ui/Badge";
import type { DinnerStatus } from "../types";

const statusConfig: Record<
  DinnerStatus,
  { label: string; variant: "default" | "stage" | "status" | "gradient" | "gold" }
> = {
  requested: { label: "Requested", variant: "default" },
  under_review: { label: "Under Review", variant: "stage" },
  approved: { label: "Approved", variant: "gradient" },
  scheduled: { label: "Scheduled", variant: "gradient" },
  completed: { label: "Completed", variant: "status" },
  declined: { label: "Declined", variant: "default" },
};

export function DinnerStatusBadge({ status }: { status: DinnerStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
