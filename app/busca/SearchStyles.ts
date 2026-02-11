'use client';

import styled from 'styled-components';
import { Card } from '@/components/ui/Card';

export const SearchHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

export const SearchTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

export const FilterBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const SearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
  min-width: 250px;
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-left: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
`;

export const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  min-width: 180px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ResultsCount = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const ArticleCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background-color: #f3f4f6;
`;

export const NoResults = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: ${({ theme }) => theme.colors.textLight};

  svg {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    opacity: 0.5;
  }

  h3 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;
