import type { Video, VideoStatus } from "../types";

export interface ApiVideo {
  id: string;
  title: string;
  youtubeId: string;
  thumbnailUrl?: string | null;
  description?: string | null;
  seriesLabel?: string | null;
  speakerLabel?: string | null;
  durationLabel?: string | null;
  viewsLabel?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export function mapApiVideo(v: ApiVideo): Video {
  return {
    id: v.id,
    title: v.title,
    youtubeId: v.youtubeId,
    youtubeInput: v.youtubeId,
    thumbnailUrl: v.thumbnailUrl ?? "",
    description: v.description ?? "",
    seriesLabel: v.seriesLabel ?? "",
    speakerLabel: v.speakerLabel ?? "",
    durationLabel: v.durationLabel ?? "",
    viewsLabel: v.viewsLabel ?? "",
    sortOrder: v.sortOrder ?? 0,
    status: (v.isActive === false ? "inactive" : "active") as VideoStatus,
    createdAt: v.createdAt ?? new Date().toISOString(),
    updatedAt: v.updatedAt ?? new Date().toISOString(),
  };
}

function youtubeBody(input: string) {
  const trimmed = input.trim();
  if (trimmed.startsWith("http")) return { youtubeUrl: trimmed };
  return { youtubeId: trimmed };
}

export function videoFormToCreateBody(data: {
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
}) {
  return {
    title: data.title,
    ...youtubeBody(data.youtubeInput),
    thumbnailUrl: data.thumbnailUrl || undefined,
    description: data.description || undefined,
    seriesLabel: data.seriesLabel || undefined,
    speakerLabel: data.speakerLabel || undefined,
    durationLabel: data.durationLabel || undefined,
    viewsLabel: data.viewsLabel || undefined,
    sortOrder: data.sortOrder ?? 0,
    isActive: data.status !== "inactive",
  };
}

export function videoFormToPatchBody(data: {
  title?: string;
  youtubeInput?: string;
  thumbnailUrl?: string;
  description?: string;
  seriesLabel?: string;
  speakerLabel?: string;
  durationLabel?: string;
  viewsLabel?: string;
  sortOrder?: number;
  status?: VideoStatus;
}) {
  const body: Record<string, unknown> = {};
  if (data.title !== undefined) body.title = data.title;
  if (data.youtubeInput !== undefined) Object.assign(body, youtubeBody(data.youtubeInput));
  if (data.thumbnailUrl !== undefined) body.thumbnailUrl = data.thumbnailUrl || null;
  if (data.description !== undefined) body.description = data.description || null;
  if (data.seriesLabel !== undefined) body.seriesLabel = data.seriesLabel || null;
  if (data.speakerLabel !== undefined) body.speakerLabel = data.speakerLabel || null;
  if (data.durationLabel !== undefined) body.durationLabel = data.durationLabel || null;
  if (data.viewsLabel !== undefined) body.viewsLabel = data.viewsLabel || null;
  if (data.sortOrder !== undefined) body.sortOrder = data.sortOrder;
  if (data.status !== undefined) body.isActive = data.status === "active";
  return body;
}
