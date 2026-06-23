"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Sponsor, SponsorFilters } from "../types";

interface SponsorsState {
  filters: SponsorFilters;
  setFilter: (key: keyof SponsorFilters, value: string) => void;
  clearFilters: () => void;
  filterSponsors: (sponsors: Sponsor[]) => Sponsor[];
}

const defaultFilters: SponsorFilters = { tier: "", status: "", search: "" };

export const useSponsorsStore = create<SponsorsState>()(
  immer((set, get) => ({
    filters: defaultFilters,
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () => set((state) => { state.filters = defaultFilters; }),
    filterSponsors: (sponsors) => {
      const { filters } = get();
      return sponsors.filter((s) => {
        if (filters.tier && s.tier !== filters.tier) return false;
        if (filters.status && s.status !== filters.status) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            s.name.toLowerCase().includes(q) ||
            s.industry.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },
  })),
);
