import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { handleApiError } from "./handleApiError";

export function createQueryClient(): QueryClient {
  const client = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        handleApiError(error, client);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        handleApiError(error, client);
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: (failureCount, error) => {
          if (error && typeof error === "object" && "status" in error && error.status === 401) {
            return false;
          }
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
  return client;
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient(): QueryClient {
  if (typeof window === "undefined") {
    return createQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }
  return browserQueryClient;
}
