'use client';

import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface SButtonProps {
  $variant: ButtonVariant;
  $small?: boolean;
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.accent};
    color: white;
    box-shadow: 0 4px 15px ${({ theme }) => theme.colors.accentGlow};
    border: none;

    &:hover {
      background: ${({ theme }) => theme.colors.accentLight};
      transform: translateY(-1px);
      box-shadow: 0 6px 20px ${({ theme }) => theme.colors.accentGlow};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.bgCard};
    color: ${({ theme }) => theme.colors.textSecondary};
    border: 1px solid ${({ theme }) => theme.colors.border};

    &:hover {
      background: ${({ theme }) => theme.colors.bgCardHover};
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  `,
  danger: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
      color: white;
    }
  `,
};

export const SButton = styled.button<SButtonProps>`
  padding: ${({ $small }) => ($small ? '0.4rem 0.8rem' : '0.75rem 1.75rem')};
  border-radius: 10px;
  font-size: ${({ $small }) => ($small ? '0.8rem' : '0.95rem')};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${({ $variant }) => variantStyles[$variant]}
`;
