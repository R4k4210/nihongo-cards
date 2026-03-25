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
      <STitle>Respaldo de datos</STitle>
      <p style={{ color: '#6c6c7e', fontSize: '0.875rem', marginBottom: '1rem' }}>
        Tus cards se guardan en el navegador. Si borrás los datos del navegador, se pierden. Hacé un respaldo para no
        perderlas.
      </p>
      <SActions>
        <Button variant='secondary' onClick={handleExport}>
          Descargar respaldo
        </Button>
        <Button variant='secondary' onClick={() => fileInputRef.current?.click()}>
          Restaurar respaldo
        </Button>
        <SHiddenInput ref={fileInputRef} type='file' accept='.json' onChange={handleImport} />
        <Button variant='danger' onClick={handleClearAll}>
          Borrar todo
        </Button>
      </SActions>
    </SSection>
  );
}
