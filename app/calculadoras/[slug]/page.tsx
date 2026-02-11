import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui/Container';
import IMCCalculator from '@/components/calculadoras/IMCCalculator';
import CaloriasCalculator from '@/components/calculadoras/CaloriasCalculator';
import PesoIdealCalculator from '@/components/calculadoras/PesoIdealCalculator';
import WaterCalculator from '@/components/calculadoras/WaterCalculator';
import BodyFatCalculator from '@/components/calculadoras/BodyFatCalculator';
import MacroCalculator from '@/components/calculadoras/MacroCalculator';
import { constructMetadata, getSchemaCalculator, getSchemaBreadcrumbs } from '@/lib/seo';

interface Props {
    params: Promise<{ slug: string }>;
}

const calculators = {
    'imc': {
        title: 'Calculadora de IMC Online: Tabela OMS 2026',
        description: 'Calcule seu Índice de Massa Corporal (IMC) agora. Saiba se seu peso está saudável segundo a tabela da OMS para 2026.',
        component: IMCCalculator
    },
    'calorias': {
        title: 'Calculadora de Calorias Diárias (TDEE): Emagrecer ou Ganhar Peso',
        description: 'Descubra seu gasto energético total e quantas calorias consumir por dia para atingir seu objetivo de peso com saúde.',
        component: CaloriasCalculator
    },
    'peso-ideal': {
        title: 'Calculadora de Peso Ideal por Altura e Idade (Fórmulas Científicas)',
        description: 'Descubra qual o seu peso ideal utilizando as fórmulas de Devine, Robinson e Hamwi, além da faixa saudável de IMC.',
        component: PesoIdealCalculator
    },
    'agua': {
        title: 'Calculadora de Ingestão de Água Diária',
        description: 'Saiba exatamente quantos litros de água você deve beber por dia com base no seu peso e nível de atividade.',
        component: WaterCalculator
    },
    'gordura-corporal': {
        title: 'Calculadora de Percentual de Gordura (Método Marinha EUA)',
        description: 'Estime seu percentual de gordura corporal usando apenas uma fita métrica com o método cientificamente validado da Marinha Americana.',
        component: BodyFatCalculator
    },
    'macros': {
        title: 'Calculadora de Macros: Proteínas, Gorduras e Carboidratos',
        description: 'Distribua suas calorias diárias entre os macronutrientes ideais para seu objetivo, seja ele emagrecer ou ganhar massa muscular.',
        component: MacroCalculator
    }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const calc = calculators[slug as keyof typeof calculators];

    if (!calc) return constructMetadata({ title: 'Calculadora não encontrada' });

    return constructMetadata({
        title: calc.title,
        description: calc.description,
        canonical: `https://saudeemnumeros.com.br/calculadoras/${slug}`,
    });
}

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default async function CalculatorPage({ params }: Props) {
    const { slug } = await params;
    const calc = calculators[slug as keyof typeof calculators];

    if (!calc) {
        notFound();
    }

    const CalcComponent = calc.component;

    const jsonLd = getSchemaCalculator({
        name: calc.title,
        description: calc.description,
        url: `https://saudeemnumeros.com.br/calculadoras/${slug}`,
    });

    const breadcrumbItems = [
        { name: 'Calculadoras', item: '/calculadoras' },
        { name: calc.title.split(':')[0], item: `/calculadoras/${slug}` },
    ];

    const breadcrumbsLd = getSchemaBreadcrumbs([
        { name: 'Home', item: '/' },
        ...breadcrumbItems
    ]);

    return (
        <Container>
            <script
                key="calculator-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                key="breadcrumb-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
            />

            <Section>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <Breadcrumbs items={breadcrumbItems} />
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>{calc.title}</h1>
                    <p style={{ fontSize: '1.125rem', color: '#6B7280', marginBottom: '40px', textAlign: 'center' }}>
                        {calc.description}
                    </p>

                    <CalcComponent />

                    <div style={{ marginTop: '64px' }}>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '24px' }}>Por que usar esta calculadora?</h2>
                        <p style={{ lineHeight: '1.7', color: '#374151' }}>
                            Nossa ferramenta utiliza as fórmulas mais recentes recomendadas por órgãos de saúde internacionais.
                            Manter o controle de seus números é o primeiro passo para uma vida mais equilibrada e consciente.
                            Lembre-se que estes resultados são estimativas e não substituem o acompanhamento médico profissional.
                        </p>
                    </div>
                </div>
            </Section>
        </Container>
    );
}
