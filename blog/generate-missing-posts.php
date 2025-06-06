<?php
/**
 * Script zur Generierung aller fehlenden HTML-Dateien aus posts.json
 * Verwendung: php generate-missing-posts.php
 */

// Konfiguration laden
$configFile = 'data/config.json';
$postsFile = 'data/posts.json';

if (!file_exists($configFile)) {
    die("❌ Konfigurationsdatei nicht gefunden: {$configFile}\n");
}

if (!file_exists($postsFile)) {
    die("❌ Posts-Datei nicht gefunden: {$postsFile}\n");
}

$config = json_decode(file_get_contents($configFile), true);
$posts = json_decode(file_get_contents($postsFile), true);

echo "🚀 Generiere fehlende HTML-Dateien für Blog-Posts\n";
echo "===================================================\n\n";

function createPostFile($post, $config) {
    $postDir = 'posts';
    
    // Verzeichnis erstellen falls nicht vorhanden
    if (!is_dir($postDir)) {
        if (!mkdir($postDir, 0755, true)) {
            return false;
        }
        echo "📁 Verzeichnis 'posts' erstellt\n";
    }
    
    // HTML-Template
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
    
    <!-- Schema.org Article Markup -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "' . htmlspecialchars($post['title']) . '",
        "description": "' . htmlspecialchars($post['excerpt']) . '",
        "image": "' . htmlspecialchars($post['image'] ?: $config['site_url'] . '/blog/assets/images/default-og.jpg') . '",
        "author": {
            "@type": "Person",
            "name": "' . htmlspecialchars($config['author']) . '",
            "jobTitle": "Osteopath",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Durchschnitt 25",
                "addressLocality": "Hamburg",
                "postalCode": "20146",
                "addressCountry": "DE"
            }
        },
        "publisher": {
            "@type": "Organization",
            "name": "Osteopathie Alsen",
            "url": "' . htmlspecialchars($config['site_url']) . '"
        },
        "datePublished": "' . $post['publishedAt'] . '",
        "dateModified": "' . $post['publishedAt'] . '",
        "url": "' . htmlspecialchars($config['site_url'] . '/blog/posts/' . $post['slug'] . '.html') . '",
        "keywords": "' . htmlspecialchars($post['keywords']) . '"
    }
    </script>
    
    <link rel="stylesheet" href="../assets/css/post.css">
    <link rel="canonical" href="' . htmlspecialchars($config['site_url'] . '/blog/posts/' . $post['slug'] . '.html') . '">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600;700;800&family=Instrument+Sans:wght@300;400;500&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <a href="../" class="back-link">← Zurück zum Blog</a>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <a href="../#kontakt" style="background: #ffffff; color: #1a202c; padding: 0.5rem 1rem; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: all 0.2s ease;">
                        📞 Termin buchen
                    </a>
                </div>
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
                    
                    <!-- Call-to-Action Section -->
                    <div class="cta-section">
                        <h4>Haben Sie Fragen oder möchten Sie einen Termin vereinbaren?</h4>
                        <p>Als Osteopath in Hamburg unterstütze ich Sie gerne bei Ihren gesundheitlichen Anliegen. Vereinbaren Sie einen Termin für eine individuelle Beratung und Behandlung.</p>
                        <a href="../#kontakt" class="cta-button">
                            <span>📞</span>
                            Jetzt Termin buchen
                        </a>
                    </div>
                    
                    <!-- Internal Links Section -->
                    <div class="internal-links-section">
                        <h4>🔗 Weitere interessante Artikel</h4>
                        <div class="internal-links-grid">
                            <div class="internal-link-card">
                                <a href="was-ist-osteopathie-ueberblick.html">Was ist Osteopathie?</a>
                                <p>Grundlagen und Prinzipien der osteopathischen Behandlung</p>
                            </div>
                            <div class="internal-link-card">
                                <a href="nackenverspannungen-uebungen-alltag.html">Nackenverspannungen lösen</a>
                                <p>Effektive Übungen für den Alltag</p>
                            </div>
                            <div class="internal-link-card">
                                <a href="../#behandlungen">Alle Behandlungsmethoden</a>
                                <p>Übersicht unserer osteopathischen Behandlungen</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; ' . date('Y') . ' Osteopathie Alsen - ' . htmlspecialchars($config['author']) . '. Alle Rechte vorbehalten.</p>
            <p>
                <a href="../#kontakt">Kontakt</a> | 
                <a href="../legal/impressum.html">Impressum</a> | 
                <a href="../legal/datenschutz.html">Datenschutz</a> | 
                <a href="../">Zurück zur Hauptseite</a>
            </p>
        </div>
    </footer>
    
    <!-- Back to Blog Link -->
    <div style="position: fixed; bottom: 2rem; left: 2rem; z-index: 1000;">
        <a href="../" style="background: #1a202c; color: #ffffff; padding: 0.75rem 1rem; border-radius: 8px; text-decoration: none; font-weight: 500; box-shadow: 0 4px 12px rgba(26, 32, 44, 0.3); transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
            📚 Alle Artikel
        </a>
    </div>
</body>
</html>';

    $filename = $postDir . '/' . $post['slug'] . '.html';
    
    if (file_put_contents($filename, $template)) {
        return $filename;
    }
    
    return false;
}

// Verarbeitung starten
$created = 0;
$skipped = 0;
$errors = 0;

foreach ($posts as $post) {
    // Nur veröffentlichte Posts verarbeiten
    if ($post['status'] !== 'published') {
        echo "⏭️  Überspringe Entwurf: {$post['title']}\n";
        $skipped++;
        continue;
    }
    
    $filename = 'posts/' . $post['slug'] . '.html';
    
    // Prüfen ob Datei bereits existiert
    if (file_exists($filename)) {
        echo "✅ Bereits vorhanden: {$filename}\n";
        $skipped++;
        continue;
    }
    
    // HTML-Datei erstellen
    $result = createPostFile($post, $config);
    
    if ($result) {
        echo "✅ Erstellt: {$result}\n";
        $created++;
    } else {
        echo "❌ Fehler bei: {$post['slug']}.html\n";
        $errors++;
    }
}

// Zusammenfassung
echo "\n" . str_repeat("=", 50) . "\n";
echo "📊 Zusammenfassung:\n";
echo "✅ Erstellt: {$created} Dateien\n";
echo "⏭️  Übersprungen: {$skipped} Dateien\n";
echo "❌ Fehler: {$errors} Dateien\n";

if ($created > 0) {
    echo "\n🎉 Alle fehlenden HTML-Dateien wurden erfolgreich erstellt!\n";
    echo "🔗 Sie können jetzt alle Blog-Artikel aufrufen.\n";
    echo "\n💡 Nächste Schritte:\n";
    echo "   1. Testen Sie die Links in Ihrem Blog\n";
    echo "   2. Führen Sie 'php generate-sitemap.php' aus\n";
    echo "   3. Prüfen Sie die SEO-Meta-Tags\n";
}

if ($errors > 0) {
    echo "\n⚠️  Einige Dateien konnten nicht erstellt werden.\n";
    echo "Prüfen Sie die Schreibrechte für das 'posts' Verzeichnis.\n";
    exit(1);
}

echo "\n🚀 Fertig!\n";
?>