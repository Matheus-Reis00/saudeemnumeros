export interface Author {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    specialty: string;
}

export const authors: Record<string, Author> = {
    'henrique-santos': {
        id: 'henrique-santos',
        name: 'Henrique Santos',
        role: 'Especialista em Performance e Saúde',
        bio: 'Formado em Educação Física com foco em fisiologia do exercício. Henrique dedica sua carreira a traduzir números complexos em metas alcançáveis para quem busca longevidade e performance através do movimento consciente.',
        image: '/images/henrique_santos.png',
        specialty: 'Treinamento Funcional, Biometria e Saúde Coletiva'
    },
    'mariana-silva': {
        id: 'mariana-silva',
        name: 'Dra. Mariana Silva',
        role: 'Nutricionista Clínica e Esportiva',
        bio: 'Especialista em nutrição baseada em evidências. Dra. Mariana acredita que a saúde começa no equilíbrio dos macronutrientes e na compreensão profunda de como cada caloria impacta o metabolismo celular.',
        image: '/images/dra_mariana.png',
        specialty: 'Nutrição Metabólica, Emagrecimento e Suplementação'
    }
};
