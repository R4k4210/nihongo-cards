import { isKanji } from './isKanji';

export interface KanjiSegment {
  text: string;
  isKanji: boolean;
}

export function parseKanjiGroups(str: string): KanjiSegment[] {
  const segments: KanjiSegment[] = [];
  let current = '';
  let currentIsKanji: boolean | null = null;

  for (const char of str) {
    const charIsKanji = isKanji(char);

    if (currentIsKanji === null) {
      currentIsKanji = charIsKanji;
      current = char;
    } else if (charIsKanji === currentIsKanji) {
      current += char;
    } else {
      segments.push({ text: current, isKanji: currentIsKanji });
      current = char;
      currentIsKanji = charIsKanji;
    }
  }

  if (current) {
    segments.push({ text: current, isKanji: currentIsKanji! });
  }

  return segments;
}
