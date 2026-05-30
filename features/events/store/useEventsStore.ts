"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockEvents } from "../data/mockEvents";
import type { Event, EventFilters, EventFormData } from "../types";

interface EventsState {
  events: Event[];
  filters: EventFilters;
  setFilter: (key: keyof EventFilters, value: string) => void;
  clearFilters: () => void;
  getFilteredEvents: () => Event[];
  getEventById: (id: string) => Event | undefined;
  addEvent: (data: EventFormData) => Event;
  updateEventStatus: (id: string, status: Event["status"]) => void;
}

const defaultFilters: EventFilters = {
  status: "",
  type: "",
  dateFrom: "",
  dateTo: "",
  search: "",
};

function nextEventId(events: Event[]): string {
  const nums = events
    .map((e) => parseInt(e.id.replace("evt_", ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `evt_${String(next).padStart(3, "0")}`;
}

export const useEventsStore = create<EventsState>()(
  immer((set, get) => ({
    events: mockEvents,
    filters: defaultFilters,
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () =>
      set((state) => {
        state.filters = defaultFilters;
      }),
    getFilteredEvents: () => {
      const { events, filters } = get();
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
    getEventById: (id) => get().events.find((e) => e.id === id),
    addEvent: (data) => {
      const id = nextEventId(get().events);
      const newEvent: Event = {
        id,
        title: data.title,
        description: data.description,
        type: data.type,
        status: data.status,
        location: data.location,
        venue: data.venue,
        startDate: data.startDate,
        endDate: data.endDate,
        capacity: data.capacity,
        rsvpCount: 0,
        checkedInCount: 0,
        vipCount: 0,
        noShowCount: 0,
        sponsors: [],
        speakers: [],
        agenda: [],
        attendees: [],
      };
      set((state) => {
        state.events.unshift(newEvent);
      });
      return newEvent;
    },
    updateEventStatus: (id, status) =>
      set((state) => {
        const event = state.events.find((e) => e.id === id);
        if (event) event.status = status;
      }),
  })),
);
