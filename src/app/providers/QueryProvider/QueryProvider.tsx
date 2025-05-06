import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type FC, type ReactNode } from 'react';

export interface IQueryProviderProps {
  children?: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0,
      // gcTime: 0,
      networkMode: 'always',
    },
  },
});

export const QueryProvider: FC<IQueryProviderProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
