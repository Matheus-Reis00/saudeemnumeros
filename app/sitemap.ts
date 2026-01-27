import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/mdx';

const BASE_URL = 'https://saudeemnumeros.com.br';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await getAllArticles();

    // Artigos dinâmicos
    const articleUrls = articles.map((article) => ({
        url: `${BASE_URL}/artigos/${article.slug}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Calculadoras estáticas
    const calculatorSlugs = ['imc', 'calorias', 'peso-ideal'];
    const calculatorUrls = calculatorSlugs.map((slug) => ({
        url: `${BASE_URL}/calculadoras/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // Páginas principais
    const routes = ['', '/artigos', '/calculadoras'].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
    }));

    return [...routes, ...calculatorUrls, ...articleUrls];
}
