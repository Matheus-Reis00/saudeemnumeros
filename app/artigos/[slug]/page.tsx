import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui/Container';
import AdsenseBanner from '@/components/ads/AdsenseBanner';
import { getArticleBySlug } from '@/lib/mdx';
import { constructMetadata, getSchemaArticle, getSchemaBreadcrumbs } from '@/lib/seo';
import * as S from './ArticleStyles';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) return constructMetadata({ title: 'Artigo não encontrado' });

    return constructMetadata({
        title: article.meta.title,
        description: article.meta.description,
        canonical: `https://saudeemnumeros.com.br/artigos/${slug}`,
    });
}

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const jsonLd = getSchemaArticle({
        title: article.meta.title,
        description: article.meta.description,
        author: 'Redação Saúde em Números',
        datePublished: article.meta.date,
        dateModified: article.meta.date,
        image: 'https://saudeemnumeros.com.br/og-image.jpg', // Idealmente viria do mdx
        url: `https://saudeemnumeros.com.br/artigos/${slug}`,
    });

    const breadcrumbsLd = getSchemaBreadcrumbs([
        { name: 'Home', item: '/' },
        { name: 'Artigos', item: '/artigos' },
        { name: article.meta.title, item: `/artigos/${slug}` },
    ]);

    return (
        <Container>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
            />

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
