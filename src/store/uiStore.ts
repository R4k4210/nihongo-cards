import { create } from 'zustand';

interface UiState {
  activeFilter: string;
  searchTerm: string;
  editingCardId: string | null;
  isEditModalOpen: boolean;
  setFilter: (filter: string) => void;
  setSearchTerm: (term: string) => void;
  openEditModal: (cardId: string) => void;
  closeEditModal: () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  activeFilter: 'all',
  searchTerm: '',
  editingCardId: null,
  isEditModalOpen: false,
  setFilter: (filter) => set({ activeFilter: filter }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  openEditModal: (cardId) => set({ editingCardId: cardId, isEditModalOpen: true }),
  closeEditModal: () => set({ editingCardId: null, isEditModalOpen: false }),
}));
