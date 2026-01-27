import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import IMCCalculator from '@/components/calculadoras/IMCCalculator';
import CaloriasCalculator from '@/components/calculadoras/CaloriasCalculator';
import PesoIdealCalculator from '@/components/calculadoras/PesoIdealCalculator';

const contentDirectory = path.join(process.cwd(), 'content/artigos');

export async function getArticleBySlug(slug: string) {
    const realSlug = slug?.replace(/\.mdx$/, '');
    const filePath = path.join(contentDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const { content: mdxContent } = await compileMDX({
        source: content,
        components: {
            IMCCalculator,
            CaloriasCalculator,
            PesoIdealCalculator,
        },
        options: { parseFrontmatter: true }
    });

    return {
        meta: data,
        content: mdxContent,
        slug: realSlug,
    };
}

export async function getAllArticles() {
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const files = fs.readdirSync(contentDirectory);

    const articles = files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => {
            const filePath = path.join(contentDirectory, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const { data } = matter(fileContent);
            return {
                ...data,
                slug: file.replace(/\.mdx$/, ''),
            } as any;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return articles;
}
