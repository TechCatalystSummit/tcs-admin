"use client";

import { Input } from "@/shared/components/ui/Input";
import { useMembersStore } from "../store/useMembersStore";

const tiers = ["", "community", "builder", "executive", "partner", "legacy"];
const roles = ["", "CEO", "CTO", "Founder", "VP Engineering", "Investor", "Product Lead"];
const statuses = ["", "active", "pending", "suspended"];

export function MemberFilters() {
  const filters = useMembersStore((s) => s.filters);
  const setFilter = useMembersStore((s) => s.setFilter);
  const clearFilters = useMembersStore((s) => s.clearFilters);

  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search name, company, email..."
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
        />
      </div>
      <select
        value={filters.tier}
        onChange={(e) => setFilter("tier", e.target.value)}
        className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink"
      >
        <option value="">All Tiers</option>
        {tiers.filter(Boolean).map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <select
        value={filters.role}
        onChange={(e) => setFilter("role", e.target.value)}
        className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink"
      >
        <option value="">All Roles</option>
        {roles.filter(Boolean).map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <select
        value={filters.status}
        onChange={(e) => setFilter("status", e.target.value)}
        className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink"
      >
        <option value="">All Statuses</option>
        {statuses.filter(Boolean).map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={clearFilters}
        className="text-xs text-muted hover:text-ink px-2"
      >
        Clear
      </button>
    </div>
  );
}
