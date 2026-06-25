import { qrDisplayUrl } from "../lib/qrDisplayUrl";
import type { QRCode, QRConversionStatus, QRScan, QRType } from "../types";

export interface ApiQRCode {
  id: string;
  shortCode: string;
  qrType?: QRType;
  eventId?: string | null;
  campaign?: string | null;
  source?: string | null;
  isActive?: boolean;
  scanCount?: number;
  conversionCount?: number;
  createdAt?: string;
}

export interface ApiQRScan {
  id: string;
  qrCodeId: string;
  userId?: string | null;
  converted?: boolean;
  conversionType?: string | null;
  scannedAt?: string;
}

function mapConversionStatus(
  converted?: boolean,
  conversionType?: string | null,
): QRConversionStatus {
  if (!converted) return "none";
  const t = (conversionType ?? "").toLowerCase();
  if (t.includes("signup") || t === "signup") return "signup";
  if (t.includes("rsvp")) return "rsvp";
  if (t.includes("lead")) return "lead";
  if (t.includes("payment")) return "payment";
  return "signup";
}

export function mapApiQRScan(s: ApiQRScan): QRScan {
  return {
    id: s.id,
    qrCodeId: s.qrCodeId,
    timestamp: s.scannedAt ?? new Date().toISOString(),
    userId: s.userId,
    converted: s.converted ?? false,
    conversionType: s.conversionType,
    conversionStatus: mapConversionStatus(s.converted, s.conversionType),
  };
}

export function mapApiQRCode(q: ApiQRCode): QRCode {
  const shortCode = q.shortCode;
  return {
    id: q.id,
    shortCode,
    type: q.qrType ?? "general_signup",
    source: q.source ?? "",
    campaign: q.campaign ?? "",
    displayUrl: qrDisplayUrl(shortCode),
    scans: q.scanCount ?? 0,
    conversions: q.conversionCount ?? 0,
    createdAt: q.createdAt ?? new Date().toISOString(),
    eventId: q.eventId,
  };
}
