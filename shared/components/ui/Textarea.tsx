import { cn } from "@/shared/utils/cn";
import { forwardRef, type TextareaHTMLAttributes } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-ink2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "flex min-h-[100px] w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-ink",
            "placeholder:text-hint focus:outline-none focus:ring-2 focus:ring-blue1/20 focus:border-blue1 resize-none",
            error && "border-red",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red">{error}</p>}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
