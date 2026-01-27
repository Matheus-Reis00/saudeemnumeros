import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container, Section } from '@/components/ui/Container';
import IMCCalculator from '@/components/calculadoras/IMCCalculator';
import CaloriasCalculator from '@/components/calculadoras/CaloriasCalculator';
import PesoIdealCalculator from '@/components/calculadoras/PesoIdealCalculator';
import AdsenseBanner from '@/components/ads/AdsenseBanner';

interface Props {
    params: Promise<{ slug: string }>;
}

const calculators = {
    'imc': {
        title: 'Calculadora de IMC',
        description: 'Calcule seu Índice de Massa Corporal (IMC) e saiba se está no peso saudável.',
        component: IMCCalculator
    },
    'calorias': {
        title: 'Calculadora de Calorias (TDEE)',
        description: 'Descubra quantas calorias você gasta por dia e como atingir seus objetivos.',
        component: CaloriasCalculator
    },
    'peso-ideal': {
        title: 'Calculadora de Peso Ideal',
        description: 'Veja a faixa de peso recomendada para sua altura e sexo.',
        component: PesoIdealCalculator
    }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const calc = calculators[slug as keyof typeof calculators];

    if (!calc) return { title: 'Calculadora não encontrada' };

    return {
        title: `${calc.title} | Saúde em Números`,
        description: calc.description,
    };
}

export default async function CalculatorPage({ params }: Props) {
    const { slug } = await params;
    const calc = calculators[slug as keyof typeof calculators];

    if (!calc) {
        notFound();
    }

    const CalcComponent = calc.component;

    return (
        <Container>
            <Section>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>{calc.title}</h1>
                    <p style={{ fontSize: '1.125rem', color: '#6B7280', marginBottom: '40px', textAlign: 'center' }}>
                        {calc.description}
                    </p>

                    <AdsenseBanner label="Publicidade" height="100px" />

                    <CalcComponent />

                    <AdsenseBanner label="Espaço Publicitário" height="250px" />

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
