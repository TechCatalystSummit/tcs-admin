import { apiFetch } from "@/shared/lib/api/client";
import { getErrorMessage } from "@/shared/lib/api/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sponsorKeys } from "./queries";

export function useCreateSponsor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: Record<string, unknown>) => {
      await apiFetch("/api/sponsors", { method: "POST", body });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: sponsorKeys.all });
      toast.success("Sponsor created");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useUpdateSponsor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: Record<string, unknown> }) => {
      await apiFetch(`/api/sponsors/${id}`, { method: "PATCH", body });
    },
    onSuccess: (_d, { id }) => {
      void qc.invalidateQueries({ queryKey: sponsorKeys.all });
      void qc.invalidateQueries({ queryKey: sponsorKeys.detail(id) });
      toast.success("Sponsor updated");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useDeleteSponsor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/sponsors/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: sponsorKeys.all });
      toast.success("Sponsor deleted");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
