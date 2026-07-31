import { getAllSlugs } from './posts';
import { RUBRICS } from './taxonomy';

export interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Helper function to ensure URLs have trailing slashes (matches Next.js trailingSlash: true config)
function ensureTrailingSlash(url: string): string {
  if (url === 'https://www.osteoalsen.de') {
    // Homepage doesn't need trailing slash
    return url;
  }
  return url.endsWith('/') ? url : `${url}/`;
}

export async function generateSitemap(): Promise<SitemapUrl[]> {
  const baseUrl = 'https://www.osteoalsen.de';
  const now = new Date().toISOString();

  // Statische Seiten mit hoher Priorität
  const staticPages: SitemapUrl[] = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/terminbuchung`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/behandlungen`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/behandlungen/rueckenschmerzen`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/behandlungen/arthrose-gelenkbeschwerden`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/behandlungen/kopfschmerzen-migraene`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/behandlungen/nackenschmerzen`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/behandlungen/sportosteopathie`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/behandlungen/verdauungsbeschwerden`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/behandlungen/stress-burnout`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/osteopathie-rotherbaum`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/osteopathie-eimsbuettel`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Removed: /osteopath-hamburg (redirects to /)
    {
      url: ensureTrailingSlash(`${baseUrl}/osteopathie-kosten-hamburg`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Removed: /heilpraktiker-osteopathie-hamburg (redirects to /was-ist-osteopathie)
    {
      url: ensureTrailingSlash(`${baseUrl}/rueckenschmerzen-osteopathie-hamburg`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.92,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/was-ist-osteopathie`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/kosten-ablauf`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/faq`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/wissen`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/ueber-mich`),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/blog`),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Removed: /patienteninfos (redirects to /faq)
    {
      url: ensureTrailingSlash(`${baseUrl}/datenschutz`),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: ensureTrailingSlash(`${baseUrl}/impressum`),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Blog-Kategorie-Seiten
  const categories = RUBRICS.map(r => r.slug);

  const categoryPages: SitemapUrl[] = categories.map(category => ({
    url: ensureTrailingSlash(`${baseUrl}/blog/category/${category}`),
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // Blog-Artikel dynamisch hinzufügen
  const blogSlugs = await getAllSlugs();
  const blogPages: SitemapUrl[] = blogSlugs.map(slug => ({
    url: ensureTrailingSlash(`${baseUrl}/blog/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...blogPages];
}

export async function generateSitemapXml(): Promise<string> {
  const urls = await generateSitemap();

  const urlElements = urls.map(({ url, lastModified, changeFrequency, priority }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}