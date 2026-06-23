"use client";

import { AuthInitializer } from "@/features/auth/components/AuthInitializer";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  return (
    <>
      <AuthInitializer />
      {isLoading ? (
        <div className="flex min-h-screen items-center justify-center bg-surf">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isAuthenticated ? (
        children
      ) : null}
    </>
  );
}
