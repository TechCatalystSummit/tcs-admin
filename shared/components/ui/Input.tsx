import { cn } from "@/shared/utils/cn";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-ink2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink",
            "placeholder:text-hint focus:outline-none focus:ring-2 focus:ring-blue1/20 focus:border-blue1",
            error && "border-red focus:ring-red/20 focus:border-red",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
