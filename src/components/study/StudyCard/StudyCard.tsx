'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  SBack,
  SBadgePosition,
  SCardImage,
  SDetail,
  SFlashcard,
  SFlashcardInner,
  SFlipHint,
  SFront,
  SKanjiDisplay,
  SMeaning,
} from '~/components/cards/Flashcard/Flashcard.styles';
import { Button, TypeBadge } from '~/components/common';
import { RubyText } from '~/components/ruby';
import { useKeyboardShortcuts } from '~/hooks/useKeyboardShortcuts';
import { useStudy } from '~/hooks/useStudy';
import {
  SControls,
  SEmptyIcon,
  SEmptyStudy,
  SEmptyText,
  SEmptyTitle,
  SProgressBar,
  SProgressBarContainer,
  SProgressText,
  SProgressWrapper,
  SStudyCardContainer,
  SStudyContainer,
} from './StudyCard.styles';

export function StudyView() {
  const t = useTranslations('study');
  const router = useRouter();
  const {
    session,
    currentCard,
    progress,
    isComplete,
    isFlipped,
    startSession,
    nextCard,
    prevCard,
    toggleFlip,
    hasCards,
  } = useStudy();

  useEffect(() => {
    startSession();
  }, [startSession]);

  useKeyboardShortcuts({
    onSpace: toggleFlip,
    onArrowRight: nextCard,
    onArrowLeft: prevCard,
  });

  if (!hasCards) {
    return (
      <SStudyContainer>
        <SEmptyStudy>
          <SEmptyIcon>📭</SEmptyIcon>
          <SEmptyTitle>{t('noCards')}</SEmptyTitle>
          <SEmptyText>{t('createFirst')}</SEmptyText>
        </SEmptyStudy>
      </SStudyContainer>
    );
  }

  if (isComplete || !currentCard) {
    return (
      <SStudyContainer>
        <SEmptyStudy>
          <SEmptyIcon>🎉</SEmptyIcon>
          <SEmptyTitle>{t('completed')}</SEmptyTitle>
          <SEmptyText>{t('reviewedCards', { count: session?.cards.length ?? 0 })}</SEmptyText>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button onClick={startSession}>{t('anotherRound')}</Button>
            <Button variant='secondary' onClick={() => router.push('/cards')}>
              {t('viewCollection')}
            </Button>
          </div>
        </SEmptyStudy>
      </SStudyContainer>
    );
  }

  return (
    <SStudyContainer>
      {progress && (
        <SProgressWrapper>
          <SProgressText>
            {progress.current + 1} {t('of')} {progress.total}
          </SProgressText>
          <SProgressBarContainer>
            <SProgressBar $width={progress.percentage} />
          </SProgressBarContainer>
        </SProgressWrapper>
      )}

      <SStudyCardContainer>
        <SFlashcard onClick={toggleFlip} style={{ height: '300px' }}>
          <SFlashcardInner $flipped={isFlipped}>
            <SFront>
              <SBadgePosition>
                <TypeBadge type={currentCard.type} />
              </SBadgePosition>
              <SKanjiDisplay $fontSize='4.5rem'>{currentCard.kanji}</SKanjiDisplay>
              <SFlipHint>{t('flipHint')}</SFlipHint>
            </SFront>
            <SBack>
              <SBadgePosition>
                <TypeBadge type={currentCard.type} />
              </SBadgePosition>
              <RubyText kanji={currentCard.kanji} furigana={currentCard.furigana} fontSize='2.8rem' />
              <SMeaning $fontSize='1.6rem'>{currentCard.meaning}</SMeaning>
              {currentCard.example && <SDetail>{currentCard.example}</SDetail>}
              {currentCard.note && <SDetail>{currentCard.note}</SDetail>}
              {currentCard.imageUrl && <SCardImage src={currentCard.imageUrl} alt={currentCard.meaning} />}
            </SBack>
          </SFlashcardInner>
        </SFlashcard>
      </SStudyCardContainer>

      <SControls>
        <Button variant='secondary' onClick={prevCard} style={{ minWidth: '120px', justifyContent: 'center' }}>
          {t('previous')}
        </Button>
        <Button onClick={nextCard} style={{ minWidth: '120px', justifyContent: 'center' }}>
          {t('next')}
        </Button>
      </SControls>
    </SStudyContainer>
  );
}
