import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getAllRoutes } from "./routes-seo-data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://techsolvent.in";
const today = new Date().toISOString().split("T")[0];

async function generateSitemap() {
  console.log("Generating sitemap.xml for TechSolvent...");
  const routes = await getAllRoutes();

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${routes
  .map(
    (item) => `  <url>
    <loc>${item.canonical || `${BASE_URL}${item.path}`}</loc>
    <lastmod>${item.lastmod || today}</lastmod>
    <changefreq>${item.changefreq || "weekly"}</changefreq>
    <priority>${item.priority || "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  const publicPath = path.resolve(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(publicPath, xmlContent.trim() + "\n", "utf8");
  console.log(`Successfully generated ${publicPath} with ${routes.length} crawlable URLs.`);

  const distDir = path.resolve(__dirname, "../dist");
  if (fs.existsSync(distDir)) {
    const distPath = path.resolve(distDir, "sitemap.xml");
    fs.writeFileSync(distPath, xmlContent.trim() + "\n", "utf8");
    console.log(`Also updated ${distPath}`);
  }
}

generateSitemap();
