'use client';

import { StyledProvider } from './StyledProvider';
import { ToastProvider } from './ToastProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledProvider>
      {children}
      <ToastProvider />
    </StyledProvider>
  );
}
