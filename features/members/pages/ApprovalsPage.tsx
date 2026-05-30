"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { ApprovalCard } from "../components/ApprovalCard";
import { ApprovalFilterTabs } from "../components/ApprovalFilterTabs";
import { useMembersStore } from "../store/useMembersStore";

export default function ApprovalsPage() {
  const getFilteredApprovals = useMembersStore((s) => s.getFilteredApprovals);
  const approvals = getFilteredApprovals();

  return (
    <>
      <PageHeader
        title="Member Approvals"
        subtitle="Review pending membership applications"
      />
      <div className="mb-6">
        <ApprovalFilterTabs />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {approvals.map((approval) => (
          <ApprovalCard key={approval.id} approval={approval} />
        ))}
      </div>
    </>
  );
}
