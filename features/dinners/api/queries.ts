import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiDinner } from "./mappers";
import type { ApiDinner } from "./mappers";

export const dinnerKeys = {
  all: ["dinners"] as const,
  list: (status?: string) => [...dinnerKeys.all, "list", status] as const,
};

export function useDinnersList(status?: string) {
  return useQuery({
    queryKey: dinnerKeys.list(status),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiDinner[]>("/api/dinners", {
        params: { page: 1, perPage: 100, status },
      });
      return { requests: data.map(mapApiDinner), meta };
    },
  });
}
