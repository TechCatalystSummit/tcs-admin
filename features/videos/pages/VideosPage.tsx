"use client";

import { QueryBoundary } from "@/shared/components/data-display/QueryBoundary";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { useState } from "react";
import { VideoFilters } from "../components/VideoFilters";
import { VideoFormModal } from "../components/VideoFormModal";
import { VideosTable } from "../components/VideosTable";
import { useFilteredVideos } from "../hooks/useFilteredVideos";

export default function VideosPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const { videos, isLoading, isError, error, refetch } = useFilteredVideos();

  return (
    <>
      <PageHeader
        title="Videos"
        subtitle="Summit highlights and on-demand sessions for the mobile app"
        action={
          <GradientButton onClick={() => setCreateOpen(true)}>Add Video</GradientButton>
        }
      />
      <VideoFilters />
      <QueryBoundary
        isLoading={isLoading}
        isError={isError}
        error={error}
        onRetry={() => void refetch()}
        isEmpty={!isLoading && !isError && videos.length === 0}
        emptyTitle="No videos found"
        emptyDescription="Add a summit highlight video or adjust your filters."
        emptyActionLabel="Add video"
        onEmptyAction={() => setCreateOpen(true)}
      >
        <VideosTable />
      </QueryBoundary>
      <VideoFormModal mode="create" open={createOpen} onClose={() => setCreateOpen(false)} />
    </>
  );
}
