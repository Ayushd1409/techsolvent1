import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle, Search, MessageSquare, LayoutTemplate, MapPin, Megaphone, TrendingUp, BarChart2 } from "lucide-react";

const included = [
    { icon: Search, title: "Brand Audit & Competitive Analysis", desc: "We study your current brand perception, your competitors, and your market identifying exactly where the gaps and opportunities are." },
    { icon: MessageSquare, title: "Brand Identity & Positioning", desc: "We define your brand's core purpose, values, voice, personality, and unique market position with clarity that resonates across every touchpoint." },
    { icon: LayoutTemplate, title: "Messaging Architecture", desc: "Your headline, tagline, value proposition, and core messaging crafted to speak directly to your ideal customer and differentiate you from every competitor." },
    { icon: LayoutTemplate, title: "Visual Identity Direction", desc: "Logo, color system, typography, and brand guidelines the visual language that makes your brand instantly recognizable." },
    { icon: MapPin, title: "Go-to-Market Strategy", desc: "Launch plans, channel strategies, and campaign roadmaps designed to get your brand in front of the right people, fast." },
    { icon: TrendingUp, title: "Long-Term Growth Roadmap", desc: "Multi-quarter strategic plans aligned to revenue goals, market trends, and expansion opportunities built to scale." },
    { icon: Megaphone, title: "360° Campaign Execution", desc: "We don't just build the strategy we execute it across all channels, track performance, and refine continuously." },
];

const whoFor = [
    "Startups defining their brand for the first time",
    "Established businesses looking to reposition",
    "Brands expanding into new markets",
    "Businesses that feel their marketing isn't working as hard as it should",
];

export default function ServiceBrandPositioning() {
    return (
        <PageLayout>
            <Helmet>
  <title>Brand Strategy Services for Powerful Market Positioning | TechSolvent</title>
  <meta 
    name="description" 
    content="Build a strong and memorable brand with expert brand strategy services from TechSolvent. We help businesses define positioning, messaging, and identity." 
  />
  <meta 
    name="keywords" 
    content="Brand Positioning Services, brand positioning agency, brand strategy consulting, digital brand strategy" 
  />
  <meta 
    property="og:title" 
    content="Brand Strategy Services for Powerful Market Positioning | TechSolvent" 
  />
  <meta 
    property="og:description" 
    content="Build a strong and memorable brand with expert brand strategy services from TechSolvent. We help businesses define positioning, messaging, and identity." 
  />
</Helmet>
            <PageHero
                variant="brand"
                badge="Brand Strategy | Positioning | Growth Management"
                title="Build a Brand People"
                highlightedTitle="Remember and Choose."
                subtitle="In a crowded market, the brand with the clearest identity wins. We help you define who you are, own your position, and execute a long-term strategy that builds real, lasting market dominance."
                ctaLabel="Start Building Your Brand"
                ctaHref="/contact"
            />


            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <h2 className="text-4xl font-bold font-display text-center">What We Do</h2>
                    <h1 className="mb-12 text-center mt-3">brand strategy services​</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {included.map((item, i) => (
                            <div key={i} className="p-7 rounded-2xl border border-border bg-gradient-to-br from-teal-500/5 to-transparent hover:border-teal-500/30 transition-all flex gap-5">
                                <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0"><item.icon className="w-6 h-6 text-teal-500" /></div>
                                <div><h3 className="text-lg font-bold mb-2">{item.title}</h3><p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p></div>
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
                    <h2 className="text-3xl font-bold mb-8">Who This Is For</h2>
                    <div className="space-y-4 mb-12">
                        {whoFor.map((w, i) => (<div key={i} className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-primary shrink-0" /><span className="text-lg">{w}</span></div>))}
                    </div>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
                        Let's Position Your Brand for Market Leadership <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
}
