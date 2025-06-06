<?php
// Generate static HTML blog posts from data/posts.json using template

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

foreach ($posts as $post) {
    $slug = $post['slug'];
    $html = $template;
    $replacements = [
        '{{title}}' => $post['title'],
        '{{description}}' => $post['excerpt'] ?? '',
        '{{slug}}' => $slug,
        '{{author}}' => $post['author'] ?? ($config['author'] ?? ''),
        '{{date}}' => isset($post['publishedAt']) ? substr($post['publishedAt'],0,10) : ($post['date'] ?? ''),
        '{{image}}' => $post['image'] ?? '',
        '{{content}}' => $post['content'],
        '{{related}}' => ''
    ];

    if (!empty($post['related']) && is_array($post['related'])) {
        $list = "<ul>\n";
        foreach ($post['related'] as $relSlug) {
            $title = $relSlug;
            foreach ($posts as $p) {
                if ($p['slug'] === $relSlug) { $title = $p['title']; break; }
            }
            $list .= "  <li><a href='{$relSlug}.html'>{$title}</a></li>\n";
        }
        $list .= "</ul>\n";
        $replacements['{{related}}'] = $list;
    }

    $html = str_replace(array_keys($replacements), array_values($replacements), $html);
    file_put_contents($outputDir . "/{$slug}.html", $html);
    echo "Generated {$slug}.html\n";
}
?>
