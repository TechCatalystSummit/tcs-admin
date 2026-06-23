import { apiFetch } from "@/shared/lib/api/client";
import { getErrorMessage } from "@/shared/lib/api/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dinnerKeys } from "./queries";

export function useUpdateDinner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Record<string, unknown> }) => {
      await apiFetch(`/api/dinners/${id}`, { method: "PATCH", body });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: dinnerKeys.all });
      toast.success("Dinner updated");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useAdjustDinnerCredits() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { userId: string; balance: number }) => {
      await apiFetch("/api/dinners/credits", { method: "POST", body });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: dinnerKeys.all });
      toast.success("Credits adjusted");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
