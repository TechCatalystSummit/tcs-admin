import { apiFetch } from "@/shared/lib/api/client";
import { showMutationError } from "@/shared/lib/api/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { qrKeys } from "./queries";
import type { GenerateQRInput } from "../types";

export function useCreateQRCode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: GenerateQRInput) => {
      const body: Record<string, string> = {
        shortCode: input.shortCode,
        qrType: input.type,
        campaign: input.campaign,
        source: input.source,
      };
      if (input.eventId) body.eventId = input.eventId;
      await apiFetch("/api/qr", { method: "POST", body });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: qrKeys.all });
      toast.success("QR code created");
    },
    onError: showMutationError,
  });
}
