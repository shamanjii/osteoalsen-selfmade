<?php
/**
 * Post Generator - Manuelles Erstellen von Blog-Posts via Kommandozeile
 * Verwendung: php generate-post.php
 */

// Konfiguration laden
$configFile = 'data/config.json';
$postsFile = 'data/posts.json';

if (!file_exists($configFile)) {
    die("❌ Konfigurationsdatei nicht gefunden: {$configFile}\n");
}

$config = json_decode(file_get_contents($configFile), true);
$posts = file_exists($postsFile) ? json_decode(file_get_contents($postsFile), true) : [];

echo "🚀 Blog Post Generator\n";
echo "======================\n\n";

// Hilfsfunktionen
function readline_fallback($prompt) {
    echo $prompt;
    return trim(fgets(STDIN));
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

function createPostFile($post, $config) {
    $postDir = 'posts';
    
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

// Interaktive Post-Erstellung
try {
    // Titel
    $title = readline_fallback("📝 Post-Titel: ");
    if (empty($title)) {
        throw new Exception("Titel ist erforderlich!");
    }

    // Slug generieren
    $suggestedSlug = generateSlug($title);
    $slug = readline_fallback("🔗 URL-Slug [$suggestedSlug]: ");
    if (empty($slug)) {
        $slug = $suggestedSlug;
    }

    // Prüfen ob Slug bereits existiert
    $existingPost = array_filter($posts, function($p) use ($slug) {
        return $p['slug'] === $slug;
    });
    
    if (!empty($existingPost)) {
        $slug .= '-' . time();
        echo "⚠️  Slug bereits vorhanden. Neuer Slug: {$slug}\n";
    }

    // Meta Description
    $excerpt = readline_fallback("📄 Meta Description (max. 160 Zeichen): ");
    if (strlen($excerpt) > 160) {
        $excerpt = substr($excerpt, 0, 160);
        echo "⚠️  Meta Description gekürzt auf 160 Zeichen\n";
    }

    // Content
    echo "📝 Inhalt (HTML erlaubt, leere Zeile zum Beenden):\n";
    $content = "";
    while (($line = readline_fallback("")) !== "") {
        $content .= $line . "\n";
    }
    
    if (empty($content)) {
        throw new Exception("Inhalt ist erforderlich!");
    }

    // Keywords automatisch generieren oder manuell eingeben
    $autoKeywords = generateKeywords($title, $content);
    echo "💡 Vorgeschlagene Keywords: {$autoKeywords}\n";
    $keywords = readline_fallback("🎯 Keywords (Enter für Vorschlag): ");
    if (empty($keywords)) {
        $keywords = $autoKeywords;
    }

    // Bild (optional)
    $image = readline_fallback("🖼️  Bild-URL (optional): ");
    
    // Alt-Text
    $altText = "";
    if (!empty($image)) {
        $suggestedAltText = "Beitragsbild zu: {$title}";
        $altText = readline_fallback("🏷️  Alt-Text [{$suggestedAltText}]: ");
        if (empty($altText)) {
            $altText = $suggestedAltText;
        }
    }

    // Status
    $status = readline_fallback("📊 Status [published]: ");
    if (empty($status)) {
        $status = 'published';
    }

    // Post-Array erstellen
    $post = [
        'id' => time(),
        'title' => $title,
        'slug' => $slug,
        'excerpt' => $excerpt ?: substr(strip_tags($content), 0, 160),
        'content' => $content,
        'keywords' => $keywords,
        'image' => $image,
        'altText' => $altText,
        'publishedAt' => date('Y-m-d H:i:s'),
        'status' => $status
    ];

    // Vorschau anzeigen
    echo "\n📋 Post-Vorschau:\n";
    echo "================\n";
    echo "Titel: {$post['title']}\n";
    echo "Slug: {$post['slug']}\n";
    echo "Excerpt: {$post['excerpt']}\n";
    echo "Keywords: {$post['keywords']}\n";
    echo "Status: {$post['status']}\n";
    echo "Bild: " . ($post['image'] ?: 'Keins') . "\n";
    echo "\n";

    // Bestätigung
    $confirm = readline_fallback("✅ Post erstellen? (y/N): ");
    if (strtolower($confirm) !== 'y') {
        echo "❌ Abgebrochen.\n";
        exit(0);
    }

    // Post zu Array hinzufügen
    array_unshift($posts, $post);

    // JSON speichern
    $dir = dirname($postsFile);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    if (!file_put_contents($postsFile, json_encode($posts, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        throw new Exception("Fehler beim Speichern der posts.json");
    }

    // HTML-Datei erstellen
    if (!createPostFile($post, $config)) {
        throw new Exception("Fehler beim Erstellen der HTML-Datei");
    }

    echo "✅ Post erfolgreich erstellt!\n";
    echo "📄 JSON: {$postsFile}\n";
    echo "🌐 HTML: posts/{$post['slug']}.html\n";
    echo "🔗 URL: {$config['site_url']}/blog/posts/{$post['slug']}.html\n";

    // Sitemap-Hinweis
    echo "\n💡 Tipp: Führe 'php generate-sitemap.php' aus, um die Sitemap zu aktualisieren.\n";

} catch (Exception $e) {
    echo "❌ Fehler: " . $e->getMessage() . "\n";
    exit(1);
}
?>