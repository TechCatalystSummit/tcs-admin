import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";
import type { IntroStatus } from "../types";

const statusConfig: Record<
  IntroStatus,
  { label: string; variant: "stage" | "status" | "gradient" | "default"; className?: string }
> = {
  pending: { label: "Pending", variant: "stage" },
  approved: { label: "Approved", variant: "status" },
  declined: { label: "Declined", variant: "default", className: "bg-red-l text-red border-red/20" },
  completed: { label: "Completed", variant: "gradient" },
  follow_up: { label: "Follow-up", variant: "default", className: "bg-purple-l text-purple border-purple/20" },
};

export function IntroStatusBadge({ status }: { status: IntroStatus }) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
