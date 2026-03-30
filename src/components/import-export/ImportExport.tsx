'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { Button } from '~/components/common';
import { exportService } from '~/services/ExportService';
import { importService } from '~/services/ImportService';
import { useCardsStore } from '~/store/cardsStore';
import { SActions, SHiddenInput, SSection, STitle } from './ImportExport.styles';

export function ImportExport() {
  const t = useTranslations('importExport');
  const { cards, setCards, clearAll } = useCardsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (cards.length === 0) {
      toast.error(t('noCardsToExport'));
      return;
    }
    exportService.exportAndDownload(cards);
    toast.success(t('cardsExported', { count: cards.length }));
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const incoming = importService.parseJsonFile(content);
        const result = importService.mergeCards(cards, incoming);
        setCards(result.cards);
        toast.success(t('cardsImported', { count: result.count }));
      } catch {
        toast.error(t('importError'));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearAll = () => {
    if (cards.length === 0) {
      toast(t('noCardsToDelete'));
      return;
    }
    if (window.confirm(t('confirmDelete', { count: cards.length }))) {
      clearAll();
      toast.success(t('allDeleted'));
    }
  };

  return (
    <SSection>
      <STitle>{t('title')}</STitle>
      <p style={{ color: '#6c6c7e', fontSize: '0.875rem', marginBottom: '1rem' }}>{t('description')}</p>
      <SActions>
        <Button variant='secondary' onClick={handleExport}>
          {t('download')}
        </Button>
        <Button variant='secondary' onClick={() => fileInputRef.current?.click()}>
          {t('restore')}
        </Button>
        <SHiddenInput ref={fileInputRef} type='file' accept='.json' onChange={handleImport} />
        <Button variant='danger' onClick={handleClearAll}>
          {t('deleteAll')}
        </Button>
      </SActions>
    </SSection>
  );
}
