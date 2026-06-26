"use client";

import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { cn } from "@/shared/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateVideo, useUpdateVideo } from "../api/mutations";
import { useVideo } from "../api/queries";
import type { VideoStatus } from "../types";

const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  youtubeInput: z.string().min(1, "YouTube URL or ID is required"),
  thumbnailUrl: z.string().optional(),
  description: z.string().optional(),
  seriesLabel: z.string().optional(),
  speakerLabel: z.string().optional(),
  durationLabel: z.string().optional(),
  viewsLabel: z.string().optional(),
  sortOrder: z.number().int().min(0),
  status: z.enum(["active", "inactive"]).optional(),
});

type VideoFormValues = z.infer<typeof videoSchema>;

interface VideoFormModalProps {
  mode: "create" | "edit";
  videoId?: string | null;
  open: boolean;
  onClose: () => void;
}

export function VideoFormModal({ mode, videoId, open, onClose }: VideoFormModalProps) {
  const { data: video } = useVideo(mode === "edit" ? videoId : null);
  const createVideo = useCreateVideo();
  const updateVideo = useUpdateVideo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    values:
      mode === "edit" && video
        ? {
            title: video.title,
            youtubeInput: video.youtubeId,
            thumbnailUrl: video.thumbnailUrl,
            description: video.description,
            seriesLabel: video.seriesLabel,
            speakerLabel: video.speakerLabel,
            durationLabel: video.durationLabel,
            viewsLabel: video.viewsLabel,
            sortOrder: video.sortOrder,
            status: video.status,
          }
        : {
            title: "",
            youtubeInput: "",
            thumbnailUrl: "",
            description: "",
            seriesLabel: "",
            speakerLabel: "",
            durationLabel: "",
            viewsLabel: "",
            sortOrder: 0,
            status: "active",
          },
  });

  const onSubmit = (data: VideoFormValues) => {
    const payload = {
      title: data.title,
      youtubeInput: data.youtubeInput,
      thumbnailUrl: data.thumbnailUrl,
      description: data.description,
      seriesLabel: data.seriesLabel,
      speakerLabel: data.speakerLabel,
      durationLabel: data.durationLabel,
      viewsLabel: data.viewsLabel,
      sortOrder: data.sortOrder,
      status: data.status as VideoStatus | undefined,
    };

    if (mode === "create") {
      createVideo.mutate(payload, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
      return;
    }

    if (!videoId) return;
    updateVideo.mutate(
      { id: videoId, ...payload },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      },
    );
  };

  const isPending = createVideo.isPending || updateVideo.isPending;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add video" : "Edit video"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Title" {...register("title")} error={errors.title?.message} required />
          <Input
            label="YouTube URL or ID"
            {...register("youtubeInput")}
            error={errors.youtubeInput?.message}
            placeholder="https://youtube.com/watch?v=… or dQw4w9WgXcQ"
            required
          />
          <Input
            label="Thumbnail URL"
            {...register("thumbnailUrl")}
            placeholder="Optional — auto-derived from YouTube if empty"
          />
          <Textarea label="Description" {...register("description")} rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Series label" {...register("seriesLabel")} placeholder="TCS Summit 2025" />
            <Input label="Speaker label" {...register("speakerLabel")} placeholder="Keynote · Main Stage" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Duration" {...register("durationLabel")} placeholder="18:42" />
            <Input label="Views label" {...register("viewsLabel")} placeholder="12.4K views" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sort order"
              type="number"
              min={0}
              {...register("sortOrder")}
            />
            {mode === "edit" ? (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink2">Status</label>
                <select
                  {...register("status")}
                  className={cn(
                    "flex h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink",
                    "focus:outline-none focus:ring-2 focus:ring-blue1/20 focus:border-blue1",
                  )}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            ) : null}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {mode === "create" ? "Create video" : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
