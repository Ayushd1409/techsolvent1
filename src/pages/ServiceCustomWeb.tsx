import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle, Layers, Smartphone, ShoppingCart, Building } from "lucide-react";


const builds = [
  { icon: Layers, title: "Custom WordPress Websites", desc: "Fully customized WordPress builds for businesses, service brands, and content-heavy platforms flexible, scalable, and easy to manage." },
  { icon: ShoppingCart, title: "Shopify Stores", desc: "Conversion-optimized Shopify stores for D2C and e-commerce brands fast, mobile-first, and built to sell from day one." },
  { icon: Smartphone, title: "Landing Pages", desc: "High-performance campaign landing pages A/B tested and engineered for maximum lead capture and conversion." },
  { icon: Building, title: "Corporate & Portfolio Websites", desc: "Professional websites that build credibility and trust designed to impress every visitor who lands on them." },
];

const process = [
  { num: "01", title: "Discovery & Strategy", desc: "We understand your business, audience, goals, and competitors before a single pixel is designed." },
  { num: "02", title: "Design & Prototyping", desc: "UI/UX designs built for user experience and brand consistency reviewed and approved by you before development begins." },
  { num: "03", title: "Development & Integration", desc: "Clean, fast, SEO-friendly code with all integrations CRM, payment gateways, analytics, and more." },
  { num: "04", title: "Testing & Launch", desc: "Rigorous testing across devices, browsers, and speeds then a smooth, fully supported launch." },
  { num: "05", title: "Post-Launch Support", desc: "We stay with you after launch maintaining, updating, and improving your site as you grow." },
];

const deliverables = ["Custom UI/UX Design", "Mobile-First Development", "SEO-Optimized Structure", "CMS Setup & Training", "Speed Optimization", "Analytics Integration", "SSL & Security Setup", "3 Months Post-Launch Support"];

export default function ServiceCustomWeb() {
  return (
    <PageLayout>
      <Helmet>
  <title>Website Development Company in India | Custom Web Solutions – TechSolvent</title>
  <meta 
    name="description" 
    content="TechSolvent is a professional website development company creating custom, fast, SEO-friendly websites tailored to your business goals. Build your presence." 
  />
  <meta 
    name="keywords" 
    content="website development agency, shopify website development, website development services, hire website developer" 
  />
  <meta 
    property="og:title" 
    content="Website Development Company in India | Custom Web Solutions – TechSolvent" 
  />
  <meta 
    property="og:description" 
    content="TechSolvent is a professional website development company creating custom, fast, SEO-friendly websites tailored to your business goals. Build your presence." 
  />
</Helmet>
      <PageHero
        variant="web"
        badge="Website Development | Shopify | WordPress | CMS"
        title="Your Website Should Work"
        highlightedTitle="as Hard as You Do."
        subtitle="We design and build custom websites on Shopify and WordPress that are fast, beautiful, SEO-ready, and built to convert. From concept to launch we handle everything."
        ctaLabel="Start Your Project"
        ctaHref="/contact"
      />


      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold font-display text-center">What We Build</h2>
          <h1 className="mt-3 mb-12 text-center">website development company​</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {builds.map((b, i) => (
              <div key={i} className="p-8 rounded-2xl border border-border bg-gradient-to-br from-sky-500/5 to-transparent hover:border-sky-500/30 transition-all flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 flex items-center justify-center shrink-0"><b.icon className="w-6 h-6 text-sky-500" /></div>
                <div><h3 className="text-lg font-bold mb-2">{b.title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-light-bg">
        <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-4xl font-bold font-display mb-12 text-center">Our Process</h2>
          <div className="space-y-8">
            {process.map((p, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-4xl font-bold text-primary/30 font-display shrink-0 w-12">{p.num}</span>
                <div><h3 className="text-xl font-bold mb-2">{p.title}</h3><p className="text-muted-foreground leading-relaxed">{p.desc}</p></div>
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
        <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">What's Included</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {deliverables.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-primary shrink-0" />{d}</div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-primary">50+</div>
            <div className="text-white/80">Projects<br />Completed</div>
          </div>
          <div className="mt-10">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
              Let's Build Your Website <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
