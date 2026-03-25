'use client';

import { useCallback } from 'react';
import { studyService } from '~/services/StudyService';
import { useCardsStore } from '~/store/cardsStore';
import { useStudyStore } from '~/store/studyStore';

export function useStudy() {
  const { cards } = useCardsStore();
  const { session, setSession, nextCard, prevCard, toggleFlip, getCurrentCard, reset } = useStudyStore();

  const startSession = useCallback(() => {
    if (cards.length === 0) return;
    const newSession = studyService.createSession(cards);
    setSession(newSession);
  }, [cards, setSession]);

  const progress = session ? studyService.getProgress(session) : null;
  const currentCard = getCurrentCard();
  const isComplete = session ? session.currentIndex >= session.cards.length : false;

  return {
    session,
    currentCard,
    progress,
    isComplete,
    isFlipped: session?.isFlipped ?? false,
    startSession,
    nextCard,
    prevCard,
    toggleFlip,
    reset,
    hasCards: cards.length > 0,
  };
}
