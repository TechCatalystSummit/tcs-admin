"use client";

import { Button } from "@/shared/components/ui/Button";
import { getErrorMessage } from "@/shared/lib/api/errors";

interface QueryErrorStateProps {
  error: unknown;
  onRetry?: () => void;
  title?: string;
  className?: string;
}

export function QueryErrorState({
  error,
  onRetry,
  title = "Couldn't load data",
  className,
}: QueryErrorStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50/50 px-6 py-12 text-center ${className ?? ""}`}
      role="alert"
    >
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="text-sm text-muted mt-2 max-w-md">{getErrorMessage(error)}</p>
      {onRetry ? (
        <Button variant="outline" size="sm" className="mt-4" onClick={() => onRetry()}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
