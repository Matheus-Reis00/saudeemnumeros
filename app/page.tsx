import React from 'react';
import { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Saúde em Números - Calculadoras e Conteúdo de Saúde',
  description: 'As melhores calculadoras de saúde gratuitas: IMC, Calorias Diárias, Peso Ideal e mais. Artigos baseados em ciência para sua jornada saudável.',
});

export default function Home() {
  return <HomeClient />;
}
