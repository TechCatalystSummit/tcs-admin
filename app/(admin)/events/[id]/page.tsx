import EventDetailPage from "@/features/events/pages/EventDetailPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <EventDetailPage eventId={id} />;
}
