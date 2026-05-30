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

export interface DinnerRequest {
  id: string;
  memberId: string;
  requesterName: string;
  requesterCompany: string;
  purpose: string;
  preferredDate: string;
  budget: number;
  guestCount: number;
  location?: string;
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
  tier: TierId;
  balance: number;
  used: number;
  expiresAt: string;
}

export interface CreditAdjustment {
  id: string;
  memberId: string;
  delta: number;
  reason: CreditAdjustReason;
  note?: string;
  createdAt: string;
}
