'use client';

import { useState } from 'react';
import { TypeBadge } from '~/components/common';
import { RubyText } from '~/components/ruby';
import { Card } from '~/types';
import {
  SActionBtn,
  SBack,
  SBadgePosition,
  SCardActions,
  SDetail,
  SFlashcard,
  SFlashcardInner,
  SFlipHint,
  SFront,
  SKanjiDisplay,
  SMeaning,
} from './Flashcard.styles';

interface FlashcardProps {
  card: Card;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function Flashcard({ card, onEdit, onDelete }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setFlipped((f) => !f);
  };

  return (
    <SFlashcard onClick={handleClick}>
      <SFlashcardInner $flipped={flipped}>
        <SFront>
          <SBadgePosition>
            <TypeBadge type={card.type} />
          </SBadgePosition>
          <SKanjiDisplay>{card.kanji}</SKanjiDisplay>
          <SFlipHint>click para voltear</SFlipHint>
          {(onEdit || onDelete) && (
            <SCardActions>
              {onEdit && (
                <SActionBtn onClick={() => onEdit(card.id)} aria-label='Editar'>
                  ✏️
                </SActionBtn>
              )}
              {onDelete && (
                <SActionBtn $danger onClick={() => onDelete(card.id)} aria-label='Eliminar'>
                  🗑️
                </SActionBtn>
              )}
            </SCardActions>
          )}
        </SFront>
        <SBack>
          <SBadgePosition>
            <TypeBadge type={card.type} />
          </SBadgePosition>
          <RubyText kanji={card.kanji} furigana={card.furigana} fontSize='2.2rem' />
          <SMeaning>{card.meaning}</SMeaning>
          {card.example && <SDetail>{card.example}</SDetail>}
          {card.note && <SDetail>{card.note}</SDetail>}
          {(onEdit || onDelete) && (
            <SCardActions>
              {onEdit && (
                <SActionBtn onClick={() => onEdit(card.id)} aria-label='Editar'>
                  ✏️
                </SActionBtn>
              )}
              {onDelete && (
                <SActionBtn $danger onClick={() => onDelete(card.id)} aria-label='Eliminar'>
                  🗑️
                </SActionBtn>
              )}
            </SCardActions>
          )}
        </SBack>
      </SFlashcardInner>
    </SFlashcard>
  );
}
