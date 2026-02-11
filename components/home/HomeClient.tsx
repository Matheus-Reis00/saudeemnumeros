'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { Container, Section } from '@/components/ui/Container';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calculator, Flame, HeartPulse, Droplets, PieChart, Ruler } from 'lucide-react';

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  background-color: #fff;
`;

const NewspaperGrid = styled.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const MainStory = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  .image-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    background-color: ${({ theme }) => theme.colors.primary}10;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: hidden;
    position: relative;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    line-height: 1.1;
    margin: ${({ theme }) => theme.spacing.sm} 0;
    color: ${({ theme }) => theme.colors.text};
    &:hover { color: ${({ theme }) => theme.colors.primary}; }
  }

  p {
    font-size: 1.125rem;
    color: #4b5563;
    line-height: 1.6;
  }
`;

const SideStories = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const SideStory = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:last-child { border-bottom: none; }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    &:hover { color: ${({ theme }) => theme.colors.primary}; }
  }

  p {
    font-size: 0.9rem;
    color: #6b7280;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const SecondaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const MiniCard = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 8px;
    &:hover { color: ${({ theme }) => theme.colors.primary}; }
  }
  p {
    font-size: 0.85rem;
    color: #6b7280;
    line-height: 1.4;
  }
`;

const CalcSection = styled.section`
  background-color: #f9fafb;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const ArchiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const DateLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.05em;
`;

export default function HomeClient({ latestArticles = [] }: { latestArticles?: any[] }) {
    // Encontra o primeiro artigo com imagem para ser o destaque principal
    const mainStoryIndex = latestArticles.findIndex(article => article.image);

    // Se não encontrar nenhum com imagem, usa o primeiro mesmo (fallback de segurança)
    const activeMainIndex = mainStoryIndex !== -1 ? mainStoryIndex : 0;

    const mainStory = latestArticles[activeMainIndex];

    // Filtra para remover o artigo que foi usado no destaque das outras listas
    const remainingArticles = latestArticles.filter((_, index) => index !== activeMainIndex);

    const sideStories = remainingArticles.slice(0, 3);
    const middleStories = remainingArticles.slice(3, 7);
    const archiveStories = remainingArticles.slice(7);

    return (
        <>
            <HeroSection>
                <Container>
                    <NewspaperGrid>
                        {mainStory && (
                            <Link href={`/artigos/${mainStory.slug}`} style={{ textDecoration: 'none' }}>
                                <MainStory>
                                    {mainStory.image && (
                                        <div className="image-wrapper">
                                            <Image
                                                src={mainStory.image}
                                                alt={mainStory.title}
                                                fill
                                                priority
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    <DateLabel>{new Date(mainStory.date).toLocaleDateString('pt-BR')}</DateLabel>
                                    <h2>{mainStory.title}</h2>
                                    <p>{mainStory.description}</p>
                                </MainStory>
                            </Link>
                        )}
                        <SideStories>
                            {sideStories.map((story) => (
                                <Link href={`/artigos/${story.slug}`} key={story.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <SideStory>
                                        <DateLabel>{new Date(story.date).toLocaleDateString('pt-BR')}</DateLabel>
                                        <h3>{story.title}</h3>
                                        <p>{story.description}</p>
                                    </SideStory>
                                </Link>
                            ))}
                        </SideStories>
                    </NewspaperGrid>
                </Container>
            </HeroSection>

            <Container>
                <SecondaryGrid>
                    {middleStories.map((story) => (
                        <Link href={`/artigos/${story.slug}`} key={story.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <MiniCard>
                                <DateLabel>{new Date(story.date).toLocaleDateString('pt-BR')}</DateLabel>
                                <h4>{story.title}</h4>
                                <p>{story.description}</p>
                            </MiniCard>
                        </Link>
                    ))}
                </SecondaryGrid>
            </Container>

            <CalcSection id="ferramentas">
                <Container>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Ferramentas de Saúde</h2>
                        <p style={{ color: '#6b7280' }}>Calculadoras precisas baseadas em consensos médicos internacionais.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <Link href="/calculadoras/imc" style={{ textDecoration: 'none' }}>
                            <Card $interactive style={{ height: '100%' }}>
                                <HeartPulse color="#10B981" size={40} style={{ marginBottom: '16px' }} />
                                <CardTitle>Calculadora de IMC</CardTitle>
                                <CardDescription>Saiba se seu peso está saudável segundo a OMS.</CardDescription>
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }} $fullWidth>Calcular agora</Button>
                            </Card>
                        </Link>

                        <Link href="/calculadoras/calorias" style={{ textDecoration: 'none' }}>
                            <Card $interactive style={{ height: '100%' }}>
                                <Flame color="#3B82F6" size={40} style={{ marginBottom: '16px' }} />
                                <CardTitle>Gasto Calórico (TDEE)</CardTitle>
                                <CardDescription>Descubra quantas calorias seu corpo queima por dia.</CardDescription>
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }} $fullWidth>Calcular agora</Button>
                            </Card>
                        </Link>

                        <Link href="/calculadoras/macros" style={{ textDecoration: 'none' }}>
                            <Card $interactive style={{ height: '100%' }}>
                                <PieChart color="#F59E0B" size={40} style={{ marginBottom: '16px' }} />
                                <CardTitle>Calculadora de Macros</CardTitle>
                                <CardDescription>Divisão de proteínas, gorduras e carboidratos para sua dieta.</CardDescription>
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }} $fullWidth>Calcular agora</Button>
                            </Card>
                        </Link>

                        <Link href="/calculadoras/agua" style={{ textDecoration: 'none' }}>
                            <Card $interactive style={{ height: '100%' }}>
                                <Droplets color="#0EA5E9" size={40} style={{ marginBottom: '16px' }} />
                                <CardTitle>Ingestão de Água</CardTitle>
                                <CardDescription>Calcule quanto de água você deve beber baseado no seu peso.</CardDescription>
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }} $fullWidth>Calcular agora</Button>
                            </Card>
                        </Link>

                        <Link href="/calculadoras/gordura-corporal" style={{ textDecoration: 'none' }}>
                            <Card $interactive style={{ height: '100%' }}>
                                <Ruler color="#8B5CF6" size={40} style={{ marginBottom: '16px' }} />
                                <CardTitle>Percentual de Gordura</CardTitle>
                                <CardDescription>Estime sua gordura corporal via método da Marinha EUA.</CardDescription>
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }} $fullWidth>Calcular agora</Button>
                            </Card>
                        </Link>

                        <Link href="/calculadoras/peso-ideal" style={{ textDecoration: 'none' }}>
                            <Card $interactive style={{ height: '100%' }}>
                                <Calculator color="#EF4444" size={40} style={{ marginBottom: '16px' }} />
                                <CardTitle>Peso Ideal</CardTitle>
                                <CardDescription>Estimativa de peso baseado em fórmulas científicas.</CardDescription>
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto' }} $fullWidth>Calcular agora</Button>
                            </Card>
                        </Link>
                    </div>
                </Container>
            </CalcSection>

            <Section>
                <Container>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '32px' }}>Veja mais</h2>
                    <ArchiveGrid>
                        {archiveStories.map((story) => (
                            <Link href={`/artigos/${story.slug}`} key={story.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <MiniCard style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                                    <DateLabel>{new Date(story.date).toLocaleDateString('pt-BR')}</DateLabel>
                                    <h4 style={{ fontSize: '1.25rem' }}>{story.title}</h4>
                                    <p>{story.description}</p>
                                </MiniCard>
                            </Link>
                        ))}
                    </ArchiveGrid>
                </Container>
            </Section>
        </>
    );
}
