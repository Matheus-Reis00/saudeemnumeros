# Saúde em Números 🚀
**Domínio público**: https://www.saudeemnumeros.com.br/


O **Saúde em Números** é um portal completo voltado para bem-estar, emagrecimento saudável e ferramentas de biometria. O projeto combina artigos científicos de fácil compreensão com calculadoras dinâmicas para ajudar usuários a tomarem decisões baseadas em dados.

## ✨ Principais Funcionalidades

-   **Calculadoras Dinâmicas**: IMC, Calculadora de Calorias (TMB), Peso Ideal, Ingestão de Água, Gordura Corporal e Macros.
-   **Artigos Baseados em Evidências**: Conteúdo escrito em MDX, focado em ciência do sono, nutrição e metabolismo.
-   **Personas Especialistas**: Perfis de autores dedicados com biografia e listagem de artigos próprios.
-   **SEO de Alta Performance**: Implementação rigorosa de Structured Data (Schema.org), OpenGraph, Meta Tags e Sitemap dinâmico.
-   **Design Premium & Responsivo**: Interface moderna desenvolvida com Styled Components, focada em UX e performance.
-   **Ads & Analytics**: Pronto para monetização com AdSense e monitoramento via Google Analytics 4.

## 🛠️ Tecnologias Utilizadas

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
-   **Estilização**: [Styled Components](https://styled-components.com/)
-   **Conteúdo**: [MDX](https://mdxjs.com/) (next-mdx-remote)
-   **Ícones**: [Lucide React](https://lucide.dev/)
-   **Animações**: [Framer Motion](https://www.framer.com/motion/) & CSS Transitions

## 🚀 Como Executar o Projeto

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/SeuUsuario/saudeemnumeros.git
    cd saudeemnumeros
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente**:
    Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:
    ```env
    NEXT_PUBLIC_GA_ID=seu_id_ga4
    NEXT_PUBLIC_ADSENSE_ID=seu_id_adsense
    ```

4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

5.  **Acesse no navegador**:
    Abra [http://localhost:3000](http://localhost:3000).

## 📄 Estrutura de Pastas

-   `/app`: Rotas e páginas (App Router).
-   `/components`: Componentes de UI reutilizáveis.
-   `/content`: Artigos em formato `.mdx`.
-   `/lib`: Funções utilitárias, lógica de SEO e gerenciamento de autores.
-   `/public`: Imagens, ícones e arquivos estáticos.
-   `/styles`: Tema global e configuração do Styled Components.

---
Desenvolvido por [Matheus Reis](https://github.com/Matheus-Reis00)
