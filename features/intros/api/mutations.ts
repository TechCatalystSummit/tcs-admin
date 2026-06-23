import { apiFetch } from "@/shared/lib/api/client";
import { showMutationError } from "@/shared/lib/api/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { introKeys } from "./queries";

export function useApproveIntro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/intros/${id}/approve`, { method: "POST" });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: introKeys.all });
      toast.success("Intro approved");
    },
    onError: showMutationError,
  });
}

export function useDeclineIntro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/intros/${id}/decline`, { method: "POST" });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: introKeys.all });
      toast.success("Intro declined");
    },
    onError: showMutationError,
  });
}

export function usePatchIntro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Record<string, unknown> }) => {
      await apiFetch(`/api/intros/${id}`, { method: "PATCH", body });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: introKeys.all });
      toast.success("Intro updated");
    },
    onError: showMutationError,
  });
}

export function useCreateIntro() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: {
      toUserId: string;
      reason: string;
      message?: string;
    }) => {
      await apiFetch("/api/intros", { method: "POST", body });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: introKeys.all });
      toast.success("Intro created");
    },
    onError: showMutationError,
  });
}
