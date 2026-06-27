"use client";

import { FilterBar } from "@/shared/components/layout/FilterBar";
import { useDinnersStore } from "../store/useDinnersStore";

const statuses = [
  { value: "", label: "All statuses" },
  { value: "requested", label: "Requested" },
  { value: "under_review", label: "Under review" },
  { value: "approved", label: "Approved" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "canceled", label: "Canceled" },
];

export function DinnerFilters() {
  const statusFilter = useDinnersStore((s) => s.statusFilter);
  const setStatusFilter = useDinnersStore((s) => s.setStatusFilter);

  return (
    <FilterBar activeCount={statusFilter ? 1 : 0} onClear={() => setStatusFilter("")}>
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-ink"
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </FilterBar>
  );
}
