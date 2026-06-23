import type { IntroReason, IntroRequest, IntroStatus } from "../types";

export interface ApiIntro {
  id: string;
  from_user_id: string;
  to_user_id: string;
  reason: string;
  message?: string | null;
  status: string;
  outcome?: string | null;
  admin_note?: string | null;
  created_at: string;
  updated_at?: string;
  from?: {
    id: string;
    name: string;
    title?: string;
    company?: string;
  };
  to?: {
    id: string;
    name: string;
    title?: string;
    company?: string;
  };
}

const REASON_MAP: Record<string, IntroReason> = {
  partnership: "partnership",
  investment: "investment",
  mentorship: "mentorship",
  hiring: "hiring",
  vendor_opportunity: "partnership",
  sponsorship: "partnership",
  dinner_meeting: "other",
  general_connection: "other",
};

const STATUS_MAP: Record<string, IntroStatus> = {
  pending: "pending",
  approved: "approved",
  declined: "declined",
  completed: "completed",
  follow_up_needed: "follow_up",
};

export function mapApiIntro(row: ApiIntro): IntroRequest {
  return {
    id: row.id,
    fromMember: {
      id: row.from?.id ?? row.from_user_id,
      name: row.from?.name ?? "Unknown",
      company: row.from?.company ?? "",
      title: row.from?.title ?? "",
    },
    toMember: {
      id: row.to?.id ?? row.to_user_id,
      name: row.to?.name ?? "Unknown",
      company: row.to?.company ?? "",
      title: row.to?.title ?? "",
    },
    reason: REASON_MAP[row.reason] ?? "other",
    reasonDetail: row.message ?? "",
    status: STATUS_MAP[row.status] ?? "pending",
    requestedAt: row.created_at,
    outcome: row.outcome ?? undefined,
    adminNotes: row.admin_note ?? undefined,
  };
}
