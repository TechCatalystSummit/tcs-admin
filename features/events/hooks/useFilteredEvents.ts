"use client";

import { useMemo } from "react";
import { useAdminEvents } from "../api/queries";
import { useEventsStore } from "../store/useEventsStore";

export function useFilteredEvents() {
  const { data, isLoading, error } = useAdminEvents();
  const filterEvents = useEventsStore((s) => s.filterEvents);
  const filters = useEventsStore((s) => s.filters);

  const events = useMemo(
    () => filterEvents(data?.events ?? []),
    [data?.events, filterEvents, filters],
  );

  return { events, isLoading, error, meta: data?.meta };
}
