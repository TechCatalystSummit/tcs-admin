import { cn } from "@/shared/utils/cn";
import { type HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "gradient" | "tier" | "status" | "stage" | "gold";
}

const variantStyles = {
  default: "bg-surf text-muted border border-border",
  gradient: "bg-blue-l text-blue1 border border-blue1/20",
  tier: "bg-gold-l text-gold border border-gold/20",
  status: "bg-green-l text-green border border-green/20",
  stage: "bg-orange-l text-orange border border-orange/20",
  gold: "bg-gold-l text-gold font-semibold",
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
