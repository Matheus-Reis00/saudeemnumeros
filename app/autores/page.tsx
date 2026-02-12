import React from 'react';
import { Metadata } from 'next';
import { Container, Section } from '@/components/ui/Container';
import { authors } from '@/lib/authors';
import { constructMetadata } from '@/lib/seo';
import AuthorCard from '@/components/authors/AuthorCard';

export const metadata: Metadata = constructMetadata({
    title: 'Nossos Especialistas - Saúde em Números',
    description: 'Conheça o time de especialistas por trás do Saúde em Números. Profissionais dedicados a trazer informações baseadas em dados.',
    canonical: 'https://www.saudeemnumeros.com.br/autores',
});

export default function AuthorsPage() {
    const authorsList = Object.values(authors);

    return (
        <Container>
            <Section>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px' }}>Nossa Equipe de Especialistas</h1>
                    <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
                        Conheça os profissionais que transformam dados complexos em orientações práticas para sua longevidade e bem-estar.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '32px',
                    perspective: '1000px'
                }}>
                    {authorsList.map((author) => (
                        <AuthorCard key={author.id} author={author} />
                    ))}
                </div>

                <div style={{
                    marginTop: '80px',
                    padding: '40px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '24px',
                    textAlign: 'center',
                    border: '1px solid #e2e8f0'
                }}>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic', margin: 0 }}>
                        * Os perfis apresentados nesta página são personas técnicas desenvolvidas com auxílio de inteligência artificial para garantir a precisão científica e curadoria de dados do Saúde em Números.
                    </p>
                </div>
            </Section>
        </Container>
    );
}
