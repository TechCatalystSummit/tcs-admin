"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockCreditLedger, mockDinnerRequests } from "../data/mockDinners";
import type {
  CreditAdjustReason,
  CreditAdjustment,
  CreditRecord,
  DinnerRequest,
  DinnerStatus,
} from "../types";

interface DinnersState {
  requests: DinnerRequest[];
  credits: CreditRecord[];
  adjustments: CreditAdjustment[];
  selectedRequestId: string | null;
  detailOpen: boolean;
  adjustMemberId: string | null;
  adjustOpen: boolean;
  openDetail: (id: string) => void;
  closeDetail: () => void;
  setRequestStatus: (id: string, status: DinnerStatus) => void;
  approveRequest: (id: string) => void;
  scheduleRequest: (id: string, scheduledDate?: string) => void;
  completeRequest: (id: string) => void;
  logOutcome: (id: string, outcome: string) => void;
  appendAdminNote: (id: string, note: string) => void;
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
    requests: mockDinnerRequests,
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
    setRequestStatus: (id, status) =>
      set((state) => {
        const req = state.requests.find((r) => r.id === id);
        if (req) req.status = status;
      }),
    approveRequest: (id) =>
      set((state) => {
        const req = state.requests.find((r) => r.id === id);
        if (req && (req.status === "requested" || req.status === "under_review")) {
          req.status = "approved";
        }
      }),
    scheduleRequest: (id, scheduledDate) =>
      set((state) => {
        const req = state.requests.find((r) => r.id === id);
        if (req && req.status === "approved") {
          req.status = "scheduled";
          req.scheduledDate = scheduledDate ?? req.preferredDate;
          if (req.creditsUsed === 0) req.creditsUsed = 1;
        }
      }),
    completeRequest: (id) =>
      set((state) => {
        const req = state.requests.find((r) => r.id === id);
        if (req && req.status === "scheduled") {
          req.status = "completed";
          if (req.creditsUsed < 2) req.creditsUsed = 2;
        }
      }),
    logOutcome: (id, outcome) =>
      set((state) => {
        const req = state.requests.find((r) => r.id === id);
        if (req) req.outcome = outcome;
      }),
    appendAdminNote: (id, note) =>
      set((state) => {
        const req = state.requests.find((r) => r.id === id);
        if (req) {
          req.adminNotes = req.adminNotes ? `${req.adminNotes}\n${note}` : note;
        }
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
