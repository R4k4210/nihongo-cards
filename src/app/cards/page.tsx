'use client';

import styled from 'styled-components';
import { EditCardModal } from '~/components/cards/EditCardModal';
import { FlashcardGrid } from '~/components/cards/FlashcardGrid';
import { SInput } from '~/components/common';
import { AppShell } from '~/components/layout/AppShell';
import { useCards } from '~/hooks/useCards';
import { useCardsStore } from '~/store/cardsStore';
import { useUiStore } from '~/store/uiStore';
import { CARD_TYPES, Card } from '~/types';

const SCardsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SSearchBar = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const SSearchInput = styled(SInput)`
  flex: 1;
  min-width: 200px;
`;

const SFilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const SFilterBtn = styled.button<{ $active?: boolean }>`
  padding: 0.4rem 0.9rem;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.bgCard)};
  color: ${({ $active, theme }) => ($active ? 'white' : theme.colors.textMuted)};
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  font-family: inherit;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.bgCardHover)};
  }
`;

const filterLabels: Record<string, string> = {
  all: 'Todos',
  sustantivo: '名 Sustantivo',
  verbo: '動 Verbo',
  'adjetivo-i': 'い Adj-i',
  'adjetivo-na': 'な Adj-na',
  adverbio: '副 Adverbio',
  expresion: '表 Expresión',
  particula: '助 Partícula',
  contador: '数 Contador',
  otro: '他 Otro',
};

export default function CardsPage() {
  const { cards, filteredCards, deleteCard, updateCard } = useCards();
  const {
    activeFilter,
    searchTerm,
    setFilter,
    setSearchTerm,
    editingCardId,
    isEditModalOpen,
    openEditModal,
    closeEditModal,
  } = useUiStore();
  const allCards = useCardsStore((s) => s.cards);

  const editingCard = editingCardId ? allCards.find((c) => c.id === editingCardId) || null : null;

  const handleSave = (id: string, updates: Partial<Card>) => {
    updateCard(id, updates);
  };

  return (
    <AppShell>
      <SCardsHeader>
        <h2>Mi Colección</h2>
      </SCardsHeader>

      <SSearchBar>
        <SSearchInput
          placeholder='Buscar por kanji, furigana o significado...'
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </SSearchBar>

      <SFilterBar>
        {['all', ...CARD_TYPES].map((filter) => (
          <SFilterBtn key={filter} $active={activeFilter === filter} onClick={() => setFilter(filter)}>
            {filterLabels[filter]}
          </SFilterBtn>
        ))}
      </SFilterBar>

      <FlashcardGrid cards={filteredCards} totalCards={cards.length} onEdit={openEditModal} onDelete={deleteCard} />

      <EditCardModal card={editingCard} isOpen={isEditModalOpen} onClose={closeEditModal} onSave={handleSave} />
    </AppShell>
  );
}
