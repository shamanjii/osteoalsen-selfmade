import { getAllSlugs } from './posts';

export interface SitemapUrl {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemap(): SitemapUrl[] {
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
      url: `${baseUrl}/terminbuchung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Blog-Artikel dynamisch hinzufügen
  const blogSlugs = getAllSlugs();
  const blogPages: SitemapUrl[] = blogSlugs.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}

export function generateSitemapXml(): string {
  const urls = generateSitemap();

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