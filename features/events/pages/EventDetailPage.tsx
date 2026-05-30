"use client";

import { EmptyState, PageHeader } from "@/shared/components/layout/PageHeader";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { formatDate } from "@/shared/utils/formatters";
import { useRouter } from "next/navigation";
import { AttendeeTable } from "../components/AttendeeTable";
import { EventStatsRow } from "../components/EventStatsRow";
import { EventStatusBadge } from "../components/EventStatusBadge";
import { useEventsStore } from "../store/useEventsStore";

export default function EventDetailPage({ eventId }: { eventId: string }) {
  const router = useRouter();
  const event = useEventsStore((s) => s.getEventById(eventId));

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
            {event.sponsors.length > 0 && (
              <div>
                <p className="text-hint text-xs uppercase tracking-wider mb-2">Sponsors</p>
                <div className="flex flex-wrap gap-2">
                  {event.sponsors.map((s) => (
                    <span key={s} className="text-xs bg-surf border border-border rounded-full px-3 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <SectionLabel>Agenda</SectionLabel>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {event.agenda.map((item) => (
                <li key={item.id} className="flex gap-3 text-sm">
                  <span className="text-hint font-mono text-xs w-12 shrink-0">{item.time}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {event.recap && (
        <Card className="mb-6">
          <CardHeader>
            <SectionLabel>Post-Event Recap</SectionLabel>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{event.recap}</p>
          </CardContent>
        </Card>
      )}

      <SectionLabel className="mb-3">Attendees</SectionLabel>
      <AttendeeTable attendees={event.attendees} />
    </>
  );
}
