import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, BookOpen, ExternalLink, HelpCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useState, useEffect } from "react";
import { posts as initialBlogPosts } from "@/data/blog-posts";

const categories = ["All", "AI Marketing", "SEO / AEO", "Social Media", "E-Commerce", "Lead Gen", "Strategy"];

export default function Blog() {
  const [posts, setPosts] = useState<any[]>(initialBlogPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://techsolvent.techsolvent.cloud/api/blogs")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch blogs", err);
        setLoading(false);
      });
  }, []);

  return (
    <PageLayout>
      <SEO
        title="AI Marketing & SEO Growth Insights | TechSolvent Blog"
        description="Deep-dives on AI marketing, SEO, social media, and growth strategy from the team that lives and breathes digital marketing every day."
        canonical="https://techsolvent.in/blog"
        keywords="ai marketing, seo insights, answer engine optimization, growth agency"
      />

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">Loading blogs...</div>
            ) : posts.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">No blogs found.</div>
            ) : (
              posts.map((post) => (
                <Link to={`/blog/${post.slug || post.id}`} key={post.id} className="block">
                  <article className="group rounded-2xl border border-border overflow-hidden hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 cursor-pointer h-full bg-card flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/10] w-full overflow-hidden bg-muted/20 relative">
                        <img 
                          src={post.image} 
                          alt={post.imageAltText || post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{post.category}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                          {post.faqs && post.faqs.length > 0 && (
                            <>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                                <HelpCircle className="w-3 h-3" /> {post.faqs.length} FAQs
                              </span>
                            </>
                          )}
                        </div>
                        <h2 className="text-lg font-bold leading-snug mb-3 group-hover:text-primary transition-colors text-foreground">{post.title}</h2>
                        {post.excerpt && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-0">
                      <div className="flex items-center gap-1 text-primary text-sm font-semibold">
                        Read Article <ExternalLink className="w-3.5 h-3.5" />
                      </div>
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
