import { apiFetch } from "@/shared/lib/api/client";
import type { ApiProfile } from "@/features/members/api/types";
import { useQuery } from "@tanstack/react-query";
import { mapApiCreditRow, mapApiDinner } from "./mappers";
import type { ApiCreditLedgerRow, ApiDinner } from "./mappers";

export const dinnerKeys = {
  all: ["dinners"] as const,
  list: (status?: string, page?: number) =>
    [...dinnerKeys.all, "list", status, page] as const,
  credits: (search?: string, page?: number) =>
    [...dinnerKeys.all, "credits", search, page] as const,
};

async function loadMemberProfiles(userIds: string[]) {
  const unique = [...new Set(userIds)];
  if (unique.length === 0) return new Map<string, ApiProfile>();

  const entries = await Promise.all(
    unique.map(async (id) => {
      try {
        const { data } = await apiFetch<ApiProfile>(`/api/members/${id}`);
        return [id, data] as const;
      } catch {
        return [id, null] as const;
      }
    }),
  );

  return new Map(
    entries.filter((entry): entry is [string, ApiProfile] => entry[1] !== null),
  );
}

export function useDinnersList(status?: string, page = 1) {
  return useQuery({
    queryKey: dinnerKeys.list(status, page),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiDinner[]>("/api/dinners", {
        params: { page, perPage: 50, status },
      });
      const memberMap = await loadMemberProfiles(data.map((d) => d.userId));
      return {
        requests: data.map((d) => mapApiDinner(d, memberMap.get(d.userId))),
        meta,
      };
    },
  });
}

export function useCreditsLedger(search?: string, page = 1) {
  return useQuery({
    queryKey: dinnerKeys.credits(search, page),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiCreditLedgerRow[]>(
        "/api/dinners/credits/admin",
        { params: { page, perPage: 50, search: search || undefined } },
      );
      return { credits: data.map(mapApiCreditRow), meta };
    },
  });
}
