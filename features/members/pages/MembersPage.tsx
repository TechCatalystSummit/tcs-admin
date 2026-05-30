import { PageHeader } from "@/shared/components/layout/PageHeader";
import { MemberFilters } from "../components/MemberFilters";
import { MembersTable } from "../components/MembersTable";

export default function MembersPage() {
  return (
    <>
      <PageHeader
        title="Members"
        subtitle="Manage all platform members"
      />
      <MemberFilters />
      <MembersTable />
    </>
  );
}
