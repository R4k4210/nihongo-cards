import { Card, StudySession, StudyProgress } from '~/types';
import { shuffleCards } from '~/utils/cards';

export class StudyService {
  createSession(cards: Card[]): StudySession {
    return {
      cards: shuffleCards(cards),
      currentIndex: 0,
      isFlipped: false,
    };
  }

  getCurrentCard(session: StudySession): Card | null {
    if (session.currentIndex >= session.cards.length) return null;
    return session.cards[session.currentIndex];
  }

  getProgress(session: StudySession): StudyProgress {
    const total = session.cards.length;
    const current = session.currentIndex;
    return {
      current,
      total,
      percentage: total === 0 ? 0 : Math.round((current / total) * 100),
    };
  }
}

export const studyService = new StudyService();
