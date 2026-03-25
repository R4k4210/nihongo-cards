'use client';

import { CardForm } from '~/components/cards';
import { ImportExport } from '~/components/import-export';
import { AppShell } from '~/components/layout/AppShell';
import { useCards } from '~/hooks/useCards';
import { useKeyboardShortcuts } from '~/hooks/useKeyboardShortcuts';
import { CreateCardInput } from '~/types';

export default function CreatePage() {
  const { addCard } = useCards();

  useKeyboardShortcuts({});

  const handleSubmit = (input: CreateCardInput) => {
    addCard(input);
  };

  return (
    <AppShell>
      <CardForm onSubmit={handleSubmit} />
      <ImportExport />
    </AppShell>
  );
}
