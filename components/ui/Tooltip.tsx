'use client';

import React from 'react';
import styled from 'styled-components';
import { Info } from 'lucide-react';

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: help;
`;

const TooltipText = styled.span`
  visibility: hidden;
  width: 220px;
  background-color: ${({ theme }) => theme.colors.text};
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 100;
  bottom: 140%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.3s ease;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.5;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  pointer-events: none;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.text} transparent transparent transparent;
  }

  ${TooltipContainer}:hover & {
    visibility: visible;
    opacity: 1;
    bottom: 125%;
  }
`;

export const Tooltip = ({ content, children }: TooltipProps) => {
    return (
        <TooltipContainer>
            {children}
            <TooltipText>{content}</TooltipText>
        </TooltipContainer>
    );
};
