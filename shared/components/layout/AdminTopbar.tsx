"use client";

import { Avatar } from "@/shared/components/ui/Avatar";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Bell, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let href = "";

  for (const segment of segments) {
    href += `/${segment}`;
    const label = segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href });
  }

  return crumbs;
}

export function AdminTopbar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-white px-6">
      <nav className="flex items-center gap-1 text-sm">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1">
            {i > 0 && <span className="text-hint">/</span>}
            <Link
              href={crumb.href}
              className={
                i === breadcrumbs.length - 1
                  ? "font-semibold text-ink"
                  : "text-muted hover:text-ink"
              }
            >
              {crumb.label}
            </Link>
          </span>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hint" />
          <input
            type="search"
            placeholder="Search members, events..."
            className="h-9 w-64 rounded-xl border border-border bg-surf pl-9 pr-4 text-sm placeholder:text-hint focus:outline-none focus:ring-2 focus:ring-blue1/20"
          />
        </div>
        <button
          type="button"
          className="relative rounded-lg p-2 text-muted hover:bg-surf hover:text-ink transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-orange" />
        </button>
        <Avatar name={user?.name ?? "Admin"} size="sm" />
      </div>
    </header>
  );
}
