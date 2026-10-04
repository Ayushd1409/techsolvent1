import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getAllRoutes } from "./routes-seo-data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "../dist");

function replaceMeta(html, route) {
  let output = html;

  // Title
  output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${route.title}</title>`);
  output = output.replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, `<meta name="title" content="${route.title}" />`);

  // Description
  output = output.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${route.description}" />`);

  // Keywords
  if (route.keywords) {
    output = output.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/i, `<meta name="keywords" content="${route.keywords}" />`);
  }

  // Canonical (Ensure 100% self-referencing canonical so Screaming Frog flags page as Indexable)
  output = output.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${route.canonical}" />`);

  // OpenGraph
  output = output.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${route.title}" />`);
  output = output.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${route.description}" />`);
  output = output.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${route.canonical}" />`);

  // Twitter
  output = output.replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:title" content="${route.title}" />`);
  output = output.replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:description" content="${route.description}" />`);
  output = output.replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:url" content="${route.canonical}" />`);

  // Noscript fallback H1 & Description for text-only crawlers
  output = output.replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${route.h1}</h1>`);
  output = output.replace(/<header>\s*<h1>[\s\S]*?<\/h1>\s*<p>[\s\S]*?<\/p>/i, `<header>\n      <h1>${route.h1}</h1>\n      <p>${route.description}</p>`);

  return output;
}

async function prerender() {
  const masterIndexPath = path.resolve(distDir, "index.html");
  if (!fs.existsSync(masterIndexPath)) {
    console.error("dist/index.html not found! Run vite build first.");
    process.exit(1);
  }

  // Clean up any route subdirectories in dist to prevent Apache mod_dir 301 redirects
  const routeDirs = [
    "about",
    "services",
    "contact",
    "career",
    "case-studies",
    "apply",
    "privacy-policy",
    "terms-of-service",
    "blog"
  ];
  for (const dir of routeDirs) {
    const p = path.join(distDir, dir);
    if (fs.existsSync(p)) {
      fs.rmSync(p, { recursive: true, force: true });
    }
  }

  const masterHtml = fs.readFileSync(masterIndexPath, "utf8");
  const routes = await getAllRoutes();
  const homeRoute = routes.find(r => r.path === "/");
  if (homeRoute) {
    const homeHtml = replaceMeta(masterHtml, homeRoute);
    fs.writeFileSync(masterIndexPath, homeHtml, "utf8");
  }

  console.log(`Configured clean production bundle in dist/ with router.php (0 directory 301 redirects).`);
}

prerender();
