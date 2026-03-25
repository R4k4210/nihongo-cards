'use client';

import styled from 'styled-components';

export const SFlashcard = styled.div<{ $height?: string }>`
  perspective: 1000px;
  height: ${({ $height }) => $height || '220px'};
  cursor: pointer;
`;

export const SFlashcardInner = styled.div<{ $flipped?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
  transform: ${({ $flipped }) => ($flipped ? 'rotateY(180deg)' : 'none')};
`;

const SFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1.5rem;
`;

export const SFront = styled(SFace)`
  background: ${({ theme }) => theme.colors.bgSecondary};
`;

export const SBack = styled(SFace)`
  background: ${({ theme }) => theme.colors.bgCard};
  transform: rotateY(180deg);
  gap: 0.6rem;
`;

export const SKanjiDisplay = styled.span<{ $fontSize?: string }>`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: ${({ $fontSize }) => $fontSize || '3rem'};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.3;
`;

export const SMeaning = styled.div<{ $fontSize?: string }>`
  font-size: ${({ $fontSize }) => $fontSize || '1.3rem'};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  margin-top: 0.25rem;
`;

export const SDetail = styled.div`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

export const SCardImage = styled.img`
  max-width: 80%;
  max-height: 80px;
  object-fit: contain;
  border-radius: 8px;
`;

export const SFlipHint = styled.span`
  position: absolute;
  bottom: 0.75rem;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.5;
`;

export const SBadgePosition = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
`;

export const SCardActions = styled.div`
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  display: flex;
  gap: 0.4rem;
  opacity: 0;
  transition: opacity 0.2s;

  ${SFlashcard}:hover & {
    opacity: 1;
  }
`;

export const SActionBtn = styled.button<{ $danger?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme, $danger }) => ($danger ? '#dc3545' : theme.colors.accent)};
    color: white;
    border-color: ${({ theme, $danger }) => ($danger ? '#dc3545' : theme.colors.accent)};
  }
`;
