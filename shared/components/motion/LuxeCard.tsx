"use client";

import { cardHover, transition } from "@/core/constants/motion";
import { cn } from "@/shared/utils/cn";
import { motion, type HTMLMotionProps } from "motion/react";

export function LuxeCard({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn("rounded-2xl", className)}
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      transition={transition.fast}
      {...props}
    >
      {children}
    </motion.div>
  );
}
