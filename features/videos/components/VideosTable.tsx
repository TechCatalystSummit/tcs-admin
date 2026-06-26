"use client";

import { DataTable } from "@/shared/components/data-display/DataTable";
import { Button } from "@/shared/components/ui/Button";
import { type ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useDeleteVideo, useToggleVideoActive } from "../api/mutations";
import { useFilteredVideos } from "../hooks/useFilteredVideos";
import type { Video } from "../types";
import { VideoFormModal } from "./VideoFormModal";
import { VideoStatusBadge } from "./VideoStatusBadge";

export function VideosTable() {
  const { videos: filteredVideos } = useFilteredVideos();
  const [editId, setEditId] = useState<string | null>(null);
  const deleteVideo = useDeleteVideo();
  const toggleActive = useToggleVideoActive();

  const columns = useMemo<ColumnDef<Video>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div>
            <p className="font-medium">{row.original.title}</p>
            {row.original.seriesLabel ? (
              <p className="text-xs text-muted">{row.original.seriesLabel}</p>
            ) : null}
          </div>
        ),
      },
      {
        accessorKey: "speakerLabel",
        header: "Speaker",
        cell: ({ row }) => row.original.speakerLabel || "—",
      },
      {
        accessorKey: "durationLabel",
        header: "Duration",
        cell: ({ row }) => row.original.durationLabel || "—",
      },
      {
        accessorKey: "sortOrder",
        header: "Order",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <VideoStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1">
            <Button variant="ghost" size="sm" onClick={() => setEditId(row.original.id)}>
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                toggleActive.mutate({
                  id: row.original.id,
                  isActive: row.original.status !== "active",
                })
              }
            >
              {row.original.status === "active" ? "Deactivate" : "Activate"}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => {
                if (window.confirm(`Delete "${row.original.title}"?`)) {
                  deleteVideo.mutate(row.original.id);
                }
              }}
            >
              Delete
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ],
    [deleteVideo, toggleActive],
  );

  return (
    <>
      <DataTable columns={columns} data={filteredVideos} />
      <VideoFormModal
        mode="edit"
        videoId={editId}
        open={Boolean(editId)}
        onClose={() => setEditId(null)}
      />
    </>
  );
}
