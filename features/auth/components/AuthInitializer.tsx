"use client";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useEffect } from "react";

/** Subscribes to Supabase session on mount. Use in login layout and AuthGuard. */
export function AuthInitializer() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    return initialize();
  }, [initialize]);

  return null;
}
