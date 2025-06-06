<?php
// Fehlerbehandlung aktivieren
error_reporting(E_ALL);
ini_set('display_errors', 0); // Keine Fehler in Output
ini_set('log_errors', 1);

// JSON-Header setzen
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

// Preflight OPTIONS Request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Konfiguration mit absoluten Pfaden
$baseDir = dirname(__FILE__);
$postsFile = $baseDir . '/../data/posts.json';
$configFile = $baseDir . '/../data/config.json';

// Debugging-Funktion
function debugLog($message) {
    error_log("[BLOG-API] " . $message);
}

// JSON-Response senden
function sendResponse($success, $data = null, $error = null, $httpCode = 200) {
    http_response_code($httpCode);
    
    $response = [
        'success' => $success,
        'timestamp' => date('c'),
        'method' => $_SERVER['REQUEST_METHOD']
    ];
    
    if ($data !== null) {
        $response['data'] = $data;
    }
    
    if ($error !== null) {
        $response['error'] = $error;
    }
    
    echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

// Hilfsfunktionen
function loadPosts() {
    global $postsFile;
    
    debugLog("Lade Posts aus: " . $postsFile);
    
    if (!file_exists($postsFile)) {
        debugLog("Posts-Datei existiert nicht, erstelle neue");
        return [];
    }
    
    $content = file_get_contents($postsFile);
    if ($content === false) {
        debugLog("Fehler beim Lesen der Posts-Datei");
        return [];
    }
    
    $posts = json_decode($content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        debugLog("JSON-Decode-Fehler: " . json_last_error_msg());
        return [];
    }
    
    debugLog("Posts geladen: " . count($posts) . " Einträge");
    return $posts ?: [];
}

function savePosts($posts) {
    global $postsFile;
    
    debugLog("Speichere " . count($posts) . " Posts");
    
    // Verzeichnis erstellen falls nicht vorhanden
    $dir = dirname($postsFile);
    if (!is_dir($dir)) {
        if (!mkdir($dir, 0755, true)) {
            debugLog("Fehler beim Erstellen des Verzeichnisses: " . $dir);
            return false;
        }
    }
    
    $json = json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false) {
        debugLog("JSON-Encode-Fehler: " . json_last_error_msg());
        return false;
    }
    
    $result = file_put_contents($postsFile, $json, LOCK_EX);
    if ($result === false) {
        debugLog("Fehler beim Schreiben der Posts-Datei");
        return false;
    }
    
    debugLog("Posts erfolgreich gespeichert");
    return true;
}

function loadConfig() {
    global $configFile;
    
    debugLog("Lade Config aus: " . $configFile);
    
    if (!file_exists($configFile)) {
        debugLog("Config-Datei existiert nicht, verwende Defaults");
        return [
            'site_name' => 'SEO Blog',
            'site_url' => 'https://example.com',
            'description' => 'Ein Blog über SEO und Online Marketing',
            'author' => 'Blog Author'
        ];
    }
    
    $content = file_get_contents($configFile);
    if ($content === false) {
        debugLog("Fehler beim Lesen der Config-Datei");
        return [];
    }
    
    $config = json_decode($content, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        debugLog("Config JSON-Decode-Fehler: " . json_last_error_msg());
        return [];
    }
    
    return $config ?: [];
}

function generateSlug($title) {
    $slug = strtolower($title);
    $slug = str_replace(['ä', 'ö', 'ü', 'ß'], ['ae', 'oe', 'ue', 'ss'], $slug);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    $slug = trim($slug, '-');
    return $slug;
}

function validatePost($post) {
    $errors = [];
    
    if (empty($post['title'])) {
        $errors[] = 'Titel ist erforderlich';
    }
    
    if (empty($post['content'])) {
        $errors[] = 'Inhalt ist erforderlich';
    }
    
    if (strlen($post['excerpt'] ?? '') > 160) {
        $errors[] = 'Meta Description darf maximal 160 Zeichen haben';
    }
    
    return $errors;
}

function createPostFile($post) {
    $config = loadConfig();
    $postDir = dirname(__FILE__) . '/../posts';
    
    if (!is_dir($postDir)) {
        if (!mkdir($postDir, 0755, true)) {
            debugLog("Fehler beim Erstellen des Posts-Verzeichnisses");
            return false;
        }
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
                            📅 ' . date('d. F Y', strtotime($post['publishedAt'])) . '
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
    $result = file_put_contents($filename, $template);
    
    if ($result === false) {
        debugLog("Fehler beim Erstellen der HTML-Datei: " . $filename);
        return false;
    }
    
    debugLog("HTML-Datei erstellt: " . $filename);
    return true;
}

// Request-Verarbeitung
try {
    $method = $_SERVER['REQUEST_METHOD'];
    debugLog("Request: " . $method . " " . $_SERVER['REQUEST_URI']);
    
    switch ($method) {
        case 'GET':
            // Posts abrufen
            $posts = loadPosts();
            sendResponse(true, $posts);
            break;
            
        case 'POST':
            // Neuen Post erstellen
            $input = file_get_contents('php://input');
            debugLog("POST Input: " . substr($input, 0, 200) . "...");
            
            if (empty($input)) {
                sendResponse(false, null, 'Keine Daten empfangen', 400);
            }
            
            $postData = json_decode($input, true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                sendResponse(false, null, 'Ungültiges JSON: ' . json_last_error_msg(), 400);
            }
            
            // Validierung
            $errors = validatePost($postData);
            if (!empty($errors)) {
                sendResponse(false, null, implode(', ', $errors), 400);
            }
            
            // Post-Daten vorbereiten
            $posts = loadPosts();
            
            $post = [
                'id' => time(),
                'title' => $postData['title'],
                'slug' => $postData['slug'] ?: generateSlug($postData['title']),
                'excerpt' => $postData['excerpt'] ?: substr(strip_tags($postData['content']), 0, 160),
                'content' => $postData['content'],
                'keywords' => $postData['keywords'] ?? '',
                'image' => $postData['image'] ?? '',
                'altText' => $postData['altText'] ?? '',
                'publishedAt' => date('Y-m-d H:i:s'),
                'status' => $postData['status'] ?? 'published'
            ];
            
            // Slug eindeutig machen
            $originalSlug = $post['slug'];
            $counter = 1;
            while (array_filter($posts, function($p) use ($post) { 
                return $p['slug'] === $post['slug']; 
            })) {
                $post['slug'] = $originalSlug . '-' . $counter++;
            }
            
            // Post hinzufügen
            array_unshift($posts, $post);
            
            // Speichern
            if (!savePosts($posts)) {
                sendResponse(false, null, 'Fehler beim Speichern der Posts', 500);
            }
            
            // HTML-Datei erstellen
            if (!createPostFile($post)) {
                debugLog("Warnung: HTML-Datei konnte nicht erstellt werden");
            }
            
            sendResponse(true, $post);
            break;
            
        case 'PUT':
            // Post aktualisieren
            $input = file_get_contents('php://input');
            $postData = json_decode($input, true);
            
            if (json_last_error() !== JSON_ERROR_NONE) {
                sendResponse(false, null, 'Ungültiges JSON', 400);
            }
            
            if (empty($postData['id'])) {
                sendResponse(false, null, 'Post-ID ist erforderlich', 400);
            }
            
            $posts = loadPosts();
            $found = false;
            
            for ($i = 0; $i < count($posts); $i++) {
                if ($posts[$i]['id'] == $postData['id']) {
                    $posts[$i] = array_merge($posts[$i], $postData);
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                sendResponse(false, null, 'Post nicht gefunden', 404);
            }
            
            if (!savePosts($posts)) {
                sendResponse(false, null, 'Fehler beim Aktualisieren', 500);
            }
            
            createPostFile($posts[$i]);
            sendResponse(true, $posts[$i]);
            break;
            
        case 'DELETE':
            // Post löschen
            $id = $_GET['id'] ?? null;
            
            if (!$id) {
                sendResponse(false, null, 'Post-ID ist erforderlich', 400);
            }
            
            $posts = loadPosts();
            $found = false;
            
            for ($i = 0; $i < count($posts); $i++) {
                if ($posts[$i]['id'] == $id) {
                    // HTML-Datei löschen
                    $filename = dirname(__FILE__) . '/../posts/' . $posts[$i]['slug'] . '.html';
                    if (file_exists($filename)) {
                        unlink($filename);
                    }
                    
                    array_splice($posts, $i, 1);
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                sendResponse(false, null, 'Post nicht gefunden', 404);
            }
            
            if (!savePosts($posts)) {
                sendResponse(false, null, 'Fehler beim Löschen', 500);
            }
            
            sendResponse(true, ['message' => 'Post gelöscht']);
            break;
            
        default:
            sendResponse(false, null, 'Methode nicht unterstützt', 405);
    }
    
} catch (Exception $e) {
    debugLog("Exception: " . $e->getMessage());
    sendResponse(false, null, 'Server-Fehler: ' . $e->getMessage(), 500);
} catch (Error $e) {
    debugLog("Error: " . $e->getMessage());
    sendResponse(false, null, 'Schwerwiegender Fehler', 500);
}
?>