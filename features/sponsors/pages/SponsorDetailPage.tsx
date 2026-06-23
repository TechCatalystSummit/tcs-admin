"use client";

import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { EmptyState, PageHeader } from "@/shared/components/layout/PageHeader";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { formatDate } from "@/shared/utils/formatters";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDeleteSponsor } from "../api/mutations";
import { useSponsor, useSponsorOffers } from "../api/queries";
import { SponsorFormModal } from "../components/SponsorFormModal";
import { SponsorKPIRow } from "../components/SponsorKPIRow";
import { SponsorLeadsPanel } from "../components/SponsorLeadsPanel";
import { SponsorStatusBadge, SponsorTierBadge } from "../components/SponsorStatusBadge";

export default function SponsorDetailPage({ sponsorId }: { sponsorId: string }) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const { data: sponsor, isLoading, isError, error, refetch } = useSponsor(sponsorId);
  const {
    data: offers = [],
    isLoading: offersLoading,
    isError: offersError,
    error: offersErr,
    refetch: refetchOffers,
  } = useSponsorOffers(sponsorId);
  const deleteSponsor = useDeleteSponsor();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <PageHeader title="Sponsor" subtitle="Could not load sponsor" />
        <QueryErrorState error={error} onRetry={() => void refetch()} />
      </>
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

  const handleDeactivate = () => {
    if (!window.confirm(`Deactivate ${sponsor.name}?`)) return;
    deleteSponsor.mutate(sponsorId, {
      onSuccess: () => router.replace("/sponsors"),
    });
  };

  return (
    <>
      <PageHeader
        title={sponsor.name}
        subtitle={`${sponsor.industry} · ${sponsor.contactEmail || sponsor.website}`}
        action={
          <div className="flex flex-wrap items-center gap-2">
            <SponsorTierBadge tier={sponsor.tier} />
            <SponsorStatusBadge status={sponsor.status} />
            <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeactivate}
              disabled={deleteSponsor.isPending}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Deactivate
            </Button>
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

      <SectionLabel className="mb-3">Offers</SectionLabel>
      {offersLoading ? (
        <div className="flex justify-center py-4 mb-6">
          <Spinner className="h-5 w-5" />
        </div>
      ) : offersError ? (
        <QueryErrorState
          error={offersErr}
          onRetry={() => void refetchOffers()}
          title="Couldn't load offers"
          className="mb-6"
        />
      ) : offers.length === 0 ? (
        <p className="text-sm text-muted mb-6">No active offers for this sponsor.</p>
      ) : (
        <ul className="mb-6 space-y-2">
          {offers.map((offer) => (
            <li key={offer.id} className="rounded-xl border border-border bg-white px-4 py-3 text-sm">
              <p className="font-medium text-ink">{offer.title}</p>
              {offer.description ? <p className="text-muted mt-1">{offer.description}</p> : null}
            </li>
          ))}
        </ul>
      )}

      <SectionLabel className="mb-3">Leads</SectionLabel>
      <SponsorLeadsPanel leads={sponsor.leads} />

      <SponsorFormModal
        mode="edit"
        sponsorId={sponsorId}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </>
  );
}
