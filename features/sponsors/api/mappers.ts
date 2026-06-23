import type { Sponsor, SponsorStatus, SponsorTier } from "../types";

export type ApiSponsorTier = "standard" | "premium" | "title" | "legacy";

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
    title: "gold",
    gold: "gold",
    standard: "silver",
    silver: "silver",
    bronze: "bronze",
    partner: "partner",
    legacy: "partner",
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

const uiToApiTier: Record<SponsorTier, ApiSponsorTier> = {
  platinum: "premium",
  gold: "title",
  silver: "standard",
  bronze: "standard",
  partner: "standard",
};

const apiToUiTier: Record<string, SponsorTier> = {
  premium: "platinum",
  title: "gold",
  standard: "silver",
  legacy: "partner",
};

export function sponsorTierToApi(tier: SponsorTier): ApiSponsorTier {
  return uiToApiTier[tier] ?? "standard";
}

export function apiTierToSponsorTier(tier?: string | null): SponsorTier {
  return apiToUiTier[tier ?? "standard"] ?? "partner";
}

export function sponsorFormToCreateBody(data: {
  name: string;
  website?: string;
  industry?: string;
  tier: SponsorTier;
  description?: string;
  logoUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}) {
  return {
    name: data.name,
    website: data.website || undefined,
    industry: data.industry || undefined,
    tier: sponsorTierToApi(data.tier),
    description: data.description || undefined,
    logoUrl: data.logoUrl || undefined,
    ctaLabel: data.ctaLabel || undefined,
    ctaUrl: data.ctaUrl || undefined,
  };
}

export function sponsorFormToPatchBody(data: {
  name?: string;
  website?: string;
  industry?: string;
  tier?: SponsorTier;
  description?: string;
  status?: SponsorStatus;
  logoUrl?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}) {
  const body: Record<string, unknown> = {};
  if (data.name !== undefined) body.name = data.name;
  if (data.website !== undefined) body.website = data.website;
  if (data.industry !== undefined) body.industry = data.industry;
  if (data.tier !== undefined) body.tier = sponsorTierToApi(data.tier);
  if (data.description !== undefined) body.description = data.description;
  if (data.status !== undefined) body.isActive = data.status === "active";
  if (data.logoUrl !== undefined) body.logoUrl = data.logoUrl;
  if (data.ctaLabel !== undefined) body.ctaLabel = data.ctaLabel;
  if (data.ctaUrl !== undefined) body.ctaUrl = data.ctaUrl;
  return body;
}
