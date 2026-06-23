import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { mapApiAttendee, mapApiEvent } from "./mappers";
import type { ApiEvent, ApiEventAttendee } from "./mappers";

export const eventKeys = {
  all: ["events"] as const,
  admin: (params?: Record<string, string | number>) => [...eventKeys.all, "admin", params] as const,
  detail: (id: string) => [...eventKeys.all, "detail", id] as const,
  attendees: (id: string) => [...eventKeys.all, "attendees", id] as const,
};

export function useAdminEvents(params?: { status?: string; page?: number }) {
  return useQuery({
    queryKey: eventKeys.admin(params),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiEvent[]>("/api/events/admin", {
        params: { page: params?.page ?? 1, perPage: 100, status: params?.status },
      });
      return { events: data.map(mapApiEvent), meta };
    },
  });
}

export function useEvent(id: string | null | undefined) {
  return useQuery({
    queryKey: eventKeys.detail(id ?? ""),
    queryFn: async () => {
      const { data } = await apiFetch<ApiEvent>(`/api/events/${id}`);
      return mapApiEvent(data);
    },
    enabled: Boolean(id),
  });
}

export function useEventAttendees(eventId: string | null | undefined) {
  return useQuery({
    queryKey: eventKeys.attendees(eventId ?? ""),
    queryFn: async () => {
      const { data, meta } = await apiFetch<ApiEventAttendee[]>(
        `/api/events/${eventId}/attendees`,
        { params: { page: 1, perPage: 100 } },
      );
      return { attendees: data.map(mapApiAttendee), meta };
    },
    enabled: Boolean(eventId),
  });
}
