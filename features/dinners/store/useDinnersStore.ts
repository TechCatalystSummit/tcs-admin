"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface DinnersState {
  selectedRequestId: string | null;
  detailOpen: boolean;
  adjustMemberId: string | null;
  adjustOpen: boolean;
  adjustInitialBalance: number | null;
  statusFilter: string;
  offeringFormOpen: boolean;
  editingOfferingId: string | null;
  openDetail: (id: string) => void;
  closeDetail: () => void;
  openAdjust: (memberId: string, balance?: number) => void;
  closeAdjust: () => void;
  setStatusFilter: (status: string) => void;
  openOfferingForm: (id?: string) => void;
  closeOfferingForm: () => void;
}

export const useDinnersStore = create<DinnersState>()(
  immer((set) => ({
    selectedRequestId: null,
    detailOpen: false,
    adjustMemberId: null,
    adjustOpen: false,
    adjustInitialBalance: null,
    statusFilter: "",
    offeringFormOpen: false,
    editingOfferingId: null,
    openDetail: (id) =>
      set((state) => {
        state.selectedRequestId = id;
        state.detailOpen = true;
      }),
    closeDetail: () =>
      set((state) => {
        state.detailOpen = false;
        state.selectedRequestId = null;
      }),
    openAdjust: (memberId, balance) =>
      set((state) => {
        state.adjustMemberId = memberId;
        state.adjustInitialBalance = balance ?? null;
        state.adjustOpen = true;
      }),
    closeAdjust: () =>
      set((state) => {
        state.adjustOpen = false;
        state.adjustMemberId = null;
        state.adjustInitialBalance = null;
      }),
    setStatusFilter: (status) =>
      set((state) => {
        state.statusFilter = status;
      }),
    openOfferingForm: (id) =>
      set((state) => {
        state.editingOfferingId = id ?? null;
        state.offeringFormOpen = true;
      }),
    closeOfferingForm: () =>
      set((state) => {
        state.offeringFormOpen = false;
        state.editingOfferingId = null;
      }),
  })),
);
