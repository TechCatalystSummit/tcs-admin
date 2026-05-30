import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";
import { LEAD_STATUS_LABELS, type LeadStatus } from "../types";

const statusConfig: Record<
  LeadStatus,
  { variant: "stage" | "status" | "gradient" | "default" | "tier"; className?: string }
> = {
  new: { variant: "default", className: "bg-blue-l text-blue1 border-blue1/20" },
  contacted: { variant: "default" },
  opened: { variant: "gradient" },
  clicked: { variant: "gradient", className: "bg-purple-l text-purple border-purple/20" },
  replied: { variant: "status" },
  booked: { variant: "tier" },
  confirmed: { variant: "status", className: "bg-gold-l text-gold border-gold/20" },
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={cn(config.className)}>
      {LEAD_STATUS_LABELS[status]}
    </Badge>
  );
}
