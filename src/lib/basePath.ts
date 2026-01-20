/**
 * Base path for static assets and links - handles GitHub Pages subpath deployment
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Prefix an asset path with the base path
 */
export function assetPath(path: string): string {
  return `${basePath}${path}`;
}

/**
 * Prefix a link path with the base path (same as assetPath, but named for clarity)
 */
export function linkPath(path: string): string {
  return `${basePath}${path}`;
}
