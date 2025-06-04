<?php
/**
 * Post Generator - Erstellt SEO-optimierte HTML-Seiten
 * SPEICHERORT: blog/generate-post.php (ROOT)
 */

require_once 'api/seo.php';

class PostGenerator {
    private $seo;
    private $config;
    private $template;
    
    public function __construct() {
        $this->seo = new SEOCore();
        $this->loadConfig();
        $this->loadTemplate();
    }
    
    private function loadConfig() {
        $this->config = json_decode(file_get_contents('data/config.json'), true);
    }
    
    private function loadTemplate() {
        $this->template = '<!DOCTYPE html>
<html lang="{lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | {site_name}</title>
    
    {meta_tags}
    {open_graph}
    
    <!-- Google Fonts - Epilogue & Instrument Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700;800&family=Instrument+Sans:wght@300;400;500&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="../assets/css/post.css">
    
    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {schema}
    </script>
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="../assets/favicon.ico">
    
    <!-- Preload Critical Resources -->
    <link rel="preload" href="../assets/css/post.css" as="style">
    <link rel="preconnect" href="https://fonts.googleapis.com">
</head>
<body>
    <header>
        <nav>
            <a href="../index.html" class="logo">
                <div class="logo-icon">OA</div>
                <div class="logo-text">
                    <div class="logo-title">Osteopathie Alsen</div>
                    <div class="logo-subtitle">Joshua Alsen</div>
                </div>
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="../../index.html">Home</a></li>
                <li><a href="../../index.html#was-ist-osteopathie">Osteopathie</a></li>
                <li><a href="../../index.html#behandlungen">Behandlungen</a></li>
                <li><a href="../../index.html#anwendungen">Anwendungen</a></li>
                <li><a href="../../index.html#ueber-mich">Über mich</a></li>
                <li><a href="../../index.html#faq">FAQ</a></li>
                <li><a href="../index.html" class="active">Blog</a></li>
                <li><a href="../../terminbuchung.html" class="nav-cta">Termin buchen</a></li>
            </ul>
            <button class="mobile-menu-toggle" id="mobileMenuToggle">☰</button>
        </nav>
    </header>

    <!-- Breadcrumb -->
    <section class="breadcrumb">
        <div class="container">
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <ol>
                    <li><a href="../../index.html">Home</a></li>
                    <li><a href="../index.html">Blog</a></li>
                    <li><span aria-current="page">{title}</span></li>
                </ol>
            </nav>
        </div>
    </section>

    <main class="main-content">
        <article class="post-article">
            <div class="container">
                <header class="post-header">
                    <h1 class="post-title">{title}</h1>
                    <div class="post-meta">
                        <time datetime="{published_iso}" class="post-date">{published_formatted}</time>
                        <span class="post-author">von {author}</span>
                        <span class="reading-time">{reading_time} Min. Lesezeit</span>
                        {category_badge}
                    </div>
                    {featured_image_html}
                </header>
                
                <div class="post-content">
                    {content}
                </div>
                
                <footer class="post-footer">
                    <div class="post-tags">
                        {tags_html}
                    </div>
                    
                    <div class="post-sharing">
                        <h3>Artikel teilen:</h3>
                        <div class="sharing-buttons">
                            <a href="https://twitter.com/intent/tweet?text={title}&url={current_url}" target="_blank" class="share-twitter">🐦 Twitter</a>
                            <a href="https://www.facebook.com/sharer/sharer.php?u={current_url}" target="_blank" class="share-facebook">📘 Facebook</a>
                            <a href="https://www.linkedin.com/sharing/share-offsite/?url={current_url}" target="_blank" class="share-linkedin">💼 LinkedIn</a>
                        </div>
                    </div>
                    
                    {related_posts}
                </footer>
            </div>
        </article>
    </main>

    <footer>
        <div class="container">
            <p>&copy; 2025 {site_name}. Alle Rechte vorbehalten.</p>
            <nav class="footer-nav">
                <a href="../../legal/impressum.html">Impressum</a>
                <a href="../../legal/datenschutz.html">Datenschutz</a>
            </nav>
        </div>
    </footer>
    
    <!-- Analytics -->
    {analytics_code}
    
    <!-- JSON-LD for Breadcrumbs -->
    <script type="application/ld+json">
    {breadcrumb_schema}
    </script>

    <script>
        // Mobile Menu Toggle - Identisch mit index.html
        document.getElementById("mobileMenuToggle").addEventListener("click", function() {
            const navMenu = document.getElementById("navMenu");
            navMenu.classList.toggle("active");
            this.textContent = navMenu.classList.contains("active") ? "✕" : "☰";
        });
    </script>
</body>
</html>';
    }
    
    /**
     * Generiert HTML-Seite für einen Post
     */
    public function generatePost($postData) {
        $replacements = [
            '{lang}' => $this->config['language'],
            '{site_name}' => $this->config['site_name'],
            '{title}' => htmlspecialchars($postData['title']),
            '{meta_tags}' => $this->seo->generateMetaTags($postData),
            '{open_graph}' => $this->seo->generateOpenGraph($postData),
            '{schema}' => $this->seo->generateArticleSchema($postData),
            '{published_iso}' => date('c', strtotime($postData['published'])),
            '{published_formatted}' => $this->formatDate($postData['published']),
            '{author}' => htmlspecialchars($postData['author']),
            '{reading_time}' => $postData['reading_time'] ?? $this->calculateReadingTime($postData['content']),
            '{category_badge}' => $this->generateCategoryBadge($postData['category'] ?? ''),
            '{featured_image_html}' => $this->generateFeaturedImage($postData),
            '{content}' => $this->processContent($postData['content']),
            '{tags_html}' => $this->generateTagsHtml($postData['tags'] ?? []),
            '{current_url}' => $this->config['site_url'] . '/posts/' . $postData['slug'] . '.html',
            '{related_posts}' => $this->generateRelatedPosts($postData),
            '{analytics_code}' => $this->generateAnalyticsCode(),
            '{breadcrumb_schema}' => $this->generateBreadcrumbSchema($postData)
        ];
        
        $html = str_replace(array_keys($replacements), array_values($replacements), $this->template);
        
        // Save HTML file
        $filepath = 'posts/' . $postData['slug'] . '.html';
        if (!is_dir('posts')) {
            mkdir('posts', 0755, true);
        }
        file_put_contents($filepath, $html);
        
        return $html;
    }
    
    private function formatDate($dateString) {
        $date = new DateTime($dateString);
        $date->setTimezone(new DateTimeZone($this->config['timezone'] ?? 'Europe/Berlin'));
        return $date->format('d. F Y');
    }
    
    private function calculateReadingTime($content) {
        $wordCount = str_word_count(strip_tags($content));
        return max(1, ceil($wordCount / 200)); // 200 Wörter pro Minute
    }
    
    private function generateCategoryBadge($category) {
        if (empty($category)) return '';
        return '<span class="category-badge">' . htmlspecialchars($category) . '</span>';
    }
    
    private function generateFeaturedImage($postData) {
        if (empty($postData['featured_image'])) return '';
        
        return '<div class="featured-image">
            <img src="' . htmlspecialchars($postData['featured_image']) . '" 
                 alt="' . htmlspecialchars($postData['title']) . '"
                 loading="lazy"
                 width="800" height="400">
        </div>';
    }
    
    private function processContent($content) {
        // Auto-Links für interne Verlinkungen
        $content = $this->addInternalLinks($content);
        
        // Lazy Loading für Bilder
        $content = preg_replace('/<img([^>]+)>/i', '<img$1 loading="lazy">', $content);
        
        // Automatische TOC für H2/H3
        $content = $this->addTableOfContents($content);
        
        return $content;
    }
    
    private function addInternalLinks($content) {
        $posts = json_decode(file_get_contents('data/posts.json'), true);
        
        foreach ($posts as $post) {
            if ($post['status'] !== 'published') continue;
            
            $keywords = $post['keywords'] ?? [];
            foreach ($keywords as $keyword) {
                $pattern = '/\b' . preg_quote($keyword, '/') . '\b/i';
                $replacement = '<a href="/posts/' . $post['slug'] . '.html" title="' . htmlspecialchars($post['title']) . '">' . $keyword . '</a>';
                
                // Nur einmal pro Keyword verlinken
                $content = preg_replace($pattern, $replacement, $content, 1);
            }
        }
        
        return $content;
    }
    
    private function addTableOfContents($content) {
        preg_match_all('/<h([23])([^>]*)>(.*?)<\/h[23]>/i', $content, $matches, PREG_SET_ORDER);
        
        if (count($matches) < 3) return $content;
        
        $toc = '<div class="table-of-contents">
            <h3>Inhaltsverzeichnis</h3>
            <ul>';
        
        foreach ($matches as $i => $match) {
            $level = $match[1];
            $text = strip_tags($match[3]);
            $id = 'heading-' . ($i + 1);
            
            $headingWithId = '<h' . $level . $match[2] . ' id="' . $id . '">' . $match[3] . '</h' . $level . '>';
            $content = str_replace($match[0], $headingWithId, $content);
            
            $class = $level == 2 ? 'toc-h2' : 'toc-h3';
            $toc .= '<li class="' . $class . '"><a href="#' . $id . '">' . htmlspecialchars($text) . '</a></li>';
        }
        
        $toc .= '</ul></div>';
        $content = preg_replace('/(<\/p>)/', '$1' . $toc, $content, 1);
        
        return $content;
    }
    
    private function generateTagsHtml($tags) {
        if (empty($tags)) return '';
        
        $html = '<div class="tags"><span class="tags-label">Tags:</span>';
        foreach ($tags as $tag) {
            $html .= '<span class="tag">' . htmlspecialchars($tag) . '</span>';
        }
        $html .= '</div>';
        
        return $html;
    }
    
    private function generateRelatedPosts($currentPost) {
        $posts = json_decode(file_get_contents('data/posts.json'), true);
        $related = [];
        
        foreach ($posts as $post) {
            if ($post['slug'] === $currentPost['slug'] || $post['status'] !== 'published') {
                continue;
            }
            
            $relevance = $this->calculateRelevance($currentPost, $post);
            if ($relevance > 0) {
                $post['relevance'] = $relevance;
                $related[] = $post;
            }
        }
        
        usort($related, function($a, $b) {
            return $b['relevance'] <=> $a['relevance'];
        });
        
        $related = array_slice($related, 0, 3);
        
        if (empty($related)) return '';
        
        $html = '<div class="related-posts">
            <h3>Ähnliche Artikel</h3>
            <div class="related-grid">';
        
        foreach ($related as $post) {
            $html .= '<article class="related-post">
                <a href="/posts/' . $post['slug'] . '.html">
                    ' . ($post['featured_image'] ?? false ? 
                        '<img src="' . $post['featured_image'] . '" alt="' . htmlspecialchars($post['title']) . '" loading="lazy">' : 
                        '') . '
                    <h4>' . htmlspecialchars($post['title']) . '</h4>
                    <p>' . htmlspecialchars($post['excerpt']) . '</p>
                </a>
            </article>';
        }
        
        $html .= '</div></div>';
        
        return $html;
    }
    
    private function calculateRelevance($post1, $post2) {
        $score = 0;
        
        $commonTags = array_intersect($post1['tags'] ?? [], $post2['tags'] ?? []);
        $score += count($commonTags) * 3;
        
        $commonKeywords = array_intersect($post1['keywords'] ?? [], $post2['keywords'] ?? []);
        $score += count($commonKeywords) * 2;
        
        if (isset($post1['category'], $post2['category']) && $post1['category'] === $post2['category']) {
            $score += 5;
        }
        
        return $score;
    }
    
    private function generateAnalyticsCode() {
        if (empty($this->config['analytics']['google_analytics_id'])) return '';
        
        $gaId = $this->config['analytics']['google_analytics_id'];
        return "
        <!-- Google Analytics -->
        <script async src=\"https://www.googletagmanager.com/gtag/js?id={$gaId}\"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '{$gaId}');
        </script>";
    }
    
    private function generateBreadcrumbSchema($postData) {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                [
                    '@type' => 'ListItem',
                    'position' => 1,
                    'name' => 'Home',
                    'item' => $this->config['site_url']
                ],
                [
                    '@type' => 'ListItem',
                    'position' => 2,
                    'name' => 'Blog',
                    'item' => $this->config['site_url'] . '/blog'
                ],
                [
                    '@type' => 'ListItem',
                    'position' => 3,
                    'name' => $postData['title'],
                    'item' => $this->config['site_url'] . '/posts/' . $postData['slug'] . '.html'
                ]
            ]
        ];
        
        return json_encode($schema, JSON_UNESCAPED_SLASHES);
    }
    
    /**
     * Generiert alle Posts neu
     */
    public function generateAllPosts() {
        $posts = json_decode(file_get_contents('data/posts.json'), true);
        $generated = [];
        
        if (!is_dir('posts')) {
            mkdir('posts', 0755, true);
        }
        
        foreach ($posts as $post) {
            if ($post['status'] === 'published') {
                $this->generatePost($post);
                $generated[] = $post['slug'];
            }
        }
        
        return $generated;
    }
}

// CLI Usage
if (php_sapi_name() === 'cli') {
    $generator = new PostGenerator();
    
    if (isset($argv[1]) && $argv[1] === 'all') {
        echo "Generiere alle Posts...\n";
        $generated = $generator->generateAllPosts();
        echo "Generiert: " . implode(', ', $generated) . "\n";
    } else {
        echo "Usage: php generate-post.php all\n";
    }
}

// Web API
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $generator = new PostGenerator();
    $action = $_POST['action'] ?? '';
    
    header('Content-Type: application/json');
    
    switch ($action) {
        case 'generate_post':
            if (isset($_POST['post_data'])) {
                $postData = json_decode($_POST['post_data'], true);
                $html = $generator->generatePost($postData);
                echo json_encode(['success' => true, 'html' => $html]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Post data missing']);
            }
            break;
            
        case 'generate_all':
            $generated = $generator->generateAllPosts();
            echo json_encode(['success' => true, 'generated' => $generated]);
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Unknown action']);
            break;
    }
}
?>