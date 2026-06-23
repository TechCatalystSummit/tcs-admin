import { apiFetch } from "@/shared/lib/api/client";
import { getErrorMessage } from "@/shared/lib/api/errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formToCreateBody } from "./mappers";
import { eventKeys } from "./queries";
import type { EventFormData } from "../types";

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: EventFormData) => {
      const { data: created } = await apiFetch("/api/events", {
        method: "POST",
        body: formToCreateBody(data),
      });
      return created;
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: eventKeys.all });
      toast.success("Event created");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/events/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: eventKeys.all });
      toast.success("Event deleted");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}

export function useUpdateEventStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiFetch(`/api/events/${id}`, { method: "PATCH", body: { status } });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: eventKeys.all });
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
}
