'use client';

import styled from 'styled-components';

export const SSection = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }
`;

export const STitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
`;

export const SFormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SFormActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

export const SFuriganaHelper = styled.div`
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 1rem;
  margin-top: 0.5rem;
`;

export const SFuriganaHelperTitle = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const SFuriganaPreview = styled.div`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  padding: 0.5rem;
  line-height: 1.5;
`;

export const SPreviewSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SPreviewTitle = styled.h3`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const SPreviewRow = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const SPreviewCard = styled.div<{ $variant: 'front' | 'back' }>`
  flex: 1;
  min-width: 250px;
`;

export const SPreviewLabel = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`;

export const SPreviewBox = styled.div<{ $variant: 'front' | 'back' }>`
  background: ${({ theme, $variant }) => ($variant === 'front' ? theme.colors.bgSecondary : theme.colors.bgCard)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  gap: 0.5rem;
  position: relative;
`;
