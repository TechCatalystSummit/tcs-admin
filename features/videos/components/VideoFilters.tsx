"use client";

import { FilterBar } from "@/shared/components/layout/FilterBar";
import { Input } from "@/shared/components/ui/Input";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useTableFilters } from "@/shared/hooks/useTableFilters";
import { useEffect, useMemo, useState } from "react";
import { useVideosStore } from "../store/useVideosStore";

const defaultFilters = { search: "", status: "" };

export function VideoFilters() {
  const filters = useVideosStore((s) => s.filters);
  const setFilter = useVideosStore((s) => s.setFilter);
  const clearFilters = useVideosStore((s) => s.clearFilters);
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebounce(searchInput, 300);

  useTableFilters(filters, setFilter, defaultFilters);

  useEffect(() => {
    setFilter("search", debouncedSearch);
  }, [debouncedSearch, setFilter]);

  const activeCount = useMemo(
    () => Object.values(filters).filter(Boolean).length,
    [filters],
  );

  return (
    <FilterBar
      activeCount={activeCount}
      onClear={() => {
        clearFilters();
        setSearchInput("");
      }}
    >
      <div className="flex-1 min-w-[200px]">
        <Input
          label="Search"
          placeholder="Title, series, speaker…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="w-40">
        <label className="text-xs font-medium text-ink2 block mb-1.5">Status</label>
        <select
          className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
          value={filters.status}
          onChange={(e) => setFilter("status", e.target.value)}
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </FilterBar>
  );
}
