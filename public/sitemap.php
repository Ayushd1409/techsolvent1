<?php
header("Content-Type: application/xml; charset=utf-8");
header("X-Robots-Tag: noindex, follow");

$apiUrl = "https://techsolvent.techsolvent.cloud/api/sitemap.xml";
$cacheFile = __DIR__ . "/sitemap-cache.xml";
$cacheTime = 60; // 60 seconds cache

if (file_exists($cacheFile) && (time() - filemtime($cacheFile) < $cacheTime)) {
    readfile($cacheFile);
    exit;
}

$ctx = stream_context_create([
    "http" => [
        "timeout" => 4,
        "header" => "User-Agent: TechSolvent-Sitemap-Proxy/1.0\r\n"
    ]
]);

$xml = @file_get_contents($apiUrl, false, $ctx);

if ($xml && strpos($xml, "<urlset") !== false) {
    @file_put_contents($cacheFile, $xml);
    echo $xml;
    exit;
}

// Fallback to static sitemap if backend is unreachable
$staticFile = __DIR__ . "/sitemap.xml";
if (file_exists($staticFile)) {
    readfile($staticFile);
    exit;
}

// Minimal fallback
echo '<?xml version="1.0" encoding="UTF-8"?>';
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
echo '<url><loc>https://techsolvent.in/</loc><priority>1.0</priority></url>';
echo '</urlset>';
