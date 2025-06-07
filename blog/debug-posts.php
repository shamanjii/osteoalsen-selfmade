<?php
/**
 * Debug Script für Posts-Daten
 */

$postsFile = __DIR__ . '/data/posts.json';

echo "🔍 Posts Debug Script\n";
echo "===================\n\n";

// Prüfe ob Datei existiert
if (!file_exists($postsFile)) {
    echo "❌ Posts-Datei nicht gefunden: $postsFile\n";
    echo "📁 Verfügbare Dateien im data/ Ordner:\n";
    if (is_dir(__DIR__ . '/data/')) {
        $files = scandir(__DIR__ . '/data/');
        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                echo "   - $file\n";
            }
        }
    } else {
        echo "   ❌ data/ Ordner existiert nicht!\n";
    }
    exit;
}

// Lade JSON
$jsonContent = file_get_contents($postsFile);
echo "📄 JSON Datei gefunden: " . strlen($jsonContent) . " Zeichen\n\n";

// Erste 300 Zeichen anzeigen
echo "📝 JSON Vorschau:\n";
echo substr($jsonContent, 0, 300) . "...\n\n";

// JSON parsen
$posts = json_decode($jsonContent, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo "❌ JSON Parsing Fehler: " . json_last_error_msg() . "\n";
    exit;
}

echo "✅ JSON erfolgreich geparst\n";
echo "📊 Anzahl Posts: " . count($posts) . "\n\n";

// Ersten Post analysieren
if (!empty($posts)) {
    $firstPost = $posts[0];
    
    echo "🔍 Erster Post Analyse:\n";
    echo "=======================\n";
    
    foreach ($firstPost as $key => $value) {
        $valuePreview = is_string($value) ? 
            (strlen($value) > 50 ? substr($value, 0, 50) . '...' : $value) : 
            (is_array($value) ? '[Array]' : $value);
        
        echo sprintf("%-15s: %s\n", $key, $valuePreview);
    }
    
    echo "\n📋 Alle verfügbaren Keys:\n";
    echo implode(', ', array_keys($firstPost)) . "\n\n";
    
    // Titel-spezifische Prüfung
    echo "🏷️  Titel-Analyse:\n";
    echo "=================\n";
    
    $titleFields = ['title', 'headline', 'name', 'subject'];
    foreach ($titleFields as $field) {
        if (isset($firstPost[$field])) {
            echo "✅ '$field': " . $firstPost[$field] . "\n";
        } else {
            echo "❌ '$field': nicht gefunden\n";
        }
    }
    
} else {
    echo "❌ Keine Posts im Array gefunden!\n";
}

echo "\n" . str_repeat("=", 50) . "\n";
echo "🚀 Debug abgeschlossen\n";
?>