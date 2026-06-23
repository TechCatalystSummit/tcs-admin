"use client";

import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";
import { useRouter } from "next/navigation";
import { useDeleteEvent, useUpdateEventStatus } from "../api/mutations";
import { EventStatusBadge } from "./EventStatusBadge";
import type { EventStatus } from "../types";

const STATUS_OPTIONS: { value: EventStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "live", label: "Live" },
  { value: "past", label: "Past" },
];

interface EventDetailActionsProps {
  eventId: string;
  status: EventStatus;
}

export function EventDetailActions({ eventId, status }: EventDetailActionsProps) {
  const router = useRouter();
  const updateStatus = useUpdateEventStatus();
  const deleteEvent = useDeleteEvent();

  const handleStatusChange = (next: EventStatus) => {
    if (next === status) return;
    updateStatus.mutate({ id: eventId, status: next });
  };

  const handleDelete = () => {
    if (!window.confirm("Delete this event? This cannot be undone.")) return;
    deleteEvent.mutate(eventId, {
      onSuccess: () => router.replace("/events"),
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <EventStatusBadge status={status} />
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value as EventStatus)}
        disabled={updateStatus.isPending}
        className={cn(
          "h-9 rounded-lg border border-border bg-white px-3 text-sm text-ink",
          "focus:outline-none focus:ring-2 focus:ring-blue1/20 focus:border-blue1",
        )}
        aria-label="Event status"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDelete}
        disabled={deleteEvent.isPending}
        className="text-red-600 border-red-200 hover:bg-red-50"
      >
        Delete
      </Button>
    </div>
  );
}
