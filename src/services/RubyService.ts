import { parseKanjiGroups } from '~/utils/ruby';

export interface RubySegment {
  type: 'kanji' | 'text';
  text: string;
  reading?: string;
}

export class RubyService {
  buildSegments(kanji: string, furigana: string): RubySegment[] {
    if (!kanji) return [];
    if (!furigana || !furigana.trim()) {
      return [{ type: 'text', text: kanji }];
    }

    const furiganaParts = furigana.split(',').map((s) => s.trim());
    const groups = parseKanjiGroups(kanji);
    const segments: RubySegment[] = [];
    let furiganaIdx = 0;

    for (const group of groups) {
      if (group.isKanji) {
        const kanjiGroupCount = groups.filter((g) => g.isKanji).length;

        if (furiganaParts.length === 1 && kanjiGroupCount === 1) {
          segments.push({ type: 'kanji', text: group.text, reading: furiganaParts[0] });
          furiganaIdx = 1;
        } else {
          for (const char of group.text) {
            if (furiganaIdx < furiganaParts.length) {
              segments.push({ type: 'kanji', text: char, reading: furiganaParts[furiganaIdx] });
              furiganaIdx++;
            } else {
              segments.push({ type: 'text', text: char });
            }
          }
        }
      } else {
        segments.push({ type: 'text', text: group.text });
      }
    }

    return segments;
  }
}

export const rubyService = new RubyService();
