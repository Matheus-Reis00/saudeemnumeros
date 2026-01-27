import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Container, Section } from '@/components/ui/Container';
import { CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { constructMetadata, getSchemaBreadcrumbs } from '@/lib/seo';
import * as S from '../artigos/ArticlesStyles'; // Reutilizando os estilos de grid
import { Calculator, Flame, HeartPulse } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
    title: 'Nossas Calculadoras de Saúde',
    description: 'Ferramentas precisas e gratuitas para calcular seu IMC, Calorias Diárias, Peso Ideal e mais.',
    canonical: 'https://saudeemnumeros.com.br/calculadoras',
});

const calculatorsList = [
    {
        slug: 'imc',
        title: 'Calculadora de IMC',
        description: 'Descubra se você está no peso ideal segundo a Organização Mundial da Saúde.',
        icon: <Calculator size={32} />
    },
    {
        slug: 'calorias',
        title: 'Calculadora de Calorias',
        description: 'Calcule seu TDEE e saiba exatamente quanto comer para emagrecer ou ganhar massa.',
        icon: <Flame size={32} />
    },
    {
        slug: 'peso-ideal',
        title: 'Peso Ideal',
        description: 'Saiba qual a faixa de peso mais saudável para sua altura e biotipo.',
        icon: <HeartPulse size={32} />
    }
];

export default function CalculadorasListPage() {
    const breadcrumbsLd = getSchemaBreadcrumbs([
        { name: 'Home', item: '/' },
        { name: 'Calculadoras', item: '/calculadoras' },
    ]);

    return (
        <Container>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
            />

            <Section>
                <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Ferramentas e Calculadoras</h1>
                <p style={{ fontSize: '1.25rem', color: '#6B7280', maxWidth: '700px' }}>
                    Utilize nossas ferramentas baseadas em fórmulas científicas para monitorar sua saúde e progresso.
                </p>

                <S.Grid>
                    {calculatorsList.map((calc) => (
                        <Link href={`/calculadoras/${calc.slug}`} key={calc.slug} style={{ display: 'block' }}>
                            <S.ArticleCard $interactive>
                                <div style={{ color: '#10B981', marginBottom: '16px' }}>{calc.icon}</div>
                                <CardTitle>{calc.title}</CardTitle>
                                <CardDescription>{calc.description}</CardDescription>
                                <Button variant="outline" size="sm" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                                    Acessar agora
                                </Button>
                            </S.ArticleCard>
                        </Link>
                    ))}
                </S.Grid>
            </Section>
        </Container>
    );
}
