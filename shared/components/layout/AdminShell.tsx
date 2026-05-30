"use client";

import { fadeIn, transition } from "@/core/constants/motion";
import { PageTransition } from "@/shared/components/motion/PageTransition";
import { cn } from "@/shared/utils/cn";
import { AnimatePresence, motion } from "motion/react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { AuthGuard } from "./AuthGuard";
import { CommandPalette } from "./CommandPalette";
import { CommandPaletteProvider } from "./CommandPaletteContext";
import { SidebarProvider, useSidebar } from "./SidebarContext";

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const { collapsed, mobileOpen, closeMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-surf">
      <AnimatePresence>
        {mobileOpen && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            className="fixed inset-0 z-30 bg-dark1/60 md:hidden"
            onClick={closeMobile}
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            exit={fadeIn.exit}
            transition={transition.fast}
          />
        )}
      </AnimatePresence>
      <AdminSidebar />
      <div
        className={cn(
          "min-h-screen flex flex-col transition-[margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          collapsed ? "md:ml-16" : "md:ml-60",
        )}
      >
        <AdminTopbar />
        <main className="flex-1 p-4 md:p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <CommandPaletteProvider>
          <AdminShellInner>{children}</AdminShellInner>
        </CommandPaletteProvider>
      </SidebarProvider>
    </AuthGuard>
  );
}
