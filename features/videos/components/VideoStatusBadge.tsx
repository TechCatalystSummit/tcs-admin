import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";
import type { VideoStatus } from "../types";

const statusConfig: Record<
  VideoStatus,
  { label: string; variant: "status" | "default"; className?: string }
> = {
  active: { label: "Active", variant: "status" },
  inactive: {
    label: "Inactive",
    variant: "default",
    className: "bg-surf text-muted",
  },
};

export function VideoStatusBadge({ status }: { status: VideoStatus }) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={cn(config.className)}>
      {config.label}
    </Badge>
  );
}
