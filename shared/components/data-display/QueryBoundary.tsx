"use client";

import { EmptyState } from "@/shared/components/layout/PageHeader";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { type ReactNode } from "react";
import { QueryErrorState } from "./QueryErrorState";

interface QueryBoundaryProps {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  onRetry?: () => void;
  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  loadingClassName?: string;
  children: ReactNode;
}

export function QueryBoundary({
  isLoading,
  isError,
  error,
  onRetry,
  isEmpty,
  emptyTitle = "Nothing here yet",
  emptyDescription,
  emptyActionLabel,
  onEmptyAction,
  loadingClassName = "py-12",
  children,
}: QueryBoundaryProps) {
  if (isLoading) {
    return (
      <div className={`flex justify-center ${loadingClassName}`}>
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (isError) {
    return <QueryErrorState error={error} onRetry={onRetry} />;
  }

  if (isEmpty) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={emptyActionLabel}
        onAction={onEmptyAction}
      />
    );
  }

  return <>{children}</>;
}
