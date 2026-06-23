"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockCreditLedger } from "../data/mockDinners";
import type { CreditAdjustReason, CreditAdjustment, CreditRecord } from "../types";

interface DinnersState {
  credits: CreditRecord[];
  adjustments: CreditAdjustment[];
  selectedRequestId: string | null;
  detailOpen: boolean;
  adjustMemberId: string | null;
  adjustOpen: boolean;
  openDetail: (id: string) => void;
  closeDetail: () => void;
  openAdjust: (memberId: string) => void;
  closeAdjust: () => void;
  adjustCredits: (
    memberId: string,
    delta: number,
    reason: CreditAdjustReason,
    note?: string,
  ) => void;
}

export const useDinnersStore = create<DinnersState>()(
  immer((set) => ({
    credits: mockCreditLedger,
    adjustments: [],
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
    adjustCredits: (memberId, delta, reason, note) =>
      set((state) => {
        const credit = state.credits.find((c) => c.memberId === memberId);
        if (!credit) return;
        credit.balance = Math.max(0, credit.balance + delta);
        if (delta < 0) credit.used += Math.abs(delta);
        state.adjustments.push({
          id: `adj_${String(state.adjustments.length + 1).padStart(3, "0")}`,
          memberId,
          delta,
          reason,
          note,
          createdAt: new Date().toISOString().slice(0, 10),
        });
      }),
  })),
);
