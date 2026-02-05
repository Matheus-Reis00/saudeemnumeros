import React from 'react';
import { Metadata } from 'next';
import { Container, Section } from '@/components/ui/Container';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
    title: 'Sobre Nós',
    description: 'Conheça o Saúde em Números e nossa missão de democratizar o acesso a ferramentas de saúde baseadas em ciência.',
});

export default function SobrePage() {
    return (
        <Container>
            <Section>
                <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: '#374151' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', color: '#111827' }}>Sobre o Saúde em Números</h1>

                    <p>O <strong>Saúde em Números</strong> nasceu com o objetivo claro de transformar dados complexos em informações úteis e acionáveis para quem busca uma vida mais saudável. Acreditamos que a saúde começa com o conhecimento e que todos devem ter acesso gratuito a ferramentas precisas para monitorar seu progresso.</p>

                    <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px', color: '#111827' }}>Nossa Missão</h2>
                    <p>Democratizar o acesso a ferramentas de cálculo de saúde (IMC, TDEE, Peso Ideal) e prover conteúdo educativo de alta qualidade, baseado em evidências científicas e nas diretrizes das maiores organizações de saúde do mundo, como a OMS (Organização Mundial da Saúde).</p>

                    <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px', color: '#111827' }}>Por que confiar em nós?</h2>
                    <p>Nossas calculadoras utilizam fórmulas consagradas pela comunidade médica:</p>
                    <ul>
                        <li><strong>IMC:</strong> Baseado nos padrões internacionais da OMS.</li>
                        <li><strong>Calorias (TDEE):</strong> Utilizamos a equação de Mifflin-St Jeor, considerada atualmente a mais precisa para estimativa de gasto energético.</li>
                        <li><strong>Peso Ideal:</strong> Compilamos as fórmulas de Devine, Robinson e Hamwi para oferecer uma visão abrangente.</li>
                    </ul>

                    <h2 style={{ fontSize: '1.8rem', marginTop: '40px', marginBottom: '20px', color: '#111827' }}>Conteúdo com Propósito</h2>
                    <p>Além das ferramentas, mantemos um blog atualizado com artigos sobre nutrição, exercícios físicos, sono e biohacking. Todo o nosso conteúdo passa por uma curadoria rigorosa para garantir que a informação que chega até você seja correta, atualizada e fácil de entender.</p>

                    <p style={{ marginTop: '40px' }}>Obrigado por fazer parte da nossa jornada. Sua saúde é o nosso número mais importante.</p>

                    <div style={{
                        marginTop: '60px',
                        padding: '30px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '16px',
                        border: '1px solid #e5e7eb',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ marginBottom: '16px' }}>Dúvidas ou Sugestões?</h3>
                        <p>Estamos sempre abertos a feedbacks para melhorar nossas ferramentas.</p>
                        <a
                            href="/contato"
                            style={{
                                display: 'inline-block',
                                marginTop: '16px',
                                padding: '12px 24px',
                                backgroundColor: '#10B981',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '8px',
                                fontWeight: '600'
                            }}
                        >
                            Entre em Contato
                        </a>
                    </div>
                </div>
            </Section>
        </Container>
    );
}
