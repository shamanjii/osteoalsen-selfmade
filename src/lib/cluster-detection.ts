/**
 * Cluster Detection Utility
 *
 * Automatically detects which content cluster an article belongs to
 * based on keywords, title, and excerpt.
 */

interface Article {
  title: string;
  excerpt: string;
  keywords?: string[];
}

// Cluster emoji mapping
export const CLUSTER_EMOJIS = {
  'Rücken & Wirbelsäule': '🦴',
  'Nacken & HWS': '🔄',
  'Kopf & Nerven': '🧠',
  'Knie & Hüfte': '🦵',
  'Sport & Leistung': '⚡',
  'Verdauung & Innere Organe': '🫁',
  'Osteopathie Allgemein': '🌿',
} as const;

export type ClusterName = keyof typeof CLUSTER_EMOJIS;

/**
 * Detect which cluster an article belongs to
 */
export const detectCluster = (article: Article): ClusterName => {
  const text = `${article.title} ${article.excerpt} ${article.keywords?.join(' ')}`.toLowerCase();

  // Priority order matters! More specific clusters checked first
  // Sport & Leistung BEFORE Knie & Hüfte (sportverletzung articles contain "knie" but should be Sport)
  if (text.includes('sport') || text.includes('verletzung') || text.includes('leistung') ||
      text.includes('athlet') || text.includes('training')) {
    return 'Sport & Leistung';
  }
  // Verdauung BEFORE Rücken (viszerale articles often mention Rückenschmerzen as symptom)
  if (text.includes('viszeral') || text.includes('verdauung') || text.includes('darm') ||
      text.includes('bauch') || text.includes('magen') || text.includes('reizdarm') ||
      text.includes('reflux') || text.includes('sodbrennen')) {
    return 'Verdauung & Innere Organe';
  }
  if (text.includes('rücken') || text.includes('wirbel') || text.includes('bandscheibe') ||
      text.includes('ischias') || text.includes('iliosakral') || text.includes('isg')) {
    return 'Rücken & Wirbelsäule';
  }
  if (text.includes('nacken') || text.includes('hws') || text.includes('cervical') ||
      text.includes('schleudertrauma') || text.includes('genick')) {
    return 'Nacken & HWS';
  }
  if (text.includes('kopf') || text.includes('migräne') || text.includes('schwindel') ||
      text.includes('trigeminus') || text.includes('tinnitus')) {
    return 'Kopf & Nerven';
  }
  if (text.includes('knie') || text.includes('hüft') || text.includes('arthrose') ||
      text.includes('gonarthrose') || text.includes('coxarthrose')) {
    return 'Knie & Hüfte';
  }

  return 'Osteopathie Allgemein';
};

/**
 * Get cluster emoji
 */
export const getClusterEmoji = (cluster: ClusterName): string => {
  return CLUSTER_EMOJIS[cluster];
};

/**
 * Calculate estimated reading time based on content length
 */
export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.max(3, Math.ceil(wordCount / wordsPerMinute));
};
