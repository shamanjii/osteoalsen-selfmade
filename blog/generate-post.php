<?php
/**
 * REPARIERTER Blog Post Generator - Verwendet das Template!
 * Liest post-template.html und ersetzt Platzhalter
 */

class FixedBlogPostGenerator {
    private $templatePath;
    private $postsDataPath;
    private $outputDir;
    private $config;
    
    public function __construct() {
        $this->templatePath = __DIR__ . '/templates/post-template.html';
        $this->postsDataPath = __DIR__ . '/data/posts.json';
        $this->outputDir = __DIR__ . '/posts/';
        
        // Konfiguration
        $this->config = [
            'base_url' => 'https://www.osteoalsen.de',
            'author' => 'Joshua Alsen',
            'author_title' => 'Heilpraktiker und Osteopath',
            'phone' => '+4917643990001'
        ];
        
        // Ausgabe-Verzeichnis erstellen falls nicht vorhanden
        if (!is_dir($this->outputDir)) {
            mkdir($this->outputDir, 0755, true);
        }
    }
    
    /**
     * Generiert alle Posts mit dem Template
     */
    public function generateAllPosts() {
        try {
            // Template laden
            if (!file_exists($this->templatePath)) {
                throw new Exception("Template nicht gefunden: {$this->templatePath}");
            }
            
            $template = file_get_contents($this->templatePath);
            echo "✅ Template geladen: " . strlen($template) . " Zeichen\n";
            
            // Posts laden
            $posts = $this->loadPosts();
            
            if (empty($posts)) {
                throw new Exception('Keine Posts gefunden');
            }
            
            echo "✅ " . count($posts) . " Posts gefunden\n\n";
            
            $generated = 0;
            foreach ($posts as $post) {
                if ($this->generatePostFromTemplate($post, $template)) {
                    $generated++;
                    echo "✅ Post generiert: {$post['slug']}.html\n";
                } else {
                    echo "❌ Fehler bei Post: {$post['slug']}\n";
                }
            }
            
            echo "\n🎉 {$generated} Posts erfolgreich mit Template generiert!\n";
            echo "✨ Mit 1600px Breite und perfekter Sidebar!\n";
            return true;
            
        } catch (Exception $e) {
            echo "❌ Fehler: " . $e->getMessage() . "\n";
            return false;
        }
    }
    
    /**
     * Generiert einen Post aus dem Template
     */
    private function generatePostFromTemplate($post, $template) {
        try {
            // Content verarbeiten
            $htmlContent = $this->markdownToHtml($post['content']);
            
            // Meta-Daten vorbereiten
            $title = $post['title'] ?? 'Unbenannter Artikel';
            $description = $post['excerpt'] ?? 'Keine Beschreibung verfügbar';
            $keywords = $post['keywords'] ?? 'Osteopathie, Hamburg';
            $image = $post['image'] ?? '';
            $publishedAt = $post['publishedAt'] ?? date('Y-m-d H:i:s');
            $formattedDate = $this->formatDate($publishedAt);
            $slug = $post['slug'];
            $readingTime = $this->calculateReadingTime($post['content']);
            
            // Breadcrumb-Title (gekürzt)
            $breadcrumbTitle = strlen($title) > 50 ? substr($title, 0, 50) . '...' : $title;
            
            // TEMPLATE-PLATZHALTER ERSETZEN
            $html = $template;
            
            // Basis-Platzhalter
            $html = str_replace('{{title}}', $this->escapeHtml($title), $html);
            $html = str_replace('{{description}}', $this->escapeHtml($description), $html);
            $html = str_replace('{{keywords}}', $this->escapeHtml($keywords), $html);
            $html = str_replace('{{author}}', $this->escapeHtml($this->config['author']), $html);
            $html = str_replace('{{slug}}', $this->escapeHtml($slug), $html);
            $html = str_replace('{{image}}', $this->escapeHtml($image), $html);
            $html = str_replace('{{date}}', $publishedAt, $html);
            $html = str_replace('{{formattedDate}}', $formattedDate, $html);
            $html = str_replace('{{readingTime}}', $readingTime, $html);
            
            // Content (nicht escapen - bereits HTML)
            $html = str_replace('{{content}}', $htmlContent, $html);
            
            // Datei speichern
            $filename = $this->outputDir . $slug . '.html';
            
            if (file_put_contents($filename, $html)) {
                return true;
            }
            
            return false;
            
        } catch (Exception $e) {
            echo "Fehler bei Post {$post['slug']}: " . $e->getMessage() . "\n";
            return false;
        }
    }
    
    /**
     * Posts aus JSON laden
     */
    private function loadPosts() {
        if (!file_exists($this->postsDataPath)) {
            throw new Exception("Posts-Datei nicht gefunden: {$this->postsDataPath}");
        }
        
        $jsonContent = file_get_contents($this->postsDataPath);
        $posts = json_decode($jsonContent, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new Exception("JSON-Fehler: " . json_last_error_msg());
        }
        
        return $posts;
    }
    
    /**
     * Markdown zu HTML Konvertierung
     */
    private function markdownToHtml($markdown) {
        // Prüfe ob bereits HTML
        if (strpos($markdown, '<') !== false && strpos($markdown, '>') !== false) {
            return $this->cleanupHtml($markdown);
        }
        
        // Markdown konvertieren
        $lines = explode("\n", $markdown);
        $htmlLines = [];
        $inList = false;
        $inOrderedList = false;
        $listItems = [];
        
        foreach ($lines as $line) {
            $trimmed = trim($line);
            
            // Leere Zeilen
            if (empty($trimmed)) {
                if ($inList) {
                    $htmlLines[] = $inOrderedList ? "<ol>" : "<ul>";
                    foreach ($listItems as $item) {
                        $htmlLines[] = "<li>" . $this->processInlineMarkdown($item) . "</li>";
                    }
                    $htmlLines[] = $inOrderedList ? "</ol>" : "</ul>";
                    $inList = false;
                    $inOrderedList = false;
                    $listItems = [];
                }
                $htmlLines[] = "";
                continue;
            }
            
            // Überschriften
            if (preg_match('/^(#{1,6})\s+(.+)$/', $trimmed, $matches)) {
                $level = strlen($matches[1]);
                $text = $matches[2];
                $htmlLines[] = "<h{$level}>" . $this->processInlineMarkdown($text) . "</h{$level}>";
                continue;
            }
            
            // Ungeordnete Listen
            if (preg_match('/^[-*+]\s+(.+)$/', $trimmed, $matches)) {
                if (!$inList || $inOrderedList) {
                    if ($inList && $inOrderedList) {
                        $htmlLines[] = "<ol>";
                        foreach ($listItems as $item) {
                            $htmlLines[] = "<li>" . $this->processInlineMarkdown($item) . "</li>";
                        }
                        $htmlLines[] = "</ol>";
                        $listItems = [];
                    }
                    $inList = true;
                    $inOrderedList = false;
                }
                $listItems[] = $matches[1];
                continue;
            }
            
            // Nummerierte Listen
            if (preg_match('/^\d+\.\s+(.+)$/', $trimmed, $matches)) {
                if (!$inList || !$inOrderedList) {
                    if ($inList && !$inOrderedList) {
                        $htmlLines[] = "<ul>";
                        foreach ($listItems as $item) {
                            $htmlLines[] = "<li>" . $this->processInlineMarkdown($item) . "</li>";
                        }
                        $htmlLines[] = "</ul>";
                        $listItems = [];
                    }
                    $inList = true;
                    $inOrderedList = true;
                }
                $listItems[] = $matches[1];
                continue;
            }
            
            // Blockquotes
            if (strpos($trimmed, '> ') === 0) {
                $quote = substr($trimmed, 2);
                $htmlLines[] = "<blockquote><p>" . $this->processInlineMarkdown($quote) . "</p></blockquote>";
                continue;
            }
            
            // Listen beenden falls wir sie verlassen
            if ($inList) {
                $htmlLines[] = $inOrderedList ? "<ol>" : "<ul>";
                foreach ($listItems as $item) {
                    $htmlLines[] = "<li>" . $this->processInlineMarkdown($item) . "</li>";
                }
                $htmlLines[] = $inOrderedList ? "</ol>" : "</ul>";
                $inList = false;
                $inOrderedList = false;
                $listItems = [];
            }
            
            // Normale Absätze
            $htmlLines[] = "<p>" . $this->processInlineMarkdown($trimmed) . "</p>";
        }
        
        // Offene Listen am Ende schließen
        if ($inList) {
            $htmlLines[] = $inOrderedList ? "<ol>" : "<ul>";
            foreach ($listItems as $item) {
                $htmlLines[] = "<li>" . $this->processInlineMarkdown($item) . "</li>";
            }
            $htmlLines[] = $inOrderedList ? "</ol>" : "</ul>";
        }
        
        return implode("\n", $htmlLines);
    }
    
    /**
     * HTML cleanup
     */
    private function cleanupHtml($html) {
        $html = preg_replace('/\n\s*\n/', "\n", $html);
        return trim($html);
    }
    
    /**
     * Inline Markdown verarbeiten
     */
    private function processInlineMarkdown($text) {
        // Fett: **text** oder __text__
        $text = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $text);
        $text = preg_replace('/__(.*?)__/', '<strong>$1</strong>', $text);
        
        // Kursiv: *text* oder _text_
        $text = preg_replace('/(?<!\*)\*([^\*\n]+)\*(?!\*)/', '<em>$1</em>', $text);
        $text = preg_replace('/(?<!_)_([^_\n]+)_(?!_)/', '<em>$1</em>', $text);
        
        // Links: [text](url)
        $text = preg_replace('/\[([^\]]+)\]\(([^\)]+)\)/', '<a href="$2">$1</a>', $text);
        
        // Inline Code: `code`
        $text = preg_replace('/`([^`]+)`/', '<code>$1</code>', $text);
        
        return $text;
    }
    
    /**
     * HTML escaping
     */
    private function escapeHtml($text) {
        if ($text === null) {
            return '';
        }
        return htmlspecialchars((string)$text, ENT_QUOTES, 'UTF-8');
    }
    
    /**
     * Datum formatieren
     */
    private function formatDate($dateString) {
        $date = new DateTime($dateString);
        $months = [
            '01' => 'Januar', '02' => 'Februar', '03' => 'März',
            '04' => 'April', '05' => 'Mai', '06' => 'Juni',
            '07' => 'Juli', '08' => 'August', '09' => 'September',
            '10' => 'Oktober', '11' => 'November', '12' => 'Dezember'
        ];
        
        $day = $date->format('d');
        $month = $months[$date->format('m')];
        $year = $date->format('Y');
        
        return "{$day}. {$month} {$year}";
    }
    
    /**
     * Lesezeit berechnen
     */
    private function calculateReadingTime($content) {
        $wordCount = str_word_count(strip_tags($content));
        $wordsPerMinute = 200;
        $readingTime = ceil($wordCount / $wordsPerMinute);
        
        return max(1, $readingTime);
    }
}

// Script ausführen
if (isset($argv) && basename($argv[0]) === basename(__FILE__)) {
    echo "🚀 REPARIERTER Blog Post Generator (verwendet Template)...\n\n";
    
    $generator = new FixedBlogPostGenerator();
    $generator->generateAllPosts();
    
    echo "\n✨ Fertig! Posts wurden mit Ihrem Template generiert!\n";
}

// Für Web-Aufruf
if (isset($_GET['generate']) || isset($_POST['generate'])) {
    header('Content-Type: text/plain; charset=utf-8');
    echo "🚀 REPARIERTER Blog Post Generator...\n\n";
    
    $generator = new FixedBlogPostGenerator();
    $success = $generator->generateAllPosts();
    
    if ($success) {
        echo "\n✅ Alle Posts mit Template generiert!\n";
        echo "🎨 1600px Breite + Sidebar aktiv!\n";
    } else {
        echo "\n❌ Fehler beim Generieren.\n";
    }
}
?>