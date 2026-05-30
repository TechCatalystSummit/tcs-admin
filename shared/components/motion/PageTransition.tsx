"use client";

import { fadeUp, transition } from "@/core/constants/motion";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={transition.luxe}
    >
      {children}
    </motion.div>
  );
}
