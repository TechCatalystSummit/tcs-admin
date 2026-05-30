"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Syncs filter state to URL search params (read on mount, write on change).
 */
export function useTableFilters<T extends Record<string, string>>(
  filters: T,
  setFilter: (key: keyof T, value: string) => void,
  defaults: T,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const val = searchParams.get(String(key));
      if (val) setFilter(key, val);
    }
  }, [defaults, searchParams, setFilter]);

  useEffect(() => {
    if (!hydrated.current) return;
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(filters)) {
      if (val) params.set(key, val);
    }
    const qs = params.toString();
    const next = qs ? `${pathname}?${qs}` : pathname;
    router.replace(next, { scroll: false });
  }, [filters, pathname, router]);
}
