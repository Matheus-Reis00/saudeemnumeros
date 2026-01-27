'use client';

import styled from 'styled-components';
import { Card } from '@/components/ui/Card';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const ArticleCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ArticleMeta = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: block;
`;
