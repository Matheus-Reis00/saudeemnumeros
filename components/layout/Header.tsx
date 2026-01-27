'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from '../ui/Container';
import { Activity } from 'lucide-react';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 100;
  padding: ${({ theme }) => theme.spacing.md} 0;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  
  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

export default function Header() {
    return (
        <HeaderWrapper>
            <Container>
                <Nav>
                    <Logo href="/">
                        <Activity size={24} />
                        Saúde<span>EmNúmeros</span>
                    </Logo>

                    <NavList>
                        <li><NavLink href="/">Home</NavLink></li>
                        <li><NavLink href="/calculadoras/imc">IMC</NavLink></li>
                        <li><NavLink href="/calculadoras/calorias">Calorias</NavLink></li>
                        <li><NavLink href="/artigos">Artigos</NavLink></li>
                    </NavList>
                </Nav>
            </Container>
        </HeaderWrapper>
    );
}
