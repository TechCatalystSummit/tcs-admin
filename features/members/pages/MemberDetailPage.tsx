import { PageHeader } from "@/shared/components/layout/PageHeader";
import { AdminNotesPanel, MemberProfilePanel } from "../components/MemberProfilePanel";

export default function MemberDetailPage({ memberId }: { memberId: string }) {
  return (
    <>
      <PageHeader title="Member Profile" subtitle={`ID: ${memberId}`} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MemberProfilePanel memberId={memberId} />
        </div>
        <div>
          <AdminNotesPanel memberId={memberId} />
        </div>
      </div>
    </>
  );
}
