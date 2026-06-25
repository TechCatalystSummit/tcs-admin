import type { QRAnalyticsDay, QRCode, QRScan } from "../types";

/** Static fixtures for Storybook / offline demos — not used by live QR page. */
export const mockQRCodes: QRCode[] = [
  {
    id: "qr-1",
    shortCode: "s26-checkin",
    type: "event_signup",
    source: "Venue",
    campaign: "Summit 2026 Check-in",
    displayUrl: "https://techcatalystsummit.com/q/s26-checkin",
    scans: 142,
    conversions: 38,
    createdAt: "2026-01-15T10:00:00Z",
  },
];

export const mockQRScans: QRScan[] = [
  {
    id: "scan-1",
    qrCodeId: "qr-1",
    timestamp: "2026-02-01T14:30:00Z",
    converted: true,
    conversionType: "signup",
    conversionStatus: "signup",
  },
];

export const mockQRAnalytics: QRAnalyticsDay[] = [
  { day: "2026-01-28", scans: 12 },
  { day: "2026-01-29", scans: 18 },
  { day: "2026-01-30", scans: 9 },
];
