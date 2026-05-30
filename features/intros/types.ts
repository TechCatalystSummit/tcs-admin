export type IntroStatus = "pending" | "approved" | "declined" | "completed" | "follow_up";

export type IntroReason =
  | "investment"
  | "partnership"
  | "mentorship"
  | "hiring"
  | "customer-intro"
  | "advisory"
  | "other";

export interface IntroMember {
  id: string;
  name: string;
  company: string;
  title: string;
}

export interface IntroRequest {
  id: string;
  fromMember: IntroMember;
  toMember: IntroMember;
  reason: IntroReason;
  reasonDetail: string;
  status: IntroStatus;
  requestedAt: string;
  outcome?: string;
  adminNotes?: string;
  assignedTo?: string;
  completedAt?: string;
}

export interface IntroFilters {
  status: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}

export interface CreateIntroInput {
  fromMemberId: string;
  toMemberId: string;
  reason: IntroReason;
  reasonDetail: string;
}

export const INTRO_REASON_LABELS: Record<IntroReason, string> = {
  investment: "Investment",
  partnership: "Partnership",
  mentorship: "Mentorship",
  hiring: "Hiring",
  "customer-intro": "Customer Intro",
  advisory: "Advisory",
  other: "Other",
};
