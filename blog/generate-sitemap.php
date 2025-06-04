<?php
/**
 * Automatischer XML-Sitemap Generator
 * SPEICHERORT: blog/generate-sitemap.php (ROOT)
 */

require_once 'api/seo.php';

class SitemapGenerator {
    private $config;
    private $posts;
    private $pages;
    
    public function __construct() {
        $this->loadConfig();
        $this->loadPosts();
        $this->loadPages();
    }
    
    private function loadConfig() {
        $this->config = json_decode(file_get_contents('data/config.json'), true);
    }
    
    private function loadPosts() {
        if (file_exists('data/posts.json')) {
            $this->posts = json_decode(file_get_contents('data/posts.json'), true);
        } else {
            $this->posts = [];
        }
    }
    
    private function loadPages() {
        $this->pages = [
            [
                'url' => '/',
                'lastmod' => date('c'),
                'changefreq' => 'daily',
                'priority' => '1.0'
            ],
            [
                'url' => '/blog',
                'lastmod' => $this->getLatestPostDate(),
                'changefreq' => 'daily', 
                'priority' => '0.9'
            ],
            [
                'url' => '/admin',
                'lastmod' => date('c', strtotime('-1 week')),
                'changefreq' => 'weekly',
                'priority' => '0.3'
            ]
        ];
    }
    
    /**
     * Generiert Haupt-Sitemap (sitemap.xml)
     */
    public function generateMainSitemap() {
        $xml = $this->getXmlHeader();
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' . 
                ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"' .
                ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";
        
        // Statische Seiten
        foreach ($this->pages as $page) {
            $xml .= $this->createUrlEntry(
                $this->config['site_url'] . $page['url'],
                $page['lastmod'],
                $page['changefreq'],
                $page['priority']
            );
        }
        
        // Veröffentlichte Posts
        foreach ($this->posts as $post) {
            if ($post['status'] === 'published') {
                $xml .= $this->createPostUrlEntry($post);
            }
        }
        
        $xml .= '</urlset>';
        
        file_put_contents('sitemap.xml', $xml);
        
        // Auch Sitemap-Index erstellen
        $this->generateSitemapIndex();
        
        return $xml;
    }
    
    /**
     * Erstellt Sitemap-Index
     */
    public function generateSitemapIndex() {
        $xml = $this->getXmlHeader();
        $xml .= '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        // Haupt-Sitemap
        $xml .= $this->createSitemapEntry(
            $this->config['site_url'] . '/sitemap.xml',
            date('c')
        );
        
        // Posts-Sitemap (falls mehr als 50 Posts)
        if (count($this->posts) > 50) {
            $this->generatePostsSitemap();
            $xml .= $this->createSitemapEntry(
                $this->config['site_url'] . '/sitemap-posts.xml',
                $this->getLatestPostDate()
            );
        }
        
        // Bilder-Sitemap
        $this->generateImageSitemap();
        $xml .= $this->createSitemapEntry(
            $this->config['site_url'] . '/sitemap-images.xml',
            $this->getLatestPostDate()
        );
        
        $xml .= '</sitemapindex>';
        
        file_put_contents('sitemap-index.xml', $xml);
        
        return $xml;
    }
    
    /**
     * Generiert separate Posts-Sitemap
     */
    public function generatePostsSitemap() {
        $xml = $this->getXmlHeader();
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' .
                ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">' . "\n";
        
        foreach ($this->posts as $post) {
            if ($post['status'] === 'published') {
                $xml .= $this->createPostUrlEntry($post, true);
            }
        }
        
        $xml .= '</urlset>';
        
        file_put_contents('sitemap-posts.xml', $xml);
        
        return $xml;
    }
    
    /**
     * Generiert Bilder-Sitemap
     */
    public function generateImageSitemap() {
        $xml = $this->getXmlHeader();
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' .
                ' xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">' . "\n";
        
        foreach ($this->posts as $post) {
            if ($post['status'] !== 'published') continue;
            
            $images = $this->extractImagesFromPost($post);
            if (!empty($images)) {
                $xml .= $this->createImageUrlEntry($post, $images);
            }
        }
        
        $xml .= '</urlset>';
        
        file_put_contents('sitemap-images.xml', $xml);
        
        return $xml;
    }
    
    /**
     * Generiert News-Sitemap für aktuelle Artikel
     */
    public function generateNewsSitemap() {
        $xml = $this->getXmlHeader();
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' .
                ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">' . "\n";
        
        $twoDaysAgo = strtotime('-2 days');
        
        foreach ($this->posts as $post) {
            if ($post['status'] !== 'published') continue;
            
            $publishedTime = strtotime($post['published']);
            if ($publishedTime >= $twoDaysAgo) {
                $xml .= $this->createNewsUrlEntry($post);
            }
        }
        
        $xml .= '</urlset>';
        
        file_put_contents('sitemap-news.xml', $xml);
        
        return $xml;
    }
    
    private function getXmlHeader() {
        return '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
    }
    
    private function createUrlEntry($url, $lastmod, $changefreq, $priority) {
        return "  <url>\n" .
               "    <loc>" . htmlspecialchars($url) . "</loc>\n" .
               "    <lastmod>" . $lastmod . "</lastmod>\n" .
               "    <changefreq>" . $changefreq . "</changefreq>\n" .
               "    <priority>" . $priority . "</priority>\n" .
               "  </url>\n";
    }
    
    private function createPostUrlEntry($post, $includeNews = false) {
        $url = $this->config['site_url'] . '/posts/' . $post['slug'] . '.html';
        $lastmod = date('c', strtotime($post['updated']));
        
        $xml = "  <url>\n" .
               "    <loc>" . htmlspecialchars($url) . "</loc>\n" .
               "    <lastmod>" . $lastmod . "</lastmod>\n" .
               "    <changefreq>weekly</changefreq>\n" .
               "    <priority>0.8</priority>\n";
        
        // News-Markup für aktuelle Artikel
        if ($includeNews && strtotime($post['published']) >= strtotime('-2 days')) {
            $xml .= "    <news:news>\n" .
                    "      <news:publication>\n" .
                    "        <news:name>" . htmlspecialchars($this->config['site_name']) . "</news:name>\n" .
                    "        <news:language>" . $this->config['language'] . "</news:language>\n" .
                    "      </news:publication>\n" .
                    "      <news:publication_date>" . date('c', strtotime($post['published'])) . "</news:publication_date>\n" .
                    "      <news:title>" . htmlspecialchars($post['title']) . "</news:title>\n" .
                    "      <news:keywords>" . htmlspecialchars(implode(', ', $post['keywords'] ?? [])) . "</news:keywords>\n" .
                    "    </news:news>\n";
        }
        
        $xml .= "  </url>\n";
        
        return $xml;
    }
    
    private function createImageUrlEntry($post, $images) {
        $url = $this->config['site_url'] . '/posts/' . $post['slug'] . '.html';
        $lastmod = date('c', strtotime($post['updated']));
        
        $xml = "  <url>\n" .
               "    <loc>" . htmlspecialchars($url) . "</loc>\n" .
               "    <lastmod>" . $lastmod . "</lastmod>\n";
        
        foreach ($images as $image) {
            $xml .= "    <image:image>\n" .
                    "      <image:loc>" . htmlspecialchars($image['url']) . "</image:loc>\n";
            
            if (!empty($image['title'])) {
                $xml .= "      <image:title>" . htmlspecialchars($image['title']) . "</image:title>\n";
            }
            
            if (!empty($image['caption'])) {
                $xml .= "      <image:caption>" . htmlspecialchars($image['caption']) . "</image:caption>\n";
            }
            
            $xml .= "    </image:image>\n";
        }
        
        $xml .= "  </url>\n";
        
        return $xml;
    }
    
    private function createNewsUrlEntry($post) {
        $url = $this->config['site_url'] . '/posts/' . $post['slug'] . '.html';
        
        return "  <url>\n" .
               "    <loc>" . htmlspecialchars($url) . "</loc>\n" .
               "    <news:news>\n" .
               "      <news:publication>\n" .
               "        <news:name>" . htmlspecialchars($this->config['site_name']) . "</news:name>\n" .
               "        <news:language>" . $this->config['language'] . "</news:language>\n" .
               "      </news:publication>\n" .
               "      <news:publication_date>" . date('c', strtotime($post['published'])) . "</news:publication_date>\n" .
               "      <news:title>" . htmlspecialchars($post['title']) . "</news:title>\n" .
               "      <news:keywords>" . htmlspecialchars(implode(', ', $post['keywords'] ?? [])) . "</news:keywords>\n" .
               "    </news:news>\n" .
               "  </url>\n";
    }
    
    private function createSitemapEntry($url, $lastmod) {
        return "  <sitemap>\n" .
               "    <loc>" . htmlspecialchars($url) . "</loc>\n" .
               "    <lastmod>" . $lastmod . "</lastmod>\n" .
               "  </sitemap>\n";
    }
    
    private function getLatestPostDate() {
        $latest = 0;
        foreach ($this->posts as $post) {
            if ($post['status'] === 'published') {
                $time = strtotime($post['updated']);
                if ($time > $latest) {
                    $latest = $time;
                }
            }
        }
        return $latest > 0 ? date('c', $latest) : date('c');
    }
    
    private function extractImagesFromPost($post) {
        $images = [];
        
        // Featured Image
        if (!empty($post['featured_image'])) {
            $images[] = [
                'url' => $post['featured_image'],
                'title' => $post['title'],
                'caption' => $post['excerpt']
            ];
        }
        
        // Bilder aus Content extrahieren
        preg_match_all('/<img[^>]+src=["\']([^"\']+)["\'][^>]*alt=["\']([^"\']*)["\'][^>]*>/i', $post['content'], $matches);
        
        for ($i = 0; $i < count($matches[0]); $i++) {
            $imageUrl = $matches[1][$i];
            $altText = $matches[2][$i];
            
            // Relative URLs zu absoluten URLs konvertieren
            if (strpos($imageUrl, 'http') !== 0) {
                $imageUrl = $this->config['site_url'] . '/' . ltrim($imageUrl, '/');
            }
            
            $images[] = [
                'url' => $imageUrl,
                'title' => $altText,
                'caption' => $altText
            ];
        }
        
        return array_unique($images, SORT_REGULAR);
    }
    
    /**
     * Pingt Suchmaschinen über neue Sitemap
     */
    public function pingSearchEngines() {
        $sitemapUrl = urlencode($this->config['site_url'] . '/sitemap.xml');
        $results = [];
        
        // Google
        $googleUrl = "https://www.google.com/ping?sitemap=" . $sitemapUrl;
        $results['google'] = $this->sendPing($googleUrl);
        
        // Bing
        $bingUrl = "https://www.bing.com/ping?sitemap=" . $sitemapUrl;
        $results['bing'] = $this->sendPing($bingUrl);
        
        return $results;
    }
    
    private function sendPing($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_USERAGENT, 'SEO Blog Sitemap Generator');
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        return [
            'success' => $httpCode === 200,
            'http_code' => $httpCode,
            'response' => $response
        ];
    }
    
    /**
     * Validiert Sitemap auf Fehler
     */
    public function validateSitemap($sitemapPath = 'sitemap.xml') {
        if (!file_exists($sitemapPath)) {
            return ['valid' => false, 'error' => 'Sitemap file not found'];
        }
        
        $xml = file_get_contents($sitemapPath);
        
        // XML-Syntax prüfen
        libxml_use_internal_errors(true);
        $doc = simplexml_load_string($xml);
        
        if ($doc === false) {
            $errors = libxml_get_errors();
            return [
                'valid' => false,
                'error' => 'XML syntax error',
                'details' => $errors
            ];
        }
        
        // URL-Anzahl prüfen (max 50.000 pro Sitemap)
        $urlCount = count($doc->url);
        if ($urlCount > 50000) {
            return [
                'valid' => false,
                'error' => 'Too many URLs in sitemap (max 50,000)',
                'url_count' => $urlCount
            ];
        }
        
        // Datei-Größe prüfen (max 50MB unkomprimiert)
        $fileSize = strlen($xml);
        if ($fileSize > 52428800) { // 50MB in bytes
            return [
                'valid' => false,
                'error' => 'Sitemap too large (max 50MB)',
                'file_size' => $fileSize
            ];
        }
        
        return [
            'valid' => true,
            'url_count' => $urlCount,
            'file_size' => $fileSize,
            'last_modified' => filemtime($sitemapPath)
        ];
    }
    
    /**
     * Generiert robots.txt mit Sitemap-Referenz
     */
    public function generateRobotsTxt() {
        $robots = "User-agent: *\n";
        $robots .= "Allow: /\n\n";
        
        // Blockiere Admin-Bereich
        $robots .= "User-agent: *\n";
        $robots .= "Disallow: /admin/\n";
        $robots .= "Disallow: /api/\n";
        $robots .= "Disallow: /data/\n\n";
        
        // Sitemap-Referenzen
        $robots .= "Sitemap: " . $this->config['site_url'] . "/sitemap.xml\n";
        $robots .= "Sitemap: " . $this->config['site_url'] . "/sitemap-index.xml\n";
        
        // Crawl-Delay für höfliche Bots
        $robots .= "\nCrawl-delay: 1\n";
        
        file_put_contents('robots.txt', $robots);
        
        return $robots;
    }
    
    /**
     * Generiert alle Sitemaps
     */
    public function generateAllSitemaps() {
        $results = [];
        
        $results['main'] = $this->generateMainSitemap();
        $results['index'] = $this->generateSitemapIndex();
        $results['posts'] = $this->generatePostsSitemap();
        $results['images'] = $this->generateImageSitemap();
        $results['news'] = $this->generateNewsSitemap();
        $results['robots'] = $this->generateRobotsTxt();
        
        // Validierung
        $results['validation'] = $this->validateSitemap();
        
        // Optional: Suchmaschinen benachrichtigen
        if ($this->config['seo']['enable_sitemap'] ?? true) {
            $results['ping'] = $this->pingSearchEngines();
        }
        
        return $results;
    }
}

// CLI Usage
if (php_sapi_name() === 'cli') {
    $generator = new SitemapGenerator();
    
    $command = $argv[1] ?? 'all';
    
    switch ($command) {
        case 'all':
            echo "Generiere alle Sitemaps...\n";
            $results = $generator->generateAllSitemaps();
            echo "✓ Sitemap generiert\n";
            echo "✓ Sitemap-Index generiert\n";
            echo "✓ Posts-Sitemap generiert\n";
            echo "✓ Bilder-Sitemap generiert\n";
            echo "✓ News-Sitemap generiert\n";
            echo "✓ robots.txt generiert\n";
            break;
            
        case 'main':
            $generator->generateMainSitemap();
            echo "✓ Haupt-Sitemap generiert\n";
            break;
            
        case 'validate':
            $validation = $generator->validateSitemap();
            if ($validation['valid']) {
                echo "✓ Sitemap ist gültig\n";
                echo "URLs: " . $validation['url_count'] . "\n";
                echo "Größe: " . round($validation['file_size'] / 1024, 2) . " KB\n";
            } else {
                echo "✗ Sitemap-Fehler: " . $validation['error'] . "\n";
            }
            break;
            
        case 'ping':
            echo "Benachrichtige Suchmaschinen...\n";
            $results = $generator->pingSearchEngines();
            foreach ($results as $engine => $result) {
                $status = $result['success'] ? '✓' : '✗';
                echo "$status $engine: HTTP " . $result['http_code'] . "\n";
            }
            break;
            
        default:
            echo "Usage: php generate-sitemap.php [all|main|validate|ping]\n";
            break;
    }
}

// Web API
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $generator = new SitemapGenerator();
    $action = $_POST['action'] ?? '';
    
    header('Content-Type: application/json');
    
    switch ($action) {
        case 'generate_all':
            $results = $generator->generateAllSitemaps();
            echo json_encode(['success' => true, 'results' => $results]);
            break;
            
        case 'validate':
            $validation = $generator->validateSitemap();
            echo json_encode($validation);
            break;
            
        case 'ping':
            $results = $generator->pingSearchEngines();
            echo json_encode(['success' => true, 'ping_results' => $results]);
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Unknown action']);
            break;
    }
}
?>