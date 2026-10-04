import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, Bot, Users, Search, Phone, Target, Globe, ShoppingBag, Award } from "lucide-react";


const services = [
  {
    num: "01", icon: Bot, title: "AI-Based Performance Marketing",
    desc: "Data-in, results-out. We run paid campaigns on Meta, Google, and beyond powered by AI that learns, adapts, and optimizes every rupee you spend.",
    path: "/services/performance-marketing", color: "from-blue-500/10 to-purple-500/10", borderColor: "hover:border-blue-500/40",
  },
  {
    num: "02", icon: Users, title: "Virtual Influencer Driven Social Media Marketing",
    desc: "The future of brand storytelling. We create AI-powered virtual influencers and platform-native content strategies that grow your audience and convert them.",
    path: "/services/virtual-influencer", color: "from-pink-500/10 to-rose-500/10", borderColor: "hover:border-pink-500/40",
  },
  {
    num: "03", icon: Search, title: "SEO, AEO, GEO & AI Optimization",
    desc: "Rank on Google. Get cited by ChatGPT and Perplexity. Be found everywhere your customers are searching today and tomorrow.",
    path: "/services/seo", color: "from-green-500/10 to-emerald-500/10", borderColor: "hover:border-green-500/40",
  },
  {
    num: "04", icon: Phone, title: "AI Voice Automation Agent",
    desc: "Your 24/7 sales rep that never sleeps. AI voice agents that call, qualify, and convert leads at scale fully automated.",
    path: "/services/voice-agent", color: "from-amber-500/10 to-orange-500/10", borderColor: "hover:border-amber-500/40",
  },
  {
    num: "05", icon: Target, title: "Lead Generation Automation",
    desc: "Stop chasing leads. Start attracting them automatically. We build end-to-end funnels that run while you focus on your business.",
    path: "/services/lead-generation", color: "from-red-500/10 to-pink-500/10", borderColor: "hover:border-red-500/40",
  },
  {
    num: "06", icon: Globe, title: "Custom Website Development",
    desc: "Shopify & WordPress websites that aren't just beautiful they're built to rank, convert, and grow with your brand.",
    path: "/services/custom-web-development", color: "from-sky-500/10 to-blue-500/10", borderColor: "hover:border-sky-500/40",
  },
  {
    num: "07", icon: ShoppingBag, title: "Shopify Store Development",
    desc: "Conversion-optimized Shopify stores built from the ground up fast, mobile-first, and engineered to sell.",
    path: "/services/shopify-development", color: "from-violet-500/10 to-purple-500/10", borderColor: "hover:border-violet-500/40",
  },
  {
    num: "08", icon: Award, title: "Brand Positioning & Strategic Growth",
    desc: "We define who you are, who you're for, and how you win. Strategic brand building for the long game.",
    path: "/services/brand-positioning", color: "from-teal-500/10 to-cyan-500/10", borderColor: "hover:border-teal-500/40",
  },
];

export default function Services() {
  return (
    <PageLayout>
      <Helmet>
        <title>{'AI Digital Marketing Services in India | SEO, PPC & Social Media – TechSolvent'}</title>
        <meta name="description" content="Explore result-driven AI digital marketing services by TechSolvent, including SEO, PPC, social media marketing, and data-driven growth strategies." />
        <meta name="keywords" content="AI digital marketing services, AI Powered Marketing Services, Digital Marketing Services" />
        <link rel="canonical" href="https://techsolvent.in/services" />
        <meta property="og:title" content="AI Digital Marketing Services in India | SEO, PPC & Social Media – TechSolvent" />
        <meta property="og:description" content="Explore result-driven AI digital marketing services by TechSolvent, including SEO, PPC, social media marketing, and data-driven growth strategies." />
        <meta property="og:url" content="https://techsolvent.in/services" />
      </Helmet>
      <PageHero
        variant="services"
        align="center"
        badge="Digital Marketing Services"
        title="Everything Your Brand Needs"
        highlightedTitle="to Scale Online."
        subtitle="AI Powered Marketing Services, TechSolvent is the only agency you need to dominate the digital landscape."
      />


      {/* ALL SERVICES */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-6">
            {services.map((svc, i) => (
              <Link key={i} to={svc.path} className={`group flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-2xl border border-border bg-gradient-to-r ${svc.color} ${svc.borderColor} transition-all hover:shadow-xl hover:-translate-y-0.5`}>
                <div className="flex items-center gap-6 md:w-1/2">
                  <span className="text-5xl font-bold text-primary/20 font-display shrink-0">{svc.num}</span>
                  <div className="w-12 h-12 rounded-xl bg-background/50 flex items-center justify-center shrink-0">
                    <svc.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{svc.title}</h3>
                </div>
                <p className="text-muted-foreground md:w-1/3">{svc.desc}</p>
                <div className="md:ml-auto flex items-center gap-2 text-primary font-semibold">
                  Learn More <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0D2E8C] text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#165DFB]/30 rounded-full blur-[100px]" />
          {/* Corner orbs */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

          {/* SVG dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="serviceCtaDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#serviceCtaDots)" />
          </svg>

          {/* Floating rings */}
          <div className="absolute top-8 right-16 w-32 h-32 rounded-full border border-white/10" />
          <div className="absolute top-12 right-20 w-20 h-20 rounded-full border border-white/15" />
          <div className="absolute bottom-10 left-16 w-40 h-40 rounded-full border border-white/10" />
          <div className="absolute bottom-16 left-24 w-24 h-24 rounded-full border border-white/15" />

          {/* Diagonal stripe */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="80" />
          </svg>

          {/* Pulsing particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-blue-200/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h1 className="mb-4">AI Digital Marketing Services</h1>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Not Sure Which Services You Need?</h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">Book a free 30-minute strategy call. We'll audit your current presence and tell you exactly what will move the needle.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-full hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/30">
            Book Free Strategy Call <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
