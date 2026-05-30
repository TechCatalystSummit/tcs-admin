import { cn } from "@/shared/utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-border/60", className)}
      aria-hidden
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden">
      <Skeleton className="h-[3px] w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-4 w-20 mt-2" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden">
      <div className="border-b border-border px-4 py-3 flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-3 w-16" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border-b border-border last:border-0 px-4 py-3 flex gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}
