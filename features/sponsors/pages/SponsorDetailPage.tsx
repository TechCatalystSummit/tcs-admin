"use client";

import { EmptyState, PageHeader } from "@/shared/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { formatDate } from "@/shared/utils/formatters";
import { useRouter } from "next/navigation";
import { useSponsor } from "../api/queries";
import { SponsorKPIRow } from "../components/SponsorKPIRow";
import { SponsorLeadsPanel } from "../components/SponsorLeadsPanel";
import { SponsorStatusBadge, SponsorTierBadge } from "../components/SponsorStatusBadge";

export default function SponsorDetailPage({ sponsorId }: { sponsorId: string }) {
  const router = useRouter();
  const { data: sponsor, isLoading } = useSponsor(sponsorId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!sponsor) {
    return (
      <>
        <PageHeader title="Sponsor Not Found" subtitle={`No sponsor with ID ${sponsorId}`} />
        <EmptyState
          title="Sponsor not found"
          description="This sponsor may have been removed or the link is incorrect."
          actionLabel="Back to Sponsors"
          onAction={() => router.push("/sponsors")}
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={sponsor.name}
        subtitle={`${sponsor.industry} · ${sponsor.contactEmail || sponsor.website}`}
        action={
          <div className="flex items-center gap-2">
            <SponsorTierBadge tier={sponsor.tier} />
            <SponsorStatusBadge status={sponsor.status} />
          </div>
        }
      />

      <SponsorKPIRow sponsor={sponsor} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <SectionLabel>Profile</SectionLabel>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted">{sponsor.description}</p>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Website</dt>
                <dd className="mt-1 text-blue1">{sponsor.website}</dd>
              </div>
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Since</dt>
                <dd className="mt-1">{formatDate(sponsor.createdAt)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <SectionLabel className="mb-3">Leads</SectionLabel>
      <SponsorLeadsPanel leads={sponsor.leads} />
    </>
  );
}
