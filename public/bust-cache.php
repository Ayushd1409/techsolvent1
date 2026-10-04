<?php
/**
 * TechSolvent CDN Cache Buster
 * Upload this file to public_html/, open it once in your browser, then delete it.
 * Usage: https://techsolvent.in/bust-cache.php
 */

header('Cache-Control: no-cache, no-store, must-revalidate, max-age=0');
header('Pragma: no-cache');
header('Expires: 0');
header('Content-Type: text/html; charset=utf-8');

$routes = [
    '/', '/about', '/about/', '/contact', '/contact/',
    '/services', '/services/', '/services/performance-marketing', '/services/performance-marketing/',
    '/services/virtual-influencer', '/services/virtual-influencer/', '/services/seo', '/services/seo/',
    '/services/voice-agent', '/services/voice-agent/', '/services/lead-generation', '/services/lead-generation/',
    '/services/custom-web-development', '/services/custom-web-development/',
    '/services/shopify-development', '/services/shopify-development/',
    '/services/brand-positioning', '/services/brand-positioning/',
    '/case-studies', '/case-studies/', '/career', '/career/',
    '/apply', '/apply/', '/privacy-policy', '/privacy-policy/',
    '/terms-of-service', '/terms-of-service/', '/blog', '/blog/',
];

$domain = 'https://techsolvent.in';
$results = [];

file_put_contents(__DIR__ . '/.cache_busted_at', date('c'));

foreach ($routes as $route) {
    $url = $domain . $route . '?_bust=' . time();
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_NOBODY         => true,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_TIMEOUT        => 5,
        CURLOPT_HTTPHEADER     => ['Cache-Control: no-cache', 'Pragma: no-cache'],
    ]);
    curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $results[] = ['url' => $domain . $route, 'status' => $code];
    curl_close($ch);
}

$obsoleteDirs = ['about', 'contact', 'services', 'career', 'case-studies', 'apply', 'privacy-policy', 'terms-of-service', 'blog'];
$cleaned = [];
foreach ($obsoleteDirs as $dir) {
    $fullPath = __DIR__ . '/' . $dir;
    if (is_dir($fullPath)) {
        $it = new RecursiveDirectoryIterator($fullPath, RecursiveDirectoryIterator::SKIP_DOTS);
        $files = new RecursiveIteratorIterator($it, RecursiveIteratorIterator::CHILD_FIRST);
        foreach ($files as $file) {
            if ($file->isDir()) @rmdir($file->getRealPath());
            else @unlink($file->getRealPath());
        }
        @rmdir($fullPath);
        $cleaned[] = $dir;
    }
}

echo "<!DOCTYPE html><html><head><title>Cache Buster</title>";
echo "<style>body{font-family:monospace;background:#0f0f0f;color:#0f0;padding:20px}.ok{color:#0f0}.err{color:#f00}h2{color:#fff}table{border-collapse:collapse}td,th{padding:6px;border:1px solid #444}</style>";
echo "</head><body><h2>TechSolvent Cache Buster</h2><p>" . date('c') . "</p>";
if (!empty($cleaned)) echo "<p style='color:#ff0'>Deleted directories: " . implode(', ', $cleaned) . "</p>";
else echo "<p>No residual directories found.</p>";
echo "<table><tr><th>URL</th><th>Status</th></tr>";
foreach ($results as $r) {
    $cls = ($r['status'] == 200) ? 'ok' : 'err';
    echo "<tr><td>" . htmlspecialchars($r['url']) . "</td><td class='{$cls}'>" . $r['status'] . "</td></tr>";
}
echo "</table>";
echo "<br><p><strong>Next:</strong> Hostinger hPanel &rarr; Website &rarr; CDN &rarr; Flush/Purge All Cache</p>";
echo "<p style='color:#888'>Then delete this file from public_html.</p></body></html>";
