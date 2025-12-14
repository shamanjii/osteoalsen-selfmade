import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = 'https://www.osteoalsen.de';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>OsteoAlsen Blog | Osteopathie Hamburg</title>
    <link>${baseUrl}/blog</link>
    <description>Evidenzbasierte Fachartikel zu Osteopathie, ganzheitlicher Gesundheit und bewährten Behandlungsmethoden von Osteopath Joshua Alsen aus Hamburg</description>
    <language>de-DE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} OsteoAlsen - Joshua Alsen</copyright>
    <managingEditor>info@osteoalsen.de (Joshua Alsen)</managingEditor>
    <webMaster>info@osteoalsen.de (Joshua Alsen)</webMaster>
    <category>Osteopathie</category>
    <category>Gesundheit</category>
    <category>Medizin</category>
    <image>
      <url>${baseUrl}/assets/joshua-alsen-profil.webp</url>
      <title>OsteoAlsen Blog</title>
      <link>${baseUrl}/blog</link>
    </image>
${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()}</pubDate>
      <dc:creator><![CDATA[Joshua Alsen]]></dc:creator>
      ${post.keywords?.map(keyword => `<category><![CDATA[${keyword}]]></category>`).join('\n      ') || ''}
      <description><![CDATA[${post.excerpt || ''}]]></description>
      ${post.image ? `<enclosure url="${post.image}" type="image/jpeg"/>` : ''}
    </item>`).join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
