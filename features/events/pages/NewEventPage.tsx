"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useRouter } from "next/navigation";
import { EventForm } from "../components/EventForm";
import { useEventsStore } from "../store/useEventsStore";
import type { EventFormData } from "../types";

export default function NewEventPage() {
  const router = useRouter();
  const addEvent = useEventsStore((s) => s.addEvent);

  const handleSubmit = (data: EventFormData) => {
    const event = addEvent(data);
    router.push(`/events/${event.id}`);
  };

  return (
    <>
      <PageHeader title="Create Event" subtitle="Set up a new summit event" />
      <div className="max-w-2xl">
        <EventForm onSubmit={handleSubmit} onCancel={() => router.push("/events")} />
      </div>
    </>
  );
}
