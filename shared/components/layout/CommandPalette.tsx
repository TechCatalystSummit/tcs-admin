"use client";

import { allCommandItems } from "@/core/constants/commands";
import { fadeIn, scaleIn, transition } from "@/core/constants/motion";
import { cn } from "@/shared/utils/cn";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useCommandPalette } from "./CommandPaletteContext";
import { useSidebar } from "./SidebarContext";

export function CommandPalette() {
  const { open, setOpen, toggle } = useCommandPalette();
  const router = useRouter();
  const { closeMobile } = useSidebar();

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      closeMobile();
      router.push(href);
    },
    [router, closeMobile, setOpen],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggle, open, setOpen]);

  const groups = [...new Set(allCommandItems.map((item) => item.group))];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={fadeIn.initial}
          animate={fadeIn.animate}
          exit={fadeIn.exit}
          transition={transition.fast}
        >
          <button
            type="button"
            aria-label="Close command palette"
            className="fixed inset-0 bg-dark1/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="fixed left-1/2 top-[18%] z-50 w-full max-w-lg -translate-x-1/2 px-4"
            initial={scaleIn.initial}
            animate={scaleIn.animate}
            exit={scaleIn.exit}
            transition={transition.luxe}
          >
            <Command
              className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xl ring-1 ring-dark1/5"
              label="Global command menu"
            >
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-4 w-4 shrink-0 text-hint" />
                <Command.Input
                  autoFocus
                  placeholder="Search pages and actions..."
                  className="flex h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-hint"
                />
                <kbd className="hidden sm:inline rounded-md border border-border bg-surf px-1.5 py-0.5 text-[10px] text-hint">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted">
                  No results found.
                </Command.Empty>
                {groups.map((group) => (
                  <Command.Group
                    key={group}
                    heading={group}
                    className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-hint"
                  >
                    {allCommandItems
                      .filter((item) => item.group === group)
                      .map((item) => {
                        const Icon = item.icon;
                        return (
                          <Command.Item
                            key={`${item.href}-${item.label}`}
                            value={`${item.label} ${item.keywords ?? ""}`}
                            onSelect={() => navigate(item.href)}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors duration-200",
                              "aria-selected:bg-blue-l aria-selected:text-blue1",
                            )}
                          >
                            <Icon className="h-4 w-4 shrink-0 text-muted" />
                            <span>{item.label}</span>
                          </Command.Item>
                        );
                      })}
                  </Command.Group>
                ))}
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
