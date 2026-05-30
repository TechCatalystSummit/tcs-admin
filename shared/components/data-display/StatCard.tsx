"use client";

import { cardHover, transition } from "@/core/constants/motion";
import { cn } from "@/shared/utils/cn";
import { motion, type HTMLMotionProps } from "motion/react";

const deltaStyles = {
  positive: "bg-green-l text-green",
  negative: "bg-red-l text-red",
  neutral: "bg-surf text-muted",
};

export interface StatCardProps extends HTMLMotionProps<"div"> {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
  topColor: string;
}

export function StatCard({
  label,
  value,
  delta,
  deltaType = "neutral",
  topColor,
  className,
  ...props
}: StatCardProps) {
  return (
    <motion.div
      className={cn(
        "bg-white border border-border rounded-2xl overflow-hidden",
        className,
      )}
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      transition={transition.fast}
      {...props}
    >
      <div className="h-[3px] w-full" style={{ backgroundColor: topColor }} />
      <div className="p-4">
        <p className="text-2xl font-bold text-ink tracking-tight">{value}</p>
        <p className="text-[10px] text-muted mt-1 uppercase tracking-wide">{label}</p>
        {delta && (
          <span
            className={cn(
              "text-[9px] font-semibold px-2 py-0.5 rounded-full mt-2 inline-block",
              deltaStyles[deltaType],
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </motion.div>
  );
}
