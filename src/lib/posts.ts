import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

export type PostFrontmatter = {
    slug: string;
    title: string;
    excerpt?: string;
    keywords?: string[];
    image?: string;
    alt?: string;
    date?: string; // ISO string
    status?: "draft" | "published";
};

export type Post = PostFrontmatter & {
    content: string; // rendered HTML
};

const postsDir = path.join(process.cwd(), "posts");

function readMarkdownFile(filePath: string) {
    const raw = fs.readFileSync(filePath, "utf8");
    return matter(raw);
}

export async function getAllPosts(): Promise<Post[]> {
    const files = fs
        .readdirSync(postsDir)
        .filter((f) => f.endsWith(".md"))
        .sort();

    const posts: Post[] = [];
    for (const file of files) {
        const full = path.join(postsDir, file);
        const { data, content } = readMarkdownFile(full);
        const fm = data as PostFrontmatter;
        if (fm.status && fm.status !== "published") continue;

        const processed = await remark().use(gfm).use(html).process(content);
        posts.push({ ...(fm as PostFrontmatter), content: String(processed) });
    }

    // Sort by date desc if available
    posts.sort((a, b) => {
        const da = a.date ? Date.parse(a.date) : 0;
        const db = b.date ? Date.parse(b.date) : 0;
        return db - da;
    });

    return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const file = path.join(postsDir, `${slug}.md`);
    if (!fs.existsSync(file)) return null;
    const { data, content } = readMarkdownFile(file);
    const fm = data as PostFrontmatter;
    const processed = await remark().use(gfm).use(html).process(content);
    return { ...(fm as PostFrontmatter), content: String(processed) };
}

export function getAllSlugs(): string[] {
    return fs
        .readdirSync(postsDir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(/\.md$/, ""));
}
