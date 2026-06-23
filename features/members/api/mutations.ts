import { apiFetch } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib/api/errors";
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
    onError: (err) => toast.error(getErrorMessage(err)),
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
    onError: (err) => toast.error(getErrorMessage(err)),
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
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useBulkApproveMembers() {
  const approve = useApproveMember();
  return useMutation({
    mutationFn: async (ids: string[]) => {
      await Promise.all(ids.map((id) => approve.mutateAsync({ id })));
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
