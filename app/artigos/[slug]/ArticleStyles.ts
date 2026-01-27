'use client';

import styled from 'styled-components';

export const ArticleHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2rem;
  }
`;

export const Meta = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  h2 { font-size: 1.75rem; margin-top: 3rem; margin-bottom: 1.5rem; }
  h3 { font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; }
  p { font-size: 1.125rem; line-height: 1.8; color: #374151; margin-bottom: 1.5rem; }
  ul, ol { margin-bottom: 2rem; padding-left: 1.5rem; }
  li { margin-bottom: 0.75rem; font-size: 1.125rem; color: #374151;}
  strong { color: ${({ theme }) => theme.colors.text}; font-weight: 700; }
  
  /* Estilo para calculadoras dentro do MDX */
  & > div {
    margin: 3rem 0;
  }
`;
