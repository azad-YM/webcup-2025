import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import { Toaster } from '@/components/ui/sonner';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren<{}>) {
    return (
      <div>
        <div>
          {children}
        </div>
        <Toaster />
      </div>
    );
}
