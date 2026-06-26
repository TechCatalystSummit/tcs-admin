export type VideoStatus = "active" | "inactive";

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  youtubeInput: string;
  thumbnailUrl: string;
  description: string;
  seriesLabel: string;
  speakerLabel: string;
  durationLabel: string;
  viewsLabel: string;
  sortOrder: number;
  status: VideoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface VideoFilters {
  search: string;
  status: string;
}
