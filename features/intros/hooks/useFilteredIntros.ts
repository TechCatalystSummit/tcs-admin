"use client";

import { useMemo } from "react";
import { useIntrosList } from "../api/queries";
import { useIntrosStore } from "../store/useIntrosStore";

export function useFilteredIntros() {
  const { data, isLoading, error } = useIntrosList();
  const filterIntros = useIntrosStore((s) => s.filterIntros);
  const filters = useIntrosStore((s) => s.filters);

  const intros = useMemo(
    () => filterIntros(data?.intros ?? []),
    [data?.intros, filterIntros, filters],
  );

  return { intros, isLoading, error, meta: data?.meta };
}
