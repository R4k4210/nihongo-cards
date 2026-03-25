'use client';

import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { cardService } from '~/services/CardService';
import { useCardsStore } from '~/store/cardsStore';
import { useUiStore } from '~/store/uiStore';
import { CreateCardInput } from '~/types';

export function useCards() {
  const { cards, addCard, updateCard, deleteCard, setCards, clearAll } = useCardsStore();
  const { activeFilter, searchTerm } = useUiStore();

  const filteredCards = useMemo(
    () => cardService.filterCards(cards, activeFilter, searchTerm),
    [cards, activeFilter, searchTerm],
  );

  const typeCount = useMemo(() => new Set(cards.map((c) => c.type)).size, [cards]);

  const handleAddCard = (input: CreateCardInput) => {
    const card = cardService.createCard(input);
    addCard(card);
    toast.success(`"${card.kanji}" agregada correctamente`);
    return card;
  };

  const handleDeleteCard = (id: string) => {
    const card = cards.find((c) => c.id === id);
    if (!card) return;
    deleteCard(id);
    toast.success(`"${card.kanji}" eliminada`);
  };

  const handleUpdateCard = (id: string, updates: Partial<CreateCardInput>) => {
    updateCard(id, updates);
    toast.success('Card actualizada');
  };

  const handleClearAll = () => {
    clearAll();
    toast.success('Todas las cards fueron eliminadas');
  };

  return {
    cards,
    filteredCards,
    typeCount,
    addCard: handleAddCard,
    updateCard: handleUpdateCard,
    deleteCard: handleDeleteCard,
    setCards,
    clearAll: handleClearAll,
  };
}
