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

/**
 * Validates that a file path is safe and within the posts directory
 * Prevents path traversal attacks
 */
function validateFilePath(filePath: string): boolean {
    try {
        // Resolve the path to get the absolute path
        const resolvedPath = path.resolve(filePath);
        const resolvedPostsDir = path.resolve(postsDir);

        // Check if the resolved path starts with the posts directory
        const isWithinPostsDir = resolvedPath.startsWith(resolvedPostsDir + path.sep) ||
                                 resolvedPath === resolvedPostsDir;

        // Additional checks for suspicious patterns
        const containsSuspiciousPatterns = /\.\.[\/\\]|[\/\\]\.\./.test(filePath);

        return isWithinPostsDir && !containsSuspiciousPatterns && fs.existsSync(resolvedPath);
    } catch (error) {
        console.error('Path validation error:', error);
        return false;
    }
}

/**
 * Validates and sanitizes a slug to prevent path traversal
 */
function validateSlug(slug: string): boolean {
    // Only allow alphanumeric characters, hyphens, and underscores
    const slugPattern = /^[a-zA-Z0-9\-_]+$/;

    // Check for path traversal patterns
    const containsTraversal = slug.includes('..') || slug.includes('/') || slug.includes('\\');

    // Reasonable length limit
    const withinLengthLimit = slug.length > 0 && slug.length <= 100;

    return slugPattern.test(slug) && !containsTraversal && withinLengthLimit;
}

function readMarkdownFile(filePath: string) {
    // Validate file path before reading
    if (!validateFilePath(filePath)) {
        throw new Error(`Invalid or unsafe file path: ${filePath}`);
    }

    try {
        const raw = fs.readFileSync(filePath, "utf8");
        return matter(raw);
    } catch (error) {
        console.error(`Error reading markdown file: ${filePath}`, error);
        throw new Error(`Failed to read markdown file: ${filePath}`);
    }
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
    // Validate slug to prevent path traversal
    if (!validateSlug(slug)) {
        console.warn(`Invalid slug attempted: ${slug}`);
        return null;
    }

    const file = path.join(postsDir, `${slug}.md`);

    // Additional validation that the file exists and is safe
    if (!validateFilePath(file)) {
        console.warn(`Unsafe file path attempted: ${file}`);
        return null;
    }

    try {
        const { data, content } = readMarkdownFile(file);

        // Validate frontmatter structure
        if (!data || typeof data !== 'object') {
            console.error(`Invalid frontmatter in file: ${file}`);
            return null;
        }

        const fm = data as PostFrontmatter;

        // Skip unpublished posts
        if (fm.status && fm.status !== "published") {
            return null;
        }

        const processed = await remark().use(gfm).use(html).process(content);
        return { ...(fm as PostFrontmatter), content: String(processed) };
    } catch (error) {
        console.error(`Error processing post with slug: ${slug}`, error);
        return null;
    }
}

export function getAllSlugs(): string[] {
    try {
        // Ensure posts directory exists
        if (!fs.existsSync(postsDir)) {
            console.warn(`Posts directory does not exist: ${postsDir}`);
            return [];
        }

        return fs
            .readdirSync(postsDir)
            .filter((f) => {
                // Only process .md files
                if (!f.endsWith(".md")) return false;

                // Validate each filename
                const slug = f.replace(/\.md$/, "");
                return validateSlug(slug);
            })
            .map((f) => f.replace(/\.md$/, ""))
            .sort(); // Sort for consistent ordering
    } catch (error) {
        console.error('Error reading posts directory:', error);
        return [];
    }
}
