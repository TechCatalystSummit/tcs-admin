import { Badge } from "@/shared/components/ui/Badge";
import type { MemberStatus } from "../types";

const statusConfig: Record<MemberStatus, { label: string; variant: "status" | "stage" | "default" }> = {
  active: { label: "Active", variant: "status" },
  pending: { label: "Pending", variant: "stage" },
  suspended: { label: "Suspended", variant: "default" },
  declined: { label: "Declined", variant: "default" },
};

export function StatusBadge({ status }: { status: MemberStatus }) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
