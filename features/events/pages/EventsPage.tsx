import Link from "next/link";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { EventFilters } from "../components/EventFilters";
import { EventsTable } from "../components/EventsTable";

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Manage summit events and RSVPs"
        action={
          <Link href="/events/new">
            <GradientButton>Create Event</GradientButton>
          </Link>
        }
      />
      <EventFilters />
      <EventsTable />
    </>
  );
}
