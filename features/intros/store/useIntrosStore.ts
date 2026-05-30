"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockIntroMembers, mockIntros } from "../data/mockIntros";
import type { CreateIntroInput, IntroFilters, IntroRequest } from "../types";

interface IntrosState {
  intros: IntroRequest[];
  members: typeof mockIntroMembers;
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
  approveIntro: (id: string) => void;
  declineIntro: (id: string) => void;
  completeIntro: (id: string, outcome?: string) => void;
  setFollowUp: (id: string) => void;
  addNote: (id: string, note: string) => void;
  assignIntro: (id: string, assignee: string) => void;
  createIntro: (input: CreateIntroInput) => void;
  getFilteredIntros: () => IntroRequest[];
  getActiveIntro: () => IntroRequest | undefined;
}

const defaultFilters: IntroFilters = { status: "", dateFrom: "", dateTo: "", search: "" };

export const useIntrosStore = create<IntrosState>()(
  immer((set, get) => ({
    intros: mockIntros,
    members: mockIntroMembers,
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
        state.detailModalOpen = false;
        state.activeIntroId = null;
      }),
    openCreateModal: () => set((state) => { state.createModalOpen = true; }),
    closeCreateModal: () => set((state) => { state.createModalOpen = false; }),
    approveIntro: (id) =>
      set((state) => {
        const intro = state.intros.find((x) => x.id === id);
        if (intro) intro.status = "approved";
      }),
    declineIntro: (id) =>
      set((state) => {
        const intro = state.intros.find((x) => x.id === id);
        if (intro) intro.status = "declined";
      }),
    completeIntro: (id, outcome) =>
      set((state) => {
        const intro = state.intros.find((x) => x.id === id);
        if (intro) {
          intro.status = "completed";
          intro.completedAt = new Date().toISOString().slice(0, 10);
          if (outcome) intro.outcome = outcome;
        }
      }),
    setFollowUp: (id) =>
      set((state) => {
        const intro = state.intros.find((x) => x.id === id);
        if (intro) intro.status = "follow_up";
      }),
    addNote: (id, note) =>
      set((state) => {
        const intro = state.intros.find((x) => x.id === id);
        if (intro) {
          intro.adminNotes = intro.adminNotes ? `${intro.adminNotes}\n${note}` : note;
        }
      }),
    assignIntro: (id, assignee) =>
      set((state) => {
        const intro = state.intros.find((x) => x.id === id);
        if (intro) intro.assignedTo = assignee;
      }),
    createIntro: (input) =>
      set((state) => {
        const fromMember = state.members.find((m) => m.id === input.fromMemberId);
        const toMember = state.members.find((m) => m.id === input.toMemberId);
        if (!fromMember || !toMember) return;

        const nextId = `intro_${String(state.intros.length + 1).padStart(3, "0")}`;
        state.intros.unshift({
          id: nextId,
          fromMember,
          toMember,
          reason: input.reason,
          reasonDetail: input.reasonDetail,
          status: "pending",
          requestedAt: new Date().toISOString().slice(0, 10),
        });
        state.createModalOpen = false;
      }),
    getFilteredIntros: () => {
      const { intros, filters } = get();
      return intros.filter((intro) => {
        if (filters.status && intro.status !== filters.status) return false;
        if (filters.dateFrom && intro.requestedAt < filters.dateFrom) return false;
        if (filters.dateTo && intro.requestedAt > filters.dateTo) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            intro.fromMember.name.toLowerCase().includes(q) ||
            intro.toMember.name.toLowerCase().includes(q) ||
            intro.fromMember.company.toLowerCase().includes(q) ||
            intro.toMember.company.toLowerCase().includes(q) ||
            intro.reasonDetail.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },
    getActiveIntro: () => {
      const { intros, activeIntroId } = get();
      return intros.find((x) => x.id === activeIntroId);
    },
  })),
);
