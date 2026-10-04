import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function devSeoPlugin() {
  return {
    name: "dev-seo-plugin",
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (!req._initialUrl && req.url) {
          req._initialUrl = req.url;
        }
        const url = req.url ? req.url.split("?")[0] : "/";

        // Dynamic /sitemap.xml from backend API in dev mode
        if (url === "/sitemap.xml") {
          try {
            const apiRes = await fetch("https://techsolvent.techsolvent.cloud/api/sitemap.xml");
            if (apiRes.ok) {
              const xml = await apiRes.text();
              res.setHeader("Content-Type", "application/xml; charset=utf-8");
              res.end(xml);
              return;
            }
          } catch (e) {
            console.error("Failed to proxy sitemap.xml in dev mode", e);
          }
        }
        next();
      });
    },
    async transformIndexHtml(html: string, ctx: any) {
      const rawUrl = ctx.server?.req?._initialUrl || ctx.originalUrl || ctx.path || "/";
      const cleanPath = rawUrl.split("?")[0].replace(/\/$/, "") || "/";
      const host = ctx.server?.req?.headers?.host || "techsolvent.in";
      const proto = host.includes("localhost") ? "http" : "https";
      const canonicalTarget = `${proto}://${host}${cleanPath === "/" ? "/" : cleanPath}`;

      // If it's an individual blog post, fetch live blog data from backend API!
      if (cleanPath.startsWith("/blog/") && cleanPath !== "/blog") {
        const identifier = cleanPath.replace("/blog/", "");
        try {
          const apiRes = await fetch("https://techsolvent.techsolvent.cloud/api/blogs");
          if (apiRes.ok) {
            const blogs = await apiRes.json();
            const post = Array.isArray(blogs) ? blogs.find((b: any) => b.slug === identifier || b.id === identifier) : null;
            if (post && post.title) {
              const title = post.metaTitle || `${post.title} | TechSolvent`;
              const desc = post.metaDescription || post.excerpt || (post.content ? post.content.replace(/<[^>]+>/g, "").slice(0, 160) : "");
              const author = post.author || "Team TechSolvent";
              const postContent = `<article style="max-width:860px;margin:40px auto;padding:0 20px;"><h1>${post.title}</h1><p>By ${author} &bull; ${post.date || ""}</p>${post.content || ""}</article>`;

              return html
                .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
                .replace(/<meta\s+name="title"\s+content="[^"]*"\s*\/?>/i, `<meta name="title" content="${title}" />`)
                .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${desc}" />`)
                .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalTarget}" />`)
                .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}" />`)
                .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${desc}" />`)
                .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalTarget}" />`)
                .replace(/<div id="root"><\/div>/, `<div id="root">${postContent}</div>`);
            }
          }
        } catch (e) {
          console.warn("Dev SEO transform error:", e);
        }
      }

      // Default replacement
      return html
        .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalTarget}" />`)
        .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalTarget}" />`)
        .replace(/<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta name="twitter:url" content="${canonicalTarget}" />`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), devSeoPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
