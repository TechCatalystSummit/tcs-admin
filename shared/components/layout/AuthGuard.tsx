"use client";

import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function AuthGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();
  const hydrated = useHydrated();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surf">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return children;
}
