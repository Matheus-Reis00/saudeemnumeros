'use client';

import React from 'react';
import styled from 'styled-components';
import { MessageCircle, Link as LinkIcon, Share2 } from 'lucide-react';

const ShareWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.md} 0;
  flex-wrap: wrap;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 8px;
  }
`;

const ShareButton = styled.button<{ $variant: 'whatsapp' | 'copy' | 'generic' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 50px;
  border: none;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex: 1;
  min-width: fit-content;
  
  background-color: ${({ $variant }) =>
        $variant === 'whatsapp' ? '#25D366' :
            $variant === 'copy' ? '#F3F4F6' :
                '#3B82F6'};
    
  color: ${({ $variant }) => $variant === 'copy' ? '#374151' : 'white'};
  border: 1px solid ${({ $variant }) => $variant === 'copy' ? '#E5E7EB' : 'transparent'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 0.75rem;
    gap: 4px;
    
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

interface Props {
    title: string;
    url: string;
}

export default function ShareButtons({ title, url }: Props) {
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const shareText = `Confira este artigo: ${title}`;
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(shareText);

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank');
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        alert('Link copiado para a área de transferência!');
    };

    const shareGeneric = () => {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            }).catch(console.error);
        } else {
            copyToClipboard();
        }
    };

    const showShare = isMounted && typeof navigator !== 'undefined' && !!(navigator as any).share;

    return (
        <ShareWrapper>
            <ShareButton $variant="whatsapp" onClick={shareOnWhatsApp}>
                <MessageCircle size={18} /> WhatsApp
            </ShareButton>
            <ShareButton $variant="copy" onClick={copyToClipboard}>
                <LinkIcon size={18} /> Copiar Link
            </ShareButton>
            {showShare && (
                <ShareButton $variant="generic" onClick={shareGeneric}>
                    <Share2 size={18} /> Compartilhar
                </ShareButton>
            )}
        </ShareWrapper>
    );
}
