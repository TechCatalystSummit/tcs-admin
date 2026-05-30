import { cn } from "@/shared/utils/cn";
import { type ButtonHTMLAttributes } from "react";

export function GradientButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "bg-brand-gradient text-white font-semibold rounded-full px-6 h-11",
        "hover:opacity-90 active:scale-[0.98] transition-all",
        "disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
