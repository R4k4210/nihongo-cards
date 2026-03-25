import { CardType } from '~/types';

interface CardTypeConfig {
  label: string;
  shortLabel: string;
  color: string;
}

export const CARD_TYPE_CONFIG: Record<CardType, CardTypeConfig> = {
  sustantivo: { label: '名詞 Sustantivo', shortLabel: 'Sustantivo', color: '#06d6a0' },
  verbo: { label: '動詞 Verbo', shortLabel: 'Verbo', color: '#ff6b6b' },
  'adjetivo-i': { label: 'い形容詞 Adjetivo-i', shortLabel: 'Adj-i', color: '#ffd166' },
  'adjetivo-na': { label: 'な形容詞 Adjetivo-na', shortLabel: 'Adj-na', color: '#ffd166' },
  adverbio: { label: '副詞 Adverbio', shortLabel: 'Adverbio', color: '#118ab2' },
  expresion: { label: '表現 Expresión', shortLabel: 'Expresión', color: '#9b5de5' },
  particula: { label: '助詞 Partícula', shortLabel: 'Partícula', color: '#f77f00' },
  contador: { label: '助数詞 Contador', shortLabel: 'Contador', color: '#00bbf9' },
  otro: { label: 'その他 Otro', shortLabel: 'Otro', color: '#a8a8b8' },
};

export const getTypeColor = (type: CardType): string => CARD_TYPE_CONFIG[type].color;
export const getTypeLabel = (type: CardType): string => CARD_TYPE_CONFIG[type].label;
export const getTypeShortLabel = (type: CardType): string => CARD_TYPE_CONFIG[type].shortLabel;
