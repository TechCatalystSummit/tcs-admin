import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiPayment } from "./mappers";
import type { ApiPayment } from "./mappers";

export const paymentKeys = {
  all: ["payments"] as const,
  list: (params?: Record<string, string>) => [...paymentKeys.all, "list", params] as const,
};

export function usePaymentsList(params?: { status?: string }) {
  return useQuery({
    queryKey: paymentKeys.list(params),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiPayment[]>("/api/payments", {
        params: { page: 1, perPage: 100, status: params?.status },
      });
      return { payments: data.map(mapApiPayment), meta };
    },
  });
}
