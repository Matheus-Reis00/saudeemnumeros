'use client';

import styled from 'styled-components';

export const ArticleHeader = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const FeaturedImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 500px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.md};
  background-color: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  position: relative;
  display: block;

  img {
    object-fit: contain;
  }
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
  
  /* Estilo Premium para tabelas dentro do MDX */
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 3rem 0;
    font-size: 1rem;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid ${({ theme }) => theme.colors.border};
    
    /* Permite scroll em telas pequenas */
    display: block;
    overflow-x: auto;
    white-space: nowrap;

    @media (min-width: 800px) {
      display: table;
      white-space: normal;
    }
  }

  th {
    background-color: #f1f5f9;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    padding: 1.25rem 1rem;
    text-align: left;
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 1.125rem 1rem;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
    color: #4b5563;
    line-height: 1.5;
  }

  tr:last-child td {
    border-bottom: none;
  }

  /* Zebra stripping */
  tr:nth-child(even) {
    background-color: #f8fafc;
  }

  tr:hover {
    background-color: #eff6ff;
    td { color: ${({ theme }) => theme.colors.primary}; }
  }

  /* Estilo para itens em destaque dentro da tabela */
  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  /* Estilo para calculadoras dentro do MDX */
  & > div {
    margin: 3rem 0;
  }
`;
