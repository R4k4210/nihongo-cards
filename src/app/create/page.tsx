'use client';

import { CardForm } from '~/components/cards';
import { BatchImport } from '~/components/import-export/BatchImport';
import { AppShell } from '~/components/layout/AppShell';
import { useCards } from '~/hooks/useCards';
import { CreateCardInput } from '~/types';

export default function CreatePage() {
  const { addCard } = useCards();

  const handleSubmit = (input: CreateCardInput) => {
    addCard(input);
  };

  return (
    <AppShell>
      <CardForm onSubmit={handleSubmit} />
      <BatchImport />
    </AppShell>
  );
}
