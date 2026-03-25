import { nanoid } from 'nanoid';
import { Card, CreateCardInput } from '~/types';
import { normalizeImageUrl } from '~/utils/images';

export class CardService {
  createCard(input: CreateCardInput): Card {
    const now = new Date().toISOString();
    return {
      id: nanoid(),
      kanji: input.kanji.trim(),
      furigana: input.furigana.trim(),
      type: input.type,
      meaning: input.meaning.trim(),
      example: input.example?.trim() || undefined,
      note: input.note?.trim() || undefined,
      imageUrl: normalizeImageUrl(input.imageUrl || '') || undefined,
      tags: input.tags ?? [],
      createdAt: now,
      updatedAt: now,
    };
  }

  filterCards(cards: Card[], type: string, search: string): Card[] {
    let filtered = cards;

    if (type !== 'all') {
      filtered = filtered.filter((c) => c.type === type);
    }

    if (search.trim()) {
      const term = search.toLowerCase().trim();
      filtered = filtered.filter(
        (c) =>
          c.kanji.toLowerCase().includes(term) ||
          c.furigana.toLowerCase().includes(term) ||
          c.meaning.toLowerCase().includes(term) ||
          c.example?.toLowerCase().includes(term) ||
          c.note?.toLowerCase().includes(term),
      );
    }

    return filtered;
  }

  findDuplicates(cards: Card[], kanji: string, furigana: string): Card[] {
    return cards.filter((c) => c.kanji === kanji && c.furigana === furigana);
  }
}

export const cardService = new CardService();
