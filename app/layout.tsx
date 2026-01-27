import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSchemaSite, getSchemaOrganization } from "@/lib/seo";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Saúde em Números',
    default: 'Saúde em Números - Sua Saúde em Primeiro Lugar',
  },
  description: 'Calculadoras de saúde, artigos informativos e dicas para emagrecimento saudável e bem-estar.',
  keywords: ['emagrecimento', 'saúde', 'IMC', 'calorias', 'peso ideal', 'calculadoras'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaSite = getSchemaSite();
  const schemaOrg = getSchemaOrganization();

  return (
    <html lang="pt-BR">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5870578760180014"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-V0VX3TYCL9" />
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

