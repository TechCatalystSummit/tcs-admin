"use client";

import { cn } from "@/shared/utils/cn";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { AuthGuard } from "./AuthGuard";
import { SidebarProvider, useSidebar } from "./SidebarContext";

function AdminShellInner({ children }: { children: React.ReactNode }) {
  const { collapsed, mobileOpen, closeMobile } = useSidebar();

  return (
    <div className="min-h-screen bg-surf">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-dark1/60 md:hidden"
          onClick={closeMobile}
        />
      )}
      <AdminSidebar />
      <div
        className={cn(
          "min-h-screen flex flex-col transition-all duration-200",
          collapsed ? "md:ml-16" : "md:ml-60",
        )}
      >
        <AdminTopbar />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AdminShellInner>{children}</AdminShellInner>
      </SidebarProvider>
    </AuthGuard>
  );
}
