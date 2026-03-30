'use client';

import { useTranslations } from 'next-intl';
import { getTypeColor } from '~/constants';
import { CardType } from '~/types';
import { SBadge } from './TypeBadge.styles';

interface TypeBadgeProps {
  type: CardType;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  const t = useTranslations('cardTypes');

  return <SBadge $color={getTypeColor(type)}>{t(`${type}.shortLabel`)}</SBadge>;
}
