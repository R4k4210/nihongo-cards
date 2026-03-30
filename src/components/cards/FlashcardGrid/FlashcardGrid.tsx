'use client';

import { useTranslations } from 'next-intl';
import { Card } from '~/types';
import { Flashcard } from '../Flashcard';
import { SEmptyIcon, SEmptyState, SEmptyTitle, SGrid } from './FlashcardGrid.styles';

interface FlashcardGridProps {
  cards: Card[];
  totalCards: number;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function FlashcardGrid({ cards, totalCards, onEdit, onDelete }: FlashcardGridProps) {
  const t = useTranslations('cards');

  if (cards.length === 0) {
    return (
      <SGrid>
        <SEmptyState>
          <SEmptyIcon>{totalCards === 0 ? '📭' : '🔍'}</SEmptyIcon>
          <SEmptyTitle>{totalCards === 0 ? t('noCardsYet') : t('noResults')}</SEmptyTitle>
          <p>{totalCards === 0 ? t('createFirst') : t('tryOtherFilters')}</p>
        </SEmptyState>
      </SGrid>
    );
  }

  return (
    <SGrid>
      {cards.map((card) => (
        <Flashcard key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </SGrid>
  );
}
