import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
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
        title: article.meta.metaTitle || article.meta.title,
        description: article.meta.metaDescription || article.meta.description,
        image: article.meta.image || 'https://saudeemnumeros.com.br/og-image.jpg',
        canonical: `https://saudeemnumeros.com.br/artigos/${slug}`,
    });
}

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const articleImage = article.meta.image || '/og-image.jpg';

    const jsonLd = getSchemaArticle({
        title: article.meta.title,
        description: article.meta.description,
        author: 'Redação Saúde em Números',
        datePublished: article.meta.date,
        dateModified: article.meta.date,
        image: article.meta.image,
        url: `https://saudeemnumeros.com.br/artigos/${slug}`,
    });

    const breadcrumbItems = [
        { name: 'Artigos', item: '/artigos' },
        { name: article.meta.title, item: `/artigos/${slug}` },
    ];

    const breadcrumbsLd = getSchemaBreadcrumbs([
        { name: 'Home', item: '/' },
        ...breadcrumbItems
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
                <Breadcrumbs items={breadcrumbItems} />
                <S.ArticleHeader>
                    {article.meta.image && (
                        <S.FeaturedImageContainer>
                            <Image
                                src={article.meta.image}
                                alt={article.meta.title}
                                title={article.meta.title}
                                fill
                                priority
                                sizes="(max-width: 800px) 100vw, 800px"
                            />
                        </S.FeaturedImageContainer>
                    )}
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
