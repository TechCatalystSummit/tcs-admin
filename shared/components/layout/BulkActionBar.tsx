"use client";

import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";
import { type ReactNode } from "react";

interface BulkActionBarProps {
  count: number;
  onClear: () => void;
  children?: ReactNode;
  className?: string;
}

export function BulkActionBar({ count, onClear, children, className }: BulkActionBarProps) {
  if (count === 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-xl border border-blue1/20 bg-blue-l px-4 py-3 mb-4",
        className,
      )}
    >
      <span className="text-sm font-medium text-ink">
        {count} selected
      </span>
      {children}
      <Button variant="ghost" size="sm" onClick={onClear} className="ml-auto">
        Clear
      </Button>
    </div>
  );
}
