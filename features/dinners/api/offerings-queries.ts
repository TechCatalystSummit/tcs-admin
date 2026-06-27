import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiOffering } from "./offerings-mappers";
import type { ApiOffering } from "./offerings-mappers";

export const offeringKeys = {
  all: ["dinners", "offerings"] as const,
  list: (page?: number) => [...offeringKeys.all, "list", page] as const,
  detail: (id: string) => [...offeringKeys.all, "detail", id] as const,
};

export function useOfferingsList(page = 1) {
  return useQuery({
    queryKey: offeringKeys.list(page),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiOffering[]>("/api/dinners/offerings/admin", {
        params: { page, perPage: 50 },
      });
      return { offerings: data.map(mapApiOffering), meta };
    },
  });
}

export function useOffering(id: string | null | undefined) {
  return useQuery({
    queryKey: offeringKeys.detail(id ?? ""),
    queryFn: async () => {
      const { data } = await apiFetch<ApiOffering>(`/api/dinners/offerings/${id}`);
      return mapApiOffering(data);
    },
    enabled: Boolean(id),
  });
}
