<?php
// Sitemap Generator für das Blog

// Konfiguration laden
$configFile = 'data/config.json';
$postsFile = 'data/posts.json';

if (!file_exists($configFile)) {
    die('Konfigurationsdatei nicht gefunden!');
}

$config = json_decode(file_get_contents($configFile), true);
$posts = file_exists($postsFile) ? json_decode(file_get_contents($postsFile), true) : [];

// Basis-URL aus Config
$baseUrl = rtrim($config['site_url'], '/') . '/blog';

// XML Header
$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

// Blog-Hauptseite
$xml .= "  <url>\n";
$xml .= "    <loc>{$baseUrl}/</loc>\n";
$xml .= "    <lastmod>" . date('Y-m-d') . "</lastmod>\n";
$xml .= "    <changefreq>daily</changefreq>\n";
$xml .= "    <priority>1.0</priority>\n";
$xml .= "  </url>\n";

// Veröffentlichte Posts
foreach ($posts as $post) {
    if ($post['status'] !== 'published') {
        continue;
    }
    
    $postUrl = $baseUrl . '/posts/' . $post['slug'] . '.html';
    $lastmod = date('Y-m-d', strtotime($post['publishedAt']));
    
    $xml .= "  <url>\n";
    $xml .= "    <loc>{$postUrl}</loc>\n";
    $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
    $xml .= "    <changefreq>weekly</changefreq>\n";
    $xml .= "    <priority>0.8</priority>\n";
    $xml .= "  </url>\n";
}

$xml .= '</urlset>';

// Sitemap speichern
$sitemapFile = 'sitemap.xml';
if (file_put_contents($sitemapFile, $xml)) {
    echo "✅ Sitemap erfolgreich generiert: {$sitemapFile}\n";
    echo "📊 Einträge: " . (count($posts) + 1) . "\n";
    echo "🔗 URL: {$baseUrl}/sitemap.xml\n";
} else {
    echo "❌ Fehler beim Schreiben der Sitemap!\n";
}

// Zusätzlich eine News-Sitemap für aktuelle Posts (letzten 30 Tage)
$newsXml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$newsXml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">' . "\n";

$thirtyDaysAgo = strtotime('-30 days');
$hasRecentPosts = false;

foreach ($posts as $post) {
    if ($post['status'] !== 'published') {
        continue;
    }
    
    $publishedTime = strtotime($post['publishedAt']);
    if ($publishedTime >= $thirtyDaysAgo) {
        $hasRecentPosts = true;
        $postUrl = $baseUrl . '/posts/' . $post['slug'] . '.html';
        $pubDate = date('Y-m-d', $publishedTime);
        
        $newsXml .= "  <url>\n";
        $newsXml .= "    <loc>{$postUrl}</loc>\n";
        $newsXml .= "    <news:news>\n";
        $newsXml .= "      <news:publication>\n";
        $newsXml .= "        <news:name>" . htmlspecialchars($config['site_name']) . "</news:name>\n";
        $newsXml .= "        <news:language>de</news:language>\n";
        $newsXml .= "      </news:publication>\n";
        $newsXml .= "      <news:publication_date>{$pubDate}</news:publication_date>\n";
        $newsXml .= "      <news:title>" . htmlspecialchars($post['title']) . "</news:title>\n";
        $newsXml .= "    </news:news>\n";
        $newsXml .= "  </url>\n";
    }
}

$newsXml .= '</urlset>';

// News-Sitemap nur speichern wenn aktuelle Posts vorhanden
if ($hasRecentPosts) {
    $newsSitemapFile = 'sitemap-news.xml';
    if (file_put_contents($newsSitemapFile, $newsXml)) {
        echo "📰 News-Sitemap erstellt: {$newsSitemapFile}\n";
    }
}

// Sitemap-Index erstellen
$indexXml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
$indexXml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

$indexXml .= "  <sitemap>\n";
$indexXml .= "    <loc>{$baseUrl}/sitemap.xml</loc>\n";
$indexXml .= "    <lastmod>" . date('Y-m-d') . "</lastmod>\n";
$indexXml .= "  </sitemap>\n";

if ($hasRecentPosts) {
    $indexXml .= "  <sitemap>\n";
    $indexXml .= "    <loc>{$baseUrl}/sitemap-news.xml</loc>\n";
    $indexXml .= "    <lastmod>" . date('Y-m-d') . "</lastmod>\n";
    $indexXml .= "  </sitemap>\n";
}

$indexXml .= '</sitemapindex>';

$indexFile = 'sitemap-index.xml';
if (file_put_contents($indexFile, $indexXml)) {
    echo "📋 Sitemap-Index erstellt: {$indexFile}\n";
}

echo "\n🚀 Sitemap-Generierung abgeschlossen!\n";
echo "💡 Tipp: Reiche die Sitemap bei Google Search Console ein:\n";
echo "   {$baseUrl}/sitemap-index.xml\n";
?>