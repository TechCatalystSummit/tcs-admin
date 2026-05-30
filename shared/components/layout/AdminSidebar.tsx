"use client";

import { brand, logo } from "@/core/constants/brand";
import { navItems } from "@/core/constants/nav";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Avatar } from "@/shared/components/ui/Avatar";
import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "./SidebarContext";

export function AdminSidebar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const { collapsed, mobileOpen, toggleCollapsed, closeMobile } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Members", "Outreach"]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const showLabels = mobileOpen || !collapsed;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar transition-all duration-200",
        collapsed ? "md:w-16" : "md:w-60",
        "w-60",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}
    >
      <div className={cn("flex items-center gap-3 p-4 border-b border-white/10", !showLabels && "justify-center")}>
        <Image
          src={logo.src}
          alt={logo.alt}
          width={showLabels ? 36 : 32}
          height={showLabels ? 32 : 28}
          className="shrink-0 object-contain"
        />
        {showLabels && (
          <div>
            <p className="text-sm font-bold text-white">{brand.adminTitle}</p>
            <p className="text-[10px] text-hint">{brand.appName}</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const hasChildren = item.children && item.children.length > 0;
          const isExpanded = expandedItems.includes(item.label);

          return (
            <div key={item.href}>
              <div className="flex items-center">
                <Link
                  href={item.href}
                  onClick={closeMobile}
                  className={cn(
                    "flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-blue-l/10 text-blue-l border-l-2 border-blue1"
                      : "text-hint hover:bg-white/5 hover:text-white border-l-2 border-transparent",
                    !showLabels && "justify-center px-2",
                  )}
                  title={!showLabels ? item.label : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {showLabels && <span className="flex-1">{item.label}</span>}
                  {showLabels && item.badge && (
                    <Badge variant="gradient" className="text-[9px]">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
                {showLabels && hasChildren && (
                  <button
                    type="button"
                    onClick={() => toggleExpand(item.label)}
                    className="p-1 text-hint hover:text-white"
                  >
                    <ChevronDown
                      className={cn("h-3 w-3 transition-transform", isExpanded && "rotate-180")}
                    />
                  </button>
                )}
              </div>

              {showLabels && hasChildren && isExpanded && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l border-white/10 pl-3">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeMobile}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2 text-xs transition-colors",
                        pathname === child.href
                          ? "text-blue-l bg-blue-l/10"
                          : "text-hint hover:text-white hover:bg-white/5",
                      )}
                    >
                      {child.label}
                      {child.badge && (
                        <Badge variant="stage" className="text-[9px]">
                          {child.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className={cn("flex items-center gap-3", !showLabels && "justify-center")}>
          <Avatar name={user?.name ?? "Admin"} size="sm" executive />
          {showLabels && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name ?? "Admin User"}</p>
              <Badge variant="gold" className="mt-0.5 text-[9px]">
                Admin
              </Badge>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={toggleCollapsed}
          className="mt-3 hidden md:flex w-full items-center justify-center gap-2 rounded-lg py-2 text-hint hover:bg-white/5 hover:text-white transition-colors"
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          {showLabels && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
