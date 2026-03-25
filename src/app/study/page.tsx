'use client';

import { AppShell } from '~/components/layout/AppShell';
import { StudyView } from '~/components/study';

export default function StudyPage() {
  return (
    <AppShell>
      <StudyView />
    </AppShell>
  );
}
