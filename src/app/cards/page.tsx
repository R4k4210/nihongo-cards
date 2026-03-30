'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import { EditCardModal } from '~/components/cards/EditCardModal';
import { FlashcardGrid } from '~/components/cards/FlashcardGrid';
import { SInput } from '~/components/common';
import { AppShell } from '~/components/layout/AppShell';
import { useCards } from '~/hooks/useCards';
import { useCardsStore } from '~/store/cardsStore';
import { useUiStore } from '~/store/uiStore';
import { CARD_TYPES, Card, CardType } from '~/types';

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

export default function CardsPage() {
  const t = useTranslations();
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

  const getFilterLabel = (filter: string): string => {
    if (filter === 'all') return t('cards.filterAll');
    return t(`cardTypes.${filter as CardType}.filterLabel`);
  };

  return (
    <AppShell>
      <SCardsHeader>
        <h2>{t('cards.myCollection')}</h2>
      </SCardsHeader>

      <SSearchBar>
        <SSearchInput
          placeholder={t('cards.searchPlaceholder')}
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </SSearchBar>

      <SFilterBar>
        {['all', ...CARD_TYPES].map((filter) => (
          <SFilterBtn key={filter} $active={activeFilter === filter} onClick={() => setFilter(filter)}>
            {getFilterLabel(filter)}
          </SFilterBtn>
        ))}
      </SFilterBar>

      <FlashcardGrid cards={filteredCards} totalCards={cards.length} onEdit={openEditModal} onDelete={deleteCard} />

      <EditCardModal card={editingCard} isOpen={isEditModalOpen} onClose={closeEditModal} onSave={handleSave} />
    </AppShell>
  );
}
