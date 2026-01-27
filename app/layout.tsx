import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

