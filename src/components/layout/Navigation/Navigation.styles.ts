'use client';

import styled from 'styled-components';

export const SNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SLangButton = styled.button`
  padding: 0.4rem 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgCard};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.7rem;
  font-weight: 600;
  transition: all 0.2s ease;
  font-family: inherit;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.textPrimary};
    background: ${({ theme }) => theme.colors.bgCardHover};
  }
`;

export const SSettingsButton = styled.button<{ $active?: boolean }>`
  padding: 0.6rem 0.6rem 0.6rem 0.2rem;
  border: none;
  background: transparent;
  color: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.textMuted)};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const SNavButton = styled.button<{ $active?: boolean }>`
  padding: 0.55rem 1rem;
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.accent : theme.colors.bgCard)};
  color: ${({ $active, theme }) => ($active ? 'white' : theme.colors.textSecondary)};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
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
