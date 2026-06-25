/** Matches tcs-api qr.validators.ts qrType enum */
export type QRType =
  | "event_signup"
  | "event_rsvp"
  | "dinner_request"
  | "vip_application"
  | "sponsor_inquiry"
  | "speaker_application"
  | "member_referral"
  | "sponsor_booth"
  | "post_event_followup"
  | "general_signup";

export type QRConversionStatus = "none" | "signup" | "rsvp" | "lead" | "payment";

export interface QRScan {
  id: string;
  qrCodeId: string;
  timestamp: string;
  userId?: string | null;
  converted: boolean;
  conversionType?: string | null;
  conversionStatus: QRConversionStatus;
}

export interface QRCode {
  id: string;
  shortCode: string;
  type: QRType;
  source: string;
  campaign: string;
  displayUrl: string;
  scans: number;
  conversions: number;
  createdAt: string;
  eventId?: string | null;
}

export interface QRAnalyticsDay {
  day: string;
  scans: number;
}

export interface QRAnalytics {
  qrCodeId: string;
  shortCode: string;
  totalScans: number;
  uniqueScans: number;
  conversions: number;
  dailyScans: QRAnalyticsDay[];
  recentScans: QRScan[];
}

export interface GenerateQRInput {
  shortCode: string;
  type: QRType;
  source: string;
  campaign: string;
  eventId?: string;
}

export const QR_TYPE_LABELS: Record<QRType, string> = {
  event_signup: "Event Sign-up",
  event_rsvp: "Event RSVP",
  dinner_request: "Dinner Request",
  vip_application: "VIP Application",
  sponsor_inquiry: "Sponsor Inquiry",
  speaker_application: "Speaker Application",
  member_referral: "Member Referral",
  sponsor_booth: "Sponsor Booth",
  post_event_followup: "Post-Event Follow-up",
  general_signup: "General Sign-up",
};

export const SHORT_CODE_RE = /^[a-zA-Z0-9_-]+$/;
