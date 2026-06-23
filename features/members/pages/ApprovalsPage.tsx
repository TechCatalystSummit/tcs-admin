"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { ApprovalCard } from "../components/ApprovalCard";
import { ApprovalFilterTabs } from "../components/ApprovalFilterTabs";
import { useFilteredApprovals } from "../hooks/useFilteredApprovals";

export default function ApprovalsPage() {
  const { approvals, isLoading } = useFilteredApprovals();

  return (
    <>
      <PageHeader
        title="Member Approvals"
        subtitle="Review pending membership applications"
      />
      <div className="mb-6">
        <ApprovalFilterTabs />
      </div>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {approvals.map((approval) => (
            <ApprovalCard key={approval.id} approval={approval} />
          ))}
        </div>
      )}
    </>
  );
}
