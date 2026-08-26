import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";

import { useState, useEffect } from "react";

const categories = ["All", "AI Marketing", "SEO / AEO", "Social Media", "E-Commerce", "Lead Gen", "Strategy"];

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/blogs")
      .then(res => res.json())
      .then(data => {
        setPosts(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blogs", err);
        setLoading(false);
      });
  }, []);

  return (
    <PageLayout>
      <PageHero
        variant="blog"
        align="center"
        badge="Free Growth Insights"
        title="Insights That"
        highlightedTitle="Actually Drive Growth."
        subtitle="Deep-dives on AI marketing, SEO, social media, and growth strategy from the team that lives and breathes digital marketing every day."
      />


      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category pills */}
          {/* <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((c) => (
              <button key={c} className={`px-5 py-2 rounded-full text-sm font-medium border transition-all ${c === "All" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50 hover:text-primary"}`}>
                {c}
              </button>
            ))}
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">Loading blogs...</div>
            ) : posts.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">No blogs found.</div>
            ) : (
              posts.map((post) => (
                <Link to={`/blog/${post.id}`} key={post.id} className="block">
                  <article className="group rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer h-full">
                    <div className="h-48 overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-primary">{post.category}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{post.read}</span>
                      </div>
                      <h2 className="text-lg font-bold leading-snug mb-4 group-hover:text-primary transition-colors">{post.title}</h2>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium">Read More <ExternalLink className="w-4 h-4" /></div>
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0D2E8C] text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#165DFB]/30 rounded-full blur-[100px]" />
          {/* Corner orbs */}
          <div className="absolute -top-16 -left-16 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

          {/* SVG dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blogCtaDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blogCtaDots)" />
          </svg>

          {/* Floating rings */}
          <div className="absolute top-6 right-12 w-28 h-28 rounded-full border border-white/10" />
          <div className="absolute top-10 right-16 w-16 h-16 rounded-full border border-white/15" />
          <div className="absolute bottom-6 left-12 w-36 h-36 rounded-full border border-white/10" />
          <div className="absolute bottom-10 left-20 w-20 h-20 rounded-full border border-white/15" />

          {/* Diagonal stripe */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="80" />
          </svg>

          {/* Pulsing particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Act on These Insights?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Stop reading about growth. Start achieving it. Let's build a strategy tailored to your brand.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
            Book a Free Strategy Call <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
