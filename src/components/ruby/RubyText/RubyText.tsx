'use client';

import { useMemo } from 'react';
import { rubyService } from '~/services/RubyService';
import { SRubyWord } from './RubyText.styles';

interface RubyTextProps {
  kanji: string;
  furigana: string;
  fontSize?: string;
}

export function RubyText({ kanji, furigana, fontSize }: RubyTextProps) {
  const segments = useMemo(() => rubyService.buildSegments(kanji, furigana), [kanji, furigana]);

  return (
    <SRubyWord $fontSize={fontSize}>
      {segments.map((seg, i) =>
        seg.type === 'kanji' ? (
          <ruby key={i}>
            {seg.text}
            <rt>{seg.reading}</rt>
          </ruby>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </SRubyWord>
  );
}
