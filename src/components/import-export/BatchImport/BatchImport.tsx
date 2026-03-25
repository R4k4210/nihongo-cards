'use client';

import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '~/components/common';
import { importService } from '~/services/ImportService';
import { useCardsStore } from '~/store/cardsStore';
import {
  SActions,
  SChevron,
  SContent,
  SCount,
  SDescription,
  SFormatHint,
  SHeader,
  SHeaderLeft,
  SPreviewItem,
  SPreviewList,
  SSection,
  STextarea,
  STitle,
} from './BatchImport.styles';

const PLACEHOLDER = `紹介 ; しょう,かい ; sustantivo ; Presentación ;;;; jlpt-n4,saludos
食べる ; た ; verbo ; Comer
猫 ; ねこ ; sustantivo ; Gato ; ; 猫が好きです ; JLPT N5 ; animales,n5`;

export function BatchImport() {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const { cards, setCards } = useCardsStore();

  const results = useMemo(() => {
    if (!text.trim()) return [];
    return importService.parseBatchCsv(text);
  }, [text]);

  const okCount = results.filter((r) => r.status === 'ok').length;
  const errorCount = results.filter((r) => r.status === 'error').length;

  const handleImport = () => {
    const validCards = results.filter((r) => r.status === 'ok' && r.card).map((r) => r.card!);
    if (validCards.length === 0) {
      toast.error('No hay cards válidas para importar');
      return;
    }
    const result = importService.mergeCards(cards, validCards);
    setCards(result.cards);
    toast.success(`${result.count} cards importadas`);
    setText('');
  };

  return (
    <SSection>
      <SHeader type='button' onClick={() => setIsOpen((o) => !o)}>
        <SHeaderLeft>
          <STitle>Importar en lote</STitle>
          <SDescription>Importá varias cards de una vez pegando texto</SDescription>
        </SHeaderLeft>
        <SChevron $open={isOpen}>▼</SChevron>
      </SHeader>

      {isOpen && (
        <SContent>
          <SFormatHint>
            <strong>Formato:</strong>
            <br />
            <code>kanji ; furigana ; tipo ; significado ; imagenUrl ; ejemplo ; nota ; tags</code>
            <br />
            <br />
            <strong>Obligatorios:</strong> kanji, furigana, tipo, significado
            <br />
            <strong>Opcionales:</strong> imagenUrl, ejemplo, nota, tags — podés dejarlos vacíos o no incluirlos
            <br />
            <br />
            <strong>Tipos válidos:</strong>{' '}
            <code>sustantivo, verbo, adjetivo-i, adjetivo-na, adverbio, expresion, particula, contador, otro</code>
            <br />
            <strong>Tags:</strong> separados por coma: <code>jlpt-n4,saludos</code>
            <br />
            <strong>Furigana:</strong> separado por coma: <code>しょう,かい</code>
          </SFormatHint>

          <STextarea placeholder={PLACEHOLDER} value={text} onChange={(e) => setText(e.target.value)} />

          {results.length > 0 && (
            <>
              <SPreviewList>
                {results.map((r) => (
                  <SPreviewItem key={r.line} $status={r.status}>
                    <span>#{r.line}</span>
                    {r.status === 'ok' && r.card && (
                      <span>
                        {r.card.kanji} → {r.card.meaning}
                        {r.card.tags && r.card.tags.length > 0 && ` [${r.card.tags.join(', ')}]`}
                      </span>
                    )}
                    {r.status === 'error' && <span>{r.message}</span>}
                  </SPreviewItem>
                ))}
              </SPreviewList>

              <SActions>
                <Button onClick={handleImport} disabled={okCount === 0}>
                  Importar {okCount} cards
                </Button>
                <Button variant='secondary' onClick={() => setText('')}>
                  Limpiar
                </Button>
                <SCount>
                  {okCount} válidas{errorCount > 0 && `, ${errorCount} con errores`}
                </SCount>
              </SActions>
            </>
          )}
        </SContent>
      )}
    </SSection>
  );
}
