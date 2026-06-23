"use client";

import { useMemo } from "react";
import { usePendingMembers } from "../api/queries";
import { useMembersStore } from "../store/useMembersStore";

export function useFilteredApprovals() {
  const { data, isLoading, isError, error, refetch } = usePendingMembers();
  const filterApprovals = useMembersStore((s) => s.filterApprovals);
  const approvalTab = useMembersStore((s) => s.approvalTab);

  const approvals = useMemo(
    () => filterApprovals(data?.approvals ?? []),
    [data?.approvals, filterApprovals, approvalTab],
  );

  return { approvals, isLoading, isError, error, refetch, meta: data?.meta };
}
