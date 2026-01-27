'use client';

import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.main};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: 700;
  }

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Custom selection */
  ::selection {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;
