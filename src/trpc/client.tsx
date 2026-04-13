import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';
import {createTRPCReact} from '@trpc/react-query';
import {useState, type ReactNode} from 'react';
import type {AppRouter} from '../../server/trpc/router';

export const trpc = createTRPCReact<AppRouter>();

function getTrpcUrl() {
  return import.meta.env.VITE_TRPC_URL?.trim() || '/trpc';
}

export function TrpcProvider({children}: {children: ReactNode}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
          },
        },
      }),
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getTrpcUrl(),
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
