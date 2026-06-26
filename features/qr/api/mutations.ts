import { apiFetch } from "@/shared/lib/api/client";
import { showMutationError } from "@/shared/lib/api/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { mapApiQRCode, type ApiQRCode } from "./mappers";
import { qrKeys, type QRCodesListData } from "./queries";
import type { GenerateQRInput, QRCode } from "../types";

export function useCreateQRCode() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: GenerateQRInput): Promise<QRCode> => {
      const body: Record<string, string> = {
        shortCode: input.shortCode,
        qrType: input.type,
        campaign: input.campaign,
        source: input.source,
      };
      if (input.eventId) body.eventId = input.eventId;
      const { data } = await apiFetch<ApiQRCode>("/api/qr", { method: "POST", body });
      return mapApiQRCode(data);
    },
    onSuccess: async (created) => {
      qc.setQueryData<QRCodesListData>(qrKeys.list(), (prev) => {
        const existing = prev?.codes ?? [];
        const withoutDup = existing.filter(
          (c) => c.id !== created.id && c.shortCode !== created.shortCode,
        );
        return {
          codes: [created, ...withoutDup],
          meta: prev?.meta,
        };
      });
      await qc.refetchQueries({ queryKey: qrKeys.list() });
      void qc.invalidateQueries({ queryKey: qrKeys.all });
      toast.success("QR code created");
    },
    onError: showMutationError,
  });
}
