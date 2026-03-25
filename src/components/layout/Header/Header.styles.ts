'use client';

import styled from 'styled-components';

export const SHeader = styled.header`
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.bgSecondary} 0%,
    ${({ theme }) => theme.colors.bgPrimary} 100%
  );
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SHeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SLogoKanji = styled.span`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  text-shadow: 0 0 20px ${({ theme }) => theme.colors.accentGlow};
`;

export const SLogoText = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const SLogoSub = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 400;
`;

export const SStatsBar = styled.div`
  max-width: 1200px;
  margin: 1.5rem auto 0;
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SStatChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.bgCard};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  font-size: 0.8rem;
`;

export const SStatNumber = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentLight};
`;

export const SStatLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;
