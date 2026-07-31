/**
 * Single source of truth for blog rubrics.
 *
 * Before this file the taxonomy was defined three times over: categoryInfo in
 * the category route, CLUSTER_EMOJIS + categoryMap in BlogClient, and a plain
 * string array in lib/sitemap.ts. They drifted apart.
 *
 * IMPORTANT: `slug` is the public URL segment (/blog/category/<slug>). The site
 * is a static export on GitHub Pages, so there are no server redirects - an
 * existing slug must never be renamed or removed, only relabelled. The first
 * six slugs below have been in the sitemap since launch.
 */

export interface Rubric {
    /** URL segment. Never change one that is already live. */
    slug: string;
    /** Display name, used for headings and the filter chips. */
    name: string;
    emoji: string;
    description: string;
    keywords: string[];
}

export const RUBRICS: Rubric[] = [
    {
        slug: 'rueckenschmerzen',
        name: 'Rücken & Wirbelsäule',
        emoji: '🦴',
        description: 'Erfahren Sie, wie Osteopathie bei Rückenschmerzen, Verspannungen und Wirbelsäulenproblemen nachhaltig helfen kann.',
        keywords: ['Rückenschmerzen', 'Rückenschmerzen Behandlung', 'Osteopathie Rücken', 'ISG Blockade', 'LWS Schmerzen']
    },
    {
        slug: 'nacken-hws',
        name: 'Nacken & HWS',
        emoji: '🔄',
        description: 'Nackenschmerzen, HWS-Blockaden, Kiefergelenk und Schleudertrauma: osteopathische Behandlung der Halswirbelsäule.',
        keywords: ['Nackenschmerzen', 'HWS-Syndrom', 'HWS Blockierung', 'CMD', 'Schleudertrauma']
    },
    {
        slug: 'kopfschmerzen',
        name: 'Kopf & Nerven',
        emoji: '🧠',
        description: 'Lernen Sie osteopathische Ansätze zur Behandlung von Kopfschmerzen, Migräne und Spannungskopfschmerzen kennen.',
        keywords: ['Kopfschmerzen', 'Migräne', 'Spannungskopfschmerzen', 'Trigeminus', 'Osteopathie Kopfschmerzen']
    },
    {
        slug: 'gelenke',
        name: 'Gelenke & Arthrose',
        emoji: '🦵',
        description: 'Knie, Hüfte, Schulter: osteopathische Behandlung bei Arthrose, Impingement und chronischen Gelenkbeschwerden.',
        keywords: ['Gelenkbeschwerden', 'Kniearthrose', 'Hüftarthrose', 'Frozen Shoulder', 'Impingement']
    },
    {
        slug: 'sportverletzungen',
        name: 'Sport & Leistung',
        emoji: '⚡',
        description: 'Professionelle osteopathische Behandlung von Sportverletzungen und Tipps für schnellere Regeneration.',
        keywords: ['Sportverletzungen', 'Sportosteopathie', 'Sportverletzung Behandlung', 'Regeneration Sport']
    },
    {
        slug: 'verdauung',
        name: 'Verdauung & Innere Organe',
        emoji: '🫁',
        description: 'Viszerale Osteopathie für Verdauungsbeschwerden: Erfahren Sie, wie osteopathische Behandlung bei Darmproblemen helfen kann.',
        keywords: ['Verdauungsbeschwerden', 'Viszerale Osteopathie', 'Darm-Hirn-Achse', 'Reizdarm', 'Zwerchfell']
    },
    {
        slug: 'stress-burnout',
        name: 'Stress & Burnout',
        emoji: '🧘',
        description: 'Erschöpfung, Daueranspannung und Vagusnerv: osteopathische und ganzheitliche Ansätze bei Stress und Burnout.',
        keywords: ['Burnout', 'Stress', 'Vagusnerv', 'Erschöpfung', 'Glymphatisches System']
    },
    {
        slug: 'gesundheitstipps',
        name: 'Gesundheitstipps',
        emoji: '💡',
        description: 'Praktische Gesundheitstipps und evidenzbasierte Ratschläge für Ihr Wohlbefinden aus osteopathischer Sicht.',
        keywords: ['Gesundheitstipps', 'Prävention', 'Ergonomie', 'Wohlbefinden', 'Gesundheit Hamburg']
    },
    {
        slug: 'osteopathie',
        name: 'Osteopathie Allgemein',
        emoji: '🌿',
        description: 'Entdecken Sie professionelle Fachartikel über Osteopathie, ganzheitliche Behandlungsmethoden und evidenzbasierte Therapieansätze.',
        keywords: ['Osteopathie', 'Osteopathie Hamburg', 'Osteopathische Behandlung', 'Ganzheitliche Medizin']
    },
    {
        slug: 'notizen',
        name: 'Notizen',
        emoji: '📓',
        description: 'Texte, die keine Beschwerdefrage beantworten: Aufzeichnungen zu Themen aus der Osteopathie, die mich fachlich beschäftigen.',
        keywords: ['Osteopathie Grundlagen', 'Motilität', 'Mobilität', 'primär respiratorischer Mechanismus', 'Osteopathie Theorie']
    }
];

export const DEFAULT_RUBRIC_SLUG = 'osteopathie';

const BY_SLUG = new Map(RUBRICS.map(r => [r.slug, r]));
const BY_NAME = new Map(RUBRICS.map(r => [r.name, r]));

export const getRubricBySlug = (slug?: string): Rubric | undefined =>
    slug ? BY_SLUG.get(slug.toLowerCase()) : undefined;

export const getRubricByName = (name: string): Rubric | undefined => BY_NAME.get(name);

/** Rubric for a post, falling back to keyword detection when no category is set. */
export const resolveRubric = (post: { category?: string; title?: string; excerpt?: string; keywords?: string[] }): Rubric => {
    const explicit = getRubricBySlug(post.category);
    if (explicit) return explicit;
    return getRubricBySlug(detectRubricSlug(post)) ?? BY_SLUG.get(DEFAULT_RUBRIC_SLUG)!;
};

/**
 * Keyword fallback for posts without an explicit category. Every published post
 * sets `category` in its frontmatter, so this should rarely fire - it exists so
 * a new post without a category still lands somewhere sensible.
 *
 * Order matters: more specific rubrics are checked first.
 */
export const detectRubricSlug = (post: { title?: string; excerpt?: string; keywords?: string[] }): string => {
    const text = `${post.title ?? ''} ${post.excerpt ?? ''} ${post.keywords?.join(' ') ?? ''}`.toLowerCase();

    if (/kopfschmerz|migräne|trigeminus|tinnitus/.test(text)) return 'kopfschmerzen';
    if (/nacken|hws|cervical|schleudertrauma|genick|kiefergelenk|cmd/.test(text)) return 'nacken-hws';
    if (/viszeral|verdauung|darm|bauch|magen|reizdarm|reflux|sodbrennen|zwerchfell/.test(text)) return 'verdauung';
    if (/sport|athlet|training|marathon|leistung/.test(text)) return 'sportverletzungen';
    if (/arthrose|knie|hüft|schulter|impingement|frozen shoulder|gelenk/.test(text)) return 'gelenke';
    if (/burnout|vagus|erschöpfung|glymphatisch|stress/.test(text)) return 'stress-burnout';
    if (/rücken|wirbel|bandscheibe|ischias|iliosakral|isg|kreuzbein/.test(text)) return 'rueckenschmerzen';

    return DEFAULT_RUBRIC_SLUG;
};
