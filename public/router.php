<?php
/**
 * Unified Server-Side Router for TechSolvent
 * Guarantees 0 (ZERO) 301 redirects across the entire website.
 * Serves 200 OK directly for all pages with exact self-referencing canonicals.
 * Serves live server-side data for blogs and sitemaps.
 */

// ── 0. AUTO-CLEANUP OBSOLETE DIRECTORIES ON SERVER ──────────
// Removes any residual physical folders (from older builds) so Apache mod_dir can NEVER trigger a 301 redirect.
$obsoleteDirs = ['about', 'services', 'contact', 'career', 'case-studies', 'apply', 'privacy-policy', 'terms-of-service'];
foreach ($obsoleteDirs as $dirName) {
    $dirPath = __DIR__ . '/' . $dirName;
    if (is_dir($dirPath)) {
        try {
            $it = new RecursiveDirectoryIterator($dirPath, RecursiveDirectoryIterator::SKIP_DOTS);
            $files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
            foreach ($files as $file) {
                if ($file->isDir()) {
                    @rmdir($file->getRealPath());
                } else {
                    @unlink($file->getRealPath());
                }
            }
            @rmdir($dirPath);
        } catch (Exception $e) {
            // Silently continue
        }
    }
}

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$path = parse_url($requestUri, PHP_URL_PATH);
$cleanPath = rtrim($path, '/');
if (empty($cleanPath)) $cleanPath = '/';

// ── 1. SITEMAP ROUTE (/sitemap.xml) ──────────────────────────
if ($cleanPath === '/sitemap.xml') {
    require __DIR__ . '/sitemap.php';
    exit;
}

// ── 2. BLOG ROUTES (/blog and /blog/*) ───────────────────────
if ($cleanPath === '/blog' || strpos($cleanPath, '/blog/') === 0) {
    require __DIR__ . '/blog-render.php';
    exit;
}

// ── 3. STATIC / SERVICE ROUTES (Serve 200 OK Directly) ───────
$staticRoutes = [
    '/' => [
        'title' => 'AI-Driven Digital Marketing Agency in India | TechSolvent',
        'desc' => "TechSolvent is India's leading AI-Driven Digital Marketing Agency helping brands scale with smart SEO, AEO, performance marketing, virtual influencer campaigns, and Shopify development.",
        'keywords' => 'AI-Driven Digital Marketing Agency, AI digital marketing agency, digital marketing agency for ecommerce, AI powered marketing agency, AI marketing services, SEO agency India',
        'h1' => 'AI-Driven Digital Marketing Agency in India'
    ],
    '/about' => [
        'title' => 'AI Marketing Experts in India | About TechSolvent',
        'desc' => 'Know TechSolvent – a team of experienced AI marketing experts helping brands grow with data-driven SEO, paid ads, automation, and performance marketing solutions.',
        'keywords' => 'AI marketing experts India, about TechSolvent, digital marketing team, AI marketing agency team',
        'h1' => 'Engineering the Future of Digital Growth'
    ],
    '/services' => [
        'title' => 'AI Digital Marketing Services in India | SEO, PPC & Social Media – TechSolvent',
        'desc' => 'Explore result-driven AI digital marketing services by TechSolvent, including SEO, PPC, social media marketing, and data-driven growth strategies.',
        'keywords' => 'AI digital marketing services, AI Powered Marketing Services, Digital Marketing Services',
        'h1' => 'AI Digital Marketing Services in India'
    ],
    '/services/performance-marketing' => [
        'title' => 'Performance Marketing Service for ROI Growth | TechSolvent',
        'desc' => 'Boost leads and sales with our performance marketing service. TechSolvent creates data-driven ad campaigns focused on ROI, conversions, and measurable business growth.',
        'keywords' => 'performance marketing services, performance marketing agencies in india, AI performance marketing agency, best performance marketing agencies',
        'h1' => 'Performance Marketing Service for ROI Growth'
    ],
    '/services/virtual-influencer' => [
        'title' => 'Virtual Influencer Marketing | Social Media Marketing Agency – TechSolvent',
        'desc' => 'TechSolvent is a results-driven social media marketing agency offering virtual influencer marketing solutions to boost brand visibility, engagement, and online growth.',
        'keywords' => 'AI performance marketing agency, paid advertising services, PPC performance marketing, performance marketing strategy',
        'h1' => 'Virtual Influencer Marketing & Social Media Solutions'
    ],
    '/services/seo' => [
        'title' => 'AI SEO Services in India | Smart SEO Solutions – TechSolvent',
        'desc' => 'Boost rankings with TechSolvent’s AI SEO services. We use smart automation, data insights, and expert strategies to drive organic traffic, leads, and growth.',
        'keywords' => 'SEO services, local seo services, shopify seo services, ai seo services',
        'h1' => 'AI SEO Services in India'
    ],
    '/services/voice-agent' => [
        'title' => 'AI Voice Agent Solutions for Business Automation | TechSolvent',
        'desc' => 'Automate customer calls and support with a smart AI voice agent from TechSolvent. Improve response time, capture leads, and deliver seamless voice interactions 24/7.',
        'keywords' => 'AI voice automation services, AI voice assistant for business, AI call automation, voice AI customer support',
        'h1' => 'AI Voice Agent Solutions for Business Automation'
    ],
    '/services/lead-generation' => [
        'title' => 'Lead Generation Services in India | AI-Powered Leads – TechSolvent',
        'desc' => 'Looking for reliable lead generation services? TechSolvent attracts high-quality leads using AI-driven marketing, SEO, paid ads, and smart conversion strategies.',
        'keywords' => 'b2b lead generation services, lead generation agency, digital lead generation services',
        'h1' => 'Lead Generation Services in India'
    ],
    '/services/custom-web-development' => [
        'title' => 'Website Development Company in India | Custom Web Solutions – TechSolvent',
        'desc' => 'TechSolvent is a professional website development company creating custom, fast, SEO-friendly websites tailored to your business goals. Build your presence.',
        'keywords' => 'website development agency, shopify website development, website development services, hire website developer',
        'h1' => 'Website Development Company in India'
    ],
    '/services/shopify-development' => [
        'title' => 'Shopify Development Services | Custom Shopify Store Experts – TechSolvent',
        'desc' => 'Boost your online business with expert Shopify Development Services. We build fast, user-friendly, conversion-focused Shopify stores tailored to your brand.',
        'keywords' => 'Shopify store development, Shopify Development Services, Shopify website development, Shopify development company',
        'h1' => 'Shopify Development Services'
    ],
    '/services/brand-positioning' => [
        'title' => 'Brand Strategy Services for Powerful Market Positioning | TechSolvent',
        'desc' => 'Build a strong and memorable brand with expert brand strategy services from TechSolvent. We help businesses define positioning, messaging, and identity.',
        'keywords' => 'Brand Positioning Services, brand positioning agency, brand strategy consulting, digital brand strategy',
        'h1' => 'Brand Strategy Services for Powerful Market Positioning'
    ],
    '/case-studies' => [
        'title' => 'Digital Marketing Case Studies & Client Results | TechSolvent',
        'desc' => 'Discover how TechSolvent drove 4X-8X ROAS, 300% organic traffic, and massive lead generation for top D2C, e-commerce, and global brands.',
        'keywords' => 'digital marketing case studies, ecommerce growth results, performance marketing ROI, TechSolvent clients',
        'h1' => 'Digital Marketing Case Studies & Client Results'
    ],
    '/career' => [
        'title' => 'Careers | TechSolvent - Join Our Team',
        'desc' => 'Explore career opportunities at TechSolvent. Join our team of digital marketing experts, developers, and strategists.',
        'keywords' => 'careers at TechSolvent, marketing jobs, AI developer jobs, agency careers',
        'h1' => 'Careers at TechSolvent'
    ],
    '/apply' => [
        'title' => 'Apply Now | TechSolvent Careers',
        'desc' => 'Apply for open positions at TechSolvent. Join our team of digital marketing experts, developers, and growth strategists.',
        'keywords' => 'job application, career apply, join TechSolvent',
        'h1' => 'Apply to Join TechSolvent'
    ],
    '/contact' => [
        'title' => 'Contact TechSolvent | Start Your Digital Growth Journey Today',
        'desc' => 'Contact TechSolvent to discuss your digital marketing, SEO, web development, and branding needs. Let our experts help you grow your business online.',
        'keywords' => 'contact TechSolvent, digital marketing consultation, book strategy call, marketing agency contact',
        'h1' => 'Contact TechSolvent'
    ],
    '/privacy-policy' => [
        'title' => 'Privacy Policy | TechSolvent',
        'desc' => "Read TechSolvent's privacy policy to understand how we collect, store, and protect your personal data.",
        'keywords' => 'privacy policy, data protection, privacy rights',
        'h1' => 'Privacy Policy'
    ],
    '/terms-of-service' => [
        'title' => 'Terms of Service | TechSolvent',
        'desc' => "Review TechSolvent's terms of service regarding the use of our website, agency services, and digital products.",
        'keywords' => 'terms of service, user agreement, legal terms',
        'h1' => 'Terms of Service'
    ]
];

$templateFile = __DIR__ . '/index.html';
if (!file_exists($templateFile)) {
    http_response_code(500);
    echo "index.html template not found";
    exit;
}

$html = file_get_contents($templateFile);

if (isset($staticRoutes[$cleanPath])) {
    $meta = $staticRoutes[$cleanPath];
    $canonicalUrl = "https://techsolvent.in" . ($cleanPath === '/' ? '/' : $cleanPath);

    // Inject unique title, description, canonical into HTML
    $html = preg_replace('/<title>[\s\S]*?<\/title>/i', "<title>{$meta['title']}</title>", $html);
    $html = preg_replace('/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"title\" content=\"{$meta['title']}\" />", $html);
    $html = preg_replace('/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"description\" content=\"{$meta['desc']}\" />", $html);
    if (!empty($meta['keywords'])) {
        $html = preg_replace('/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"keywords\" content=\"{$meta['keywords']}\" />", $html);
    }
    $html = preg_replace('/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i', "<link rel=\"canonical\" href=\"{$canonicalUrl}\" />", $html);

    // OpenGraph & Twitter
    $html = preg_replace('/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:title\" content=\"{$meta['title']}\" />", $html);
    $html = preg_replace('/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:description\" content=\"{$meta['desc']}\" />", $html);
    $html = preg_replace('/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i', "<meta property=\"og:url\" content=\"{$canonicalUrl}\" />", $html);
    $html = preg_replace('/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"twitter:title\" content=\"{$meta['title']}\" />", $html);
    $html = preg_replace('/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"twitter:description\" content=\"{$meta['desc']}\" />", $html);
    $html = preg_replace('/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i', "<meta name=\"twitter:url\" content=\"{$canonicalUrl}\" />", $html);

    // Update noscript fallback header
    $html = preg_replace('/<h1>[\s\S]*?<\/h1>/i', "<h1>{$meta['h1']}</h1>", $html);
    $html = preg_replace('/<header>\s*<h1>[\s\S]*?<\/h1>\s*<p>[\s\S]*?<\/p>/i', "<header>\n      <h1>{$meta['h1']}</h1>\n      <p>{$meta['desc']}</p>", $html);

    http_response_code(200);
    header('Content-Type: text/html; charset=utf-8');
    header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
    header('Pragma: no-cache');
    echo $html;
    exit;
}

// Fallback to standard SPA index.html with 200 OK
http_response_code(200);
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
header('Pragma: no-cache');
echo $html;

