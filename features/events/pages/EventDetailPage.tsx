"use client";

import { EmptyState, PageHeader } from "@/shared/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Spinner } from "@/shared/components/ui/SectionLabel";
import { formatDate } from "@/shared/utils/formatters";
import { useRouter } from "next/navigation";
import { AttendeeTable } from "../components/AttendeeTable";
import { EventQRCard } from "../components/EventQRCard";
import { EventSpeakers } from "../components/EventSpeakers";
import { EventStatsRow } from "../components/EventStatsRow";
import { EventStatusBadge } from "../components/EventStatusBadge";
import { useEvent } from "../api/queries";

export default function EventDetailPage({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { data: event, isLoading } = useEvent(eventId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!event) {
    return (
      <>
        <PageHeader title="Event Not Found" subtitle={`No event with ID ${eventId}`} />
        <EmptyState
          title="Event not found"
          description="This event may have been removed or the link is incorrect."
          actionLabel="Back to Events"
          onAction={() => router.push("/events")}
        />
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={event.title}
        subtitle={`${formatDate(event.startDate)} · ${event.location}`}
        action={<EventStatusBadge status={event.status} />}
      />

      <EventStatsRow event={event} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <SectionLabel>Event Details</SectionLabel>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted">{event.description}</p>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Type</dt>
                <dd className="capitalize mt-1">{event.type}</dd>
              </div>
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Venue</dt>
                <dd className="mt-1">{event.venue}</dd>
              </div>
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Dates</dt>
                <dd className="mt-1">
                  {formatDate(event.startDate)}
                  {event.endDate !== event.startDate && ` – ${formatDate(event.endDate)}`}
                </dd>
              </div>
              <div>
                <dt className="text-hint text-xs uppercase tracking-wider">Capacity</dt>
                <dd className="mt-1">{event.capacity}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-start-3">
          <EventQRCard eventId={event.id} eventTitle={event.title} />
          <EventSpeakers speakers={event.speakers} />
        </div>
      </div>

      <SectionLabel className="mb-3">Attendees</SectionLabel>
      <AttendeeTable attendees={event.attendees} />
    </>
  );
}
