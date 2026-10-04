import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle, Target, Globe, FileText, BarChart2, Database, Zap } from "lucide-react";


const included = [
  { icon: Globe, title: "Multi-Channel Lead Capture", desc: "Capture leads from Meta Ads, Google Ads, organic search, WhatsApp, email, and referrals all flowing into one unified, automated funnel." },
  { icon: FileText, title: "High-Converting Landing Pages", desc: "A/B tested, mobile-first landing pages engineered to convert your traffic into leads. Every element headline, CTA, form is optimized for maximum conversion." },
  { icon: Target, title: "Automated Nurture Sequences", desc: "Email, WhatsApp, and SMS workflows that follow up, educate, and warm up leads automatically moving them from curious to committed." },
  { icon: BarChart2, title: "Lead Scoring & Segmentation", desc: "Automatic lead scoring based on behavior, engagement, and responses so your team only touches the leads most likely to convert." },
  { icon: Database, title: "CRM Integration & Pipeline Management", desc: "Every lead flows directly into your CRM with full context source, behavior, score, and conversation history." },
  { icon: Zap, title: "Real-Time Lead Dashboard", desc: "Track every lead source, conversion rate, cost-per-lead, and funnel performance live with full transparency." },
];

const ideal = ["Real estate developers", "EdTech platforms", "B2B service businesses", "E-commerce brands", "Healthcare & wellness", "Financial services", "Any business that needs a consistent flow of qualified leads"];

const results = ["3x more leads vs manual outreach", "40% lower cost per acquisition", "Leads contacted within 60 seconds of entering the funnel", "Zero leads falling through the cracks"];

export default function ServiceLeadGen() {
  return (
    <PageLayout>
      <Helmet>
  <title>Lead Generation Services in India | AI-Powered Leads – TechSolvent</title>
  <meta 
    name="description" 
    content="Looking for reliable lead generation services? TechSolvent attracts high-quality leads using AI-driven marketing, SEO, paid ads, and smart conversion strategies." 
  />
  <meta 
    name="keywords" 
    content="b2b lead generation services, lead generation agency, digital lead generation services" 
  />
  <meta 
    property="og:title" 
    content="Lead Generation Services in India | AI-Powered Leads – TechSolvent" 
  />
  <meta 
    property="og:description" 
    content="Looking for reliable lead generation services? TechSolvent attracts high-quality leads using AI-driven marketing, SEO, paid ads, and smart conversion strategies." 
  />
  <link rel="canonical" href="https://techsolvent.in/services/lead-generation" />
  <meta property="og:url" content="https://techsolvent.in/services/lead-generation" />
</Helmet>
      <PageHero
        variant="leads"
        badge="Lead Generation | Marketing Automation | Sales Funnels"
        title="Your Pipeline Shouldn't"
        highlightedTitle="Depend on You."
        subtitle="We build automated lead generation systems that attract, capture, nurture, and convert your ideal customers on autopilot, around the clock, without manual effort."
        ctaLabel="Build My Lead System"
        ctaHref="/contact"
      />


      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold font-display text-center">What We Build For You</h2>
          <h1 className="mb-12 text-center mt-3">Lead generation services​</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item, i) => (
              <div key={i} className="p-7 rounded-2xl border border-border bg-gradient-to-br from-red-500/5 to-transparent hover:border-red-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-5"><item.icon className="w-6 h-6 text-red-500" /></div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8">Who It's For</h2>
          <div className="flex flex-wrap gap-3">
            {ideal.map((i) => (<span key={i} className="px-4 py-2 bg-white border border-border rounded-full text-sm">{i}</span>))}
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
          <h2 className="text-3xl font-bold mb-8">Results</h2>
          <div className="space-y-4 mb-12">
            {results.map((r, i) => (<div key={i} className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-primary shrink-0" /><span className="text-lg">{r}</span></div>))}
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
            Let's Automate Your Lead Generation <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
