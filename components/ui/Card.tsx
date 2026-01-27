'use client';

import styled from 'styled-components';

export const Card = styled.div<{ $interactive?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;

  ${({ $interactive, theme }) =>
        $interactive &&
        `
    cursor: pointer;
    &:hover {
      box-shadow: ${theme.shadows.md};
      transform: translateY(-4px);
      border-color: ${theme.colors.primary}50;
    }
  `}
`;

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

export const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9375rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;
