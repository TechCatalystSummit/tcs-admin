import { apiFetch } from "@/shared/lib/api/client";
import { showMutationError } from "@/shared/lib/api/handleApiError";
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
    onError: showMutationError,
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
    onError: showMutationError,
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
      toast.success("Event status updated");
    },
    onError: showMutationError,
  });
}
