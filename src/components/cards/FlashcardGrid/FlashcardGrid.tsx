'use client';

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
  if (cards.length === 0) {
    return (
      <SGrid>
        <SEmptyState>
          <SEmptyIcon>{totalCards === 0 ? '📭' : '🔍'}</SEmptyIcon>
          <SEmptyTitle>{totalCards === 0 ? 'No hay cards todavía' : 'Sin resultados'}</SEmptyTitle>
          <p>
            {totalCards === 0 ? 'Creá tu primera flashcard en la pestaña Crear' : 'Probá con otros términos o filtros'}
          </p>
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
