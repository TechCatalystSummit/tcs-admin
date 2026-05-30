import { PlaceholderPage } from "@/shared/components/layout/PlaceholderPage";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <EventDetail params={params} />;
}

async function EventDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlaceholderPage title={`Event ${id}`} subtitle="Event details, attendees, and check-ins" />;
}
