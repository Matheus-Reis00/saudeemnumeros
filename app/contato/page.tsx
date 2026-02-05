import React from 'react';
import { Metadata } from 'next';
import { Container, Section } from '@/components/ui/Container';
import { constructMetadata } from '@/lib/seo';
import { Mail, MessageSquare, Globe } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
    title: 'Contato',
    description: 'Entre em contato com a equipe do Saúde em Números. Estamos prontos para ouvir suas dúvidas e sugestões.',
});

export default function ContatoPage() {
    return (
        <Container>
            <Section>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#111827' }}>Fale Conosco</h1>
                    <p style={{ fontSize: '1.125rem', color: '#4B5563', marginBottom: '48px' }}>
                        Tem alguma dúvida sobre nossas calculadoras ou sugestão de conteúdo? Adoraríamos ouvir você.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '24px',
                        marginBottom: '60px'
                    }}>
                        <div style={{ padding: '32px', border: '1px solid #e5e7eb', borderRadius: '16px' }}>
                            <div style={{ color: '#10B981', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                                <Mail size={40} />
                            </div>
                            <h3 style={{ marginBottom: '8px' }}>E-mail</h3>
                            <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Envie sua mensagem para:</p>
                            <p style={{ fontWeight: '600' }}>contato@saudeemnumeros.com.br</p>
                        </div>

                        <div style={{ padding: '32px', border: '1px solid #e5e7eb', borderRadius: '16px' }}>
                            <div style={{ color: '#10B981', display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                                <MessageSquare size={40} />
                            </div>
                            <h3 style={{ marginBottom: '8px' }}>Redes Sociais</h3>
                            <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>Siga-nos no:</p>
                            <p style={{ fontWeight: '600' }}>@saudeemnumeros</p>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: '#f9fafb',
                        padding: '40px',
                        borderRadius: '24px',
                        textAlign: 'left'
                    }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Formulário de Contato</h2>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Nome</label>
                                    <input type="text" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} placeholder="Seu nome" />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>E-mail</label>
                                    <input type="email" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} placeholder="seu@email.com" />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '0.9rem', fontWeight: '600' }}>Mensagem</label>
                                <textarea rows={5} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db' }} placeholder="Como podemos ajudar?"></textarea>
                            </div>
                            <button type="button" style={{
                                padding: '14px',
                                backgroundColor: '#111827',
                                color: 'white',
                                borderRadius: '8px',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer',
                                marginTop: '8px'
                            }}>
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </Section>
        </Container>
    );
}
