import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui/Container';
import AdsenseBanner from '@/components/ads/AdsenseBanner';
import { getArticleBySlug } from '@/lib/mdx';
import * as S from './ArticleStyles';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) return { title: 'Artigo não encontrado' };

    return {
        title: article.meta.title,
        description: article.meta.description,
    };
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    return (
        <Container>
            <Section>
                <S.ArticleHeader>
                    <S.Title>{article.meta.title}</S.Title>
                    <S.Meta>Publicado em {new Date(article.meta.date).toLocaleDateString('pt-BR')}</S.Meta>
                </S.ArticleHeader>

                <AdsenseBanner label="Publicidade" height="100px" />

                <S.ContentWrapper>
                    {article.content}
                </S.ContentWrapper>

                <AdsenseBanner label="Recomendado" height="250px" />
            </Section>
        </Container>
    );
}
