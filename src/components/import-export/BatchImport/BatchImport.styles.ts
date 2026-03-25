'use client';

import styled from 'styled-components';

export const SSection = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  margin-top: 1.5rem;
  overflow: hidden;
`;

export const SHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-family: inherit;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.bgCard};
  }
`;

export const SHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
`;

export const STitle = styled.h3`
  font-size: 1.1rem;
`;

export const SDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
`;

export const SChevron = styled.span<{ $open: boolean }>`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: transform 0.2s;
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
`;

export const SContent = styled.div`
  padding: 0 2rem 2rem;
`;

export const STextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.875rem;
  font-family: 'Noto Sans JP', monospace;
  resize: vertical;
  outline: none;
  transition: border-color 0.2s;
  line-height: 1.6;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentGlow};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SFormatHint = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.6;

  code {
    color: ${({ theme }) => theme.colors.accentLight};
    font-family: monospace;
  }
`;

export const SPreviewList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 200px;
  overflow-y: auto;
`;

export const SPreviewItem = styled.div<{ $status: 'ok' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8rem;
  background: ${({ theme, $status }) => ($status === 'ok' ? `${theme.colors.success}15` : `${theme.colors.accent}15`)};
  color: ${({ theme, $status }) => ($status === 'ok' ? theme.colors.success : theme.colors.accent)};
`;

export const SActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
`;

export const SCount = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;
