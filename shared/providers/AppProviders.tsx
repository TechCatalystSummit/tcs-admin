"use client";

import { TooltipProvider } from "@/shared/components/ui/Tooltip";
import { MotionConfig } from "motion/react";
import { type ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
    </MotionConfig>
  );
}
