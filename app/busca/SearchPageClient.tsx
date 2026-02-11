'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Calendar, Frown, ArrowRight } from 'lucide-react';
import { Container, Section } from '@/components/ui/Container';
import { CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import * as S from './SearchStyles';

interface Article {
    slug: string;
    title: string;
    description: string;
    date: string;
    content: string;
    image: string | null;
}

interface Props {
    articles: Article[];
}

export default function SearchPageClient({ articles }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [period, setPeriod] = useState('all');

    // Sincroniza o input com a URL quando ela muda (ex: vindo da navbar)
    useEffect(() => {
        setQuery(searchParams.get('q') || '');
    }, [searchParams]);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesQuery =
                article.title.toLowerCase().includes(query.toLowerCase()) ||
                article.description.toLowerCase().includes(query.toLowerCase()) ||
                article.content.toLowerCase().includes(query.toLowerCase());

            if (!matchesQuery) return false;

            if (period === 'all') return true;

            const articleDate = new Date(article.date);
            const now = new Date();

            if (period === 'last-7') {
                const weekAgo = new Date(now.setDate(now.getDate() - 7));
                return articleDate >= weekAgo;
            }

            if (period === 'last-30') {
                const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
                return articleDate >= monthAgo;
            }

            if (period === 'last-year') {
                const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
                return articleDate >= yearAgo;
            }

            return true;
        });
    }, [articles, query, period]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setQuery(val);

        // Atualiza a URL sem recarregar a página para manter o histórico
        const params = new URLSearchParams(searchParams.toString());
        if (val) {
            params.set('q', val);
        } else {
            params.delete('q');
        }
        router.replace(`/busca?${params.toString()}`, { scroll: false });
    };

    return (
        <Container>
            <Section>
                <S.SearchHeader>
                    <S.SearchTitle>O que você procura?</S.SearchTitle>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>Pesquise em nossos artigos e guias de saúde.</p>
                </S.SearchHeader>

                <S.FilterBar>
                    <S.SearchInputWrapper>
                        <Search
                            size={20}
                            color="#999"
                            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                        />
                        <S.Input
                            type="text"
                            placeholder="Buscar por título ou conteúdo..."
                            value={query}
                            onChange={handleSearchChange}
                            autoFocus
                        />
                    </S.SearchInputWrapper>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={18} color="#666" />
                        <S.Select value={period} onChange={(e) => setPeriod(e.target.value)}>
                            <option value="all">Todo o período</option>
                            <option value="last-7">Últimos 7 dias</option>
                            <option value="last-30">Últimos 30 dias</option>
                            <option value="last-year">Último ano</option>
                        </S.Select>
                    </div>
                </S.FilterBar>

                <S.ResultsCount>
                    <Search size={16} />
                    {filteredArticles.length} {filteredArticles.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                </S.ResultsCount>

                {filteredArticles.length > 0 ? (
                    <S.Grid>
                        {filteredArticles.map((article) => (
                            <Link href={`/artigos/${article.slug}`} key={article.slug} style={{ textDecoration: 'none' }}>
                                <S.ArticleCard $interactive>
                                    {article.image && (
                                        <S.ImageContainer>
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </S.ImageContainer>
                                    )}
                                    <div style={{ padding: '8px 0' }}>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3B82F6', textTransform: 'uppercase' }}>
                                            {new Date(article.date).toLocaleDateString('pt-BR')}
                                        </span>
                                        <CardTitle style={{ marginTop: '4px', fontSize: '1.25rem' }}>{article.title}</CardTitle>
                                        <CardDescription>{article.description}</CardDescription>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}
                                        >
                                            Ler artigo <ArrowRight size={14} />
                                        </Button>
                                    </div>
                                </S.ArticleCard>
                            </Link>
                        ))}
                    </S.Grid>
                ) : (
                    <S.NoResults>
                        <Frown size={64} />
                        <h3>Nenhum resultado encontrado</h3>
                        <p>Tente buscar por termos diferentes ou limpe os filtros.</p>
                        <Button
                            variant="secondary"
                            style={{ marginTop: '24px' }}
                            onClick={() => { setQuery(''); setPeriod('all'); }}
                        >
                            Limpar busca
                        </Button>
                    </S.NoResults>
                )}
            </Section>
        </Container>
    );
}
