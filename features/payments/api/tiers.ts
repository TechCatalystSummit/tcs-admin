import { TIERS } from "@/core/constants/tiers";
import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";

export interface ApiMembershipTier {
  id: string;
  name: string;
  annualPrice: number;
  maxIntros?: number;
  dinnerCredits?: number;
  hasDealRoom?: boolean;
  hasConcierge?: boolean;
  hasSponsorVisibility?: boolean;
  features?: string[];
  sortOrder?: number;
}

export interface TierPricingRow {
  id: string;
  label: string;
  monthly: number;
  annual: number;
  features: string[];
}

export const tierKeys = {
  all: ["membership-tiers"] as const,
};

function mapApiTier(t: ApiMembershipTier): TierPricingRow {
  const annual = (t.annualPrice ?? 0) / 100;
  const featureList = t.features?.length
    ? t.features
    : [
        t.maxIntros ? `${t.maxIntros} intros` : null,
        t.dinnerCredits ? `${t.dinnerCredits} dinner credits` : null,
        t.hasConcierge ? "Concierge" : null,
        t.hasDealRoom ? "Deal room" : null,
        t.hasSponsorVisibility ? "Sponsor visibility" : null,
      ].filter(Boolean) as string[];

  const staticTier = TIERS.find((s) => s.id === t.name);

  return {
    id: t.name,
    label: staticTier?.label ?? t.name.charAt(0).toUpperCase() + t.name.slice(1),
    monthly: annual > 0 ? Math.round(annual / 12) : 0,
    annual,
    features: featureList.length > 0 ? featureList : [...(staticTier?.features ?? [])],
  };
}

function staticTierRows(): TierPricingRow[] {
  return TIERS.map((t) => ({
    id: t.id,
    label: t.label,
    monthly: t.price,
    annual: t.annualPrice,
    features: [...t.features],
  }));
}

export function useMembershipTiers() {
  return useQuery({
    queryKey: tierKeys.all,
    queryFn: async () => {
      try {
        const { data } = await apiFetch<ApiMembershipTier[]>("/api/membership/tiers");
        if (!data?.length) return { rows: staticTierRows(), fromApi: false, apiFailed: false };
        return {
          rows: [...data]
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
            .map(mapApiTier),
          fromApi: true,
          apiFailed: false,
        };
      } catch (error) {
        return { rows: staticTierRows(), fromApi: false, apiFailed: true, error };
      }
    },
  });
}
