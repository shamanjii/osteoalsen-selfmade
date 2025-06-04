<?php
/**
 * Blog Setup Script
 * SPEICHERORT: blog/setup.php (ROOT)
 * Richtet das SEO-Blog System automatisch ein
 */

class BlogSetup {
    private $config;
    private $errors = [];
    private $success = [];
    
    public function __construct() {
        error_reporting(E_ALL);
        ini_set('display_errors', 1);
    }
    
    /**
     * Führt komplette Installation durch
     */
    public function install() {
        echo "<h2>🚀 SEO Blog Setup</h2>\n";
        
        $this->checkRequirements();
        $this->createDirectories();
        $this->createConfigFiles();
        $this->generateInitialContent();
        $this->setupPermissions();
        $this->generateSitemaps();
        $this->createHtaccess();
        
        $this->showResults();
        
        return empty($this->errors);
    }
    
    /**
     * Prüft System-Anforderungen
     */
    private function checkRequirements() {
        echo "📋 Prüfe System-Anforderungen...\n";
        
        // PHP Version
        if (version_compare(PHP_VERSION, '7.4.0') < 0) {
            $this->errors[] = "PHP 7.4+ erforderlich. Aktuelle Version: " . PHP_VERSION;
        } else {
            $this->success[] = "✓ PHP Version OK: " . PHP_VERSION;
        }
        
        // Benötigte Extensions
        $required_extensions = ['json', 'curl', 'gd', 'mbstring', 'libxml'];
        foreach ($required_extensions as $ext) {
            if (!extension_loaded($ext)) {
                $this->errors[] = "PHP Extension fehlt: $ext";
            } else {
                $this->success[] = "✓ Extension verfügbar: $ext";
            }
        }
        
        // Schreibrechte
        if (!is_writable('.')) {
            $this->errors[] = "Schreibrechte für aktuelles Verzeichnis fehlen";
        } else {
            $this->success[] = "✓ Schreibrechte OK";
        }
    }
    
    /**
     * Erstellt benötigte Ordnerstruktur
     */
    private function createDirectories() {
        echo "📁 Erstelle Ordnerstruktur...\n";
        
        $directories = [
            'admin',
            'api', 
            'data',
            'uploads',
            'uploads/images',
            'uploads/thumbnails',
            'posts',
            'assets',
            'assets/css',
            'assets/js',
            'assets/images'
        ];
        
        foreach ($directories as $dir) {
            if (!is_dir($dir)) {
                if (mkdir($dir, 0755, true)) {
                    $this->success[] = "✓ Ordner erstellt: $dir";
                } else {
                    $this->errors[] = "Fehler beim Erstellen: $dir";
                }
            } else {
                $this->success[] = "✓ Ordner existiert: $dir";
            }
        }
    }
    
    /**
     * Erstellt Konfigurationsdateien falls nicht vorhanden
     */
    private function createConfigFiles() {
        echo "⚙️ Erstelle Konfigurationsdateien...\n";
        
        // data/config.json
        if (!file_exists('data/config.json')) {
            $config = [
                'site_name' => 'Mein SEO Blog',
                'site_url' => $this->detectSiteUrl(),
                'description' => 'Ein professioneller Blog mit automatischer SEO-Optimierung',
                'author' => 'Blog Autor',
                'language' => 'de',
                'timezone' => 'Europe/Berlin',
                'posts_per_page' => 10,
                'seo' => [
                    'meta_description_length' => 160,
                    'title_length_max' => 60,
                    'keyword_density_min' => 0.5,
                    'keyword_density_max' => 3.0,
                    'min_word_count' => 300,
                    'enable_sitemap' => true,
                    'enable_schema' => true,
                    'enable_open_graph' => true
                ],
                'analytics' => [
                    'google_analytics_id' => '',
                    'enable_tracking' => false
                ],
                'media' => [
                    'max_upload_size' => '10MB',
                    'allowed_types' => ['jpg', 'jpeg', 'png', 'gif', 'webp'],
                    'auto_webp_conversion' => true
                ]
            ];
            
            if (file_put_contents('data/config.json', json_encode($config, JSON_PRETTY_PRINT))) {
                $this->success[] = "✓ config.json erstellt";
            } else {
                $this->errors[] = "Fehler beim Erstellen von config.json";
            }
        }
        
        // data/posts.json
        if (!file_exists('data/posts.json')) {
            $posts = [
                [
                    'id' => 1,
                    'title' => 'Willkommen auf meinem SEO-optimierten Blog',
                    'slug' => 'willkommen-seo-blog',
                    'excerpt' => 'Erfahren Sie, wie dieser Blog automatisch für Suchmaschinen optimiert wird und welche Technologien zum Einsatz kommen.',
                    'content' => '<h2>Ein neuer Blog mit SEO-Power</h2><p>Dieser Blog wurde von Grund auf für Suchmaschinenoptimierung entwickelt. Alle Artikel werden automatisch mit den wichtigsten SEO-Elementen ausgestattet:</p><ul><li>Automatische XML-Sitemap Generation</li><li>Schema.org Markup für Rich Snippets</li><li>Open Graph Tags für Social Media</li><li>Optimierte URL-Struktur</li><li>Interne Verlinkungsvorschläge</li></ul><h3>Technische SEO Features</h3><p>Das System analysiert jeden Artikel automatisch und gibt Empfehlungen für bessere Suchmaschinenoptimierung.</p>',
                    'author' => 'Blog Autor',
                    'status' => 'published',
                    'published' => date('c'),
                    'updated' => date('c'),
                    'keywords' => ['SEO', 'Blog', 'Suchmaschinenoptimierung'],
                    'meta_description' => 'Entdecken Sie meinen neuen SEO-optimierten Blog mit automatischer Suchmaschinenoptimierung.',
                    'category' => 'SEO',
                    'tags' => ['SEO', 'Blog'],
                    'reading_time' => 2,
                    'word_count' => 150,
                    'seo_score' => 85
                ]
            ];
            
            if (file_put_contents('data/posts.json', json_encode($posts, JSON_PRETTY_PRINT))) {
                $this->success[] = "✓ posts.json erstellt";
            } else {
                $this->errors[] = "Fehler beim Erstellen von posts.json";
            }
        }
        
        // data/analytics.json
        if (!file_exists('data/analytics.json')) {
            $analytics = [
                'pageviews' => [],
                'referrers' => [],
                'keywords' => [],
                'popular_posts' => []
            ];
            
            if (file_put_contents('data/analytics.json', json_encode($analytics, JSON_PRETTY_PRINT))) {
                $this->success[] = "✓ analytics.json erstellt";
            }
        }
    }
    
    /**
     * Generiert initialen Content
     */
    private function generateInitialContent() {
        echo "📝 Generiere initialen Content...\n";
        
        // CSS Dateien erstellen
        $this->createBasicCSS();
        $this->createPostCSS();
        
        // Homepage erstellen
        if (!file_exists('index.html')) {
            $this->createHomepage();
        }
        
        // 404 Seite
        if (!file_exists('404.html')) {
            $this->create404Page();
        }
        
        // Erste Posts generieren
        if (file_exists('generate-post.php')) {
            require_once 'generate-post.php';
            $generator = new PostGenerator();
            $generated = $generator->generateAllPosts();
            $this->success[] = "✓ Posts generiert: " . implode(', ', $generated);
        }
    }
    
    private function createBasicCSS() {
        if (!is_dir('assets/css')) {
            mkdir('assets/css', 0755, true);
        }
        
        $css = "/* Basic Blog Styles */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.site-header {
    background: #fff;
    border-bottom: 1px solid #e1e1e1;
    padding: 1rem 0;
}

.main-nav .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #007acc;
    text-decoration: none;
}

.nav-menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
}

.nav-menu a {
    color: #333;
    text-decoration: none;
    font-weight: 500;
}

.nav-menu a:hover {
    color: #007acc;
}

.main-content {
    min-height: 80vh;
    padding: 2rem 0;
}

.site-footer {
    background: #f8f9fa;
    padding: 2rem 0;
    text-align: center;
    border-top: 1px solid #e1e1e1;
}

.footer-nav {
    margin-top: 1rem;
}

.footer-nav a {
    color: #666;
    text-decoration: none;
    margin: 0 1rem;
}

/* Responsive */
@media (max-width: 768px) {
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }
}";
        
        file_put_contents('assets/css/style.css', $css);
        $this->success[] = "✓ style.css erstellt";
    }
    
    private function createPostCSS() {
        // Die post.css ist bereits in einem anderen Artefakt definiert
        // Hier nur eine vereinfachte Version falls das Artefakt nicht verfügbar ist
        $postCSS = "/* Post Specific Styles */
.post-article {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.post-title {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
}

.post-content {
    font-size: 1.1rem;
    line-height: 1.7;
}

.post-content h2 {
    font-size: 1.8rem;
    margin: 2rem 0 1rem 0;
    color: #1a1a1a;
}

.post-content h3 {
    font-size: 1.4rem;
    margin: 1.5rem 0 1rem 0;
}";
        
        file_put_contents('assets/css/post.css', $postCSS);
        $this->success[] = "✓ post.css erstellt";
    }
    
    private function createHomepage() {
        $config = json_decode(file_get_contents('data/config.json'), true);
        
        $html = '<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>' . $config['site_name'] . '</title>
    <meta name="description" content="' . $config['description'] . '">
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <header class="site-header">
        <nav class="main-nav">
            <div class="container">
                <a href="/" class="logo">' . $config['site_name'] . '</a>
                <ul class="nav-menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/admin">Admin</a></li>
                </ul>
            </div>
        </nav>
    </header>

    <main class="main-content">
        <div class="container">
            <h1>Willkommen bei ' . $config['site_name'] . '</h1>
            <p>' . $config['description'] . '</p>
            
            <div class="recent-posts">
                <h2>Neueste Artikel</h2>
                <div id="posts-container">
                    <p>Posts werden geladen...</p>
                </div>
            </div>
        </div>
    </main>

    <footer class="site-footer">
        <div class="container">
            <p>&copy; 2025 ' . $config['site_name'] . '. Alle Rechte vorbehalten.</p>
        </div>
    </footer>
</body>
</html>';
        
        file_put_contents('index.html', $html);
        $this->success[] = "✓ Homepage erstellt";
    }
    
    private function create404Page() {
        $html = '<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seite nicht gefunden - 404</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <div class="container">
        <h1>404 - Seite nicht gefunden</h1>
        <p>Die gesuchte Seite konnte nicht gefunden werden.</p>
        <a href="/">Zurück zur Startseite</a>
    </div>
</body>
</html>';
        
        file_put_contents('404.html', $html);
        $this->success[] = "✓ 404-Seite erstellt";
    }
    
    /**
     * Setzt Dateiberechtigungen
     */
    private function setupPermissions() {
        echo "🔒 Setze Dateiberechtigungen...\n";
        
        $directories = ['data', 'uploads', 'posts', 'assets'];
        foreach ($directories as $dir) {
            if (is_dir($dir)) {
                chmod($dir, 0755);
                $this->success[] = "✓ Berechtigung gesetzt: $dir (755)";
            }
        }
        
        $files = ['data/config.json', 'data/posts.json', 'data/analytics.json'];
        foreach ($files as $file) {
            if (file_exists($file)) {
                chmod($file, 0644);
                $this->success[] = "✓ Dateiberechtigung gesetzt: $file (644)";
            }
        }
    }
    
    /**
     * Generiert initiale Sitemaps
     */
    private function generateSitemaps() {
        echo "🗺️ Generiere Sitemaps...\n";
        
        if (file_exists('generate-sitemap.php')) {
            require_once 'generate-sitemap.php';
            $generator = new SitemapGenerator();
            $results = $generator->generateAllSitemaps();
            $this->success[] = "✓ Sitemaps generiert";
            $this->success[] = "✓ robots.txt erstellt";
        } else {
            $this->errors[] = "generate-sitemap.php nicht gefunden";
        }
    }
    
    /**
     * Erstellt .htaccess falls nicht vorhanden
     */
    private function createHtaccess() {
        echo "⚡ Erstelle .htaccess...\n";
        
        if (!file_exists('.htaccess')) {
            $htaccess = "# SEO Blog .htaccess
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Remove trailing slashes
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{THE_REQUEST} /+[^\s]*/ [NC]
RewriteRule ^(.*)/ /$1 [R=301,L]

# SEO-friendly URLs for posts
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^posts/([^/]+)/?$ /posts/$1.html [L]

# Admin protection
<Files \"admin/*\">
    Header set X-Robots-Tag \"noindex, nofollow\"
</Files>

# Data directory protection
<Directory \"data/\">
    Order Deny,Allow
    Deny from all
</Directory>

# GZIP Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg \"access plus 1 month\"
    ExpiresByType image/jpeg \"access plus 1 month\"
    ExpiresByType image/gif \"access plus 1 month\"
    ExpiresByType image/png \"access plus 1 month\"
    ExpiresByType image/webp \"access plus 1 month\"
    ExpiresByType text/css \"access plus 1 week\"
    ExpiresByType application/javascript \"access plus 1 week\"
    ExpiresByType text/html \"access plus 1 hour\"
</IfModule>
";
            
            file_put_contents('.htaccess', $htaccess);
            $this->success[] = "✓ .htaccess erstellt";
        } else {
            $this->success[] = "✓ .htaccess bereits vorhanden";
        }
    }
    
    /**
     * Erkennt Site-URL automatisch
     */
    private function detectSiteUrl() {
        $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $path = dirname($_SERVER['SCRIPT_NAME']);
        
        return $protocol . '://' . $host . ($path !== '/' ? $path : '');
    }
    
    /**
     * Zeigt Installations-Ergebnisse
     */
    private function showResults() {
        echo "\n" . str_repeat("=", 50) . "\n";
        echo "INSTALLATION ABGESCHLOSSEN\n";
        echo str_repeat("=", 50) . "\n\n";
        
        if (!empty($this->success)) {
            echo "✅ ERFOLGREICH:\n";
            foreach ($this->success as $message) {
                echo "   $message\n";
            }
            echo "\n";
        }
        
        if (!empty($this->errors)) {
            echo "❌ FEHLER:\n";
            foreach ($this->errors as $error) {
                echo "   $error\n";
            }
            echo "\n";
        }
        
        if (empty($this->errors)) {
            echo "🎉 Blog erfolgreich eingerichtet!\n\n";
            echo "NÄCHSTE SCHRITTE:\n";
            echo "1. Bearbeite data/config.json mit deinen Einstellungen\n";
            echo "2. Besuche /admin für das Dashboard\n";
            echo "3. Erstelle deinen ersten Artikel\n";
            echo "4. Konfiguriere Google Analytics (optional)\n\n";
            echo "URLS:\n";
            echo "• Blog: " . $this->detectSiteUrl() . "\n";
            echo "• Admin: " . $this->detectSiteUrl() . "/admin\n";
            echo "• Sitemap: " . $this->detectSiteUrl() . "/sitemap.xml\n";
            echo "• Erste Post: " . $this->detectSiteUrl() . "/posts/willkommen-seo-blog.html\n";
        } else {
            echo "⚠️  Installation mit Fehlern abgeschlossen.\n";
            echo "Bitte behebe die Fehler und führe das Setup erneut aus.\n";
        }
    }
    
    /**
     * Test-Funktion für alle Features
     */
    public function runTests() {
        echo "🧪 Führe System-Tests durch...\n\n";
        
        $tests = [
            'PHP Extensions' => $this->testPhpExtensions(),
            'File Permissions' => $this->testFilePermissions(),
            'SEO Core' => $this->testSeoCore(),
            'Post Generation' => $this->testPostGeneration(),
            'Sitemap Generation' => $this->testSitemapGeneration(),
            'Configuration Files' => $this->testConfigFiles(),
            'Directory Structure' => $this->testDirectoryStructure()
        ];
        
        foreach ($tests as $test => $result) {
            $status = $result ? '✅' : '❌';
            echo "$status $test\n";
        }
        
        echo "\n";
        return !in_array(false, $tests);
    }
    
    private function testPhpExtensions() {
        $required = ['json', 'curl', 'gd', 'mbstring'];
        foreach ($required as $ext) {
            if (!extension_loaded($ext)) return false;
        }
        return true;
    }
    
    private function testFilePermissions() {
        return is_writable('data') && is_writable('uploads') && is_writable('posts');
    }
    
    private function testSeoCore() {
        if (!file_exists('api/seo.php')) return false;
        require_once 'api/seo.php';
        try {
            $seo = new SEOCore();
            return $seo instanceof SEOCore;
        } catch (Exception $e) {
            return false;
        }
    }
    
    private function testPostGeneration() {
        if (!file_exists('generate-post.php')) return false;
        require_once 'generate-post.php';
        try {
            $generator = new PostGenerator();
            return $generator instanceof PostGenerator;
        } catch (Exception $e) {
            return false;
        }
    }
    
    private function testSitemapGeneration() {
        if (!file_exists('generate-sitemap.php')) return false;
        try {
            require_once 'generate-sitemap.php';
            $generator = new SitemapGenerator();
            return $generator instanceof SitemapGenerator;
        } catch (Exception $e) {
            return false;
        }
    }
    
    private function testConfigFiles() {
        return file_exists('data/config.json') && 
               file_exists('data/posts.json') && 
               file_exists('data/analytics.json');
    }
    
    private function testDirectoryStructure() {
        $required_dirs = ['admin', 'api', 'data', 'uploads', 'posts', 'assets'];
        foreach ($required_dirs as $dir) {
            if (!is_dir($dir)) return false;
        }
        return true;
    }
}

// Web Interface
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    ?>
    <!DOCTYPE html>
    <html lang="de">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SEO Blog Setup</title>
        <style>
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                max-width: 900px; 
                margin: 50px auto; 
                padding: 20px; 
                background: #f8f9fa;
            }
            .container {
                background: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }
            .button { 
                background: #007acc; 
                color: white; 
                padding: 15px 30px; 
                border: none; 
                border-radius: 5px; 
                cursor: pointer; 
                font-size: 16px; 
                margin-right: 10px;
                margin-bottom: 10px;
            }
            .button:hover { background: #005999; }
            .button.secondary { background: #28a745; }
            .button.secondary:hover { background: #1e7e34; }
            .output { 
                background: #1e1e1e; 
                color: #f8f8f2; 
                padding: 20px; 
                border-radius: 5px; 
                margin-top: 20px; 
                white-space: pre-wrap; 
                font-family: 'Courier New', monospace;
                max-height: 500px;
                overflow-y: auto;
            }
            .logo { 
                text-align: center; 
                font-size: 3em; 
                margin-bottom: 20px; 
                color: #007acc; 
            }
            .features {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            .feature {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #007acc;
            }
            .feature h3 {
                margin: 0 0 10px 0;
                color: #007acc;
            }
            ul { list-style-type: none; padding: 0; }
            li { padding: 5px 0; }
            li:before { content: "✅ "; margin-right: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🚀 SEO Blog Setup</div>
            
            <h2>Willkommen zum SEO-Blog Installations-Assistenten</h2>
            <p>Dieser Assistent richtet dein SEO-optimiertes Blog-System automatisch ein.</p>
            
            <div class="features">
                <div class="feature">
                    <h3>🎯 SEO Features</h3>
                    <ul>
                        <li>XML-Sitemap Generation</li>
                        <li>Schema.org Markup</li>
                        <li>Open Graph Tags</li>
                        <li>Meta-Tag Optimierung</li>
                    </ul>
                </div>
                
                <div class="feature">
                    <h3>⚡ Performance</h3>
                    <ul>
                        <li>GZIP Kompression</li>
                        <li>Browser Caching</li>
                        <li>Lazy Loading</li>
                        <li>WebP Support</li>
                    </ul>
                </div>
                
                <div class="feature">
                    <h3>📊 Analytics</h3>
                    <ul>
                        <li>Google Analytics</li>
                        <li>SEO Analyse Tools</li>
                        <li>Performance Tracking</li>
                        <li>Content Scoring</li>
                    </ul>
                </div>
                
                <div class="feature">
                    <h3>🛠️ CMS Features</h3>
                    <ul>
                        <li>Visual Editor</li>
                        <li>Media Management</li>
                        <li>Auto-Posting</li>
                        <li>Content Workflow</li>
                    </ul>
                </div>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <button class="button" onclick="runInstall()">🚀 Installation starten</button>
                <button class="button secondary" onclick="runTests()">🧪 System testen</button>
            </div>
            
            <div id="output" class="output" style="display: none;"></div>
        </div>
        
        <script>
            function runInstall() {
                showOutput();
                document.getElementById('output').innerHTML = '🚀 Setup wird gestartet...\n';
                
                fetch('?action=install', { method: 'POST' })
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('output').innerHTML = data;
                    })
                    .catch(error => {
                        document.getElementById('output').innerHTML = '❌ Fehler: ' + error;
                    });
            }
            
            function runTests() {
                showOutput();
                document.getElementById('output').innerHTML = '🧪 Tests werden ausgeführt...\n';
                
                fetch('?action=test', { method: 'POST' })
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('output').innerHTML = data;
                    })
                    .catch(error => {
                        document.getElementById('output').innerHTML = '❌ Fehler: ' + error;
                    });
            }
            
            function showOutput() {
                document.getElementById('output').style.display = 'block';
                document.getElementById('output').scrollTop = 0;
            }
        </script>
    </body>
    </html>
    <?php
}

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_GET['action'] ?? '';
    $setup = new BlogSetup();
    
    ob_start();
    
    if ($action === 'install') {
        $setup->install();
    } elseif ($action === 'test') {
        $setup->runTests();
    }
    
    echo ob_get_clean();
    exit;
}

// CLI Usage
if (php_sapi_name() === 'cli') {
    $setup = new BlogSetup();
    
    $command = $argv[1] ?? 'install';
    
    if ($command === 'install') {
        $setup->install();
    } elseif ($command === 'test') {
        $setup->runTests();
    } else {
        echo "Usage: php setup.php [install|test]\n";
    }
}
?>