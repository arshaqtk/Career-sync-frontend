import { handleRQError } from "@/lib/react-query/errorHandler";
import { QueryCache, MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      handleRQError(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleRQError(error)
    }
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false
    }
  }
});

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
