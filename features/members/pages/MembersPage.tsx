"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { MemberDetailSheet } from "../components/MemberDetailSheet";
import { MemberFilters } from "../components/MemberFilters";
import { MembersTable } from "../components/MembersTable";
import { useMembersStore } from "../store/useMembersStore";

const exportColumns = [
  { key: "name" as const, header: "Name" },
  { key: "email" as const, header: "Email" },
  { key: "company" as const, header: "Company" },
  { key: "role" as const, header: "Role" },
  { key: "city" as const, header: "City" },
  { key: "tier" as const, header: "Tier" },
  { key: "status" as const, header: "Status" },
  { key: "joinedAt" as const, header: "Joined" },
];

export default function MembersPage() {
  useMembersStore((s) => s.filters);
  useMembersStore((s) => s.members);
  const getFilteredMembers = useMembersStore((s) => s.getFilteredMembers);
  const filteredMembers = getFilteredMembers();

  return (
    <>
      <PageHeader
        title="Members"
        subtitle="Manage all platform members"
        action={
          <ExportButton
            data={filteredMembers}
            filename="tcs-members"
            columns={exportColumns}
          />
        }
      />
      <MemberFilters />
      <MembersTable />
      <MemberDetailSheet />
    </>
  );
}
