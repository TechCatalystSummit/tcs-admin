"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminUser, AuthState } from "../types";

const MOCK_ADMIN: AdminUser = {
  id: "admin_001",
  name: "Jordan Ellis",
  email: "admin@techcatalystsummit.com",
  role: "admin",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: MOCK_ADMIN,
      isAuthenticated: true,
      login: (email: string) => {
        set({
          user: { ...MOCK_ADMIN, email },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: "tcs-auth" },
  ),
);
