"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { IntroFilters, IntroRequest } from "../types";

interface IntrosState {
  filters: IntroFilters;
  activeIntroId: string | null;
  detailModalOpen: boolean;
  createModalOpen: boolean;
  setFilter: (key: keyof IntroFilters, value: string) => void;
  clearFilters: () => void;
  openDetail: (id: string) => void;
  closeDetail: () => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  filterIntros: (intros: IntroRequest[]) => IntroRequest[];
}

const defaultFilters: IntroFilters = { status: "", dateFrom: "", dateTo: "", search: "" };

export const useIntrosStore = create<IntrosState>()(
  immer((set, get) => ({
    filters: defaultFilters,
    activeIntroId: null,
    detailModalOpen: false,
    createModalOpen: false,
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () => set((state) => { state.filters = defaultFilters; }),
    openDetail: (id) =>
      set((state) => {
        state.activeIntroId = id;
        state.detailModalOpen = true;
      }),
    closeDetail: () =>
      set((state) => {
        state.activeIntroId = null;
        state.detailModalOpen = false;
      }),
    openCreateModal: () => set((state) => { state.createModalOpen = true; }),
    closeCreateModal: () => set((state) => { state.createModalOpen = false; }),
    filterIntros: (intros) => {
      const { filters } = get();
      return intros.filter((intro) => {
        if (filters.status && intro.status !== filters.status) return false;
        if (filters.dateFrom && intro.requestedAt < filters.dateFrom) return false;
        if (filters.dateTo && intro.requestedAt > filters.dateTo) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            intro.fromMember.name.toLowerCase().includes(q) ||
            intro.toMember.name.toLowerCase().includes(q) ||
            intro.reasonDetail.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },
  })),
);
