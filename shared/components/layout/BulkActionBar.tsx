"use client";

import { transition } from "@/core/constants/motion";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode } from "react";

interface BulkActionBarProps {
  count: number;
  onClear: () => void;
  children?: ReactNode;
  className?: string;
}

export function BulkActionBar({ count, onClear, children, className }: BulkActionBarProps) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          className={cn(
            "flex flex-wrap items-center gap-3 rounded-xl border border-blue1/20 bg-blue-l px-4 py-3 mb-4",
            className,
          )}
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={transition.fast}
        >
          <span className="text-sm font-medium text-ink">{count} selected</span>
          {children}
          <Button variant="ghost" size="sm" onClick={onClear} className="ml-auto">
            Clear
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
