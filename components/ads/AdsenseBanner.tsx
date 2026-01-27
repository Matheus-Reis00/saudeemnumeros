'use client';

import React from 'react';
import styled from 'styled-components';

interface AdsenseBannerProps {
    label?: string;
    height?: string;
}

const AdWrapper = styled.div<{ $height?: string }>`
  width: 100%;
  max-width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ theme }) => theme.colors.ads};
  border: 1px dashed ${({ theme }) => theme.colors.warning}50;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  min-height: ${({ $height }) => $height || '250px'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const AdLabel = styled.span`
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textLight};
  position: absolute;
  top: 4px;
  right: 8px;
`;

const AdPlaceholderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.warning};
  opacity: 0.6;
`;

export default function AdsenseBanner({ label = "Publicidade", height }: AdsenseBannerProps) {
    return (
        <AdWrapper $height={height}>
            <AdLabel>{label}</AdLabel>
            <AdPlaceholderContent>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="14" x="2" y="3" rx="2" ry="2" />
                    <line x1="2" x2="22" y1="10" y2="10" />
                    <line x1="12" x2="12" y1="15" y2="21" />
                </svg>
                <span style={{ marginTop: '8px', fontSize: '14px' }}>Espaço para Adsense / Afiliados</span>
            </AdPlaceholderContent>
        </AdWrapper>
    );
}
