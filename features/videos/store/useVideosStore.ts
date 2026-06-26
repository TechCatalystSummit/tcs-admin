"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Video, VideoFilters } from "../types";

interface VideosState {
  filters: VideoFilters;
  setFilter: (key: keyof VideoFilters, value: string) => void;
  clearFilters: () => void;
  filterVideos: (videos: Video[]) => Video[];
}

const defaultFilters: VideoFilters = { search: "", status: "" };

export const useVideosStore = create<VideosState>()(
  immer((set, get) => ({
    filters: defaultFilters,
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () => set((state) => { state.filters = defaultFilters; }),
    filterVideos: (videos) => {
      const { filters } = get();
      return videos.filter((v) => {
        if (filters.status && v.status !== filters.status) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            v.title.toLowerCase().includes(q) ||
            v.seriesLabel.toLowerCase().includes(q) ||
            v.speakerLabel.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },
  })),
);
