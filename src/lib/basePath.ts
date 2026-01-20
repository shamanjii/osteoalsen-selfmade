/**
 * Base path for static assets - handles GitHub Pages subpath deployment
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Prefix an asset path with the base path
 */
export function assetPath(path: string): string {
  return `${basePath}${path}`;
}
