import { apiFetch } from "@/shared/lib/api/client";
import { showMutationError } from "@/shared/lib/api/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { DinnerOffering } from "../types";
import { offeringToCreateBody, offeringToPatchBody } from "./offerings-mappers";
import { offeringKeys } from "./offerings-queries";

export function useCreateOffering() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<DinnerOffering> & { title: string }) => {
      const { data: created } = await apiFetch("/api/dinners/offerings", {
        method: "POST",
        body: offeringToCreateBody(data),
      });
      return created;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: offeringKeys.all });
      toast.success("Offering created");
    },
    onError: showMutationError,
  });
}

export function useUpdateOffering() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DinnerOffering> }) => {
      await apiFetch(`/api/dinners/offerings/${id}`, {
        method: "PATCH",
        body: offeringToPatchBody(data),
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: offeringKeys.all });
      toast.success("Offering updated");
    },
    onError: showMutationError,
  });
}

export function useDeactivateOffering() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/dinners/offerings/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: offeringKeys.all });
      toast.success("Offering deactivated");
    },
    onError: showMutationError,
  });
}
