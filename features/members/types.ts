export type MemberStatus = "active" | "pending" | "suspended" | "declined";
export type MemberTier = "community" | "builder" | "executive" | "partner" | "legacy";

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  city: string;
  tier: MemberTier;
  role: string;
  status: MemberStatus;
  isVerified: boolean;
  photoUrl?: string;
  linkedinUrl?: string;
  bio: string;
  lookingFor: string[];
  canOffer: string[];
  joinedAt: string;
  eventsAttended: number;
  introsRequested: number;
  introsReceived: number;
  mrr: number;
  adminNotes?: string;
}

export interface ApprovalRequest {
  id: string;
  memberId: string;
  name: string;
  email: string;
  company: string;
  title: string;
  city: string;
  tier: MemberTier;
  bio: string;
  status: "pending" | "approved" | "declined";
  submittedAt: string;
}

export interface MemberFilters {
  tier: string;
  role: string;
  status: string;
  search: string;
}
