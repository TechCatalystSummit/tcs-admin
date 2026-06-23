"use client";

import { useMemo } from "react";
import { useSponsorsList } from "../api/queries";
import { useSponsorsStore } from "../store/useSponsorsStore";

export function useFilteredSponsors() {
  const { data, isLoading, error } = useSponsorsList();
  const filterSponsors = useSponsorsStore((s) => s.filterSponsors);
  const filters = useSponsorsStore((s) => s.filters);

  const sponsors = useMemo(
    () => filterSponsors(data?.sponsors ?? []),
    [data?.sponsors, filterSponsors, filters],
  );

  return { sponsors, isLoading, error, meta: data?.meta };
}
