import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { constructMetadata, SITE_URL } from '@/lib/seo';
import { getAllArticles } from '@/lib/mdx';
import SearchPageClient from './SearchPageClient';

export const metadata: Metadata = constructMetadata({
    title: 'Busca de Artigos e Saúde',
    description: 'Encontre artigos, calculadoras e dicas de saúde em nosso portal.',
    canonical: `${SITE_URL}/busca`,
});

export default async function SearchPage() {
    const articles = await getAllArticles();

    return (
        <Suspense fallback={null}>
            <SearchPageClient articles={articles} />
        </Suspense>
    );
}
