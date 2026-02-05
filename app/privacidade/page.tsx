import React from 'react';
import { Metadata } from 'next';
import { Container, Section } from '@/components/ui/Container';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
    title: 'Política de Privacidade',
    description: 'Leia nossa política de privacidade para entender como tratamos seus dados no Saúde em Números.',
});

export default function PrivacidadePage() {
    return (
        <Container>
            <Section>
                <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', color: '#374151' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '24px', color: '#111827' }}>Política de Privacidade</h1>
                    <p>A sua privacidade é importante para nós. É política do Saúde em Números respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site Saúde em Números, e outros sites que possuímos e operamos.</p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>1. Coleta de Informações</h2>
                    <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>2. Uso de Cookies</h2>
                    <p>Utilizamos cookies para ajudar a personalizar a sua experiência online. Cookies são pequenos arquivos de texto que são armazenados no seu computador por um servidor de páginas web. Eles não podem ser usados para executar programas ou entregar vírus ao seu computador.</p>
                    <p>Você tem a capacidade de aceitar ou recusar cookies. A maioria dos navegadores da Web aceita cookies automaticamente, mas você pode modificar a configuração do navegador para recusar cookies, se preferir.</p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>3. Google AdSense</h2>
                    <p>O Google, como fornecedor terceiro, utiliza cookies para exibir anúncios em nosso site. Com o cookie DART, o Google pode exibir anúncios para os usuários com base nas visitas feitas a este e a outros sites na Internet. Você pode desativar o cookie DART visitando a Política de Privacidade da rede de conteúdo e anúncios do Google.</p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>4. Segurança dos Dados</h2>
                    <p>Apenas retemos informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>5. Links para Terceiros</h2>
                    <p>O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.</p>

                    <h2 style={{ fontSize: '1.5rem', marginTop: '32px', marginBottom: '16px', color: '#111827' }}>Compromisso do Usuário</h2>
                    <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o Saúde em Números oferece no site e com caráter enunciativo, mas não limitativo:</p>
                    <ul>
                        <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
                        <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou de azar;</li>
                        <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do Saúde em Números.</li>
                    </ul>

                    <p style={{ marginTop: '40px', fontSize: '0.875rem' }}>Esta política é efetiva a partir de Fevereiro/2026.</p>
                </div>
            </Section>
        </Container>
    );
}
