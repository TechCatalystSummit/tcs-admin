"use client";

import { Input } from "@/shared/components/ui/Input";
import { useIntrosStore } from "../store/useIntrosStore";

const statuses = ["", "pending", "approved", "declined", "completed", "follow_up"];

export function IntroFilters() {
  const filters = useIntrosStore((s) => s.filters);
  const setFilter = useIntrosStore((s) => s.setFilter);
  const clearFilters = useIntrosStore((s) => s.clearFilters);

  return (
    <div className="flex flex-wrap items-end gap-3 mb-4">
      <div className="flex-1 min-w-[200px]">
        <Input
          placeholder="Search members, companies, reason..."
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
        />
      </div>
      <select
        value={filters.status}
        onChange={(e) => setFilter("status", e.target.value)}
        className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink"
      >
        <option value="">All Statuses</option>
        {statuses.filter(Boolean).map((s) => (
          <option key={s} value={s}>
            {s === "follow_up" ? "Follow-up" : s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
      <Input
        type="date"
        label="From"
        value={filters.dateFrom}
        onChange={(e) => setFilter("dateFrom", e.target.value)}
        className="w-auto min-w-[140px]"
      />
      <Input
        type="date"
        label="To"
        value={filters.dateTo}
        onChange={(e) => setFilter("dateTo", e.target.value)}
        className="w-auto min-w-[140px]"
      />
      <button
        type="button"
        onClick={clearFilters}
        className="text-xs text-muted hover:text-ink px-2 pb-2"
      >
        Clear
      </button>
    </div>
  );
}
