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

    // Páginas principais e institucionais
    const routes = ['', '/artigos', '/calculadoras', '/sobre', '/contato', '/privacidade'].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    return [...routes, ...calculatorUrls, ...articleUrls];
}
