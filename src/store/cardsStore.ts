import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Card } from '~/types';

interface CardsState {
  cards: Card[];
  addCard: (card: Card) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  deleteCard: (id: string) => void;
  setCards: (cards: Card[]) => void;
  clearAll: () => void;
}

export const useCardsStore = create<CardsState>()(
  persist(
    (set) => ({
      cards: [],
      addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
      updateCard: (id, updates) =>
        set((state) => ({
          cards: state.cards.map((c) => (c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c)),
        })),
      deleteCard: (id) => set((state) => ({ cards: state.cards.filter((c) => c.id !== id) })),
      setCards: (cards) => set({ cards }),
      clearAll: () => set({ cards: [] }),
    }),
    { name: 'nihongo-cards' },
  ),
);
