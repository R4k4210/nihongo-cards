'use client';

import styled from 'styled-components';

export const SFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const baseInputStyles = `
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-size: 1rem;
  font-family: 'Noto Sans JP', 'Inter', sans-serif;
  transition: all 0.2s ease;
  outline: none;
  height: 58px;
`;

export const SInput = styled.input<{ $large?: boolean }>`
  ${baseInputStyles}
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ $large }) => ($large ? '1.75rem' : '1rem')};
  text-align: ${({ $large }) => ($large ? 'center' : 'left')};
  font-weight: ${({ $large }) => ($large ? '500' : '400')};

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentGlow};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const STextarea = styled.textarea`
  ${baseInputStyles}
  height: auto;
  min-height: 46px;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentGlow};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SSelect = styled.select`
  ${baseInputStyles}
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: inherit;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8a8b8' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentGlow};
  }

  option {
    background: ${({ theme }) => theme.colors.bgCard};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const SHint = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
