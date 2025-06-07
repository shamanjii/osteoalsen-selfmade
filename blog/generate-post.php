<?php
// Generate static HTML blog posts from data/posts.json using template
// Improved version with Markdown conversion

$configFile = __DIR__ . '/data/config.json';
$postsFile  = __DIR__ . '/data/posts.json';
$templateFile = __DIR__ . '/templates/post-template.html';
$outputDir  = __DIR__ . '/posts';

if (!file_exists($postsFile)) {
    fwrite(STDERR, "posts.json not found\n");
    exit(1);
}

$config = file_exists($configFile) ? json_decode(file_get_contents($configFile), true) : [];
$posts  = json_decode(file_get_contents($postsFile), true);
$template = file_get_contents($templateFile);

if (!is_dir($outputDir)) {
    mkdir($outputDir, 0755, true);
}

// Simple Markdown to HTML converter
function markdownToHtml($markdown) {
    // Remove the first h1 (since it's already in the header)
    $markdown = preg_replace('/^# .+\n\n?/', '', $markdown);
    
    // Convert headers
    $markdown = preg_replace('/^### (.+)$/m', '<h3>$1</h3>', $markdown);
    $markdown = preg_replace('/^## (.+)$/m', '<h2>$1</h2>', $markdown);
    $markdown = preg_replace('/^# (.+)$/m', '<h1>$1</h1>', $markdown);
    
    // Convert bold text
    $markdown = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $markdown);
    
    // Convert italic text
    $markdown = preg_replace('/\*([^*]+)\*/', '<em>$1</em>', $markdown);
    
    // Convert unordered lists properly
    $lines = explode("\n", $markdown);
    $result = [];
    $inList = false;
    
    foreach ($lines as $line) {
        $line = trim($line);
        
        // Check if line starts with dash (list item)
        if (preg_match('/^- (.+)$/', $line, $matches)) {
            if (!$inList) {
                $result[] = '<ul>';
                $inList = true;
            }
            $result[] = '<li>' . $matches[1] . '</li>';
        } else {
            // If we were in a list and now we're not, close it
            if ($inList) {
                $result[] = '</ul>';
                $inList = false;
            }
            
            // Add the line as is
            if (!empty($line)) {
                $result[] = $line;
            } else {
                $result[] = '';
            }
        }
    }
    
    // Close any remaining open list
    if ($inList) {
        $result[] = '</ul>';
    }
    
    $markdown = implode("\n", $result);
    
    // Convert paragraphs (split by double newlines)
    $paragraphs = explode("\n\n", $markdown);
    $html = '';
    
    foreach ($paragraphs as $paragraph) {
        $paragraph = trim($paragraph);
        if (empty($paragraph)) continue;
        
        // Skip if already wrapped in HTML tags
        if (preg_match('/^<(h[1-6]|ul|ol|li|div|section|blockquote)/', $paragraph)) {
            $html .= $paragraph . "\n\n";
        } else {
            // Convert single newlines to <br> within paragraphs
            $paragraph = str_replace("\n", "<br>\n", $paragraph);
            $html .= '<p>' . $paragraph . "</p>\n\n";
        }
    }
    
    return $html;
}

// Generate formatted date
function formatDate($dateString) {
    $date = new DateTime($dateString);
    $months = [
        1 => 'Januar', 2 => 'Februar', 3 => 'März', 4 => 'April',
        5 => 'Mai', 6 => 'Juni', 7 => 'Juli', 8 => 'August',
        9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Dezember'
    ];
    return $date->format('d') . '. ' . $months[(int)$date->format('n')] . ' ' . $date->format('Y');
}

// Calculate reading time
function calculateReadingTime($content) {
    $wordCount = str_word_count(strip_tags($content));
    return max(1, ceil($wordCount / 200)); // 200 words per minute
}

foreach ($posts as $post) {
    if ($post['status'] !== 'published') {
        continue; // Skip unpublished posts
    }
    
    $slug = $post['slug'];
    $html = $template;
    
    // Convert markdown content to HTML
    $htmlContent = markdownToHtml($post['content']);
    
    // Generate related posts HTML
    $relatedHtml = '';
    if (!empty($post['related']) && is_array($post['related'])) {
        $relatedHtml = '<div class="related-posts-grid">';
        foreach ($post['related'] as $relSlug) {
            $relatedPost = null;
            foreach ($posts as $p) {
                if ($p['slug'] === $relSlug && $p['status'] === 'published') {
                    $relatedPost = $p;
                    break;
                }
            }
            if ($relatedPost) {
                $relatedHtml .= '
                    <div class="related-post-card">
                        <h4><a href="' . $relSlug . '.html">' . htmlspecialchars($relatedPost['title']) . '</a></h4>
                        <p>' . htmlspecialchars(substr($relatedPost['excerpt'], 0, 150)) . '...</p>
                    </div>';
            }
        }
        $relatedHtml .= '</div>';
    } else {
        // Generate automatic related posts based on keywords
        $currentKeywords = explode(',', strtolower($post['keywords'] ?? ''));
        $relatedPosts = [];
        
        foreach ($posts as $otherPost) {
            if ($otherPost['slug'] === $slug || $otherPost['status'] !== 'published') continue;
            
            $otherKeywords = explode(',', strtolower($otherPost['keywords'] ?? ''));
            $commonKeywords = array_intersect($currentKeywords, $otherKeywords);
            
            if (count($commonKeywords) >= 2) {
                $relatedPosts[] = $otherPost;
            }
            
            if (count($relatedPosts) >= 3) break; // Limit to 3 related posts
        }
        
        if (!empty($relatedPosts)) {
            $relatedHtml = '<div class="related-posts-grid">';
            foreach ($relatedPosts as $relatedPost) {
                $relatedHtml .= '
                    <div class="related-post-card">
                        <h4><a href="' . $relatedPost['slug'] . '.html">' . htmlspecialchars($relatedPost['title']) . '</a></h4>
                        <p>' . htmlspecialchars(substr($relatedPost['excerpt'], 0, 150)) . '...</p>
                    </div>';
            }
            $relatedHtml .= '</div>';
        }
    }
    
    // Prepare all replacements
    $publishedDate = $post['publishedAt'] ?? $post['date'] ?? date('Y-m-d H:i:s');
    $formattedDate = formatDate($publishedDate);
    $readingTime = calculateReadingTime($post['content']);
    $wordCount = str_word_count(strip_tags($post['content']));
    
    $replacements = [
        '{{title}}' => htmlspecialchars($post['title']),
        '{{description}}' => htmlspecialchars($post['excerpt'] ?? ''),
        '{{keywords}}' => htmlspecialchars($post['keywords'] ?? ''),
        '{{slug}}' => $slug,
        '{{date}}' => substr($publishedDate, 0, 10),
        '{{updatedAt}}' => substr($publishedDate, 0, 10),
        '{{formattedDate}}' => $formattedDate,
        '{{readingTime}}' => $readingTime,
        '{{wordCount}}' => $wordCount,
        '{{image}}' => $post['image'] ?? '',
        '{{content}}' => $htmlContent,
        '{{related}}' => $relatedHtml,
        '{{author}}' => $post['author'] ?? ($config['author'] ?? 'Joshua Alsen')
    ];

    // Apply replacements
    $html = str_replace(array_keys($replacements), array_values($replacements), $html);
    
    // Clean up handlebars syntax that wasn't replaced
    $html = preg_replace('/\{\{#if\s+\w+\}\}/', '', $html);
    $html = preg_replace('/\{\{\/if\}\}/', '', $html);
    $html = str_replace('{{', '', $html);
    $html = str_replace('}}', '', $html);
    
    // Write the file
    file_put_contents($outputDir . "/{$slug}.html", $html);
    echo "Generated {$slug}.html (Reading time: {$readingTime} min, Words: {$wordCount})\n";
}

echo "\nGeneration complete! Generated " . count(array_filter($posts, function($p) { return $p['status'] === 'published'; })) . " published posts.\n";
?>