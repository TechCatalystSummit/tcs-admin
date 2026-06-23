"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { useRouter } from "next/navigation";
import { EventForm } from "../components/EventForm";
import { useCreateEvent } from "../api/mutations";
import type { EventFormData } from "../types";

export default function NewEventPage() {
  const router = useRouter();
  const createEvent = useCreateEvent();

  const handleSubmit = (data: EventFormData) => {
    createEvent.mutate(data, {
      onSuccess: (created) => {
        const id = (created as { id?: string })?.id;
        router.push(id ? `/events/${id}` : "/events");
      },
    });
  };

  return (
    <>
      <PageHeader title="Create Event" subtitle="Set up a new summit event" />
      <div className="max-w-3xl">
        <EventForm onSubmit={handleSubmit} onCancel={() => router.push("/events")} />
      </div>
    </>
  );
}
