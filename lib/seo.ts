import { Metadata } from 'next';

export function constructMetadata({
    title = "Saúde em Números",
    description = "Calculadoras de saúde e artigos para emagrecimento saudável.",
    image = "/og-image.jpg",
    noIndex = false
}: {
    title?: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
} = {}): Metadata {
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
            creator: "@saudeemnumeros"
        },
        icons: {
            icon: "/favicon.ico",
        },
        metadataBase: new URL('https://saudeemnumeros.com.br'),
        ...(noIndex && {
            robots: {
                index: false,
                follow: false
            }
        })
    };
}
