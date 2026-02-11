'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';
import { Container } from '../ui/Container';
import { Activity, Menu, X, Search as SearchIcon } from 'lucide-react';

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

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
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

const SearchNavWrapper = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const SearchInput = styled.input`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px 8px 36px;
  border-radius: 20px;
  font-size: 0.875rem;
  width: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    width: 220px;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}15;
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
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

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

            <RightSection>
              <NavList>
                <li><NavLink href="/">Home</NavLink></li>
                <li><NavLink href="/calculadoras">Calculadoras</NavLink></li>
                <li><NavLink href="/artigos">Artigos</NavLink></li>
              </NavList>

              <SearchNavWrapper onSubmit={handleSearchSubmit}>
                <SearchIcon size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px' }} />
                <SearchInput
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchNavWrapper>

              <MobileMenuBtn onClick={toggleMenu} aria-label="Menu principal">
                {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
              </MobileMenuBtn>
            </RightSection>
          </Nav>
        </Container>
      </HeaderWrapper>

      <MobileOverlay $isOpen={isMenuOpen} onClick={closeMenu} />
      <MobileMenu $isOpen={isMenuOpen}>
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '20px' }}>
          <SearchIcon size={18} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <SearchInput
            type="text"
            placeholder="Buscar no site..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingLeft: '40px' }}
          />
        </form>
        <MobileNavLink href="/" onClick={closeMenu}>Home <Activity size={20} /></MobileNavLink>
        <MobileNavLink href="/calculadoras" onClick={closeMenu}>Calculadoras</MobileNavLink>
        <MobileNavLink href="/artigos" onClick={closeMenu}>Artigos</MobileNavLink>
        <div style={{ marginTop: '20px', fontSize: '0.875rem', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ferramentas</div>
        <MobileNavLink href="/calculadoras/imc" onClick={closeMenu} style={{ fontSize: '1rem', border: 'none', padding: '8px 0' }}>Calculadora de IMC</MobileNavLink>
        <MobileNavLink href="/calculadoras/calorias" onClick={closeMenu} style={{ fontSize: '1rem', border: 'none', padding: '8px 0' }}>Calculadora de Calorias</MobileNavLink>
        <MobileNavLink href="/calculadoras/macros" onClick={closeMenu} style={{ fontSize: '1rem', border: 'none', padding: '8px 0' }}>Calculadora de Macros</MobileNavLink>
        <MobileNavLink href="/calculadoras/agua" onClick={closeMenu} style={{ fontSize: '1rem', border: 'none', padding: '8px 0' }}>Calculadora de Água</MobileNavLink>
        <MobileNavLink href="/calculadoras/gordura-corporal" onClick={closeMenu} style={{ fontSize: '1rem', border: 'none', padding: '8px 0' }}>Gordura Corporal</MobileNavLink>
        <MobileNavLink href="/calculadoras/peso-ideal" onClick={closeMenu} style={{ fontSize: '1rem', border: 'none', padding: '8px 0' }}>Peso Ideal</MobileNavLink>
      </MobileMenu>

      {/* Spacer to prevent content from going under fixed header */}
      <div style={{ height: '80px' }} />
    </>
  );
}
