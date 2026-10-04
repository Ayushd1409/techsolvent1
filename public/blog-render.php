<?php
/**
 * Server-Side Blog Renderer for TechSolvent
 * Dynamically serves live blog articles from backend API (https://techsolvent.techsolvent.cloud)
 * Ensures 100% crawlability, indexability, and unique metadata for Screaming Frog & Googlebot.
 */

$requestUri = $_SERVER['REQUEST_URI'] ?? '/blog';
$path = parse_url($requestUri, PHP_URL_PATH);
$path = rtrim($path, '/');
if (empty($path)) $path = '/blog';

$parts = explode('/', trim($path, '/'));
// parts[0] is 'blog', parts[1] is slug or id
$blogIdentifier = isset($parts[1]) ? $parts[1] : null;

// Cache settings
$cacheDir = __DIR__ . '/.cache';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0755, true);
}

function fetchJson($url) {
    $ctx = stream_context_create([
        'http' => [
            'timeout' => 4,
            'header' => "User-Agent: TechSolvent-SSR-Renderer/1.0\r\nAccept: application/json\r\n"
        ]
    ]);
    $res = @file_get_contents($url, false, $ctx);
    if ($res) {
        return json_decode($res, true);
    }
    return null;
}

// Fetch all blogs (cached for 60 seconds)
$allBlogsCacheFile = $cacheDir . '/blogs_all.json';
$blogs = null;
if (file_exists($allBlogsCacheFile) && (time() - filemtime($allBlogsCacheFile) < 60)) {
    $blogs = json_decode(@file_get_contents($allBlogsCacheFile), true);
}
if (!$blogs) {
    $blogs = fetchJson('https://techsolvent.techsolvent.cloud/api/blogs');
    if ($blogs && is_array($blogs)) {
        @file_put_contents($allBlogsCacheFile, json_encode($blogs));
    }
}

// Read base template
$templateFile = __DIR__ . '/index.html';
if (!file_exists($templateFile)) {
    http_response_code(500);
    echo "index.html template not found";
    exit;
}
$html = file_get_contents($templateFile);

if (!$blogIdentifier) {
    // ── RENDER BLOG LISTING (/blog) ──────────────────────────
    $pageTitle = "AI Marketing & SEO Growth Insights | TechSolvent Blog";
    $pageDesc = "Deep-dives on AI marketing, SEO, social media, and growth strategy from the team that lives and breathes digital marketing every day.";
    $canonicalUrl = "https://techsolvent.in/blog";

    $html = preg_replace('/<title>[\s\S]*?<\/title>/i', "<title>{$pageTitle}</title>", $html);
    $html = preg_replace('/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"title\" content=\"{$pageTitle}\" />", $html);
    $html = preg_replace('/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"description\" content=\"{$pageDesc}\" />", $html);
    $html = preg_replace('/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i', "<link rel=\"canonical\" href=\"{$canonicalUrl}\" />", $html);
    $html = preg_replace('/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:title\" content=\"{$pageTitle}\" />", $html);
    $html = preg_replace('/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:description\" content=\"{$pageDesc}\" />", $html);
    $html = preg_replace('/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:url\" content=\"{$canonicalUrl}\" />", $html);

    // Build Server-Rendered Listing HTML for Crawlers
    $articlesHtml = "<div class=\"ssr-blog-listing\" style=\"max-width:1200px;margin:0 auto;padding:40px 20px;\">\n";
    $articlesHtml .= "  <h1>AI Marketing &amp; SEO Growth Insights</h1>\n";
    $articlesHtml .= "  <p class=\"lead\">{$pageDesc}</p>\n";
    $articlesHtml .= "  <div class=\"grid\" style=\"display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:24px;margin-top:30px;\">\n";

    if (is_array($blogs)) {
        foreach ($blogs as $b) {
            if (($b['status'] ?? '') === 'Draft' || ($b['status'] ?? '') === 'Archived') continue;
            $slug = !empty($b['slug']) ? $b['slug'] : $b['id'];
            $title = htmlspecialchars($b['title'] ?? 'Untitled');
            $excerpt = htmlspecialchars($b['excerpt'] ?? substr(strip_tags($b['content'] ?? ''), 0, 160));
            $author = htmlspecialchars($b['author'] ?? 'Team TechSolvent');
            $date = htmlspecialchars($b['date'] ?? '');
            $img = !empty($b['image']) ? htmlspecialchars($b['image']) : '';

            $articlesHtml .= "    <article style=\"border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;padding:16px;\">\n";
            if ($img) {
                $articlesHtml .= "      <img src=\"{$img}\" alt=\"{$title}\" style=\"width:100%;height:200px;object-fit:cover;border-radius:8px;\" />\n";
            }
            $articlesHtml .= "      <h2 style=\"margin:14px 0 8px;\"><a href=\"/blog/{$slug}\" style=\"color:#0f172a;text-decoration:none;\">{$title}</a></h2>\n";
            $articlesHtml .= "      <p style=\"color:#64748b;font-size:14px;\">{$excerpt}</p>\n";
            $articlesHtml .= "      <div style=\"font-size:12px;color:#94a3b8;margin-top:12px;\">By {$author} &bull; {$date}</div>\n";
            $articlesHtml .= "    </article>\n";
        }
    }
    $articlesHtml .= "  </div>\n</div>\n";

    // Inject into noscript or root
    $html = str_replace('<div id="root"></div>', "<div id=\"root\">{$articlesHtml}</div>", $html);

    header('Content-Type: text/html; charset=utf-8');
    echo $html;
    exit;
}

// ── RENDER INDIVIDUAL BLOG POST (/blog/:slug) ────────────────
$post = null;
if (is_array($blogs)) {
    foreach ($blogs as $b) {
        $slug = $b['slug'] ?? '';
        $id = $b['id'] ?? '';
        if ($slug === $blogIdentifier || $id === $blogIdentifier ||
            ($blogIdentifier === 'why-your-shopify-store-isnt-converting-and-how-to-fix-it' && $slug === 'why-your-shopify-store-is-not-converting')) {
            $post = $b;
            break;
        }
    }
}

if (!$post) {
    // Try direct fetch from API
    $post = fetchJson('https://techsolvent.techsolvent.cloud/api/blogs/' . urlencode($blogIdentifier));
}

if (!$post) {
    // 404 Blog Not Found
    http_response_code(404);
    $html = preg_replace('/<title>[\s\S]*?<\/title>/i', "<title>Article Not Found | TechSolvent</title>", $html);
    $html = str_replace('<div id="root"></div>', '<div id="root"><div style="text-align:center;padding:80px 20px;"><h1>Article Not Found</h1><p><a href="/blog">Return to Blog</a></p></div></div>', $html);
    header('Content-Type: text/html; charset=utf-8');
    echo $html;
    exit;
}

$postSlug = !empty($post['slug']) ? $post['slug'] : $post['id'];

// Self-referencing canonical matching the primary route slug
$canonicalUrl = "https://techsolvent.in/blog/{$postSlug}";
$metaTitle = !empty($post['metaTitle']) ? $post['metaTitle'] : ($post['title'] . " | TechSolvent");
$metaDesc = !empty($post['metaDescription']) ? $post['metaDescription'] : (!empty($post['excerpt']) ? $post['excerpt'] : substr(strip_tags($post['content'] ?? ''), 0, 160));
$postTitle = htmlspecialchars($post['title'] ?? '');
$author = htmlspecialchars($post['author'] ?? 'Team TechSolvent');
$date = htmlspecialchars($post['date'] ?? '2025');
$readTime = htmlspecialchars($post['read'] ?? '5 min read');
$image = !empty($post['image']) ? $post['image'] : 'https://techsolvent.in/logo.png';
$imageAlt = htmlspecialchars($post['imageAltText'] ?? $postTitle);

// 1. Inject Metadata into <head>
$html = preg_replace('/<title>[\s\S]*?<\/title>/i', "<title>" . htmlspecialchars($metaTitle) . "</title>", $html);
$html = preg_replace('/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"title\" content=\"" . htmlspecialchars($metaTitle) . "\" />", $html);
$html = preg_replace('/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"description\" content=\"" . htmlspecialchars($metaDesc) . "\" />", $html);
$html = preg_replace('/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i', "<link rel=\"canonical\" href=\"{$canonicalUrl}\" />", $html);

// OpenGraph & Twitter
$html = preg_replace('/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:title\" content=\"" . htmlspecialchars($metaTitle) . "\" />", $html);
$html = preg_replace('/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:description\" content=\"" . htmlspecialchars($metaDesc) . "\" />", $html);
$html = preg_replace('/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:url\" content=\"{$canonicalUrl}\" />", $html);
$html = preg_replace('/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:image\" content=\"" . htmlspecialchars($image) . "\" />", $html);
$html = preg_replace('/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"twitter:title\" content=\"" . htmlspecialchars($metaTitle) . "\" />", $html);
$html = preg_replace('/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"twitter:description\" content=\"" . htmlspecialchars($metaDesc) . "\" />", $html);
$html = preg_replace('/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"twitter:url\" content=\"{$canonicalUrl}\" />", $html);
$html = preg_replace('/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"twitter:image\" content=\"" . htmlspecialchars($image) . "\" />", $html);

// Inject Schema.org JSON-LD for BlogPosting
$schemaLd = [
    "@context" => "https://schema.org",
    "@type" => "BlogPosting",
    "mainEntityOfPage" => [
        "@type" => "WebPage",
        "@id" => $canonicalUrl
    ],
    "headline" => $post['title'] ?? '',
    "description" => $metaDesc,
    "image" => $image,
    "author" => [
        "@type" => "Organization",
        "name" => $author,
        "url" => "https://techsolvent.in"
    ],
    "publisher" => [
        "@type" => "Organization",
        "name" => "TechSolvent",
        "logo" => [
            "@type" => "ImageObject",
            "url" => "https://techsolvent.in/logo.png"
        ]
    ],
    "datePublished" => !empty($post['createdAt']) ? $post['createdAt'] : date("c"),
    "dateModified" => !empty($post['updatedAt']) ? $post['updatedAt'] : date("c")
];
$schemaTag = '<script type="application/ld+json">' . json_encode($schemaLd, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . '</script>';
$html = str_replace('</head>', "  {$schemaTag}\n</head>", $html);

// 2. Build Server-Rendered Article HTML for Crawlers & Immediate FCP
$articleHtml = "<article class=\"ssr-blog-article\" style=\"max-width:860px;margin:0 auto;padding:40px 20px;font-family:system-ui,-apple-system,sans-serif;\">\n";
$articleHtml .= "  <nav aria-label=\"Breadcrumb\" style=\"font-size:14px;color:#64748b;margin-bottom:20px;\"><a href=\"/\">Home</a> &rsaquo; <a href=\"/blog\">Blog</a> &rsaquo; <span>{$postTitle}</span></nav>\n";
$articleHtml .= "  <h1 style=\"font-size:2.4rem;line-height:1.2;color:#0f172a;margin-bottom:16px;\">{$postTitle}</h1>\n";
$articleHtml .= "  <div style=\"font-size:14px;color:#64748b;margin-bottom:24px;\">By <strong>{$author}</strong> &bull; {$date} &bull; {$readTime}</div>\n";

if ($image) {
    $articleHtml .= "  <div style=\"margin-bottom:30px;border-radius:12px;overflow:hidden;\"><img src=\"{$image}\" alt=\"{$imageAlt}\" style=\"width:100%;max-height:500px;object-fit:cover;\" /></div>\n";
}

// Excerpt & Quote
if (!empty($post['quote'])) {
    $articleHtml .= "  <blockquote style=\"border-left:4px solid #165DFB;padding-left:16px;margin:24px 0;font-style:italic;color:#334155;background:#f8fafc;padding:16px;\">" . htmlspecialchars($post['quote']) . "</blockquote>\n";
}

// Content
if (!empty($post['content'])) {
    $articleHtml .= "  <div class=\"blog-content\" style=\"line-height:1.8;color:#334155;font-size:17px;\">" . $post['content'] . "</div>\n";
}

// Structured Sections (H2 & paragraphs)
if (!empty($post['sections']) && is_array($post['sections'])) {
    foreach ($post['sections'] as $sec) {
        if (!empty($sec['title'])) {
            $articleHtml .= "  <h2 style=\"font-size:1.75rem;margin-top:36px;margin-bottom:12px;color:#0f172a;\">" . htmlspecialchars($sec['title']) . "</h2>\n";
        }
        if (!empty($sec['paragraphs']) && is_array($sec['paragraphs'])) {
            foreach ($sec['paragraphs'] as $para) {
                $articleHtml .= "  <p style=\"line-height:1.8;color:#334155;font-size:17px;margin-bottom:16px;\">" . htmlspecialchars($para) . "</p>\n";
            }
        }
    }
}

// FAQs
if (!empty($post['faqs']) && is_array($post['faqs'])) {
    $articleHtml .= "  <section style=\"margin-top:48px;border-top:1px solid #e2e8f0;padding-top:32px;\">\n";
    $articleHtml .= "    <h2 style=\"font-size:1.75rem;color:#0f172a;margin-bottom:20px;\">Frequently Asked Questions</h2>\n";
    foreach ($post['faqs'] as $faq) {
        $q = htmlspecialchars($faq['question'] ?? '');
        $a = htmlspecialchars($faq['answer'] ?? '');
        $articleHtml .= "    <div style=\"margin-bottom:20px;\"><h3 style=\"font-size:1.2rem;color:#0f172a;margin-bottom:6px;\">{$q}</h3><p style=\"color:#475569;line-height:1.6;\">{$a}</p></div>\n";
    }
    $articleHtml .= "  </section>\n";
}

$articleHtml .= "</article>\n";

// Inject into #root so non-JS crawlers see full article immediately, and React hydrates on top
$html = str_replace('<div id="root"></div>', "<div id=\"root\">{$articleHtml}</div>", $html);

header('Content-Type: text/html; charset=utf-8');
echo $html;
exit;
