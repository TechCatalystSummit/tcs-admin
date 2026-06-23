"use client";

import { useMemo } from "react";
import { useMembersList } from "../api/queries";
import { useMembersStore } from "../store/useMembersStore";

export function useFilteredMembers() {
  const { data, isLoading, error } = useMembersList();
  const filterMembers = useMembersStore((s) => s.filterMembers);
  const filters = useMembersStore((s) => s.filters);

  const members = useMemo(
    () => filterMembers(data?.members ?? []),
    [data?.members, filterMembers, filters],
  );

  return { members, isLoading, error, meta: data?.meta };
}
