import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiOutcome } from "./mappers";
import type { ApiOutcome } from "./mappers";

export const outcomeKeys = {
  all: ["outcomes"] as const,
  list: (params?: Record<string, string | number>) =>
    [...outcomeKeys.all, "list", params] as const,
};

export function useOutcomesList(params?: {
  page?: number;
  perPage?: number;
  outcomeType?: string;
}) {
  return useQuery({
    queryKey: outcomeKeys.list(params),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiOutcome[]>("/api/outcomes", {
        params: {
          page: params?.page ?? 1,
          perPage: params?.perPage ?? 25,
          outcomeType: params?.outcomeType,
        },
      });
      return { outcomes: data.map(mapApiOutcome), meta };
    },
  });
}

export function useOutcomesRaw(params?: { page?: number; perPage?: number }) {
  return useQuery({
    queryKey: [...outcomeKeys.all, "raw", params],
    queryFn: async () => {
      const { data } = await apiFetch<ApiOutcome[]>("/api/outcomes", {
        params: { page: params?.page ?? 1, perPage: params?.perPage ?? 10 },
      });
      return data;
    },
  });
}
