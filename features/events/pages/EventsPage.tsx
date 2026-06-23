"use client";

import { ExportButton } from "@/shared/components/data-display/ExportButton";
import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import Link from "next/link";
import { EventFilters } from "../components/EventFilters";
import { EventsTable } from "../components/EventsTable";
import { useFilteredEvents } from "../hooks/useFilteredEvents";

const exportColumns = [
  { key: "title" as const, header: "Title" },
  { key: "date" as const, header: "Date" },
  { key: "type" as const, header: "Type" },
  { key: "location" as const, header: "Location" },
  { key: "rsvpCount" as const, header: "RSVPs" },
  { key: "checkedInCount" as const, header: "Checked In" },
  { key: "status" as const, header: "Status" },
];

export default function EventsPage() {
  const { events, isLoading, isError, error, refetch } = useFilteredEvents();
  const exportData = events.map((e) => ({
    title: e.title,
    date: e.startDate,
    type: e.type,
    location: e.location,
    rsvpCount: e.rsvpCount,
    checkedInCount: e.checkedInCount,
    status: e.status,
  }));

  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Manage summit events and RSVPs"
        action={
          <div className="flex items-center gap-2">
            <ExportButton data={exportData} filename="tcs-events" columns={exportColumns} />
            <Link href="/events/new">
              <GradientButton>Create Event</GradientButton>
            </Link>
          </div>
        }
      />
      <EventFilters />
      <QueryBoundary
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => void refetch()}
        isEmpty={!isLoading && !isError && events.length === 0}
        emptyTitle="No events found"
        emptyDescription="Create an event or adjust your filters."
        emptyActionLabel="Create event"
        onEmptyAction={() => {
          window.location.href = "/events/new";
        }}
      >
        <EventsTable />
      </QueryBoundary>
    </>
  );
}
