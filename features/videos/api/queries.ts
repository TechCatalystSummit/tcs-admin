import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiVideo, type ApiVideo } from "./mappers";

export const videoKeys = {
  all: ["videos"] as const,
  admin: (params?: Record<string, string | number>) =>
    [...videoKeys.all, "admin", params] as const,
  detail: (id: string) => [...videoKeys.all, "detail", id] as const,
};

export function useAdminVideos(params?: { page?: number }) {
  return useQuery({
    queryKey: videoKeys.admin(params),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiVideo[]>("/api/videos/admin", {
        params: { page: params?.page ?? 1, perPage: 100 },
      });
      return { videos: data.map(mapApiVideo), meta };
    },
  });
}

export function useVideo(id: string | null | undefined) {
  return useQuery({
    queryKey: videoKeys.detail(id ?? ""),
    queryFn: async () => {
      const { data } = await apiFetch<ApiVideo>(`/api/videos/${id}`);
      return mapApiVideo(data);
    },
    enabled: Boolean(id),
  });
}
