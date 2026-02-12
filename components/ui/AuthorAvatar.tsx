'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface Props {
    name: string;
    image?: string;
    size?: number;
}

const AvatarContainer = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 2px solid white;
`;

const InitialsAvatar = styled.div<{ $size: number }>`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: ${({ $size }) => $size * 0.4}px;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function AuthorAvatar({ name, image, size = 80 }: Props) {
    // Flag para detectar se a imagem é um placeholder ou vazia
    const hasValidImage = image && image !== '/favicon.ico' && !image.includes('placeholder');

    const getInitials = (fullName: string) => {
        const names = fullName.trim().split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return names[0][0].toUpperCase();
    };

    return (
        <AvatarContainer $size={size}>
            {hasValidImage ? (
                <Image
                    src={image}
                    alt={name}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            ) : (
                <InitialsAvatar $size={size}>
                    {getInitials(name)}
                </InitialsAvatar>
            )}
        </AvatarContainer>
    );
}
