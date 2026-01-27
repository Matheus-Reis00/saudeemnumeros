'use client';

import React from 'react';
import styled from 'styled-components';
import { Container } from '../ui/Container';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h4`
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.875rem;
`;

export default function Footer() {
    return (
        <FooterWrapper>
            <Container>
                <FooterGrid>
                    <FooterColumn>
                        <Title>Calculadoras</Title>
                        <a href="/calculadoras/imc">IMC</a>
                        <a href="/calculadoras/calorias">Calorias Diárias</a>
                        <a href="/calculadoras/peso-ideal">Peso Ideal</a>
                    </FooterColumn>
                    <FooterColumn>
                        <Title>Conteúdo</Title>
                        <a href="/artigos">Artigos de Saúde</a>
                        <a href="/artigos/como-emagrecer-com-saude">Como Emagrecer</a>
                        <a href="/artigos/o-que-e-imc">O que é IMC</a>
                    </FooterColumn>
                    <FooterColumn>
                        <Title>Sobre</Title>
                        <a href="/sobre">Sobre Nós</a>
                        <a href="/contato">Contato</a>
                        <a href="/privacidade">Privacidade</a>
                    </FooterColumn>
                </FooterGrid>
                <Copyright>
                    &copy; {new Date().getFullYear()} Saúde em Números. Todos os direitos reservados.
                </Copyright>
            </Container>
        </FooterWrapper>
    );
}
