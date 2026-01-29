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
        title: article.meta.metaTitle || article.meta.title,
        description: article.meta.metaDescription || article.meta.description,
        image: article.meta.image || 'https://saudeemnumeros.com.br/og-image.jpg',
        canonical: `https://saudeemnumeros.com.br/artigos/${slug}`,
    });
}

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
        image: articleImage.startsWith('http') ? articleImage : `https://saudeemnumeros.com.br${articleImage}`,
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
                    {article.meta.image && (
                        <S.FeaturedImage
                            src={article.meta.image}
                            alt={article.meta.title}
                            title={article.meta.title}
                            width={1200}
                            height={630}
                            loading="lazy"
                        />
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
