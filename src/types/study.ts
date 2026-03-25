import { Card } from './card';

export interface StudySession {
  cards: Card[];
  currentIndex: number;
  isFlipped: boolean;
}

export interface StudyProgress {
  current: number;
  total: number;
  percentage: number;
}
