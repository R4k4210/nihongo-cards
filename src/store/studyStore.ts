import { create } from 'zustand';
import { Card, StudySession } from '~/types';

interface StudyState {
  session: StudySession | null;
  setSession: (session: StudySession) => void;
  nextCard: () => void;
  prevCard: () => void;
  toggleFlip: () => void;
  getCurrentCard: () => Card | null;
  reset: () => void;
}

export const useStudyStore = create<StudyState>()((set, get) => ({
  session: null,
  setSession: (session) => set({ session }),
  nextCard: () =>
    set((state) => {
      if (!state.session) return state;
      return {
        session: {
          ...state.session,
          currentIndex: state.session.currentIndex + 1,
          isFlipped: false,
        },
      };
    }),
  prevCard: () =>
    set((state) => {
      if (!state.session || state.session.currentIndex <= 0) return state;
      return {
        session: {
          ...state.session,
          currentIndex: state.session.currentIndex - 1,
          isFlipped: false,
        },
      };
    }),
  toggleFlip: () =>
    set((state) => {
      if (!state.session) return state;
      return {
        session: { ...state.session, isFlipped: !state.session.isFlipped },
      };
    }),
  getCurrentCard: () => {
    const { session } = get();
    if (!session || session.currentIndex >= session.cards.length) return null;
    return session.cards[session.currentIndex];
  },
  reset: () => set({ session: null }),
}));
