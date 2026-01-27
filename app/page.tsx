'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Container, Section } from '@/components/ui/Container';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import AdsenseBanner from '@/components/ads/AdsenseBanner';
import { Calculator, Flame, HeartPulse, ChevronRight } from 'lucide-react';

const Hero = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  opacity: 0.9;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const CalcCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const IconWrapper = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background-color: ${({ $color }) => $color}15;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

export default function Home() {
  return (
    <>
      <Hero>
        <Container>
          <Title>Sua Jornada Saudável Começa Aqui</Title>
          <Subtitle>
            Ferramentas gratuitas e conteúdo baseado em ciência para ajudar você a conquistar o corpo e a saúde que sempre desejou.
          </Subtitle>
          <Button variant="secondary" size="lg" onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}>
            Explorar Ferramentas <ChevronRight />
          </Button>
        </Container>
      </Hero>

      <Section>
        <Container>
          <AdsenseBanner label="Publicidade" />

          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Ferramentas Gratuitas</h2>

          <Grid>
            <Link href="/calculadoras/imc" style={{ display: 'block' }}>
              <CalcCard $interactive>
                <IconWrapper $color="#10B981">
                  <Calculator size={32} />
                </IconWrapper>
                <CardTitle>Calculadora de IMC</CardTitle>
                <CardDescription>
                  Descubra seu Índice de Massa Corporal e saiba se você está na faixa de peso saudável recomendada pela OMS.
                </CardDescription>
                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }}>Acessar Calculadora</Button>
              </CalcCard>
            </Link>

            <Link href="/calculadoras/calorias" style={{ display: 'block' }}>
              <CalcCard $interactive>
                <IconWrapper $color="#3B82F6">
                  <Flame size={32} />
                </IconWrapper>
                <CardTitle>Calculadora de Calorias</CardTitle>
                <CardDescription>
                  Calcule seu TDEE (Gasto Energético Total) e saiba exatamente quantas calorias consumir para emagrecer.
                </CardDescription>
                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }}>Acessar Calculadora</Button>
              </CalcCard>
            </Link>

            <Link href="/calculadoras/peso-ideal" style={{ display: 'block' }}>
              <CalcCard $interactive>
                <IconWrapper $color="#EF4444">
                  <HeartPulse size={32} />
                </IconWrapper>
                <CardTitle>Peso Ideal</CardTitle>
                <CardDescription>
                  Saiba qual o peso ideal para sua altura e sexo, baseado em fórmulas científicas atualizadas.
                </CardDescription>
                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }}>Acessar Calculadora</Button>
              </CalcCard>
            </Link>
          </Grid>
        </Container>
      </Section>

      <Section style={{ backgroundColor: '#fff' }}>
        <Container>
          <h2 style={{ marginBottom: '32px' }}>Últimos Artigos</h2>
          <ArticlesGrid>
            {/* Estes viriam do getArticles futuramente, mock por enquanto para a home carregar rápido */}
            <Card>
              <CardTitle>O que é IMC e como calcular?</CardTitle>
              <CardDescription>Entenda o Índice de Massa Corporal e descubra se o seu peso está dentro do esperado...</CardDescription>
              <Link href="/artigos/o-que-e-imc">
                <Button variant="outline" size="sm">Ler Artigo</Button>
              </Link>
            </Card>
            <Card>
              <CardTitle>O Segredo do Déficit Calórico</CardTitle>
              <CardDescription>Descubra quantas calorias você precisa queimar para emagrecer de forma consistente...</CardDescription>
              <Link href="/artigos/deficit-calorico">
                <Button variant="outline" size="sm">Ler Artigo</Button>
              </Link>
            </Card>
          </ArticlesGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <AdsenseBanner label="Oportunidade" height="300px" />
        </Container>
      </Section>
    </>
  );
}
