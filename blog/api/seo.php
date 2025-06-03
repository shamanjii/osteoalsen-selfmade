<?php
/**
 * SEO Core Engine
 * Automatische SEO-Funktionen für Blog
 */

class SEOCore {
    private $config;
    private $posts;
    
    public function __construct() {
        $this->loadConfig();
        $this->loadPosts();
    }
    
    private function loadConfig() {
        if (file_exists('data/config.json')) {
            $this->config = json_decode(file_get_contents('data/config.json'), true);
        } else {
            $this->config = [
                'site_name' => 'Mein SEO Blog',
                'site_url' => 'https://meinblog.de',
                'description' => 'Ein professioneller Blog mit SEO-Optimierung',
                'author' => 'Blog Autor',
                'language' => 'de'
            ];
        }
    }
    
    private function loadPosts() {
        if (file_exists('data/posts.json')) {
            $this->posts = json_decode(file_get_contents('data/posts.json'), true);
        } else {
            $this->posts = [];
        }
    }
    
    /**
     * Generiert XML-Sitemap
     */
    public function generateSitemap() {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        // Homepage
        $xml .= $this->addSitemapUrl($this->config['site_url'], date('c'), '1.0', 'daily');
        
        // Posts
        foreach ($this->posts as $post) {
            if ($post['status'] === 'published') {
                $url = $this->config['site_url'] . '/posts/' . $post['slug'] . '.html';
                $xml .= $this->addSitemapUrl($url, $post['updated'], '0.8', 'weekly');
            }
        }
        
        $xml .= '</urlset>';
        
        file_put_contents('sitemap.xml', $xml);
        return $xml;
    }
    
    private function addSitemapUrl($url, $lastmod, $priority, $changefreq) {
        return "  <url>\n" .
               "    <loc>" . htmlspecialchars($url) . "</loc>\n" .
               "    <lastmod>" . date('c', strtotime($lastmod)) . "</lastmod>\n" .
               "    <priority>" . $priority . "</priority>\n" .
               "    <changefreq>" . $changefreq . "</changefreq>\n" .
               "  </url>\n";
    }
    
    /**
     * Generiert Schema.org JSON-LD für Artikel
     */
    public function generateArticleSchema($post) {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => $post['title'],
            'description' => $post['excerpt'],
            'image' => $post['featured_image'] ?? $this->config['site_url'] . '/assets/default-og.jpg',
            'author' => [
                '@type' => 'Person',
                'name' => $post['author'] ?? $this->config['author']
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => $this->config['site_name'],
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => $this->config['site_url'] . '/assets/logo.png'
                ]
            ],
            'datePublished' => $post['published'],
            'dateModified' => $post['updated'],
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => $this->config['site_url'] . '/posts/' . $post['slug'] . '.html'
            ]
        ];
        
        if (isset($post['keywords'])) {
            $schema['keywords'] = implode(', ', $post['keywords']);
        }
        
        return json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    }
    
    /**
     * Generiert Open Graph Meta Tags
     */
    public function generateOpenGraph($post) {
        $og = [];
        $og[] = '<meta property="og:type" content="article">';
        $og[] = '<meta property="og:title" content="' . htmlspecialchars($post['title']) . '">';
        $og[] = '<meta property="og:description" content="' . htmlspecialchars($post['excerpt']) . '">';
        $og[] = '<meta property="og:url" content="' . $this->config['site_url'] . '/posts/' . $post['slug'] . '.html">';
        $og[] = '<meta property="og:site_name" content="' . htmlspecialchars($this->config['site_name']) . '">';
        $og[] = '<meta property="og:locale" content="' . $this->config['language'] . '_DE">';
        
        if (isset($post['featured_image'])) {
            $og[] = '<meta property="og:image" content="' . $post['featured_image'] . '">';
            $og[] = '<meta property="og:image:alt" content="' . htmlspecialchars($post['title']) . '">';
        }
        
        // Twitter Card
        $og[] = '<meta name="twitter:card" content="summary_large_image">';
        $og[] = '<meta name="twitter:title" content="' . htmlspecialchars($post['title']) . '">';
        $og[] = '<meta name="twitter:description" content="' . htmlspecialchars($post['excerpt']) . '">';
        
        if (isset($post['featured_image'])) {
            $og[] = '<meta name="twitter:image" content="' . $post['featured_image'] . '">';
        }
        
        return implode("\n    ", $og);
    }
    
    /**
     * Generiert SEO-optimierte Meta Tags
     */
    public function generateMetaTags($post) {
        $meta = [];
        $meta[] = '<meta name="description" content="' . htmlspecialchars($post['meta_description'] ?? $post['excerpt']) . '">';
        
        if (isset($post['keywords'])) {
            $meta[] = '<meta name="keywords" content="' . htmlspecialchars(implode(', ', $post['keywords'])) . '">';
        }
        
        $meta[] = '<meta name="author" content="' . htmlspecialchars($post['author'] ?? $this->config['author']) . '">';
        $meta[] = '<meta name="robots" content="index, follow">';
        $meta[] = '<link rel="canonical" href="' . $this->config['site_url'] . '/posts/' . $post['slug'] . '.html">';
        
        return implode("\n    ", $meta);
    }
    
    /**
     * Erstellt SEO-optimierte URL-Slugs
     */
    public function createSlug($title) {
        $slug = strtolower($title);
        $slug = preg_replace('/[äöüß]/u', ['ae', 'oe', 'ue', 'ss'], $slug);
        $slug = preg_replace('/[^a-z0-9\s-]/', '', $slug);
        $slug = preg_replace('/[\s-]+/', '-', $slug);
        $slug = trim($slug, '-');
        
        // Prüfen ob Slug bereits existiert
        $originalSlug = $slug;
        $counter = 1;
        while ($this->slugExists($slug)) {
            $slug = $originalSlug . '-' . $counter;
            $counter++;
        }
        
        return $slug;
    }
    
    private function slugExists($slug) {
        foreach ($this->posts as $post) {
            if ($post['slug'] === $slug) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Analysiert Content und gibt SEO-Empfehlungen
     */
    public function analyzeContent($title, $content, $targetKeyword = null) {
        $analysis = [
            'score' => 0,
            'issues' => [],
            'recommendations' => []
        ];
        
        // Titel-Analyse
        $titleLength = mb_strlen($title);
        if ($titleLength < 30) {
            $analysis['issues'][] = 'Titel zu kurz (< 30 Zeichen)';
        } elseif ($titleLength > 60) {
            $analysis['issues'][] = 'Titel zu lang (> 60 Zeichen)';
        } else {
            $analysis['score'] += 20;
        }
        
        // Content-Länge
        $wordCount = str_word_count(strip_tags($content));
        if ($wordCount < 300) {
            $analysis['issues'][] = 'Content zu kurz (< 300 Wörter)';
        } else {
            $analysis['score'] += 20;
        }
        
        // Keyword-Analyse
        if ($targetKeyword) {
            $keywordDensity = $this->calculateKeywordDensity($content, $targetKeyword);
            if ($keywordDensity < 0.5) {
                $analysis['recommendations'][] = 'Keyword-Dichte erhöhen (' . round($keywordDensity, 2) . '%)';
            } elseif ($keywordDensity > 3) {
                $analysis['issues'][] = 'Keyword-Stuffing vermeiden (' . round($keywordDensity, 2) . '%)';
            } else {
                $analysis['score'] += 20;
            }
            
            // Keyword im Titel
            if (stripos($title, $targetKeyword) !== false) {
                $analysis['score'] += 20;
            } else {
                $analysis['recommendations'][] = 'Keyword im Titel verwenden';
            }
        }
        
        // Überschriften-Struktur
        $headings = $this->extractHeadings($content);
        if (count($headings) > 0) {
            $analysis['score'] += 20;
        } else {
            $analysis['recommendations'][] = 'Überschriften (H2, H3) hinzufügen';
        }
        
        return $analysis;
    }
    
    private function calculateKeywordDensity($content, $keyword) {
        $text = strip_tags($content);
        $wordCount = str_word_count($text);
        $keywordCount = substr_count(strtolower($text), strtolower($keyword));
        
        return ($wordCount > 0) ? ($keywordCount / $wordCount) * 100 : 0;
    }
    
    private function extractHeadings($content) {
        preg_match_all('/<h[2-6][^>]*>(.*?)<\/h[2-6]>/i', $content, $matches);
        return $matches[1];
    }
    
    /**
     * Generiert interne Link-Vorschläge
     */
    public function suggestInternalLinks($content, $currentSlug = null) {
        $suggestions = [];
        $words = str_word_count(strtolower(strip_tags($content)), 1);
        
        foreach ($this->posts as $post) {
            if ($post['slug'] === $currentSlug || $post['status'] !== 'published') {
                continue;
            }
            
            $postKeywords = $post['keywords'] ?? [];
            $postTitle = strtolower($post['title']);
            
            // Prüfe auf gemeinsame Keywords
            foreach ($postKeywords as $keyword) {
                if (in_array(strtolower($keyword), $words)) {
                    $suggestions[] = [
                        'post' => $post,
                        'anchor' => $keyword,
                        'relevance' => $this->calculateRelevance($content, $post)
                    ];
                }
            }
        }
        
        // Sortiere nach Relevanz
        usort($suggestions, function($a, $b) {
            return $b['relevance'] <=> $a['relevance'];
        });
        
        return array_slice($suggestions, 0, 5); // Top 5 Vorschläge
    }
    
    private function calculateRelevance($content, $post) {
        $contentWords = str_word_count(strtolower(strip_tags($content)), 1);
        $postKeywords = array_map('strtolower', $post['keywords'] ?? []);
        
        $commonWords = array_intersect($contentWords, $postKeywords);
        return count($commonWords);
    }
}

// API Endpoints
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $seo = new SEOCore();
    $action = $_POST['action'] ?? '';
    
    switch ($action) {
        case 'generate_sitemap':
            header('Content-Type: application/xml');
            echo $seo->generateSitemap();
            break;
            
        case 'analyze_content':
            header('Content-Type: application/json');
            $analysis = $seo->analyzeContent(
                $_POST['title'] ?? '',
                $_POST['content'] ?? '',
                $_POST['keyword'] ?? null
            );
            echo json_encode($analysis);
            break;
            
        case 'suggest_links':
            header('Content-Type: application/json');
            $suggestions = $seo->suggestInternalLinks(
                $_POST['content'] ?? '',
                $_POST['slug'] ?? null
            );
            echo json_encode($suggestions);
            break;
            
        case 'create_slug':
            header('Content-Type: application/json');
            $slug = $seo->createSlug($_POST['title'] ?? '');
            echo json_encode(['slug' => $slug]);
            break;
    }
    exit;
}
?>