export type SponsorTier = "platinum" | "gold" | "silver" | "bronze" | "partner";
export type SponsorStatus = "active" | "inactive" | "pending";

export interface SponsorLead {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  status: "new" | "contacted" | "qualified" | "converted";
  source: string;
  capturedAt: string;
}

export interface SponsorOffer {
  id: string;
  title: string;
  description: string;
  perk: string;
  active: boolean;
  expiresAt?: string;
}

export interface SponsorUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "viewer";
}

export interface Sponsor {
  id: string;
  name: string;
  logoInitials: string;
  logoUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  tier: SponsorTier;
  status: SponsorStatus;
  website: string;
  industry: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  eventsSponsored: string[];
  qrScans: number;
  leadsCount: number;
  pipelineValue: number;
  engagementRate: number;
  offers: SponsorOffer[];
  leads: SponsorLead[];
  users: SponsorUser[];
  createdAt: string;
}

export interface SponsorFilters {
  tier: string;
  status: string;
  search: string;
}
