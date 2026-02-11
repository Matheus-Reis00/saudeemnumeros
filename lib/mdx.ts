import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import IMCCalculator from '@/components/calculadoras/IMCCalculator';
import CaloriasCalculator from '@/components/calculadoras/CaloriasCalculator';
import PesoIdealCalculator from '@/components/calculadoras/PesoIdealCalculator';
import WaterCalculator from '@/components/calculadoras/WaterCalculator';
import BodyFatCalculator from '@/components/calculadoras/BodyFatCalculator';
import MacroCalculator from '@/components/calculadoras/MacroCalculator';
import remarkGfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content/artigos');
const publicImagesDirectory = path.join(process.cwd(), 'public/images');

function getArticleImage(slug: string, frontmatterImage?: string) {
    if (frontmatterImage) return frontmatterImage;

    // Tenta encontrar imagem JPG ou PNG com o nome do slug
    const jpgPath = path.join(publicImagesDirectory, `${slug}.jpg`);
    if (fs.existsSync(jpgPath)) return `/images/${slug}.jpg`;

    const pngPath = path.join(publicImagesDirectory, `${slug}.png`);
    if (fs.existsSync(pngPath)) return `/images/${slug}.png`;

    // Sem imagem específica, retorna null
    return null;
}

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
            WaterCalculator,
            BodyFatCalculator,
            MacroCalculator,
        },
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            }
        }
    });

    return {
        meta: {
            ...data,
            image: getArticleImage(realSlug, (data as any).image)
        },
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
            const { data, content } = matter(fileContent);
            const slug = file.replace(/\.mdx$/, '');
            return {
                ...data,
                slug,
                content, // Inclui o conteúdo para busca
                image: getArticleImage(slug, (data as any).image)
            } as any;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return articles;
}
