'use client';

import styled from 'styled-components';

export const SStudyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
`;

export const SProgressWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: center;
`;

export const SProgressText = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SProgressBarContainer = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => theme.colors.bgCard};
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.75rem;
`;

export const SProgressBar = styled.div<{ $width: number }>`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.accentLight});
  border-radius: 3px;
  transition: width 0.4s ease;
  width: ${({ $width }) => $width}%;
`;

export const SStudyCardContainer = styled.div`
  width: 100%;
  max-width: 450px;
`;

export const SControls = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SEmptyStudy = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

export const SEmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const SEmptyTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export const SEmptyText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;
