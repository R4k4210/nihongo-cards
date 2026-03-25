'use client';

import { getTypeColor, getTypeShortLabel } from '~/constants';
import { CardType } from '~/types';
import { SBadge } from './TypeBadge.styles';

interface TypeBadgeProps {
  type: CardType;
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return <SBadge $color={getTypeColor(type)}>{getTypeShortLabel(type)}</SBadge>;
}
