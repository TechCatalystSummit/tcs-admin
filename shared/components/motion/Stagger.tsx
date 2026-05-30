"use client";

import { stagger, transition } from "@/core/constants/motion";
import { cn } from "@/shared/utils/cn";
import { motion, type HTMLMotionProps } from "motion/react";

export function StaggerGroup({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(className)}
      initial="initial"
      animate="animate"
      variants={stagger.container}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  className,
  children,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn(className)}
      variants={stagger.item}
      transition={transition.luxe}
      {...props}
    >
      {children}
    </motion.div>
  );
}
