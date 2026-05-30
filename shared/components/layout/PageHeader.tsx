import { cn } from "@/shared/utils/cn";
import { type ReactNode } from "react";
import { GradientButton } from "@/shared/components/ui/GradientButton";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function PageHeader({ title, subtitle, action, actionLabel, onAction }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      {action ?? (actionLabel && onAction && (
        <GradientButton onClick={onAction}>{actionLabel}</GradientButton>
      ))}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      <p className="text-lg font-semibold text-ink">{title}</p>
      {description && <p className="text-sm text-muted mt-2 max-w-sm">{description}</p>}
      {actionLabel && onAction && (
        <GradientButton className="mt-6" onClick={onAction}>
          {actionLabel}
        </GradientButton>
      )}
    </div>
  );
}
