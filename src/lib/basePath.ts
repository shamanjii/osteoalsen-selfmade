/**
 * Base path for static assets and links - handles GitHub Pages subpath deployment
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Prefix an asset path with the base path
 * USE THIS FOR: Image sources, static files, and other assets
 */
export function assetPath(path: string): string {
  return `${basePath}${path}`;
}

/**
 * Prefix a link path with the base path
 *
 * ⚠️  IMPORTANT: DO NOT use this with Next.js <Link> components!
 * Next.js Link automatically handles basePath from next.config.js
 *
 * USE THIS FOR:
 * - Native <a> tags: <a href={linkPath("/page")}>
 * - window.location.href assignments
 * - Manual URL construction
 *
 * DO NOT USE FOR:
 * - Next.js <Link> components: <Link href="/page"> ✅ (no linkPath needed)
 */
export function linkPath(path: string): string {
  return `${basePath}${path}`;
}
