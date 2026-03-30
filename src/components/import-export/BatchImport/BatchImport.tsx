'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('batchImport');
  const tImportExport = useTranslations('importExport');
  const tValidation = useTranslations('validation');
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
      toast.error(t('noValidCards'));
      return;
    }
    const result = importService.mergeCards(cards, validCards);
    setCards(result.cards);
    toast.success(tImportExport('cardsImported', { count: result.count }));
    setText('');
  };

  return (
    <SSection>
      <SHeader type='button' onClick={() => setIsOpen((o) => !o)}>
        <SHeaderLeft>
          <STitle>{t('title')}</STitle>
          <SDescription>{t('description')}</SDescription>
        </SHeaderLeft>
        <SChevron $open={isOpen}>▼</SChevron>
      </SHeader>

      {isOpen && (
        <SContent>
          <SFormatHint>
            <strong>{t('formatLabel')}</strong>
            <br />
            <code>{t('formatCode')}</code>
            <br />
            <br />
            <strong>{t('required')}</strong>
            <br />
            <strong>{t('optional')}</strong>
            <br />
            <br />
            <strong>{t('validTypes')}</strong> <code>{t('typesList')}</code>
            <br />
            <strong>{t('tagsHint')}</strong>
            <br />
            <strong>{t('furiganaHint')}</strong>
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
                    {r.status === 'error' && (
                      <span>
                        {r.message === 'MIN_FIELDS'
                          ? tValidation('minFields')
                          : r.message === 'EMPTY_REQUIRED'
                            ? tValidation('emptyRequired')
                            : r.message}
                      </span>
                    )}
                  </SPreviewItem>
                ))}
              </SPreviewList>

              <SActions>
                <Button onClick={handleImport} disabled={okCount === 0}>
                  {t('importCount', { count: okCount })}
                </Button>
                <Button variant='secondary' onClick={() => setText('')}>
                  {t('clear')}
                </Button>
                <SCount>
                  {t('valid', { count: okCount })}
                  {errorCount > 0 && `, ${t('withErrors', { count: errorCount })}`}
                </SCount>
              </SActions>
            </>
          )}
        </SContent>
      )}
    </SSection>
  );
}
