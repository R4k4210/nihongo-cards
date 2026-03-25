'use client';

import { useRef } from 'react';
import toast from 'react-hot-toast';
import { Button } from '~/components/common';
import { exportService } from '~/services/ExportService';
import { importService } from '~/services/ImportService';
import { useCardsStore } from '~/store/cardsStore';
import { SActions, SHiddenInput, SSection, STitle } from './ImportExport.styles';

export function ImportExport() {
  const { cards, setCards, clearAll } = useCardsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    if (cards.length === 0) {
      toast.error('No hay cards para exportar');
      return;
    }
    exportService.exportAndDownload(cards);
    toast.success(`${cards.length} cards exportadas`);
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
        toast.success(`${result.count} cards importadas`);
      } catch {
        toast.error('Error al importar: formato inválido');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleClearAll = () => {
    if (cards.length === 0) {
      toast('No hay cards para borrar');
      return;
    }
    if (
      window.confirm(`¿Seguro que querés borrar TODAS las ${cards.length} cards? Esta acción no se puede deshacer.`)
    ) {
      clearAll();
      toast.success('Todas las cards fueron eliminadas');
    }
  };

  return (
    <SSection>
      <STitle>Importar / Exportar</STitle>
      <SActions>
        <Button variant='secondary' onClick={handleExport}>
          Exportar JSON
        </Button>
        <Button variant='secondary' onClick={() => fileInputRef.current?.click()}>
          Importar JSON
        </Button>
        <SHiddenInput ref={fileInputRef} type='file' accept='.json' onChange={handleImport} />
        <Button variant='danger' onClick={handleClearAll}>
          Borrar Todo
        </Button>
      </SActions>
    </SSection>
  );
}
