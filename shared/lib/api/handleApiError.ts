import { signOut } from "@/features/auth/api/session";
import { toast } from "sonner";
import { getErrorMessage, isApiError, isHandledGlobally } from "./errors";
import type { QueryClient } from "@tanstack/react-query";

let handling401 = false;

export function handleApiError(error: unknown, queryClient?: QueryClient): boolean {
  if (isApiError(error)) {
    if (error.status === 401) {
      if (handling401 || typeof window === "undefined") return true;
      handling401 = true;
      toast.error("Your session has expired. Please sign in again.");
      void signOut().finally(() => {
        queryClient?.clear();
        handling401 = false;
        window.location.href = "/login";
      });
      return true;
    }
    if (error.status === 403) {
      toast.error("You don't have permission to do that.");
      return true;
    }
  }
  return false;
}

export function showMutationError(error: unknown): void {
  if (isHandledGlobally(error)) return;
  toast.error(getErrorMessage(error));
}
