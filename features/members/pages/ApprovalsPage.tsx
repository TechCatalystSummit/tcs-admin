"use client";

import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { ApprovalCard } from "../components/ApprovalCard";
import { ApprovalFilterTabs } from "../components/ApprovalFilterTabs";
import { useFilteredApprovals } from "../hooks/useFilteredApprovals";

export default function ApprovalsPage() {
  const { approvals, isLoading, isError, error, refetch } = useFilteredApprovals();

  return (
    <>
      <PageHeader
        title="Member Approvals"
        subtitle="Review pending membership applications"
      />
      <div className="mb-6">
        <ApprovalFilterTabs />
      </div>
      <QueryBoundary
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => void refetch()}
        isEmpty={!isLoading && !isError && approvals.length === 0}
        emptyTitle="No pending approvals"
        emptyDescription="All membership applications have been reviewed."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {approvals.map((approval) => (
            <ApprovalCard key={approval.id} approval={approval} />
          ))}
        </div>
      </QueryBoundary>
    </>
  );
}
