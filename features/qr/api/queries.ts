import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiQRCode, mapApiQRScan, type ApiQRCode, type ApiQRScan } from "./mappers";
import type { QRAnalytics, QRCode } from "../types";

export const qrKeys = {
  all: ["qr"] as const,
  list: () => [...qrKeys.all, "list"] as const,
  analytics: (id: string) => [...qrKeys.all, "analytics", id] as const,
};

export interface QRCodesListData {
  codes: QRCode[];
  meta?: { page: number; perPage: number; total: number };
}

interface ApiQRAnalytics {
  qrCodeId: string;
  shortCode: string;
  totalScans: number;
  uniqueScans: number;
  conversions: number;
  dailyScans?: { date: string; scans: number }[];
  recentScans?: ApiQRScan[];
}

export function useQRCodesList() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery({
    queryKey: qrKeys.list(),
    queryFn: async (): Promise<QRCodesListData> => {
      const { data, meta } = await apiFetch<ApiQRCode[]>("/api/qr", {
        params: { page: 1, perPage: 100 },
      });
      return { codes: data.map(mapApiQRCode), meta };
    },
    enabled: isAuthenticated,
    refetchOnMount: "always",
  });
}

export function useQRAnalytics(id: string | null | undefined) {
  return useQuery({
    queryKey: qrKeys.analytics(id ?? ""),
    queryFn: async (): Promise<QRAnalytics> => {
      const { data } = await apiFetch<ApiQRAnalytics>(`/api/qr/${id}/analytics`);
      return {
        qrCodeId: data.qrCodeId,
        shortCode: data.shortCode,
        totalScans: data.totalScans,
        uniqueScans: data.uniqueScans,
        conversions: data.conversions,
        dailyScans: (data.dailyScans ?? []).map((d) => ({ day: d.date, scans: d.scans })),
        recentScans: (data.recentScans ?? []).map(mapApiQRScan),
      };
    },
    enabled: Boolean(id),
  });
}
