import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

export function createWrapper(client: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

export async function renderHookWithClient<TResult, TProps>(
  hook: (props: TProps) => TResult,
  options?: { initialProps?: TProps },
) {
  const client = createTestQueryClient();
  const wrapper = createWrapper(client);
  const result = renderHook(hook, { wrapper, ...options });
  return { ...result, client };
}

export { waitFor };
