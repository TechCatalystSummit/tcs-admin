import { ApiError } from "./types";

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (typeof error === "string" && error.length > 0) return error;
  if (isApiError(error)) return error.message;
  if (error instanceof Error) return error.message;
  return fallback;
}

export function isHandledGlobally(error: unknown): boolean {
  return isApiError(error) && (error.status === 401 || error.status === 403);
}
