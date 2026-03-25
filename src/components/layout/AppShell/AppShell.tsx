'use client';

import { Header } from '../Header';
import { Navigation } from '../Navigation';
import { PageContainer } from '../PageContainer';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <Navigation />
      </Header>
      <PageContainer>{children}</PageContainer>
    </>
  );
}
