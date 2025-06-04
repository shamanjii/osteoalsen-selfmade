<?php
/**
 * Posts API - CRUD Operations für Blog Posts
 * Integriert mit dem bestehenden SEO-System
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Error Handling
set_error_handler(function($severity, $message, $file, $line) {
    error_log("Posts API Error: $message in $file on line $line");
});

class PostsAPI {
    private $dataDir;
    private $postsFile;
    private $configFile;
    private $uploadsDir;
    
    public function __construct() {
        $this->dataDir = __DIR__ . '/../data/';
        $this->postsFile = $this->dataDir . 'posts.json';
        $this->configFile = $this->dataDir . 'config.json';
        $this->uploadsDir = __DIR__ . '/../uploads/';
        
        // Verzeichnisse erstellen falls nicht vorhanden
        $this->ensureDirectories();
    }
    
    private function ensureDirectories() {
        $dirs = [
            $this->dataDir,
            $this->uploadsDir,
            $this->uploadsDir . 'images/',
            $this->uploadsDir . 'thumbnails/',
            __DIR__ . '/../posts/'
        ];
        
        foreach ($dirs as $dir) {
            if (!file_exists($dir)) {
                mkdir($dir, 0755, true);
            }
        }
    }
    
    public function handleRequest() {
        try {
            $method = $_SERVER['REQUEST_METHOD'];
            $action = $_GET['action'] ?? $_POST['action'] ?? null;
            
            // POST Request mit JSON Body
            if ($method === 'POST' && !$action) {
                $input = json_decode(file_get_contents('php://input'), true);
                $action = $input['action'] ?? null;
                $_POST = array_merge($_POST, $input ?? []);
            }
            
            switch ($action) {
                case 'create':
                    return $this->createPost();
                case 'update':
                    return $this->updatePost();
                case 'delete':
                    return $this->deletePost();
                case 'get':
                    return $this->getPost();
                case 'list':
                    return $this->listPosts();
                case 'search':
                    return $this->searchPosts();
                default:
                    throw new Exception('Ungültige Aktion');
            }
            
        } catch (Exception $e) {
            return $this->sendError($e->getMessage());
        }
    }
    
    private function createPost() {
        $postData = $this->validatePostData($_POST['post'] ?? []);
        
        // ID generieren falls nicht vorhanden
        if (!isset($postData['id']) || empty($postData['id'])) {
            $postData['id'] = $this->generatePostId();
        }
        
        // Slug generieren falls nicht vorhanden
        if (!isset($postData['slug']) || empty($postData['slug'])) {
            $postData['slug'] = $this->generateSlug($postData['title']);
        }
        
        // Slug-Eindeutigkeit prüfen
        $postData['slug'] = $this->ensureUniqueSlug($postData['slug'], $postData['id']);
        
        // Timestamps setzen
        $postData['created_at'] = date('c');
        $postData['updated_at'] = date('c');
        
        // Post speichern
        $posts = $this->loadPosts();
        $posts[] = $postData;
        $this->savePosts($posts);
        
        // HTML-Datei generieren
        $this->generatePostHTML($postData);
        
        // SEO-Daten aktualisieren
        $this->updateSEOData($postData);
        
        return $this->sendSuccess('Post erfolgreich erstellt', [
            'post_id' => $postData['id'],
            'slug' => $postData['slug']
        ]);
    }
    
    private function updatePost() {
        $postData = $this->validatePostData($_POST['post'] ?? []);
        
        if (!isset($postData['id'])) {
            throw new Exception('Post-ID fehlt');
        }
        
        $posts = $this->loadPosts();
        $index = $this->findPostIndex($posts, $postData['id']);
        
        if ($index === false) {
            throw new Exception('Post nicht gefunden');
        }
        
        // Bestehende Daten mit neuen zusammenführen
        $existingPost = $posts[$index];
        $postData = array_merge($existingPost, $postData);
        $postData['updated_at'] = date('c');
        
        // Slug-Eindeutigkeit prüfen (außer für aktuellen Post)
        if ($postData['slug'] !== $existingPost['slug']) {
            $postData['slug'] = $this->ensureUniqueSlug($postData['slug'], $postData['id']);
        }
        
        // Post aktualisieren
        $posts[$index] = $postData;
        $this->savePosts($posts);
        
        // HTML-Datei aktualisieren
        $this->generatePostHTML($postData);
        
        // Alte HTML-Datei löschen falls Slug geändert
        if ($postData['slug'] !== $existingPost['slug']) {
            $oldFile = __DIR__ . '/../posts/' . $existingPost['slug'] . '.html';
            if (file_exists($oldFile)) {
                unlink($oldFile);
            }
        }
        
        // SEO-Daten aktualisieren
        $this->updateSEOData($postData);
        
        return $this->sendSuccess('Post erfolgreich aktualisiert', [
            'post_id' => $postData['id'],
            'slug' => $postData['slug']
        ]);
    }
    
    private function deletePost() {
        $postId = $_GET['id'] ?? $_POST['id'] ?? null;
        
        if (!$postId) {
            throw new Exception('Post-ID fehlt');
        }
        
        $posts = $this->loadPosts();
        $index = $this->findPostIndex($posts, $postId);
        
        if ($index === false) {
            throw new Exception('Post nicht gefunden');
        }
        
        $post = $posts[$index];
        
        // HTML-Datei löschen
        $htmlFile = __DIR__ . '/../posts/' . $post['slug'] . '.html';
        if (file_exists($htmlFile)) {
            unlink($htmlFile);
        }
        
        // Post aus Array entfernen
        array_splice($posts, $index, 1);
        $this->savePosts($posts);
        
        return $this->sendSuccess('Post erfolgreich gelöscht');
    }
    
    private function getPost() {
        $postId = $_GET['id'] ?? null;
        
        if (!$postId) {
            throw new Exception('Post-ID fehlt');
        }
        
        $posts = $this->loadPosts();
        $index = $this->findPostIndex($posts, $postId);
        
        if ($index === false) {
            throw new Exception('Post nicht gefunden');
        }
        
        return $this->sendSuccess('Post gefunden', ['post' => $posts[$index]]);
    }
    
    private function listPosts() {
        $posts = $this->loadPosts();
        $status = $_GET['status'] ?? 'all';
        $limit = (int)($_GET['limit'] ?? 10);
        $offset = (int)($_GET['offset'] ?? 0);
        $search = $_GET['search'] ?? '';
        
        // Status-Filter
        if ($status !== 'all') {
            $posts = array_filter($posts, function($post) use ($status) {
                return ($post['status'] ?? 'draft') === $status;
            });
        }
        
        // Such-Filter
        if (!empty($search)) {
            $posts = array_filter($posts, function($post) use ($search) {
                $searchLower = strtolower($search);
                return strpos(strtolower($post['title'] ?? ''), $searchLower) !== false ||
                       strpos(strtolower($post['content'] ?? ''), $searchLower) !== false ||
                       strpos(strtolower($post['excerpt'] ?? ''), $searchLower) !== false;
            });
        }
        
        // Sortieren (neueste zuerst)
        usort($posts, function($a, $b) {
            return strtotime($b['updated_at'] ?? 0) - strtotime($a['updated_at'] ?? 0);
        });
        
        $total = count($posts);
        
        // Pagination
        $posts = array_slice($posts, $offset, $limit);
        
        return $this->sendSuccess('Posts geladen', [
            'posts' => array_values($posts),
            'total' => $total,
            'limit' => $limit,
            'offset' => $offset
        ]);
    }
    
    private function searchPosts() {
        $query = $_GET['q'] ?? '';
        $category = $_GET['category'] ?? '';
        $tags = $_GET['tags'] ?? '';
        
        if (empty($query)) {
            throw new Exception('Suchanfrage fehlt');
        }
        
        $posts = $this->loadPosts();
        $results = [];
        
        foreach ($posts as $post) {
            if (($post['status'] ?? 'draft') !== 'published') continue;
            
            $score = 0;
            $queryLower = strtolower($query);
            
            // Titel-Match (höchste Gewichtung)
            if (strpos(strtolower($post['title'] ?? ''), $queryLower) !== false) {
                $score += 10;
            }
            
            // Content-Match
            if (strpos(strtolower($post['content'] ?? ''), $queryLower) !== false) {
                $score += 5;
            }
            
            // Excerpt-Match
            if (strpos(strtolower($post['excerpt'] ?? ''), $queryLower) !== false) {
                $score += 3;
            }
            
            // Tag-Match
            if (isset($post['tags']) && is_array($post['tags'])) {
                foreach ($post['tags'] as $tag) {
                    if (strpos(strtolower($tag), $queryLower) !== false) {
                        $score += 2;
                    }
                }
            }
            
            // Kategorie-Filter
            if (!empty($category) && ($post['category'] ?? '') !== $category) {
                continue;
            }
            
            // Tag-Filter
            if (!empty($tags)) {
                $filterTags = explode(',', $tags);
                $postTags = $post['tags'] ?? [];
                if (!array_intersect($filterTags, $postTags)) {
                    continue;
                }
            }
            
            if ($score > 0) {
                $post['search_score'] = $score;
                $results[] = $post;
            }
        }
        
        // Nach Relevanz sortieren
        usort($results, function($a, $b) {
            return $b['search_score'] - $a['search_score'];
        });
        
        return $this->sendSuccess('Suchergebnisse', [
            'query' => $query,
            'results' => array_values($results),
            'total' => count($results)
        ]);
    }
    
    private function validatePostData($data) {
        $required = ['title'];
        
        foreach ($required as $field) {
            if (!isset($data[$field]) || empty(trim($data[$field]))) {
                throw new Exception("Feld '$field' ist erforderlich");
            }
        }
        
        // Datenbereinigung
        $cleaned = [
            'id' => $data['id'] ?? null,
            'title' => trim($data['title']),
            'slug' => trim($data['slug'] ?? ''),
            'excerpt' => trim($data['excerpt'] ?? ''),
            'content' => $data['content'] ?? '',
            'category' => trim($data['category'] ?? ''),
            'tags' => is_array($data['tags'] ?? null) ? $data['tags'] : explode(',', $data['tags'] ?? ''),
            'featured_image' => trim($data['featured_image'] ?? ''),
            'meta_title' => trim($data['meta_title'] ?? ''),
            'meta_description' => trim($data['meta_description'] ?? ''),
            'focus_keyword' => trim($data['focus_keyword'] ?? ''),
            'status' => in_array($data['status'] ?? 'draft', ['draft', 'published', 'scheduled']) ? $data['status'] : 'draft',
            'publish_date' => $data['publish_date'] ?? null,
            'created_at' => $data['created_at'] ?? null,
            'updated_at' => $data['updated_at'] ?? null
        ];
        
        // Tags bereinigen
        $cleaned['tags'] = array_filter(array_map('trim', $cleaned['tags']));
        
        return $cleaned;
    }
    
    private function generatePostHTML($post) {
        // Bestehende generate-post.php nutzen
        $generateScript = __DIR__ . '/../generate-post.php';
        
        if (!file_exists($generateScript)) {
            throw new Exception('HTML-Generator nicht gefunden');
        }
        
        // Temporäre Post-Datei erstellen
        $tempFile = sys_get_temp_dir() . '/post_' . $post['id'] . '.json';
        file_put_contents($tempFile, json_encode($post, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        
        // Generator ausführen
        $command = "php " . escapeshellarg($generateScript) . " " . escapeshellarg($tempFile);
        exec($command . " 2>&1", $output, $returnCode);
        
        // Temp-Datei löschen
        unlink($tempFile);
        
        if ($returnCode !== 0) {
            error_log("HTML Generation failed: " . implode("\n", $output));
            throw new Exception('HTML-Generierung fehlgeschlagen');
        }
    }
    
    private function updateSEOData($post) {
        // SEO-API aufrufen für Sitemap-Update etc.
        $seoAPI = __DIR__ . '/seo.php';
        
        if (file_exists($seoAPI)) {
            // Sitemap regenerieren
            $context = stream_context_create([
                'http' => [
                    'method' => 'POST',
                    'header' => 'Content-Type: application/json',
                    'content' => json_encode(['action' => 'update_sitemap'])
                ]
            ]);
            
            @file_get_contents($seoAPI, false, $context);
        }
    }
    
    private function loadPosts() {
        if (!file_exists($this->postsFile)) {
            return [];
        }
        
        $content = file_get_contents($this->postsFile);
        $posts = json_decode($content, true);
        
        return is_array($posts) ? $posts : [];
    }
    
    private function savePosts($posts) {
        $content = json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        
        if (file_put_contents($this->postsFile, $content) === false) {
            throw new Exception('Fehler beim Speichern der Posts');
        }
    }
    
    private function findPostIndex($posts, $id) {
        foreach ($posts as $index => $post) {
            if (($post['id'] ?? null) === $id) {
                return $index;
            }
        }
        return false;
    }
    
    private function generatePostId() {
        return date('Y-m-d-H-i-s') . '-' . substr(md5(uniqid()), 0, 8);
    }
    
    private function generateSlug($title) {
        $slug = strtolower(trim($title));
        
        // Deutsche Umlaute ersetzen
        $slug = str_replace(['ä', 'ö', 'ü', 'ß'], ['ae', 'oe', 'ue', 'ss'], $slug);
        
        // Nur Buchstaben, Zahlen und Bindestriche
        $slug = preg_replace('/[^a-z0-9\s\-]/', '', $slug);
        $slug = preg_replace('/[\s\-]+/', '-', $slug);
        $slug = trim($slug, '-');
        
        return $slug ?: 'post-' . time();
    }
    
    private function ensureUniqueSlug($slug, $currentId = null) {
        $posts = $this->loadPosts();
        $originalSlug = $slug;
        $counter = 1;
        
        do {
            $exists = false;
            foreach ($posts as $post) {
                if (($post['slug'] ?? '') === $slug && ($post['id'] ?? '') !== $currentId) {
                    $exists = true;
                    break;
                }
            }
            
            if ($exists) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
        } while ($exists);
        
        return $slug;
    }
    
    private function sendSuccess($message, $data = []) {
        return [
            'success' => true,
            'message' => $message,
            'data' => $data,
            'timestamp' => date('c')
        ];
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        return [
            'success' => false,
            'error' => $message,
            'timestamp' => date('c')
        ];
    }
}

// API ausführen
try {
    $api = new PostsAPI();
    $result = $api->handleRequest();
    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Interner Serverfehler: ' . $e->getMessage(),
        'timestamp' => date('c')
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}
?>