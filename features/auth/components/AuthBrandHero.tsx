import { brand } from "@/core/constants/brand";
import { AppLogo } from "@/shared/components/ui/AppLogo";
import { cn } from "@/shared/utils/cn";

/** Dark-to-light gradient hero matching Summit-App AuthBrandLogo. */
export function AuthBrandHero({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center px-6 py-12 lg:py-0 lg:px-12 bg-auth-gradient lg:bg-auth-panel-gradient min-h-[220px] lg:min-h-screen",
        className,
      )}
    >
      <AppLogo priority className="relative z-10 w-[140px] h-auto lg:w-[168px]" />
      <p className="relative z-10 mt-6 max-w-sm text-center text-sm text-white/80 lg:text-base">
        {brand.tagline}
      </p>
    </div>
  );
}
