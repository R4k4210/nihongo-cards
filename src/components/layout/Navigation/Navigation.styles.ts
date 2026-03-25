'use client';

import styled from 'styled-components';

export const SNav = styled.nav`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SNavButton = styled.button<{ $active?: boolean }>`
  padding: 0.6rem 1.25rem;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.bgCard)};
  color: ${({ $active, theme }) => ($active ? 'white' : theme.colors.textSecondary)};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  font-family: inherit;
  box-shadow: ${({ $active, theme }) => ($active ? `0 0 15px ${theme.colors.accentGlow}` : 'none')};

  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.bgCardHover)};
    color: ${({ $active, theme }) => ($active ? 'white' : theme.colors.textPrimary)};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 480px) {
    flex: 1;
    text-align: center;
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
  }
`;
