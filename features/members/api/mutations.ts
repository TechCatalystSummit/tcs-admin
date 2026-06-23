import { apiFetch } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { showMutationError } from "@/shared/lib/api/handleApiError";
import { statusToApiPatch } from "./mappers";
import { memberKeys } from "./queries";
import type { MemberStatus, MemberTier } from "../types";

export function useApproveMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes?: string }) => {
      await apiFetch(`/api/members/${id}/approve`, {
        method: "POST",
        body: notes ? { approvalNotes: notes } : {},
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: memberKeys.all });
      toast.success("Member approved");
    },
    onError: showMutationError,
  });
}

export function useDeclineMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes?: string }) => {
      await apiFetch(`/api/members/${id}/decline`, {
        method: "POST",
        body: notes ? { approvalNotes: notes } : {},
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: memberKeys.all });
      toast.success("Member declined");
    },
    onError: showMutationError,
  });
}

export function useUpdateMember() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      tier,
      status,
      adminNotes,
    }: {
      id: string;
      tier?: MemberTier;
      status?: MemberStatus;
      adminNotes?: string;
    }) => {
      const body: Record<string, unknown> = {};
      if (adminNotes !== undefined) body.approvalNotes = adminNotes;
      if (status) Object.assign(body, statusToApiPatch(status));
      await apiFetch(`/api/members/${id}`, { method: "PATCH", body });
      void tier;
    },
    onSuccess: (_data, { id }) => {
      void qc.invalidateQueries({ queryKey: memberKeys.all });
      void qc.invalidateQueries({ queryKey: memberKeys.detail(id) });
      toast.success("Member updated");
    },
    onError: showMutationError,
  });
}

export function useBulkApproveMembers() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(
        ids.map((id) =>
          apiFetch(`/api/members/${id}/approve`, { method: "POST", body: {} }),
        ),
      );
    },
    onSuccess: (_data, ids) => {
      void qc.invalidateQueries({ queryKey: memberKeys.all });
      toast.success(
        ids.length === 1 ? "Member approved" : `${ids.length} members approved`,
      );
    },
    onError: showMutationError,
  });
}
