'use client';

import styled from 'styled-components';

export const STagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  min-height: 58px;
  align-items: center;
  cursor: text;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentGlow};
  }
`;

export const SPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.6rem;
  background: ${({ theme }) => `${theme.colors.accent}26`};
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => `${theme.colors.accent}4D`};
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const SPillRemove = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
  padding: 0;
  font-size: 0.85rem;
  line-height: 1;
  display: flex;
  align-items: center;
  opacity: 0.7;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`;

export const SInlineInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.875rem;
  font-family: inherit;
  flex: 1;
  min-width: 80px;
  padding: 0.2rem 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;
