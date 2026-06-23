import { apiFetch } from "@/shared/lib/api/client";
import { showMutationError } from "@/shared/lib/api/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { sponsorFormToCreateBody, sponsorFormToPatchBody } from "./mappers";
import type { SponsorStatus, SponsorTier } from "../types";
import { sponsorKeys } from "./queries";

export interface SponsorFormInput {
  name: string;
  website?: string;
  industry?: string;
  tier: SponsorTier;
  description?: string;
  logoUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  status?: SponsorStatus;
}

export function useCreateSponsor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: SponsorFormInput) => {
      await apiFetch("/api/sponsors", { method: "POST", body: sponsorFormToCreateBody(data) });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: sponsorKeys.all });
      toast.success("Sponsor created");
    },
    onError: showMutationError,
  });
}

export function useUpdateSponsor() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: SponsorFormInput & { id: string }) => {
      await apiFetch(`/api/sponsors/${id}`, {
        method: "PATCH",
        body: sponsorFormToPatchBody(data),
      });
    },
    onSuccess: (_d, { id }) => {
      void qc.invalidateQueries({ queryKey: sponsorKeys.all });
      void qc.invalidateQueries({ queryKey: sponsorKeys.detail(id) });
      toast.success("Sponsor updated");
    },
    onError: showMutationError,
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
    onError: showMutationError,
  });
}
