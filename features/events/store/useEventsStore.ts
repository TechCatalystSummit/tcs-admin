"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Event, EventFilters } from "../types";

interface EventsState {
  filters: EventFilters;
  setFilter: (key: keyof EventFilters, value: string) => void;
  clearFilters: () => void;
  filterEvents: (events: Event[]) => Event[];
}

const defaultFilters: EventFilters = {
  status: "",
  type: "",
  dateFrom: "",
  dateTo: "",
  search: "",
};

export const useEventsStore = create<EventsState>()(
  immer((set, get) => ({
    filters: defaultFilters,
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () =>
      set((state) => {
        state.filters = defaultFilters;
      }),
    filterEvents: (events) => {
      const { filters } = get();
      return events.filter((event) => {
        if (filters.status && event.status !== filters.status) return false;
        if (filters.type && event.type !== filters.type) return false;
        if (filters.dateFrom && event.startDate < filters.dateFrom) return false;
        if (filters.dateTo && event.startDate > filters.dateTo) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            event.title.toLowerCase().includes(q) ||
            event.location.toLowerCase().includes(q) ||
            event.venue.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },
  })),
);
