import { nanoid } from 'nanoid';
import Papa from 'papaparse';
import { Card, CARD_TYPES, CardType } from '~/types';

export interface BatchParseResult {
  line: number;
  status: 'ok' | 'error';
  card?: Partial<Card>;
  message?: string;
}

export class ImportService {
  parseJsonFile(content: string): Partial<Card>[] {
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) throw new Error('INVALID_FORMAT');
    return parsed;
  }

  // Field order: kanji ; furigana ; type ; meaning ; imageUrl ; example ; note ; tags
  // Mandatory: kanji, furigana, type, meaning (positions 1-4)
  // Optional: imageUrl, example, note, tags (positions 5-8) — can be empty or omitted
  parseBatchCsv(text: string): BatchParseResult[] {
    const { data } = Papa.parse<string[]>(text, {
      delimiter: ';',
      skipEmptyLines: true,
    });

    return data.map((row, index) => {
      const fields = row.map((f) => f.trim());

      if (fields.length < 4) {
        return {
          line: index + 1,
          status: 'error' as const,
          message: 'MIN_FIELDS',
        };
      }

      const [kanji, furigana, type, meaning, imageUrl, example, note, tags] = fields;

      if (!kanji || !furigana || !type || !meaning) {
        return {
          line: index + 1,
          status: 'error' as const,
          message: 'EMPTY_REQUIRED',
        };
      }

      const card: Partial<Card> = {
        kanji,
        furigana,
        type: this.parseType(type),
        meaning,
        imageUrl: imageUrl || undefined,
        example: example || undefined,
        note: note || undefined,
        tags: tags
          ? tags
              .split(',')
              .map((t) => t.trim().toLowerCase())
              .filter(Boolean)
          : [],
      };

      return { line: index + 1, status: 'ok' as const, card };
    });
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

  private parseType(value: string): CardType {
    const normalized = value.toLowerCase().trim();
    if (CARD_TYPES.includes(normalized as CardType)) return normalized as CardType;
    return 'otro';
  }
}

export const importService = new ImportService();
