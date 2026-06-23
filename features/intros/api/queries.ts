import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiIntro } from "./mappers";
import type { ApiIntro } from "./mappers";

export const introKeys = {
  all: ["intros"] as const,
  list: (params?: Record<string, string>) => [...introKeys.all, "list", params] as const,
  detail: (id: string) => [...introKeys.all, "detail", id] as const,
};

export function useIntrosList(params?: { status?: string; direction?: string }) {
  return useQuery({
    queryKey: introKeys.list(params),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiIntro[]>("/api/intros", {
        params: {
          direction: params?.direction ?? "all",
          status: params?.status,
          page: 1,
          perPage: 100,
        },
      });
      return { intros: data.map(mapApiIntro), meta };
    },
  });
}

export function useIntro(id: string | null | undefined) {
  return useQuery({
    queryKey: introKeys.detail(id ?? ""),
    queryFn: async () => {
      const { data } = await apiFetch<ApiIntro>(`/api/intros/${id}`);
      return mapApiIntro(data);
    },
    enabled: Boolean(id),
  });
}
