import type { QRCode, QRType } from "../types";

export interface ApiQRCode {
  id: string;
  shortCode: string;
  qrType?: string;
  eventId?: string | null;
  campaign?: string | null;
  source?: string | null;
  isActive?: boolean;
  scanCount?: number;
  conversionCount?: number;
  createdAt?: string;
}

const TYPE_MAP: Record<string, QRType> = {
  event_signup: "event_registration",
  event_checkin: "event_check_in",
  sponsor_lead: "sponsor_lead",
  member_profile: "member_profile",
  intro_request: "intro_request",
  dinner_request: "dinner_request",
  payment_link: "payment_link",
  app_download: "app_download",
};

export function mapApiQRCode(q: ApiQRCode): QRCode {
  return {
    id: q.id,
    name: q.shortCode,
    type: TYPE_MAP[q.qrType ?? "custom"] ?? "custom",
    source: q.source ?? "",
    campaign: q.campaign ?? "",
    shortUrl: `https://tcs.co/${q.shortCode}`,
    scans: q.scanCount ?? 0,
    conversions: q.conversionCount ?? 0,
    createdAt: q.createdAt ?? new Date().toISOString(),
  };
}
