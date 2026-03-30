'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { ImportExport } from '~/components/import-export';
import { AppShell } from '~/components/layout/AppShell';

const SPageTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const SPageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  margin-bottom: 2rem;
`;

export default function SettingsPage() {
  const t = useTranslations('settings');

  return (
    <AppShell>
      <SPageTitle>{t('title')}</SPageTitle>
      <SPageSubtitle>{t('subtitle')}</SPageSubtitle>
      <ImportExport />
    </AppShell>
  );
}
