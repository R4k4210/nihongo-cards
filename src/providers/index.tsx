'use client';

import { IntlProvider } from './IntlProvider';
import { StyledProvider } from './StyledProvider';
import { ToastProvider } from './ToastProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StyledProvider>
      <IntlProvider>
        {children}
        <ToastProvider />
      </IntlProvider>
    </StyledProvider>
  );
}
