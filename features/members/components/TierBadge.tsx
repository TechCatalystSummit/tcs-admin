import { Badge } from "@/shared/components/ui/Badge";
import { formatTier } from "@/shared/utils/formatters";
import type { MemberTier } from "../types";

export function TierBadge({ tier }: { tier: MemberTier | string }) {
  const isExecutive = tier === "executive";
  return (
    <Badge variant={isExecutive ? "tier" : "default"}>
      {formatTier(tier)}
    </Badge>
  );
}
