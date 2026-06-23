"use client";

import type { AdminUser } from "../types";
import { fetchMe } from "../api/me";
import { onAuthStateChange, signInWithPassword, signOut } from "../api/session";
import { getQueryClient } from "@/shared/lib/api/query-client";
import { create } from "zustand";

interface AuthStore {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => () => void;
  clearError: () => void;
}

function toAdminUser(profile: {
  id: string;
  name: string;
  email: string;
  role: string;
}): AdminUser {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    role: profile.role as AdminUser["role"],
  };
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  initialized: false,

  clearError: () => set({ error: null }),

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      await signInWithPassword(email, password);
      const profile = await fetchMe();
      set({
        user: toAdminUser(profile),
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      getQueryClient().invalidateQueries({ queryKey: ["me"] });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      set({ user: null, isAuthenticated: false, isLoading: false, error: message });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await signOut();
    } finally {
      getQueryClient().clear();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  },

  initialize: () => {
    if (get().initialized) return () => {};

    set({ initialized: true, isLoading: true });

    const syncSession = async (hasSession: boolean) => {
      if (!hasSession) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }
      try {
        const profile = await fetchMe();
        set({
          user: toAdminUser(profile),
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch {
        await signOut();
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    };

    void (async () => {
      const { getSession } = await import("../api/session");
      const session = await getSession();
      await syncSession(Boolean(session));
    })();

    const subscription = onAuthStateChange((session) => {
      void syncSession(Boolean(session));
    });

    return () => subscription.unsubscribe();
  },
}));
