"use client";

import { useMemo } from "react";
import { useAdminVideos } from "../api/queries";
import { useVideosStore } from "../store/useVideosStore";

export function useFilteredVideos() {
  const { data, isLoading, isError, error, refetch } = useAdminVideos();
  const filterVideos = useVideosStore((s) => s.filterVideos);
  const filters = useVideosStore((s) => s.filters);

  const videos = useMemo(
    () => filterVideos(data?.videos ?? []),
    [data?.videos, filterVideos, filters],
  );

  return { videos, isLoading, isError, error, refetch, meta: data?.meta };
}
