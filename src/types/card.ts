export const CARD_TYPES = [
  'sustantivo',
  'verbo',
  'adjetivo-i',
  'adjetivo-na',
  'adverbio',
  'expresion',
  'particula',
  'contador',
  'otro',
] as const;

export type CardType = (typeof CARD_TYPES)[number];

export interface Card {
  id: string;
  kanji: string;
  furigana: string;
  type: CardType;
  meaning: string;
  example?: string;
  note?: string;
  imageUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardInput {
  kanji: string;
  furigana: string;
  type: CardType;
  meaning: string;
  example?: string;
  note?: string;
  imageUrl?: string;
  tags?: string[];
}
