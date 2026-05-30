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
        "hover:opacity-90 hover:shadow-md hover:shadow-blue1/20 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "disabled:opacity-50 disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
