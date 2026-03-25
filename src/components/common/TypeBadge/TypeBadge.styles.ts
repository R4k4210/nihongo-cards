'use client';

import styled from 'styled-components';

export const SBadge = styled.span<{ $color: string }>`
  padding: 0.25rem 0.65rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: ${({ $color }) => `${$color}26`};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => `${$color}4D`};
`;
