import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui/Container';
import { CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getAllArticles } from '@/lib/mdx';
import * as S from './ArticlesStyles';

export const metadata: Metadata = {
    title: 'Artigos de Saúde e Emagrecimento | Saúde em Números',
    description: 'Confira nossos artigos informativos sobre dietas, exercícios, IMC e muito mais.',
};

export default async function ArticlesListPage() {
    const articles = await getAllArticles();

    return (
        <Container>
            <Section>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Artigos e Dicas</h1>
                <p style={{ fontSize: '1.25rem', color: '#6B7280', maxWidth: '700px' }}>
                    Conteúdo de qualidade baseado em evidências para guiar você em sua jornada de saúde e bem-estar.
                </p>

                <S.Grid>
                    {articles.map((article) => (
                        <Link href={`/artigos/${article.slug}`} key={article.slug} style={{ display: 'block' }}>
                            <S.ArticleCard $interactive>
                                <S.ArticleMeta>
                                    {new Date(article.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </S.ArticleMeta>
                                <CardTitle>{article.title}</CardTitle>
                                <CardDescription>{article.description}</CardDescription>
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                                    Ler mais
                                </Button>
                            </S.ArticleCard>
                        </Link>
                    ))}
                </S.Grid>
            </Section>
        </Container>
    );
}
