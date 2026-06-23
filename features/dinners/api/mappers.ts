import type { DinnerRequest, DinnerStatus } from "../types";

export interface ApiDinner {
  id: string;
  userId: string;
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

export function mapApiDinner(d: ApiDinner): DinnerRequest {
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
    requesterName: d.whoToMeet ?? "Member",
    requesterCompany: "",
    purpose: d.dinnerPurpose ?? "",
    preferredDate: d.preferredDates?.[0] ?? d.createdAt,
    budget: 0,
    guestCount: 2,
    location: d.preferredRestaurant ?? undefined,
    status: statusMap[d.status] ?? "requested",
    creditsUsed: d.creditsUsed ?? 0,
    adminNotes: d.adminNote ?? undefined,
    outcome: d.outcomeNotes ?? undefined,
    scheduledDate: d.scheduledAt ?? undefined,
    createdAt: d.createdAt,
  };
}
