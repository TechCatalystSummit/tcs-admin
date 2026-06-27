import type { ApiProfile } from "@/features/members/api/types";
import type { DinnerRequest, DinnerStatus } from "../types";

export interface ApiDinnerOfferingSummary {
  id: string;
  title: string;
  subtitle: string;
}

export interface ApiDinner {
  id: string;
  userId: string;
  offeringId?: string | null;
  offering?: ApiDinnerOfferingSummary | null;
  whoToMeet?: string | null;
  dinnerPurpose?: string | null;
  desiredOutcome?: string | null;
  preferredDates?: string[];
  preferredRestaurant?: string | null;
  budgetRange?: string | null;
  status: string;
  scheduledAt?: string | null;
  outcomeNotes?: string | null;
  creditsUsed?: number;
  adminNote?: string | null;
  createdAt: string;
}

export function mapApiDinner(
  d: ApiDinner,
  member?: Pick<ApiProfile, "name" | "company"> | null,
): DinnerRequest {
  const statusMap: Record<string, DinnerStatus> = {
    requested: "requested",
    under_review: "under_review",
    approved: "approved",
    scheduled: "scheduled",
    completed: "completed",
    outcome_logged: "completed",
    canceled: "declined",
  };

  return {
    id: d.id,
    memberId: d.userId,
    requesterName: member?.name ?? "Member",
    requesterCompany: member?.company ?? "",
    whoToMeet: d.whoToMeet ?? undefined,
    purpose: d.dinnerPurpose ?? "",
    preferredDate: d.preferredDates?.[0] ?? d.createdAt,
    budgetRange: d.budgetRange ?? undefined,
    guestCount: 2,
    location: d.preferredRestaurant ?? undefined,
    offeringId: d.offeringId ?? d.offering?.id,
    offeringTitle: d.offering?.title,
    status: statusMap[d.status] ?? "requested",
    creditsUsed: d.creditsUsed ?? 0,
    adminNotes: d.adminNote ?? undefined,
    outcome: d.outcomeNotes ?? undefined,
    scheduledDate: d.scheduledAt ?? undefined,
    createdAt: d.createdAt,
  };
}

export interface ApiCreditLedgerRow {
  id: string;
  userId: string;
  balance: number;
  totalUsed: number;
  expiresAt: string | null;
  updatedAt: string | null;
  memberName: string;
  memberEmail: string;
}

export function mapApiCreditRow(row: ApiCreditLedgerRow) {
  return {
    memberId: row.userId,
    memberName: row.memberName,
    memberEmail: row.memberEmail,
    balance: row.balance,
    used: row.totalUsed,
    expiresAt: row.expiresAt,
  };
}
