'use client';

import { useTranslations } from 'next-intl';
import { useCardsStore } from '~/store/cardsStore';
import {
  SHeader,
  SHeaderContent,
  SLogo,
  SLogoKanji,
  SLogoSub,
  SLogoText,
  SStatChip,
  SStatLabel,
  SStatNumber,
  SStatsBar,
} from './Header.styles';

export function Header({ children }: { children?: React.ReactNode }) {
  const t = useTranslations('header');
  const { cards } = useCardsStore();
  const typeCount = new Set(cards.map((c) => c.type)).size;

  return (
    <SHeader>
      <SHeaderContent>
        <SLogo>
          <SLogoKanji>語</SLogoKanji>
          <div>
            <SLogoText>NihongoCards</SLogoText>
            <SLogoSub>{t('subtitle')}</SLogoSub>
          </div>
        </SLogo>
        {children}
      </SHeaderContent>
      <SStatsBar>
        <SStatChip>
          <SStatNumber>{cards.length}</SStatNumber>
          <SStatLabel>{t('totalCards')}</SStatLabel>
        </SStatChip>
        <SStatChip>
          <SStatNumber>{typeCount}</SStatNumber>
          <SStatLabel>{t('types')}</SStatLabel>
        </SStatChip>
      </SStatsBar>
    </SHeader>
  );
}
