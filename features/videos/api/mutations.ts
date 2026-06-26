import { apiFetch } from "@/shared/lib/api/client";
import { showMutationError } from "@/shared/lib/api/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { videoFormToCreateBody, videoFormToPatchBody } from "./mappers";
import type { VideoStatus } from "../types";
import { videoKeys } from "./queries";

export interface VideoFormInput {
  title: string;
  youtubeInput: string;
  thumbnailUrl?: string;
  description?: string;
  seriesLabel?: string;
  speakerLabel?: string;
  durationLabel?: string;
  viewsLabel?: string;
  sortOrder?: number;
  status?: VideoStatus;
}

export function useCreateVideo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: VideoFormInput) => {
      await apiFetch("/api/videos", {
        method: "POST",
        body: videoFormToCreateBody(data),
      });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: videoKeys.all });
      toast.success("Video created");
    },
    onError: showMutationError,
  });
}

export function useUpdateVideo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...data }: VideoFormInput & { id: string }) => {
      await apiFetch(`/api/videos/${id}`, {
        method: "PATCH",
        body: videoFormToPatchBody(data),
      });
    },
    onSuccess: (_d, { id }) => {
      void qc.invalidateQueries({ queryKey: videoKeys.all });
      void qc.invalidateQueries({ queryKey: videoKeys.detail(id) });
      toast.success("Video updated");
    },
    onError: showMutationError,
  });
}

export function useDeleteVideo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await apiFetch(`/api/videos/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: videoKeys.all });
      toast.success("Video deleted");
    },
    onError: showMutationError,
  });
}

export function useToggleVideoActive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      await apiFetch(`/api/videos/${id}`, {
        method: "PATCH",
        body: { isActive },
      });
    },
    onSuccess: (_d, { id }) => {
      void qc.invalidateQueries({ queryKey: videoKeys.all });
      void qc.invalidateQueries({ queryKey: videoKeys.detail(id) });
      toast.success("Video status updated");
    },
    onError: showMutationError,
  });
}
