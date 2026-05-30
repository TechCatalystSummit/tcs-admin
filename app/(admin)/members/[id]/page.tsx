import { PlaceholderPage } from "@/shared/components/layout/PlaceholderPage";

export default function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <MemberDetail params={params} />
  );
}

async function MemberDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlaceholderPage title={`Member ${id}`} subtitle="Member profile and admin notes" />;
}
