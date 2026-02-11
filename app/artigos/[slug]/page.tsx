import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui/Container';
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
        title: (article.meta as any).metaTitle || (article.meta as any).title,
        description: (article.meta as any).metaDescription || (article.meta as any).description,
        image: (article.meta as any).image,
        canonical: `https://saudeemnumeros.com.br/artigos/${slug}`,
    });
}

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import ShareButtons from '@/components/ui/ShareButtons';

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const articleUrl = `https://saudeemnumeros.com.br/artigos/${slug}`;
    const articleTitle = (article.meta as any).title;

    const jsonLd = getSchemaArticle({
        title: articleTitle,
        description: (article.meta as any).description,
        author: 'Redação Saúde em Números',
        datePublished: (article.meta as any).date,
        dateModified: (article.meta as any).date,
        image: (article.meta as any).image,
        url: articleUrl,
    });

    const breadcrumbItems = [
        { name: 'Artigos', item: '/artigos' },
        { name: articleTitle, item: `/artigos/${slug}` },
    ];

    const breadcrumbsLd = getSchemaBreadcrumbs([
        { name: 'Home', item: '/' },
        ...breadcrumbItems
    ]);

    return (
        <Container>
            <script
                key="article-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                key="breadcrumb-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
            />

            <Section>
                <Breadcrumbs items={breadcrumbItems} />
                <S.ArticleHeader>
                    {(article.meta as any).image && (
                        <S.FeaturedImageContainer>
                            <Image
                                src={(article.meta as any).image}
                                alt={articleTitle}
                                title={articleTitle}
                                fill
                                priority
                                sizes="(max-width: 800px) 100vw, 800px"
                            />
                        </S.FeaturedImageContainer>
                    )}
                    <S.Title>{articleTitle}</S.Title>
                    <S.Meta>
                        Publicado em {new Date((article.meta as any).date).toLocaleDateString('pt-BR')}
                    </S.Meta>
                    <ShareButtons title={articleTitle} url={articleUrl} />
                </S.ArticleHeader>

                <S.ContentWrapper>
                    {article.content}
                </S.ContentWrapper>

                <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid #eee' }}>
                    <h3 style={{ marginBottom: '16px', fontSize: '1.25rem' }}>Gostou desse conteúdo? Compartilhe!</h3>
                    <ShareButtons title={articleTitle} url={articleUrl} />
                </div>
            </Section>
        </Container>
    );
}
