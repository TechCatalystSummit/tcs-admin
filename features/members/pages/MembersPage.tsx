"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { MemberDetailSheet } from "../components/MemberDetailSheet";
import { MemberFilters } from "../components/MemberFilters";
import { MembersTable } from "../components/MembersTable";
import { useFilteredMembers } from "../hooks/useFilteredMembers";

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
  const { members, isLoading } = useFilteredMembers();

  return (
    <>
      <PageHeader
        title="Members"
        subtitle="Manage all platform members"
        action={
          <ExportButton
            data={members}
            filename="tcs-members"
            columns={exportColumns}
          />
        }
      />
      <MemberFilters />
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner className="h-8 w-8" />
        </div>
      ) : (
        <MembersTable />
      )}
      <MemberDetailSheet />
    </>
  );
}
