import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Share2, 
  HelpCircle, 
  ChevronDown, 
  Check, 
  User, 
  ExternalLink 
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import NotFound from "./NotFound";

function parseLinks(text: string) {
  if (!text) return text;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const href = match[2];
    const isInternal = href.startsWith("/") || href.includes("techsolvent.in");
    parts.push(
      isInternal ? (
        <Link key={match.index} to={href} className="text-primary font-semibold hover:underline">
          {match[1]}
        </Link>
      ) : (
        <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
          {match[1]}
        </a>
      )
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

import { posts as defaultBlogPosts } from "@/data/blog-posts";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const initialPost = defaultBlogPosts.find((p) => p.slug === id || p.id === id) || null;
  const [post, setPost] = useState<any>(initialPost);
  const [loading, setLoading] = useState(!initialPost);
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://techsolvent.techsolvent.cloud/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        // Find by slug first, then fallback to id
        const found = data?.find((p: any) => p.slug === id || p.id === id);
        if (found) {
          setPost(found);
          // If the URL has an ID (e.g. 1788437147427) but the post has an SEO slug, redirect to clean slug
          if (found.slug && found.slug !== id) {
            navigate(`/blog/${found.slug}`, { replace: true });
          }
        } else {
          setPost(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blog post", err);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <PageLayout>
        <div className="py-32 bg-background text-center text-muted-foreground">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="font-medium">Loading article...</p>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const pageSlug = post.slug || post.id;
  const canonicalUrl = post.canonicalUrl || `https://techsolvent.in/blog/${pageSlug}`;
  const metaTitle = post.metaTitle || `${post.title} | TechSolvent`;
  const metaDescription = post.metaDescription || post.excerpt || post.content?.slice(0, 160);

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: metaDescription,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // ignore share cancellation
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${pageSlug}` },
  ];

  return (
    <PageLayout>
      {/* Dynamic SEO Meta Tags */}
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={canonicalUrl}
        ogTitle={post.title}
        ogDescription={metaDescription}
        ogImage={post.image}
        ogUrl={canonicalUrl}
        ogType="article"
        keywords={post.metaKeywords || post.tags}
      />

      {/* JSON-LD Schema Markup */}
      <SchemaMarkup type="article" data={post} />
      <SchemaMarkup type="breadcrumb" data={breadcrumbs} />
      {post.faqs && post.faqs.length > 0 && (
        <SchemaMarkup type="faq" data={post.faqs} />
      )}

      <div className="py-24 bg-background">
        <article className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Top Breadcrumb & Metadata */}
          <div className="mb-8 animate-fade-in">
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to All Articles
              </Link>
            </nav>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              {post.category && (
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
              )}
              {post.date && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
              )}
              {post.read && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{post.read}</span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2] mb-6">
              {parseLinks(post.title)}
            </h1>

            {post.excerpt && (
              <p className="text-xl sm:text-2xl text-muted-foreground font-normal leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Featured Image (No cropping: responsive max-height and object-contain) */}
          {post.image && (
            <div className="w-full rounded-3xl mb-12 overflow-hidden border border-border shadow-sm bg-muted/20 flex items-center justify-center p-2 sm:p-4">
              <img
                src={post.image}
                alt={post.imageAltText || post.title}
                className="w-full h-auto max-h-[550px] object-contain rounded-2xl mx-auto"
                loading="eager"
              />
            </div>
          )}

          {/* Article Body Content (Rich HTML with H1, H2, H3, H4, and Links support) */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 font-sans prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground prose-h1:text-4xl prose-h1:font-extrabold prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-a:text-primary prose-a:font-semibold prose-a:underline hover:prose-a:opacity-80">
            {/* If content is HTML from ReactQuill or rich markup */}
            {post.content ? (
              /<[a-z][\s\S]*>/i.test(post.content) || post.content.includes("<") ? (
                <div
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  className="blog-html-content"
                />
              ) : (
                <p className="text-lg leading-relaxed whitespace-pre-line text-foreground/90">
                  {parseLinks(post.content)}
                </p>
              )
            ) : null}

            {/* Backwards compatibility for older posts with structured sections */}
            {post.sections && Array.isArray(post.sections) && post.sections.length > 0 && (
              <div className="space-y-10 mt-10">
                {post.sections.map((section: any, idx: number) => (
                  <div key={idx} className="mb-10">
                    {section.title && (
                      <h2 className="text-2xl sm:text-3xl font-bold mt-10 mb-5 text-foreground tracking-tight">
                        {parseLinks(section.title)}
                      </h2>
                    )}
                    {section.image && (
                      <div className="rounded-2xl overflow-hidden border border-border shadow-sm my-6 bg-muted/20">
                        <img
                          src={section.image}
                          alt={section.title}
                          className="w-full h-auto max-h-[500px] object-contain rounded-2xl mx-auto"
                        />
                      </div>
                    )}
                    {section.paragraphs && section.paragraphs.map((p: string, pIdx: number) => (
                      <p key={pIdx} className="mb-4 text-lg leading-relaxed">
                        {parseLinks(p)}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Featured Quote Callout */}
            {post.quote && (() => {
              const cleanQuote = typeof post.quote === "string"
                ? post.quote.trim().replace(/^["'“‘\s]+|["'”’\s]+$/g, "")
                : "";
              if (!cleanQuote) return null;
              return (
                <div className="border-border border rounded-2xl p-6 sm:p-8 my-10 bg-secondary/30 relative overflow-hidden not-prose not-italic">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                  <p className="text-xl sm:text-2xl italic font-medium text-foreground relative z-10 mb-0">
                    “{parseLinks(cleanQuote)}”
                  </p>
                </div>
              );
            })()}

            {/* FAQs Section (Replaces Key Takeaways, with Accordion & Schema) */}
            {post.faqs && Array.isArray(post.faqs) && post.faqs.length > 0 && (
              <section className="mt-16 pt-10 border-t border-border">
                <div className="flex items-center gap-2 mb-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
                  Got Questions? Here Are The Answers:
                </h3>

                <div className="space-y-4 not-prose">
                  {post.faqs.map((faq: any, index: number) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div
                        key={index}
                        className="border border-border rounded-2xl overflow-hidden bg-card transition-colors shadow-sm"
                      >
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors focus:outline-none"
                        >
                          <span>{faq.question || faq.q}</span>
                          <span className={`p-1.5 rounded-full bg-secondary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`}>
                            <ChevronDown className="w-4 h-4" />
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-muted-foreground leading-relaxed text-base border-t border-border/50 animate-fade-in">
                            <p className="whitespace-pre-line">{faq.answer || faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Fallback for legacy takeaways if post has no FAQs */}
            {(!post.faqs || post.faqs.length === 0) && post.takeaways && post.takeaways.length > 0 && (
              <div className="mt-12 not-prose">
                <h3 className="text-2xl font-bold mb-6 text-foreground tracking-tight">Key Takeaways</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {post.takeaways.map((item: string, id: number) => (
                    <div key={id} className="flex gap-3 bg-card border border-border rounded-xl p-4 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-sm">
                        {id + 1}
                      </div>
                      <span className="text-sm font-medium">{parseLinks(item)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Author Bio & Share Footer */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl ring-4 ring-background shadow-md shrink-0">
                TS
              </div>
              <div>
                <h4 className="font-bold text-lg text-foreground">{post.author || "Team TechSolvent"}</h4>
                <p className="text-sm text-primary font-medium">{post.authorRole || "Growth Experts & AI Strategists"}</p>
              </div>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleShare}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors shadow-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                {copied ? "Link Copied!" : "Share Article"}
              </button>
            </div>
          </div>
        </article>
      </div>
    </PageLayout>
  );
}
