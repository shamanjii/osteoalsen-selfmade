import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import * as cmsPosts from './posts-cms';

export type PostFrontmatter = {
    slug: string;
    title: string;
    excerpt?: string;
    keywords?: string[];
    image?: string;
    alt?: string;
    date?: string; // ISO string
    status?: "draft" | "published";
    // Medical article metadata for enhanced SEO
    specialty?: string;
    sourceCount?: number;
    citations?: {
        title: string;
        author?: string;
        url?: string;
        identifier?: string;
    }[];
};

export type Post = PostFrontmatter & {
    content: string; // rendered HTML
    readingTime?: number; // in minutes
    extractedCitations?: {
        id: string;
        title: string;
        url?: string;
    }[];
};

const postsDir = path.join(process.cwd(), "posts");
const USE_CMS = process.env.USE_CMS === 'true'; // Use Markdown by default, CMS only if explicitly enabled

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

/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: 200 words per minute
 */
function calculateReadingTime(content: string): number {
    // Remove markdown syntax and HTML tags for accurate word count
    const plainText = content
        .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
        .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // Keep link text only
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`[^`]+`/g, '') // Remove inline code
        .replace(/[#*_~-]/g, '') // Remove markdown formatting
        .trim();

    const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
    const readingTime = Math.max(3, Math.round(wordCount / 200)); // Minimum 3 minutes

    return readingTime;
}

/**
 * Extracts citations from markdown content
 */
function extractCitations(content: string): { id: string; title: string; url?: string; }[] {
    const citations: { id: string; title: string; url?: string; }[] = [];

    // Match citation patterns like:
    // <a id="1"></a>
    // 1. [Title](url) or 1. Title
    const citationPattern = /<a id="(\d+)"><\/a>\s*\n(\d+)\.\s*(?:\[([^\]]+)\]\(([^)]+)\)|(.+))$/gm;

    let match;
    while ((match = citationPattern.exec(content)) !== null) {
        const id = match[1];
        const title = match[3] || match[5]; // Title from link text or plain text
        const url = match[4]; // URL from markdown link

        if (title) {
            citations.push({
                id,
                title: title.trim(),
                url: url?.trim()
            });
        }
    }

    return citations;
}

export async function getAllPosts(): Promise<Post[]> {
    // Use CMS database if enabled
    if (USE_CMS) {
        return cmsPosts.getAllPosts();
    }

    // Fallback to markdown files
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
        const extractedCitations = extractCitations(content);
        const readingTime = calculateReadingTime(content);
        posts.push({
            ...(fm as PostFrontmatter),
            content: String(processed),
            readingTime,
            extractedCitations
        });
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
    // Use CMS database if enabled
    if (USE_CMS) {
        return cmsPosts.getPostBySlug(slug);
    }

    // Fallback to markdown files
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
        const extractedCitations = extractCitations(content);
        const readingTime = calculateReadingTime(content);
        return {
            ...(fm as PostFrontmatter),
            content: String(processed),
            readingTime,
            extractedCitations
        };
    } catch (error) {
        console.error(`Error processing post with slug: ${slug}`, error);
        return null;
    }
}

export async function getAllSlugs(): Promise<string[]> {
    // Use CMS database if enabled
    if (USE_CMS) {
        return cmsPosts.getAllSlugs();
    }

    // Fallback to markdown files
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
