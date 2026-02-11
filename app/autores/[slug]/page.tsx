import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui/Container';
import { getArticlesByAuthor } from '@/lib/mdx';
import { authors } from '@/lib/authors';
import { constructMetadata, getSchemaBreadcrumbs } from '@/lib/seo';
import * as S from '@/app/artigos/ArticlesStyles';
import { CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import AuthorAvatar from '@/components/ui/AuthorAvatar';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const author = authors[slug];

    if (!author) return constructMetadata({ title: 'Autor não encontrado' });

    return constructMetadata({
        title: `${author.name} - Autor no Saúde em Números`,
        description: author.bio,
        canonical: `https://saudeemnumeros.com.br/autores/${slug}`,
    });
}

export default async function AuthorPage({ params }: Props) {
    const { slug } = await params;
    const author = authors[slug];

    if (!author) {
        notFound();
    }

    const articles = await getArticlesByAuthor(slug);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": author.name,
        "jobTitle": author.role,
        "description": author.bio,
        "image": `https://saudeemnumeros.com.br${author.image}`,
        "knowsAbout": [author.specialty]
    };

    const breadcrumbItems = [
        { name: 'Autores', item: '#' },
        { name: author.name, item: `/autores/${slug}` },
    ];

    const breadcrumbsLd = getSchemaBreadcrumbs([
        { name: 'Home', item: '/' },
        ...breadcrumbItems
    ]);

    return (
        <Container>
            <script
                key="author-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                key="breadcrumb-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
            />

            <Section>
                {/* Author Header */}
                <div style={{
                    display: 'flex',
                    gap: '40px',
                    alignItems: 'center',
                    marginBottom: '64px',
                    paddingBottom: '40px',
                    borderBottom: '1px solid #e2e8f0',
                    flexWrap: 'wrap'
                }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <AuthorAvatar name={author.name} image={author.image} size={160} />
                    </div>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h1 style={{ fontSize: '2.5rem', margin: '0 0 8px 0', fontWeight: 800 }}>{author.name}</h1>
                        <p style={{ fontSize: '1.25rem', color: '#3B82F6', fontWeight: 600, margin: '0 0 16px 0' }}>{author.role}</p>
                        <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: '1.6', margin: 0 }}>{author.bio}</p>
                        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                            <span style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>
                                {author.specialty}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Articles List */}
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '32px' }}>Artigos publicados por {author.name}</h2>
                <S.Grid>
                    {articles.map((article) => (
                        <Link href={`/artigos/${article.slug}`} key={article.slug} style={{ textDecoration: 'none' }}>
                            <S.ArticleCard $interactive>
                                {article.image && (
                                    <div style={{
                                        width: '100%',
                                        aspectRatio: '16/9',
                                        backgroundColor: '#eee',
                                        borderRadius: '8px',
                                        marginBottom: '16px',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
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

                {articles.length === 0 && (
                    <p style={{ color: '#64748b' }}>Nenhum artigo encontrado para este autor.</p>
                )}

                <p style={{ marginTop: '80px', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center', fontStyle: 'italic' }}>
                    * Esta é uma persona desenvolvida com auxílio de inteligência artificial para curadoria técnica.
                </p>
            </Section>
        </Container>
    );
}
