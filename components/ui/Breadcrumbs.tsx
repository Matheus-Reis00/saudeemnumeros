'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CurrentPage = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 120px;
  }
`;

interface BreadcrumbItem {
    name: string;
    item: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <Nav aria-label="Breadcrumb">
            <BreadcrumbLink href="/">
                <Home size={14} />
                <span>Home</span>
            </BreadcrumbLink>

            {items.map((item, index) => (
                <React.Fragment key={item.item}>
                    <ChevronRight size={14} />
                    {index === items.length - 1 ? (
                        <CurrentPage>{item.name}</CurrentPage>
                    ) : (
                        <BreadcrumbLink href={item.item}>
                            {item.name}
                        </BreadcrumbLink>
                    )}
                </React.Fragment>
            ))}
        </Nav>
    );
}
