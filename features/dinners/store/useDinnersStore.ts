"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockCreditLedger } from "../data/mockDinners";
import type { CreditRecord } from "../types";

interface DinnersState {
  credits: CreditRecord[];
  selectedRequestId: string | null;
  detailOpen: boolean;
  adjustMemberId: string | null;
  adjustOpen: boolean;
  openDetail: (id: string) => void;
  closeDetail: () => void;
  openAdjust: (memberId: string) => void;
  closeAdjust: () => void;
}

export const useDinnersStore = create<DinnersState>()(
  immer((set) => ({
    credits: mockCreditLedger,
    selectedRequestId: null,
    detailOpen: false,
    adjustMemberId: null,
    adjustOpen: false,
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
    openAdjust: (memberId) =>
      set((state) => {
        state.adjustMemberId = memberId;
        state.adjustOpen = true;
      }),
    closeAdjust: () =>
      set((state) => {
        state.adjustOpen = false;
        state.adjustMemberId = null;
      }),
  })),
);
