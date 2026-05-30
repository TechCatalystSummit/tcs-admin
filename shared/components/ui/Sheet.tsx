"use client";

import { cn } from "@/shared/utils/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { fadeIn, slideFromRight, transition } from "@/core/constants/motion";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";

interface SheetProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sheet({ ...props }: SheetProps) {
  return <DialogPrimitive.Root {...props} />;
}

export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetContent = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { side?: "left" | "right" }
>(({ side = "right", className, children, ...props }, ref) => {
  const slide =
    side === "right"
      ? slideFromRight
      : { initial: { x: "-100%", opacity: 0.85 }, animate: { x: 0, opacity: 1 }, exit: { x: "-100%", opacity: 0.85 } };

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay asChild>
        <motion.div
          className="fixed inset-0 z-50 bg-dark1/60 backdrop-blur-sm"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          exit={fadeIn.exit}
          transition={transition.fast}
        />
      </DialogPrimitive.Overlay>
      <DialogPrimitive.Content ref={ref} asChild {...props}>
        <motion.div
          className={cn(
            "fixed z-50 h-full bg-white border-border shadow-2xl flex flex-col",
            side === "right" && "right-0 top-0 border-l w-full max-w-[480px]",
            side === "left" && "left-0 top-0 border-r w-full max-w-[480px]",
            className,
          )}
          initial={slide.initial}
          animate={slide.animate}
          exit={slide.exit}
          transition={transition.luxe}
        >
          {children}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-1 text-hint hover:text-ink hover:bg-surf transition-colors duration-200">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </motion.div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
});
SheetContent.displayName = "SheetContent";

export function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pb-0", className)} {...props} />;
}

export function SheetTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-bold text-ink", className)}
      {...props}
    />
  );
}
