'use client';

import styled from 'styled-components';

export const SSection = styled.div`
  background: ${({ theme }) => theme.colors.bgSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 2rem;
  margin-top: 1.5rem;
`;

export const STitle = styled.h3`
  margin-bottom: 1rem;
`;

export const SActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const SHiddenInput = styled.input`
  display: none;
`;
