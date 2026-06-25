import { brand } from "@/core/constants/brand";
import { AppLogo } from "@/shared/components/ui/AppLogo";
import { cn } from "@/shared/utils/cn";

export function MemberAuthLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-h-screen bg-auth-gradient flex flex-col items-center justify-center px-4 py-10",
        className,
      )}
    >
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <AppLogo priority className="w-[140px] h-auto" />
          <p className="text-sm text-white/85 max-w-xs">{brand.tagline}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
