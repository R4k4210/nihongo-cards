import { nanoid } from 'nanoid';
import { Card } from '~/types';

export class ImportService {
  parseJsonFile(content: string): Partial<Card>[] {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) throw new Error('Formato inválido: se esperaba un array');
    return parsed;
  }

  mergeCards(existing: Card[], incoming: Partial<Card>[]): { cards: Card[]; count: number } {
    const now = new Date().toISOString();
    let count = 0;

    const newCards = incoming
      .filter((card) => card.kanji && card.meaning)
      .map((card) => {
        count++;
        return {
          id: nanoid(),
          kanji: card.kanji!,
          furigana: card.furigana || '',
          type: card.type || 'otro',
          meaning: card.meaning!,
          example: card.example || undefined,
          note: card.note || undefined,
          tags: card.tags || [],
          createdAt: card.createdAt || now,
          updatedAt: now,
        } as Card;
      });

    return { cards: [...existing, ...newCards], count };
  }
}

export const importService = new ImportService();
