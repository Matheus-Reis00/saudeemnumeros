import { Metadata } from 'next';

const siteConfig = {
    name: "Saúde em Números",
    description: "Calculadoras de saúde, ferramentas de emagrecimento e artigos científicos para uma vida saudável.",
    url: "https://saudeemnumeros.com.br",
    ogImage: "/logo-og.png",
    twitterHandle: "@saudeemnumeros",
    keywords: [
        "saúde",
        "emagrecimento",
        "IMC",
        "calculadoras de saúde",
        "dieta",
        "fitness",
        "bem-estar",
        "calculadora de calorias",
        "peso ideal",
        "déficit calórico",
        "tabela imc",
        "perder peso",
        "saúde metabólica",
        "receitas saudáveis",
        "ciência do sono",
        "microbioma intestinal",
        "biohacking",
        "saúde de precisão"
    ]
};

export function constructMetadata({
    title,
    description = siteConfig.description,
    image,
    noIndex = false,
    canonical = siteConfig.url,
}: {
    title?: string;
    description?: string;
    image?: string | null;
    noIndex?: boolean;
    canonical?: string;
} = {}): Metadata {
    const fullTitle = title
        ? title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
        : siteConfig.name;

    // Garantir que a imagem seja uma URL absoluta e tenha fallback
    const finalImage = image || siteConfig.ogImage;
    const imageUrl = finalImage.startsWith('http')
        ? finalImage
        : `${siteConfig.url}${finalImage.startsWith('/') ? '' : '/'}${finalImage}`;

    return {
        title: fullTitle,
        description,
        keywords: siteConfig.keywords,
        alternates: {
            canonical: canonical,
        },
        openGraph: {
            title: fullTitle,
            description,
            url: canonical,
            siteName: siteConfig.name,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: fullTitle,
                }
            ],
            locale: "pt_BR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [imageUrl],
            creator: siteConfig.twitterHandle
        },
        metadataBase: new URL(siteConfig.url),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false
            }
        })
    };
}

/**
 * Structured Data (Schema.org) Helpers
 */

export function getSchemaSite() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteConfig.url}/busca?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };
}

export function getSchemaOrganization() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": {
            "@type": "ImageObject",
            "url": `${siteConfig.url}/logo-og.png`,
            "width": 600,
            "height": 600
        },
        "sameAs": [
            "https://facebook.com/saudeemnumeros",
            "https://instagram.com/saudeemnumeros",
            "https://twitter.com/saudeemnumeros"
        ]
    };
}

// Helper para garantir URL absoluta de imagem
function getFullImageUrl(image?: string | null) {
    const img = image || siteConfig.ogImage;
    return img.startsWith('http') ? img : `${siteConfig.url}${img.startsWith('/') ? '' : '/'}${img}`;
}

export function getSchemaArticle(article: {
    title: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified: string;
    image?: string;
    url: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.description,
        "image": getFullImageUrl(article.image),
        "author": {
            "@type": "Person",
            "name": article.author,
            "url": `${siteConfig.url}/sobre`
        },
        "publisher": {
            "@id": `${siteConfig.url}/#organization`
        },
        "datePublished": article.datePublished,
        "dateModified": article.dateModified || article.datePublished,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": article.url
        }
    };
}

export function getSchemaBreadcrumbs(items: { name: string; item: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.item.startsWith('http') ? item.item : `${siteConfig.url}${item.item}`
        }))
    };
}

export function getSchemaCalculator(calc: {
    name: string;
    description: string;
    url: string;
    image?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": calc.name,
        "description": calc.description,
        "url": calc.url,
        "image": getFullImageUrl(calc.image),
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
        }
    };
}
