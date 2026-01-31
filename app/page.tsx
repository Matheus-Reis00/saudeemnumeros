import React from 'react';
import { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Saúde em Números: Calculadoras de Saúde e Nutrição Online',
  description: 'Acesse gratuitamente nossas calculadoras de IMC, Calorias Diárias (TDEE) e Peso Ideal. Conteúdo científico para emagrecimento, saúde e bem-estar.',
  image: '/logo-og.jpg',
  canonical: 'https://saudeemnumeros.com.br',
});

export default function Home() {
  return <HomeClient />;
}
