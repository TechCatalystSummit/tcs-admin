"use client";

import { fadeUp, transition } from "@/core/constants/motion";
import { cn } from "@/shared/utils/cn";
import { motion, type HTMLMotionProps } from "motion/react";

type FadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function FadeUp({ className, delay = 0, children, ...props }: FadeUpProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...transition.luxe, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
