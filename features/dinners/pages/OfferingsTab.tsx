"use client";

import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { useOfferingsList } from "../api/offerings-queries";
import { OfferingFormModal } from "../components/OfferingForm";
import { OfferingsTable } from "../components/OfferingsTable";
import { useDinnersStore } from "../store/useDinnersStore";

export function OfferingsTab() {
  const openOfferingForm = useDinnersStore((s) => s.openOfferingForm);
  const { data, isLoading, isError, error, refetch } = useOfferingsList();
  const offerings = data?.offerings ?? [];

  return (
    <>
      <div className="flex justify-end mb-4">
        <GradientButton onClick={() => openOfferingForm()}>New offering</GradientButton>
      </div>
      <QueryBoundary
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => void refetch()}
        isEmpty={!isLoading && !isError && offerings.length === 0}
        emptyTitle="No offerings"
        emptyDescription="Create a catalog offering for members to request."
        emptyActionLabel="New offering"
        onEmptyAction={() => openOfferingForm()}
      >
        <OfferingsTable offerings={offerings} />
      </QueryBoundary>
      <OfferingFormModal />
    </>
  );
}
