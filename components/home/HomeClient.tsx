'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Container, Section } from '@/components/ui/Container';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import AdsenseBanner from '@/components/ads/AdsenseBanner';
import { Calculator, Flame, HeartPulse, ChevronRight, ArrowRight } from 'lucide-react';

const Hero = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 900;
  
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h2 {
    margin-bottom: 0;
    font-size: 2.25rem;
    font-weight: 800;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
    
    h2 { font-size: 1.75rem; }
  }
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 8px 16px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.primary}10;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateX(5px);
  }
`;

const ViewMoreSection = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export default function HomeClient() {
    return (
        <>
            <Hero>
                <Container>
                    <Title>Sua Jornada Saudável Começa Aqui</Title>
                    <Subtitle>
                        Ferramentas gratuitas e conteúdo baseado em ciência para ajudar você a conquistar o corpo e a saúde que sempre desejou.
                    </Subtitle>
                    <Button variant="secondary" size="lg" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
                        Explorar Ferramentas <ChevronRight />
                    </Button>
                </Container>
            </Hero>

            <Section id="ferramentas">
                <Container>
                    <AdsenseBanner label="Publicidade" />

                    <SectionHeader>
                        <h2>Ferramentas Gratuitas</h2>
                        <ViewAllLink href="/calculadoras">
                            Todas as Calculadoras <ArrowRight size={20} />
                        </ViewAllLink>
                    </SectionHeader>

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
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }} $fullWidth>Acessar Calculadora</Button>
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
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }} $fullWidth>Acessar Calculadora</Button>
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
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }} $fullWidth>Acessar Calculadora</Button>
                            </CalcCard>
                        </Link>
                    </Grid>

                    <ViewMoreSection>
                        <Link href="/calculadoras">
                            <Button variant="primary" size="lg">Explorar Outras Ferramentas</Button>
                        </Link>
                    </ViewMoreSection>
                </Container>
            </Section>

            <Section style={{ backgroundColor: '#fff' }}>
                <Container>
                    <SectionHeader>
                        <h2>Últimos Artigos</h2>
                        <ViewAllLink href="/artigos">
                            Ver todos os artigos <ArrowRight size={20} />
                        </ViewAllLink>
                    </SectionHeader>

                    <ArticlesGrid>
                        <Card>
                            <CardTitle>Como Emagrecer de Forma Saudável</CardTitle>
                            <CardDescription>Aprenda as estratégias baseadas em ciência para perder peso com saúde e manter os resultados...</CardDescription>
                            <Link href="/artigos/como-emagrecer-saudavel">
                                <Button variant="outline" size="sm" $fullWidth>Ler Guia Completo</Button>
                            </Link>
                        </Card>
                        <Card>
                            <CardTitle>O Segredo do Déficit Calórico</CardTitle>
                            <CardDescription>Descubra quantas calorias você precisa queimar para emagrecer de forma consistente e saudável...</CardDescription>
                            <Link href="/artigos/deficit-calorico">
                                <Button variant="outline" size="sm" $fullWidth>Ler Artigo</Button>
                            </Link>
                        </Card>
                    </ArticlesGrid>

                    <ViewMoreSection>
                        <Link href="/artigos">
                            <Button variant="primary" size="lg">Conferir Todos os Artigos</Button>
                        </Link>
                    </ViewMoreSection>
                </Container>
            </Section>

            <Section>
                <Container>
                    <AdsenseBanner label="Oportunidade de Saúde" height="300px" />
                </Container>
            </Section>
        </>
    );
}
