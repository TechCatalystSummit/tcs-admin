import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapPendingToApproval, mapProfileToAdminMember } from "./mappers";
import type { ApiProfile, MemberListParams } from "./types";

export const memberKeys = {
  all: ["members"] as const,
  list: (params: MemberListParams) => [...memberKeys.all, "list", params] as const,
  pending: (page: number) => [...memberKeys.all, "pending", page] as const,
  detail: (id: string) => [...memberKeys.all, "detail", id] as const,
};

export function useMembersList(params: MemberListParams = {}) {
  return useQuery({
    queryKey: memberKeys.list(params),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiProfile[]>("/api/members", {
        params: {
          page: params.page ?? 1,
          perPage: params.perPage ?? 100,
          search: params.search,
          city: params.city,
        },
      });
      return {
        members: data.map(mapProfileToAdminMember),
        meta,
      };
    },
  });
}

export function usePendingMembers(page = 1) {
  return useQuery({
    queryKey: memberKeys.pending(page),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiProfile[]>("/api/members/pending", {
        params: { page, perPage: 100 },
      });
      return {
        approvals: data.map(mapPendingToApproval),
        meta,
      };
    },
  });
}

export function useMember(id: string | null | undefined) {
  return useQuery({
    queryKey: memberKeys.detail(id ?? ""),
    queryFn: async () => {
      const { data } = await apiFetch<ApiProfile>(`/api/members/${id}`);
      return mapProfileToAdminMember(data);
    },
    enabled: Boolean(id),
  });
}
