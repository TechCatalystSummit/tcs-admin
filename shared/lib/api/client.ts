import { getAccessToken } from "@/features/auth/api/session";
import { ApiError, type ApiFetchOptions, type ApiResponse } from "./types";

const DEFAULT_BASE_URL = "http://localhost:4000";

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_BASE_URL;
}

function buildUrl(path: string, params?: ApiFetchOptions["params"]): string {
  const url = new URL(path.startsWith("http") ? path : `${getBaseUrl()}${path}`);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    }
  }
  return url.toString();
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<{ data: T; meta?: ApiResponse<T> extends { meta?: infer M } ? M : never }> {
  const { params, body, token, headers: customHeaders, ...init } = options;
  const accessToken = token !== undefined ? token : await getAccessToken();

  const headers = new Headers(customHeaders);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildUrl(path, params), {
    ...init,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return { data: undefined as T };
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!isJson || !payload || typeof payload !== "object") {
    throw new ApiError(response.status, "INTERNAL_ERROR", "Invalid API response");
  }

  if (!response.ok || payload.success === false) {
    const error = payload.error ?? { code: "INTERNAL_ERROR", message: response.statusText };
    throw new ApiError(response.status, error.code, error.message, error.details);
  }

  return { data: payload.data as T, meta: payload.meta };
}

export async function apiHealthCheck(): Promise<{ status: string }> {
  const response = await fetch(`${getBaseUrl()}/health`);
  return response.json();
}
