/**
 * Cluster Detection Utility
 *
 * Thin compatibility layer over lib/taxonomy.ts, which is the single source of
 * truth for rubrics. Kept so existing callers (BlogClient, RelatedArticles) keep
 * working with cluster *names*; new code should use taxonomy directly.
 */

import { RUBRICS, resolveRubric, getRubricByName } from './taxonomy';

interface Article {
  title: string;
  excerpt: string;
  keywords?: string[];
  /** Frontmatter category slug. Wins over keyword detection. */
  category?: string;
}

export const CLUSTER_EMOJIS = Object.fromEntries(
  RUBRICS.map(r => [r.name, r.emoji])
) as Record<string, string>;

export type ClusterName = string;

/** Detect which cluster an article belongs to */
export const detectCluster = (article: Article): ClusterName => resolveRubric(article).name;

/** Get cluster emoji */
export const getClusterEmoji = (cluster: ClusterName): string =>
  getRubricByName(cluster)?.emoji ?? '🌿';

/**
 * Calculate estimated reading time based on content length
 */
export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(3, Math.ceil(wordCount / wordsPerMinute));
};
