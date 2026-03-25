'use client';

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
  const { cards } = useCardsStore();
  const typeCount = new Set(cards.map((c) => c.type)).size;

  return (
    <SHeader>
      <SHeaderContent>
        <SLogo>
          <SLogoKanji>語</SLogoKanji>
          <div>
            <SLogoText>NihongoCards</SLogoText>
            <SLogoSub>Flashcards de Japonés</SLogoSub>
          </div>
        </SLogo>
        {children}
      </SHeaderContent>
      <SStatsBar>
        <SStatChip>
          <SStatNumber>{cards.length}</SStatNumber>
          <SStatLabel>cards totales</SStatLabel>
        </SStatChip>
        <SStatChip>
          <SStatNumber>{typeCount}</SStatNumber>
          <SStatLabel>tipos</SStatLabel>
        </SStatChip>
      </SStatsBar>
    </SHeader>
  );
}
