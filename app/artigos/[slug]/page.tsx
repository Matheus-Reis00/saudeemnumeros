import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui/Container';
import { getArticleBySlug } from '@/lib/mdx';
import { constructMetadata, getSchemaArticle, getSchemaBreadcrumbs } from '@/lib/seo';
import * as S from './ArticleStyles';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import ShareButtons from '@/components/ui/ShareButtons';
import AuthorAvatar from '@/components/ui/AuthorAvatar';

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

export default async function ArticlePage({ params }: Props) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const articleUrl = `https://saudeemnumeros.com.br/artigos/${slug}`;
    const articleTitle = (article.meta as any).title;
    const author = (article.meta as any).author;

    const jsonLd = getSchemaArticle({
        title: articleTitle,
        description: (article.meta as any).description,
        author: author.name,
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
                    <S.Meta style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AuthorAvatar name={author.name} image={author.image} size={32} />
                        <span>Por <Link href={`/autores/${author.id}`} style={{ color: '#10B981', textDecoration: 'none', fontWeight: 600 }}>{author.name}</Link></span>
                        <span style={{ margin: '0 8px', color: '#ccc' }}>•</span>
                        <span style={{ color: '#3B82F6', fontWeight: 500 }}>Publicado em {new Date((article.meta as any).date).toLocaleDateString('pt-BR')}</span>
                    </S.Meta>
                    <ShareButtons title={articleTitle} url={articleUrl} />
                </S.ArticleHeader>

                <S.ContentWrapper>
                    {article.content}
                </S.ContentWrapper>

                {/* Author Box */}
                <div style={{
                    marginTop: '64px',
                    padding: '32px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    display: 'flex',
                    gap: '24px',
                    alignItems: 'center',
                    border: '1px solid #e2e8f0'
                }}>
                    <AuthorAvatar name={author.name} image={author.image} size={80} />
                    <div>
                        <h4 style={{ margin: 0, fontSize: '1.25rem' }}>
                            <Link href={`/autores/${author.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>{author.name}</Link>
                        </h4>
                        <p style={{ margin: '4px 0 8px', fontSize: '0.875rem', color: '#10B981', fontWeight: 600 }}>{author.role}</p>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>{author.bio}</p>
                    </div>
                </div>

                <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #eee' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <div>
                            <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>Gostou desse conteúdo?</h3>
                            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: 0 }}>Compartilhe com seus amigos e familiares!</p>
                        </div>
                        <ShareButtons title={articleTitle} url={articleUrl} />
                    </div>
                </div>

                <p style={{ marginTop: '48px', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', fontStyle: 'italic' }}>
                    Este portal utiliza assistentes virtuais de inteligência para auxiliar na curadoria e apresentação de dados científicos de forma acessível.
                </p>
            </Section>
        </Container>
    );
}
