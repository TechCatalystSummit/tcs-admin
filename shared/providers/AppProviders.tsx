"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/shared/components/ui/Tooltip";
import { getQueryClient } from "@/shared/lib/api/query-client";
import { MotionConfig } from "motion/react";
import { useState, type ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}
