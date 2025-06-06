<?php
// Generate sitemap.xml for blog posts
$postsFile  = __DIR__ . '/data/posts.json';
$outputFile = __DIR__ . '/sitemap.xml';
$baseUrl    = 'https://www.osteoalsen.de/blog';

$posts = json_decode(file_get_contents($postsFile), true);

$xml  = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
$xml .= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";

foreach ($posts as $post) {
    $loc = "$baseUrl/{$post['slug']}.html";
    $lastmod = isset($post['publishedAt']) ? substr($post['publishedAt'],0,10) : ($post['date'] ?? '');
    $xml .= "  <url>\n";
    $xml .= "    <loc>{$loc}</loc>\n";
    $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
    $xml .= "    <changefreq>monthly</changefreq>\n";
    $xml .= "    <priority>0.8</priority>\n";
    $xml .= "  </url>\n";
}
$xml .= "</urlset>\n";

file_put_contents($outputFile, $xml);
echo "Sitemap written to {$outputFile}\n";
?>
