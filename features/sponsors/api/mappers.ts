import type { Sponsor, SponsorStatus, SponsorTier } from "../types";

export interface ApiSponsor {
  id: string;
  name: string;
  logoUrl?: string | null;
  website?: string | null;
  description?: string | null;
  industry?: string | null;
  tier?: string | null;
  isActive?: boolean;
  createdAt?: string;
}

export function mapApiSponsor(s: ApiSponsor): Sponsor {
  const tierMap: Record<string, SponsorTier> = {
    premium: "platinum",
    platinum: "platinum",
    gold: "gold",
    silver: "silver",
    bronze: "bronze",
    partner: "partner",
  };

  const initials = s.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return {
    id: s.id,
    name: s.name,
    logoInitials: initials,
    tier: tierMap[s.tier ?? "partner"] ?? "partner",
    status: (s.isActive === false ? "inactive" : "active") as SponsorStatus,
    website: s.website ?? "",
    industry: s.industry ?? "",
    description: s.description ?? "",
    contactEmail: "",
    contactPhone: "",
    eventsSponsored: [],
    qrScans: 0,
    leadsCount: 0,
    pipelineValue: 0,
    engagementRate: 0,
    offers: [],
    leads: [],
    users: [],
    createdAt: s.createdAt ?? new Date().toISOString(),
  };
}
