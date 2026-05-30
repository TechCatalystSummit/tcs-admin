import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";
import { LEAD_STAGE_LABELS, type LeadStage } from "../types";

const stageConfig: Record<LeadStage, { className: string }> = {
  hot: { className: "bg-red-l text-red border-red/20" },
  warm: { className: "bg-orange-l text-orange border-orange/20" },
  new: { className: "bg-blue-l text-blue1 border-blue1/20" },
  contacted: { className: "bg-surf text-muted border-border" },
};

export function StageBadge({ stage }: { stage: LeadStage }) {
  const config = stageConfig[stage];
  return (
    <Badge variant="default" className={cn(config.className)}>
      {LEAD_STAGE_LABELS[stage]}
    </Badge>
  );
}
