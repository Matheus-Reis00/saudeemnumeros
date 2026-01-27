'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from '../ui/Container';
import { Activity, Menu, X } from 'lucide-react';

const HeaderWrapper = styled.header<{ $scrolled: boolean }>`
  background-color: ${({ theme, $scrolled }) => $scrolled ? 'rgba(255, 255, 255, 0.95)' : theme.colors.surface};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(10px)' : 'none'};
  border-bottom: 1px solid ${({ theme, $scrolled }) => $scrolled ? theme.colors.border : 'transparent'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: ${({ theme, $scrolled }) => $scrolled ? '12px' : '20px'} 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none'};
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
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary};
  z-index: 1001;
  text-decoration: none;
  
  span {
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;
  position: relative;
  text-decoration: none;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.2s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    &:after {
      width: 100%;
    }
  }
`;

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  z-index: 1001;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: ${({ $isOpen }) => $isOpen ? 'block' : 'none'};
  z-index: 998;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: 999;
  padding: 100px ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  transform: translateX(${({ $isOpen }) => $isOpen ? '0' : '100%'});
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const MobileNavLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <HeaderWrapper $scrolled={isScrolled}>
        <Container>
          <Nav>
            <Logo href="/" onClick={closeMenu}>
              <Activity size={32} />
              Saúde<span>EmNúmeros</span>
            </Logo>

            <NavList>
              <li><NavLink href="/">Home</NavLink></li>
              <li><NavLink href="/calculadoras">Calculadoras</NavLink></li>
              <li><NavLink href="/artigos">Artigos</NavLink></li>
            </NavList>

            <MobileMenuBtn onClick={toggleMenu} aria-label="Menu principal">
              {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </MobileMenuBtn>
          </Nav>
        </Container>
      </HeaderWrapper>

      <MobileOverlay $isOpen={isMenuOpen} onClick={closeMenu} />
      <MobileMenu $isOpen={isMenuOpen}>
        <MobileNavLink href="/" onClick={closeMenu}>Home <Activity size={20} /></MobileNavLink>
        <MobileNavLink href="/calculadoras" onClick={closeMenu}>Calculadoras</MobileNavLink>
        <MobileNavLink href="/artigos" onClick={closeMenu}>Artigos</MobileNavLink>
        <div style={{ marginTop: '20px', fontSize: '0.875rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' }}>Ferramentas</div>
        <MobileNavLink href="/calculadoras/imc" onClick={closeMenu} style={{ fontSize: '1rem', border: 'none' }}>Calculadora de IMC</MobileNavLink>
        <MobileNavLink href="/calculadoras/calorias" onClick={closeMenu} style={{ fontSize: '1rem', border: 'none' }}>Calculadora de Calorias</MobileNavLink>
        <MobileNavLink href="/calculadoras/peso-ideal" onClick={closeMenu} style={{ fontSize: '1rem', border: 'none' }}>Peso Ideal</MobileNavLink>
      </MobileMenu>

      {/* Spacer to prevent content from going under fixed header */}
      <div style={{ height: '80px' }} />
    </>
  );
}
