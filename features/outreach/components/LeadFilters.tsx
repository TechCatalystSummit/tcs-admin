"use client";

import { FilterBar } from "@/shared/components/layout/FilterBar";
import { cn } from "@/shared/utils/cn";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useTableFilters } from "@/shared/hooks/useTableFilters";
import { useEffect, useMemo, useState } from "react";
import { useOutreachStore } from "../store/useOutreachStore";
import type { LeadStage } from "../types";

const stages: { value: LeadStage | ""; label: string }[] = [
  { value: "", label: "All Stages" },
  { value: "hot", label: "Hot" },
  { value: "warm", label: "Warm" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
];

const statuses = [
  { value: "", label: "All Statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "opened", label: "Opened" },
  { value: "clicked", label: "Clicked" },
  { value: "replied", label: "Replied" },
  { value: "booked", label: "Booked" },
  { value: "confirmed", label: "Confirmed" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "negotiating", label: "Negotiating" },
  { value: "not_interested", label: "Not Interested" },
  { value: "follow_up_later", label: "Follow Up Later" },
];

const sources = ["", "TCS Miami Event", "LinkedIn", "Member Referral", "Cold Outreach", "QR Scan", "Website Form", "TCS NYC Event", "TCS Boston Event"];
const industries = ["", "Finance", "Technology", "Healthcare", "Retail", "Venture Capital", "Media", "Energy", "Cybersecurity"];

const defaultFilters = {
  stage: "",
  status: "",
  source: "",
  industry: "",
  search: "",
};

export function LeadFilters() {
  const filters = useOutreachStore((s) => s.filters);
  const setFilter = useOutreachStore((s) => s.setFilter);
  const clearFilters = useOutreachStore((s) => s.clearFilters);
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
    <div className="space-y-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {stages.map((stage) => (
          <button
            key={stage.value || "all"}
            type="button"
            onClick={() => setFilter("stage", stage.value)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium border transition-colors",
              filters.stage === stage.value
                ? "bg-blue-l text-blue1 border-blue1/20"
                : "bg-white text-muted border-border hover:bg-surf",
            )}
          >
            {stage.label}
          </button>
        ))}
      </div>

      <FilterBar
        activeCount={activeCount}
        onClear={() => {
          clearFilters();
          setSearchInput("");
        }}
      >
        <div className="space-y-1.5 min-w-[140px]">
          <label className="text-xs font-medium text-ink2">Status</label>
          <select
            className="flex h-10 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
            value={filters.status}
            onChange={(e) => setFilter("status", e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s.value || "all"} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5 min-w-[160px]">
          <label className="text-xs font-medium text-ink2">Source</label>
          <select
            className="flex h-10 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
            value={filters.source}
            onChange={(e) => setFilter("source", e.target.value)}
          >
            <option value="">All Sources</option>
            {sources.filter(Boolean).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5 min-w-[140px]">
          <label className="text-xs font-medium text-ink2">Industry</label>
          <select
            className="flex h-10 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
            value={filters.industry}
            onChange={(e) => setFilter("industry", e.target.value)}
          >
            <option value="">All Industries</option>
            {industries.filter(Boolean).map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5 flex-1 min-w-[200px]">
          <label className="text-xs font-medium text-ink2">Search</label>
          <input
            type="search"
            placeholder="Search leads..."
            className="flex h-10 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink placeholder:text-hint"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </FilterBar>
    </div>
  );
}
