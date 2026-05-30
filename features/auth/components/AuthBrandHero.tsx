"use client";

import { brand } from "@/core/constants/brand";
import { transition } from "@/core/constants/motion";
import { AppLogo } from "@/shared/components/ui/AppLogo";
import { cn } from "@/shared/utils/cn";
import { motion } from "motion/react";

/** Dark-to-light gradient hero matching Summit-App AuthBrandLogo. */
export function AuthBrandHero({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center px-6 py-12 lg:py-0 lg:px-12 bg-auth-gradient lg:bg-auth-panel-gradient min-h-[220px] lg:min-h-screen overflow-hidden",
        className,
      )}
    >
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(26, 115, 232, 0.35), transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...transition.slow, delay: 0.1 }}
        className="relative z-10"
      >
        <AppLogo priority className="w-[140px] h-auto lg:w-[168px]" />
      </motion.div>
      <motion.p
        className="relative z-10 mt-6 max-w-sm text-center text-sm text-white/80 lg:text-base"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...transition.luxe, delay: 0.28 }}
      >
        {brand.tagline}
      </motion.p>
    </div>
  );
}
