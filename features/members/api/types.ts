export interface ApiMembership {
  id: string;
  status: string;
  currentPeriodStart?: string | null;
  currentPeriodEnd?: string | null;
  tier?: {
    id: string;
    name: string;
    annualPrice?: number;
  } | null;
}

export interface ApiProfile {
  id: string;
  role: string;
  name: string;
  email?: string;
  phone?: string | null;
  title?: string | null;
  company?: string | null;
  city?: string | null;
  bio?: string | null;
  photoUrl?: string | null;
  linkedinUrl?: string | null;
  roleCategory?: string | null;
  industries?: string[];
  lookingFor?: string[];
  canOffer?: string[];
  isVerified?: boolean;
  isApproved?: boolean;
  approvalNotes?: string | null;
  createdAt?: string;
  updatedAt?: string;
  membership?: ApiMembership | null;
  tier?: string;
}

export interface MemberListParams {
  page?: number;
  perPage?: number;
  search?: string;
  city?: string;
}
