'use client';

import styled from 'styled-components';

export const SRubyWord = styled.span<{ $fontSize?: string }>`
  font-family: 'Noto Sans JP', sans-serif;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  font-size: ${({ $fontSize }) => $fontSize || 'inherit'};

  ruby {
    font-size: inherit;
    text-align: center;
  }

  ruby rt {
    font-size: 0.45em;
    color: ${({ theme }) => theme.colors.accentLight};
    font-weight: 400;
    letter-spacing: 0.02em;
  }
`;
