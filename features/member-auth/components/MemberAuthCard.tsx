import { cn } from "@/shared/utils/cn";

export function MemberAuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full bg-white border border-border rounded-2xl p-6 shadow-sm ring-1 ring-dark1/[0.03]",
        className,
      )}
    >
      {children}
    </div>
  );
}
