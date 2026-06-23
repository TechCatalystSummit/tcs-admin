"use client";

import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { formatCurrency } from "@/shared/utils/formatters";
import { useMembershipTiers } from "../api/tiers";

export function TierPricingTable() {
  const { data, isLoading } = useMembershipTiers();
  const rows = data?.rows ?? [];
  const fromApi = data?.fromApi ?? false;
  const apiFailed = data?.apiFailed ?? false;

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Membership tiers & pricing</SectionLabel>
      </CardHeader>
      <CardContent>
        {apiFailed ? (
          <div className="mb-4">
            <QueryErrorState
              error={data?.error}
              title="Couldn't load live tier pricing"
            />
            <p className="text-xs text-hint mt-2 text-center">Showing local tier defaults below.</p>
          </div>
        ) : null}
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner className="h-6 w-6" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-hint">
                    Tier
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-hint">
                    Monthly
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-hint">
                    Annual
                  </th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-hint">
                    Key features
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((tier) => (
                  <tr key={tier.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{tier.label}</td>
                    <td className="px-4 py-3">
                      {tier.monthly === 0 ? "Free" : formatCurrency(tier.monthly)}
                    </td>
                    <td className="px-4 py-3">
                      {tier.annual === 0 ? "—" : formatCurrency(tier.annual)}
                    </td>
                    <td className="px-4 py-3 text-muted">{tier.features.join(" · ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-xs text-hint mt-3">
          {fromApi ? "Live from GET /api/membership/tiers" : "Using local tier defaults"}
        </p>
      </CardContent>
    </Card>
  );
}
