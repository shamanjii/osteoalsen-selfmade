<?php
/**
 * Blog Post Generator mit Markdown-zu-HTML Konverter
 * Generiert HTML-Seiten aus dem Template mit echten Inhalten
 */

class BlogPostGenerator {
    private $templatePath;
    private $postsDataPath;
    private $outputDir;
    
    public function __construct() {
        $this->templatePath = __DIR__ . '/templates/post-template.html';
        $this->postsDataPath = __DIR__ . '/data/posts.json';
        $this->outputDir = __DIR__ . '/posts/';
    }
    
    /**
     * Generiert alle Posts neu
     */
    public function generateAllPosts() {
        try {
            $posts = $this->loadPosts();
            $template = $this->loadTemplate();
            
            if (empty($posts)) {
                throw new Exception('Keine Posts gefunden');
            }
            
            if (empty($template)) {
                throw new Exception('Template konnte nicht geladen werden');
            }
            
            $generated = 0;
            foreach ($posts as $post) {
                if ($this->generatePost($post, $template)) {
                    $generated++;
                    echo "✅ Post generiert: {$post['slug']}.html\n";
                } else {
                    echo "❌ Fehler bei Post: {$post['slug']}\n";
                }
            }
            
            echo "\n🎉 {$generated} Posts erfolgreich generiert!\n";
            return true;
            
        } catch (Exception $e) {
            echo "❌ Fehler: " . $e->getMessage() . "\n";
            return false;
        }
    }
    
    /**
     * Generiert einen einzelnen Post
     */
    public function generatePost($post, $template = null) {
        try {
            if (!$template) {
                $template = $this->loadTemplate();
            }
            
            // Template-Variablen ersetzen
            $html = $this->replacePlaceholders($template, $post);
            
            // HTML-Datei speichern
            $filename = $this->outputDir . $post['slug'] . '.html';
            
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
     * Template laden
     */
    private function loadTemplate() {
        if (!file_exists($this->templatePath)) {
            throw new Exception("Template nicht gefunden: {$this->templatePath}");
        }
        
        return file_get_contents($this->templatePath);
    }
    
    /**
     * Markdown zu HTML konvertieren
     */
    private function markdownToHtml($markdown) {
        // HTML-Tags erstmal entfernen um sauberen Markdown zu haben
        $markdown = strip_tags($markdown);
        
        // Überschriften konvertieren
        $html = preg_replace('/^### (.*$)/m', '<h3>$1</h3>', $markdown);
        $html = preg_replace('/^## (.*$)/m', '<h2>$1</h2>', $html);
        $html = preg_replace('/^# (.*$)/m', '<h1>$1</h1>', $html);
        
        // Absätze erstellen
        $paragraphs = explode("\n\n", $html);
        $htmlParagraphs = [];
        
        foreach ($paragraphs as $paragraph) {
            $paragraph = trim($paragraph);
            if (empty($paragraph)) continue;
            
            // Listen konvertieren
            if (preg_match('/^[-\*\+] /', $paragraph)) {
                $listItems = explode("\n", $paragraph);
                $listHtml = "<ul>\n";
                foreach ($listItems as $item) {
                    if (preg_match('/^[-\*\+] (.*)/', $item, $matches)) {
                        $listHtml .= "<li>" . $this->processInlineMarkdown($matches[1]) . "</li>\n";
                    }
                }
                $listHtml .= "</ul>";
                $htmlParagraphs[] = $listHtml;
            }
            // Nummerierte Listen
            elseif (preg_match('/^\d+\. /', $paragraph)) {
                $listItems = explode("\n", $paragraph);
                $listHtml = "<ol>\n";
                foreach ($listItems as $item) {
                    if (preg_match('/^\d+\. (.*)/', $item, $matches)) {
                        $listHtml .= "<li>" . $this->processInlineMarkdown($matches[1]) . "</li>\n";
                    }
                }
                $listHtml .= "</ol>";
                $htmlParagraphs[] = $listHtml;
            }
            // Blockquotes
            elseif (preg_match('/^> /', $paragraph)) {
                $quote = preg_replace('/^> /m', '', $paragraph);
                $htmlParagraphs[] = "<blockquote><p>" . $this->processInlineMarkdown($quote) . "</p></blockquote>";
            }
            // Überschriften (bereits konvertiert)
            elseif (preg_match('/^<h[1-6]>/', $paragraph)) {
                $htmlParagraphs[] = $paragraph;
            }
            // Normale Absätze
            else {
                $htmlParagraphs[] = "<p>" . $this->processInlineMarkdown($paragraph) . "</p>";
            }
        }
        
        return implode("\n\n", $htmlParagraphs);
    }
    
    /**
     * Inline Markdown verarbeiten (fett, kursiv, Links)
     */
    private function processInlineMarkdown($text) {
        // Zeilenumbrüche in <br> konvertieren
        $text = str_replace("\n", "<br>", $text);
        
        // Fett: **text** oder __text__
        $text = preg_replace('/\*\*(.*?)\*\*/', '<strong>$1</strong>', $text);
        $text = preg_replace('/__(.*?)__/', '<strong>$1</strong>', $text);
        
        // Kursiv: *text* oder _text_
        $text = preg_replace('/(?<!\*)\*([^\*\n]+)\*(?!\*)/', '<em>$1</em>', $text);
        $text = preg_replace('/(?<!_)_([^_\n]+)_(?!_)/', '<em>$1</em>', $text);
        
        // Links: [text](url)
        $text = preg_replace('/\[([^\]]+)\]\(([^\)]+)\)/', '<a href="$2">$1</a>', $text);
        
        // Code: `code`
        $text = preg_replace('/`([^`]+)`/', '<code>$1</code>', $text);
        
        return $text;
    }
    
    /**
     * Template-Platzhalter ersetzen
     */
    private function replacePlaceholders($template, $post) {
        // Content von Markdown zu HTML konvertieren
        $htmlContent = $this->markdownToHtml($post['content']);
        
        // Fallback-Werte für fehlende Felder
        $title = $post['title'] ?? 'Unbenannter Artikel';
        $description = $post['excerpt'] ?? 'Keine Beschreibung verfügbar';
        $keywords = $post['keywords'] ?? 'Osteopathie, Hamburg';
        $author = 'Joshua Alsen'; // Fester Autor, da nicht in JSON
        $image = $post['image'] ?? '';
        $publishedAt = $post['publishedAt'] ?? date('Y-m-d');
        
        // Basis-Daten
        $placeholders = [
            '{{title}}' => $this->sanitizeHtml($title),
            '{{description}}' => $this->sanitizeHtml($description),
            '{{keywords}}' => $this->sanitizeHtml($keywords),
            '{{author}}' => $this->sanitizeHtml($author),
            '{{slug}}' => $this->sanitizeHtml($post['slug']),
            '{{date}}' => $publishedAt,
            '{{updatedAt}}' => $post['updatedAt'] ?? $publishedAt,
            '{{image}}' => $image,
            '{{content}}' => $htmlContent, // Konvertierter HTML-Content
            '{{formattedDate}}' => $this->formatDate($publishedAt),
            '{{readingTime}}' => $this->calculateReadingTime($post['content'])
        ];
        
        // Platzhalter ersetzen
        $html = str_replace(array_keys($placeholders), array_values($placeholders), $template);
        
        // Related Posts generieren
        $html = $this->addRelatedPosts($html, $post);
        
        return $html;
    }
    
    /**
     * HTML sanitizen - Null-Safe
     */
    private function sanitizeHtml($text) {
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
        $wordsPerMinute = 200; // Durchschnittliche Lesegeschwindigkeit
        $readingTime = ceil($wordCount / $wordsPerMinute);
        
        return max(1, $readingTime); // Mindestens 1 Minute
    }
    
    /**
     * Verwandte Posts hinzufügen
     */
    private function addRelatedPosts($html, $currentPost) {
        try {
            $allPosts = $this->loadPosts();
            $relatedPosts = $this->findRelatedPosts($currentPost, $allPosts, 3);
            
            if (empty($relatedPosts)) {
                // Fallback zu den neuesten Posts
                $relatedPosts = array_slice(
                    array_filter($allPosts, function($post) use ($currentPost) {
                        return $post['slug'] !== $currentPost['slug'];
                    }), 
                    0, 3
                );
            }
            
            $relatedHtml = '';
            foreach ($relatedPosts as $post) {
                $relatedHtml .= $this->generateRelatedPostHtml($post);
            }
            
            // Related Posts Section ersetzen
            $html = str_replace(
                '{{#if related}}
                        {{related}}
                    {{else}}',
                '',
                $html
            );
            
            $html = str_replace(
                '{{/if}}',
                '',
                $html
            );
            
            // Standardinhalt ersetzen
            $pattern = '/<li class="related-post-item">.*?<\/li>/s';
            $html = preg_replace($pattern, '', $html);
            
            // Neue verwandte Posts einfügen
            $html = str_replace(
                '<ul class="related-posts-list">',
                '<ul class="related-posts-list">' . $relatedHtml,
                $html
            );
            
            return $html;
            
        } catch (Exception $e) {
            // Bei Fehler: Original HTML zurückgeben
            return $html;
        }
    }
    
    /**
     * Verwandte Posts finden (basierend auf Keywords)
     */
    private function findRelatedPosts($currentPost, $allPosts, $limit = 3) {
        $currentKeywords = explode(',', strtolower($currentPost['keywords']));
        $currentKeywords = array_map('trim', $currentKeywords);
        
        $scores = [];
        
        foreach ($allPosts as $post) {
            if ($post['slug'] === $currentPost['slug']) {
                continue;
            }
            
            $postKeywords = explode(',', strtolower($post['keywords']));
            $postKeywords = array_map('trim', $postKeywords);
            
            $intersection = array_intersect($currentKeywords, $postKeywords);
            $scores[$post['slug']] = [
                'post' => $post,
                'score' => count($intersection)
            ];
        }
        
        // Nach Score sortieren
        uasort($scores, function($a, $b) {
            return $b['score'] <=> $a['score'];
        });
        
        // Top Posts zurückgeben
        $relatedPosts = [];
        $count = 0;
        foreach ($scores as $data) {
            if ($count >= $limit) break;
            if ($data['score'] > 0) { // Nur Posts mit gemeinsamen Keywords
                $relatedPosts[] = $data['post'];
                $count++;
            }
        }
        
        return $relatedPosts;
    }
    
    /**
     * HTML für verwandte Posts generieren
     */
    private function generateRelatedPostHtml($post) {
        $title = $this->sanitizeHtml($post['title']);
        $excerpt = $this->sanitizeHtml(substr($post['excerpt'], 0, 100)) . '...';
        $slug = $this->sanitizeHtml($post['slug']);
        
        return "
                    <li class=\"related-post-item\">
                        <div class=\"related-post-title\">
                            <a href=\"{$slug}.html\">
                                {$title}
                            </a>
                        </div>
                        <div class=\"related-post-excerpt\">
                            {$excerpt}
                        </div>
                    </li>";
    }
}

// Script ausführen wenn direkt aufgerufen
if (isset($argv) && basename($argv[0]) === basename(__FILE__)) {
    echo "🚀 Blog Post Generator mit Markdown-Konverter wird gestartet...\n\n";
    
    $generator = new BlogPostGenerator();
    $generator->generateAllPosts();
    
    echo "\n✨ Fertig! Alle Markdown-Inhalte wurden zu HTML konvertiert.\n";
}

// Für Web-Aufruf
if (isset($_GET['generate']) || isset($_POST['generate'])) {
    header('Content-Type: text/plain');
    echo "🚀 Blog Post Generator mit Markdown-Konverter wird gestartet...\n\n";
    
    $generator = new BlogPostGenerator();
    $success = $generator->generateAllPosts();
    
    if ($success) {
        echo "\n✨ Alle Posts wurden erfolgreich generiert!\n";
        echo "📝 Markdown wurde zu HTML konvertiert!\n";
        echo "\nSie können jetzt die Posts unter /blog/posts/ aufrufen.\n";
    } else {
        echo "\n❌ Es gab Probleme beim Generieren der Posts.\n";
    }
}
?>