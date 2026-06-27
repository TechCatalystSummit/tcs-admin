import type { TierId } from "@/core/constants/tiers";

export type DinnerStatus =
  | "requested"
  | "under_review"
  | "approved"
  | "scheduled"
  | "completed"
  | "declined";

export type CreditAdjustReason =
  | "annual_allocation"
  | "promotional"
  | "correction"
  | "penalty"
  | "redemption"
  | "other";

export interface DinnerOffering {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  imageUrl?: string;
  tagLabel: string;
  tagVariant: "blue" | "gold" | "green";
  tierRequirement: string;
  seatsTotal: number;
  seatsAvailable: number;
  eventDate?: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export interface DinnerRequest {
  id: string;
  memberId: string;
  requesterName: string;
  requesterCompany: string;
  whoToMeet?: string;
  purpose: string;
  preferredDate: string;
  budgetRange?: string;
  guestCount: number;
  location?: string;
  offeringId?: string;
  offeringTitle?: string;
  status: DinnerStatus;
  creditsUsed: number;
  adminNotes?: string;
  outcome?: string;
  scheduledDate?: string;
  createdAt: string;
}

export interface CreditRecord {
  memberId: string;
  memberName: string;
  memberEmail: string;
  tier?: TierId;
  balance: number;
  used: number;
  expiresAt: string | null;
}

export interface CreditAdjustment {
  id: string;
  memberId: string;
  delta: number;
  reason: CreditAdjustReason;
  note?: string;
  createdAt: string;
}
