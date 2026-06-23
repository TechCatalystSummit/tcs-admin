"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface QRState {
  selectedCodeId: string | null;
  generateOpen: boolean;
  openGenerate: () => void;
  closeGenerate: () => void;
  selectCode: (id: string | null) => void;
}

export const useQRStore = create<QRState>()(
  immer((set) => ({
    selectedCodeId: null,
    generateOpen: false,
    openGenerate: () => set((state) => { state.generateOpen = true; }),
    closeGenerate: () => set((state) => { state.generateOpen = false; }),
    selectCode: (id) => set((state) => { state.selectedCodeId = id; }),
  })),
);
