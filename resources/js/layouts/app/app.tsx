import { Toaster } from '@/components/ui/sonner';
import type { PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {children}
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
