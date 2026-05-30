import { PlaceholderPage } from "@/shared/components/layout/PlaceholderPage";

export default function SponsorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <SponsorDetail params={params} />;
}

async function SponsorDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlaceholderPage title={`Sponsor ${id}`} subtitle="Sponsor profile, leads, and performance" />;
}
