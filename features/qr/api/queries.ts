import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiQRCode } from "./mappers";
import type { ApiQRCode } from "./mappers";

export const qrKeys = {
  all: ["qr"] as const,
  list: (params?: Record<string, string>) => [...qrKeys.all, "list", params] as const,
  analytics: (id: string) => [...qrKeys.all, "analytics", id] as const,
};

export function useQRCodesList() {
  return useQuery({
    queryKey: qrKeys.list(),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiQRCode[]>("/api/qr", {
        params: { page: 1, perPage: 100 },
      });
      return { codes: data.map(mapApiQRCode), meta };
    },
  });
}

export function useQRAnalytics(id: string | null | undefined) {
  return useQuery({
    queryKey: qrKeys.analytics(id ?? ""),
    queryFn: async () => {
      const { data } = await apiFetch<{ daily?: { date: string; scans: number }[] }>(
        `/api/qr/${id}/analytics`,
      );
      return (data.daily ?? []).map((d) => ({ day: d.date, scans: d.scans }));
    },
    enabled: Boolean(id),
  });
}
