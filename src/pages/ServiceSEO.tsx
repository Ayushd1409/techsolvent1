import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle, Search, Globe, Cpu, Map, FileText, BarChart2, Link2 } from "lucide-react";


const included = [
  { icon: Cpu, title: "Technical SEO", desc: "Site speed, crawlability, Core Web Vitals, schema markup, indexing everything under the hood that Google and AI engines use to evaluate your site." },
  { icon: Search, title: "On-Page SEO", desc: "Keyword research, content optimization, meta structure, internal linking all aligned to how real people and AI systems search today." },
  { icon: Link2, title: "Off-Page SEO & Link Building", desc: "High-authority backlinks from relevant sources that build domain trust and push your rankings higher, faster." },
  { icon: Globe, title: "Answer Engine Optimization (AEO)", desc: "Structuring your content to be picked as the direct answer in featured snippets, voice search, and AI assistant responses." },
  { icon: Cpu, title: "Generative Engine Optimization (GEO)", desc: "Optimizing your brand's footprint so AI platforms like ChatGPT, Gemini, and Perplexity reference and recommend you in generated answers." },
  { icon: Map, title: "Local SEO", desc: "Dominate search results in your city. Perfect for businesses targeting specific geographic markets like Indore, Mumbai, Delhi, or beyond." },
  { icon: FileText, title: "Content Strategy & Creation", desc: "SEO-optimized blog posts, landing pages, and pillar content that ranks and converts." },
  { icon: BarChart2, title: "Monthly Reporting", desc: "Keyword rankings, traffic growth, AI citation tracking, and backlink health all in one transparent monthly report." },
];

export default function ServiceSEO() {
  return (
    <PageLayout>
      <Helmet>
  <title>AI SEO Services in India | Smart SEO Solutions – TechSolvent</title>
  <meta 
    name="description" 
    content="Boost rankings with TechSolvent’s AI SEO services. We use smart automation, data insights, and expert strategies to drive organic traffic, leads, and growth." 
  />
  <meta 
    name="keywords" 
    content="SEO services, local seo services, shopify seo services, ai seo services" 
  />
  <meta 
    property="og:title" 
    content="AI SEO Services in India | Smart SEO Solutions – TechSolvent" 
  />
  <meta 
    property="og:description" 
    content="Boost rankings with TechSolvent’s AI SEO services. We use smart automation, data insights, and expert strategies to drive organic traffic, leads, and growth." 
  />
</Helmet>
      <PageHero
        variant="seo"
        badge="SEO | Answer Engine Optimization | Generative Engine Optimization"
        title="Rank on Google. Get Cited by AI."
        highlightedTitle="Be Found Everywhere."
        subtitle="Search has changed forever. We optimize your brand not just for Google but for ChatGPT, Perplexity, Google AI Overviews, and voice assistants. Welcome to the future of visibility."
        ctaLabel="Get Your Free SEO Audit"
        ctaHref="/contact"
      />


      <section className="py-20 bg-light-bg">
        <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">The New Search Landscape</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">Millions of people no longer click on links. They ask AI. They use voice. They trust answer engines over search results. If your brand isn't optimized for these new platforms, you're already invisible to a growing audience.</p>
          <p className="text-muted-foreground text-lg leading-relaxed">TechSolvent covers the full spectrum traditional SEO, AEO, GEO, and AI search platforms so you're found everywhere your customers are looking.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold font-display text-center">What's Included</h2>
          <h1 className="mb-12 text-center mt-3">ai seo services​</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {included.map((item, i) => (
              <div key={i} className="p-7 rounded-2xl border border-border bg-gradient-to-br from-green-500/5 to-transparent hover:border-green-500/30 transition-all flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0"><item.icon className="w-6 h-6 text-green-500" /></div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0D2E8C] text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#165DFB]/25 rounded-full blur-[80px]" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="svcBgDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#svcBgDots)" />
          </svg>
          <div className="absolute top-6 right-10 w-24 h-24 rounded-full border border-white/10" />
          <div className="absolute bottom-6 left-10 w-32 h-32 rounded-full border border-white/10" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-300/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Rank Higher and Get Found by AI?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
            Book Your Free SEO Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
