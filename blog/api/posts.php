<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Konfiguration
$postsFile = '../data/posts.json';
$configFile = '../data/config.json';

// Hilfsfunktionen
function loadPosts() {
    global $postsFile;
    if (!file_exists($postsFile)) {
        return [];
    }
    $content = file_get_contents($postsFile);
    return json_decode($content, true) ?: [];
}

function savePosts($posts) {
    global $postsFile;
    $dir = dirname($postsFile);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return file_put_contents($postsFile, json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function loadConfig() {
    global $configFile;
    if (!file_exists($configFile)) {
        return [
            'site_name' => 'SEO Blog',
            'site_url' => 'https://example.com',
            'description' => 'Ein Blog über SEO und Online Marketing',
            'author' => 'Blog Author'
        ];
    }
    $content = file_get_contents($configFile);
    return json_decode($content, true) ?: [];
}

function generateSlug($title) {
    $slug = strtolower($title);
    $slug = str_replace(['ä', 'ö', 'ü', 'ß'], ['ae', 'oe', 'ue', 'ss'], $slug);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

function generateKeywords($title, $content) {
    $text = strtolower($title . ' ' . strip_tags($content));
    
    // Stopwörter entfernen
    $stopwords = ['der', 'die', 'das', 'und', 'oder', 'aber', 'mit', 'von', 'zu', 'in', 'auf', 'für', 'ist', 'sind', 'wird', 'werden', 'haben', 'hat', 'sein', 'eine', 'ein', 'einer', 'eines', 'dem', 'den', 'des', 'im', 'am', 'an', 'als', 'wie', 'bei', 'nach', 'vor', 'über', 'unter', 'durch', 'um', 'so', 'nicht', 'nur', 'auch', 'noch', 'mehr', 'sehr', 'kann', 'könnte', 'sollte', 'würde', 'wenn', 'dann', 'dass', 'weil', 'da', 'wo', 'wie', 'was', 'wer', 'wann', 'warum'];
    
    // Wörter extrahieren (mindestens 4 Zeichen)
    preg_match_all('/\b\w{4,}\b/', $text, $matches);
    $words = $matches[0];
    
    // Stopwörter filtern
    $words = array_filter($words, function($word) use ($stopwords) {
        return !in_array($word, $stopwords);
    });
    
    // Häufigkeit zählen
    $wordCount = array_count_values($words);
    arsort($wordCount);
    
    // Top 10 Keywords zurückgeben
    $keywords = array_slice(array_keys($wordCount), 0, 10);
    return implode(', ', $keywords);
}

function createPostFile($post) {
    $config = loadConfig();
    $postDir = '../posts';
    
    if (!is_dir($postDir)) {
        mkdir($postDir, 0755, true);
    }
    
    $template = '<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>' . htmlspecialchars($post['title']) . ' - ' . htmlspecialchars($config['site_name']) . '</title>
    <meta name="description" content="' . htmlspecialchars($post['excerpt']) . '">
    <meta name="keywords" content="' . htmlspecialchars($post['keywords']) . '">
    <meta name="author" content="' . htmlspecialchars($config['author']) . '">
    
    <!-- Open Graph -->
    <meta property="og:title" content="' . htmlspecialchars($post['title']) . '">
    <meta property="og:description" content="' . htmlspecialchars($post['excerpt']) . '">
    <meta property="og:image" content="' . htmlspecialchars($post['image'] ?: $config['site_url'] . '/blog/assets/images/default-og.jpg') . '">
    <meta property="og:url" content="' . htmlspecialchars($config['site_url'] . '/blog/posts/' . $post['slug'] . '.html') . '">
    <meta property="og:type" content="article">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="' . htmlspecialchars($post['title']) . '">
    <meta name="twitter:description" content="' . htmlspecialchars($post['excerpt']) . '">
    <meta name="twitter:image" content="' . htmlspecialchars($post['image'] ?: $config['site_url'] . '/blog/assets/images/default-og.jpg') . '">
    
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/post.css">
    <link rel="canonical" href="' . htmlspecialchars($config['site_url'] . '/blog/posts/' . $post['slug'] . '.html') . '">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <a href="../" class="back-link">← Zurück zum Blog</a>
            </nav>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <article class="post">
                <header class="post-header">
                    <h1>' . htmlspecialchars($post['title']) . '</h1>
                    <div class="post-meta">
                        <time datetime="' . $post['publishedAt'] . '">
                            ' . date('d. F Y', strtotime($post['publishedAt'])) . '
                        </time>
                        ' . ($post['keywords'] ? '<span class="post-keywords">' . htmlspecialchars($post['keywords']) . '</span>' : '') . '
                    </div>
                    ' . ($post['image'] ? '<img src="' . htmlspecialchars($post['image']) . '" alt="' . htmlspecialchars($post['altText'] ?: $post['title']) . '" class="post-featured-image">' : '') . '
                </header>
                
                <div class="post-content">
                    ' . $post['content'] . '
                </div>
            </article>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; ' . date('Y') . ' ' . htmlspecialchars($config['site_name']) . '. Alle Rechte vorbehalten.</p>
        </div>
    </footer>
</body>
</html>';

    $filename = $postDir . '/' . $post['slug'] . '.html';
    return file_put_contents($filename, $template);
}

// Request-Methode bestimmen
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            // Alle Posts abrufen
            $posts = loadPosts();
            echo json_encode(['success' => true, 'data' => $posts]);
            break;
            
        case 'POST':
            // Neuen Post erstellen
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['title']) || !isset($input['content'])) {
                throw new Exception('Titel und Inhalt sind erforderlich');
            }
            
            $posts = loadPosts();
            
            $post = [
                'id' => time(),
                'title' => $input['title'],
                'slug' => $input['slug'] ?: generateSlug($input['title']),
                'excerpt' => $input['excerpt'] ?: substr(strip_tags($input['content']), 0, 160),
                'content' => $input['content'],
                'keywords' => $input['keywords'] ?: generateKeywords($input['title'], $input['content']),
                'image' => $input['image'] ?? '',
                'altText' => $input['altText'] ?? '',
                'publishedAt' => date('Y-m-d H:i:s'),
                'status' => $input['status'] ?? 'published'
            ];
            
            // Slug eindeutig machen
            $originalSlug = $post['slug'];
            $counter = 1;
            while (array_filter($posts, function($p) use ($post) { return $p['slug'] === $post['slug']; })) {
                $post['slug'] = $originalSlug . '-' . $counter++;
            }
            
            array_unshift($posts, $post);
            
            if (savePosts($posts) && createPostFile($post)) {
                echo json_encode(['success' => true, 'data' => $post]);
            } else {
                throw new Exception('Fehler beim Speichern des Posts');
            }
            break;
            
        case 'PUT':
            // Post aktualisieren
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['id'])) {
                throw new Exception('Post-ID ist erforderlich');
            }
            
            $posts = loadPosts();
            $found = false;
            
            for ($i = 0; $i < count($posts); $i++) {
                if ($posts[$i]['id'] == $input['id']) {
                    $posts[$i] = array_merge($posts[$i], $input);
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                throw new Exception('Post nicht gefunden');
            }
            
            if (savePosts($posts) && createPostFile($posts[$i])) {
                echo json_encode(['success' => true, 'data' => $posts[$i]]);
            } else {
                throw new Exception('Fehler beim Aktualisieren des Posts');
            }
            break;
            
        case 'DELETE':
            // Post löschen
            $id = $_GET['id'] ?? null;
            
            if (!$id) {
                throw new Exception('Post-ID ist erforderlich');
            }
            
            $posts = loadPosts();
            $found = false;
            
            for ($i = 0; $i < count($posts); $i++) {
                if ($posts[$i]['id'] == $id) {
                    // HTML-Datei löschen
                    $filename = '../posts/' . $posts[$i]['slug'] . '.html';
                    if (file_exists($filename)) {
                        unlink($filename);
                    }
                    
                    array_splice($posts, $i, 1);
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                throw new Exception('Post nicht gefunden');
            }
            
            if (savePosts($posts)) {
                echo json_encode(['success' => true, 'message' => 'Post gelöscht']);
            } else {
                throw new Exception('Fehler beim Löschen des Posts');
            }
            break;
            
        default:
            throw new Exception('Methode nicht unterstützt');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>