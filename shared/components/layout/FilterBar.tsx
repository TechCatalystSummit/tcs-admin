import { cn } from "@/shared/utils/cn";
import { type ReactNode } from "react";

interface FilterBarProps {
  children: ReactNode;
  className?: string;
  activeCount?: number;
  onClear?: () => void;
}

export function FilterBar({ children, className, activeCount, onClear }: FilterBarProps) {
  return (
    <div className={cn("mb-4 space-y-3", className)}>
      <div className="flex flex-wrap items-end gap-3">{children}</div>
      {activeCount != null && activeCount > 0 && (
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-blue-l px-2 py-0.5 font-medium text-blue1">
            {activeCount} filter{activeCount !== 1 ? "s" : ""} active
          </span>
          {onClear && (
            <button type="button" onClick={onClear} className="text-muted hover:text-ink">
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
