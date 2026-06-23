import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiSponsor } from "./mappers";
import type { ApiSponsor } from "./mappers";

export const sponsorKeys = {
  all: ["sponsors"] as const,
  list: (params?: Record<string, string>) => [...sponsorKeys.all, "list", params] as const,
  detail: (id: string) => [...sponsorKeys.all, "detail", id] as const,
};

export function useSponsorsList(params?: { industry?: string }) {
  return useQuery({
    queryKey: sponsorKeys.list(params),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiSponsor[]>("/api/sponsors", {
        params: { page: 1, perPage: 100, industry: params?.industry },
      });
      return { sponsors: data.map(mapApiSponsor), meta };
    },
  });
}

export function useSponsor(id: string | null | undefined) {
  return useQuery({
    queryKey: sponsorKeys.detail(id ?? ""),
    queryFn: async () => {
      const { data } = await apiFetch<ApiSponsor>(`/api/sponsors/${id}`);
      return mapApiSponsor(data);
    },
    enabled: Boolean(id),
  });
}
