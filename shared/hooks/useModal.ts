"use client";

import { create } from "zustand";

interface ModalStore {
  open: string | null;
  payload: Record<string, unknown>;
  openModal: (key: string, payload?: Record<string, unknown>) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  open: null,
  payload: {},
  openModal: (key, payload = {}) => set({ open: key, payload }),
  closeModal: () => set({ open: null, payload: {} }),
}));

/** Convenience hook matching build plan naming */
export function useModal() {
  const open = useModalStore((s) => s.open);
  const payload = useModalStore((s) => s.payload);
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);
  return { open, payload, openModal, closeModal };
}
