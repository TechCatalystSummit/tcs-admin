import { apiFetch } from "@/shared/lib/api/client";
import { showMutationError } from "@/shared/lib/api/handleApiError";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface AdminNote {
  id: string;
  targetType: string;
  targetId: string;
  note: string;
  createdBy: string;
  createdAt: string;
}

export const adminNoteKeys = {
  all: ["admin-notes"] as const,
  list: (targetType: string, targetId: string) =>
    [...adminNoteKeys.all, targetType, targetId] as const,
};

export function useAdminNotes(targetType: string, targetId: string | null | undefined) {
  return useQuery({
    queryKey: adminNoteKeys.list(targetType, targetId ?? ""),
    queryFn: async () => {
      const { data } = await apiFetch<AdminNote[]>("/api/admin-notes", {
        params: { targetType, targetId: targetId!, page: 1, perPage: 50 },
      });
      return data;
    },
    enabled: Boolean(targetId),
  });
}

export function useCreateAdminNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { targetType: string; targetId: string; note: string }) => {
      await apiFetch("/api/admin-notes", { method: "POST", body });
    },
    onSuccess: (_d, { targetType, targetId }) => {
      void qc.invalidateQueries({ queryKey: adminNoteKeys.list(targetType, targetId) });
      toast.success("Note saved");
    },
    onError: showMutationError,
  });
}
