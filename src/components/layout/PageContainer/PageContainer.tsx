'use client';

import { SMain } from './PageContainer.styles';

export function PageContainer({ children }: { children: React.ReactNode }) {
  return <SMain>{children}</SMain>;
}
