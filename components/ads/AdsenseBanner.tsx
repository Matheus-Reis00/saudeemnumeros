'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';

interface AdsenseBannerProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  responsive?: 'true' | 'false';
  label?: string;
  height?: string;
}

const AdContainer = styled.div<{ $height?: string }>`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.xl} 0;
  text-align: center;
  overflow: hidden;
  min-height: ${({ $height }) => $height || 'auto'};
`;

const AdLabel = styled.span`
  display: block;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 4px;
`;

const Placeholder = styled.div<{ $height?: string }>`
  background-color: ${({ theme }) => theme.colors.ads || '#f0f0f0'};
  border: 1px dashed ${({ theme }) => theme.colors.warning}50;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  height: ${({ $height }) => $height || '100px'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.8rem;
`;

export default function AdsenseBanner({
  slot,
  format = 'auto',
  responsive = 'true',
  label = "Publicidade",
  height
}: AdsenseBannerProps) {
  useEffect(() => {
    if (slot) {
      try {
        if (typeof window !== 'undefined') {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error("Erro ao carregar Adsense:", err);
      }
    }
  }, [slot]);

  return (
    <AdContainer $height={height}>
      <AdLabel>{label}</AdLabel>
      {slot ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-5870578760180014"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      ) : (
        <Placeholder $height={height}>
          Espaço para anúncio (configure o slot ID)
        </Placeholder>
      )}
    </AdContainer>
  );
}
