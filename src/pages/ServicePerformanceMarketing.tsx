import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle, BarChart, Brain, Zap, LineChart, Eye } from "lucide-react";


const included = [
    { icon: Brain, title: "AI-Powered Campaign Setup", desc: "Audience research, competitor analysis, and campaign architecture built for maximum performance from day one." },
    { icon: Zap, title: "Predictive Audience Targeting", desc: "AI models that identify buyers before they search targeting based on behavior, intent signals, and lookalike patterns." },
    { icon: Eye, title: "Creative Strategy & Ad Production", desc: "High-converting ad creatives backed by data not design preferences. We test, learn, and scale winners fast." },
    { icon: BarChart, title: "Bid Optimization & Budget Management", desc: "Smart bidding that shifts budget automatically to the best-performing audiences, placements, and creatives in real time." },
    { icon: LineChart, title: "Full-Funnel Tracking", desc: "From the first click to the final conversion every touchpoint tracked, attributed, and reported accurately." },
    { icon: Eye, title: "Transparent Performance Dashboard", desc: "Live reporting dashboard showing ROAS, CPL, CTR, conversions, and spend always available, always honest." },
];

const platforms = ["Google Ads", "Meta Ads (Facebook & Instagram)", "YouTube Ads", "LinkedIn Ads", "Programmatic Display", "Shopping Ads"];

const results = [
    "Lower cost per acquisition",
    "Higher return on ad spend",
    "Faster campaign learning cycles",
    "More qualified leads and buyers",
];

export default function ServicePerformanceMarketing() {
    return (
        <PageLayout>
            <Helmet>
  <title>Performance Marketing Service for ROI Growth | TechSolvent</title>
  <meta 
    name="description" 
    content="Boost leads and sales with our performance marketing service. TechSolvent creates data-driven ad campaigns focused on ROI, conversions, and measurable business growth." 
  />
  <meta 
    name="keywords" 
    content="performance marketing services, performance marketing agencies in india, AI performance marketing agency, best performance marketing agencies" 
  />
  <meta 
    property="og:title" 
    content="Performance Marketing Service for ROI Growth | TechSolvent" 
  />
  <meta 
    property="og:description" 
    content="Boost leads and sales with our performance marketing service. TechSolvent creates data-driven ad campaigns focused on ROI, conversions, and measurable business growth." 
  />
  <link rel="canonical" href="https://techsolvent.in/services/performance-marketing" />
  <meta property="og:url" content="https://techsolvent.in/services/performance-marketing" />
</Helmet>
            <PageHero
                variant="performance"
                badge="Paid Advertising | Meta | Google | Programmatic"
                title="Stop Spending on Ads"
                highlightedTitle="That Don't Convert."
                subtitle="Our AI-powered performance marketing system predicts who will buy, automates your bidding, and scales what works so every rupee you invest comes back multiplied."
                ctaLabel="Get a Free Campaign Audit"
                ctaHref="/contact"
            />



            <section className="py-20 bg-light-bg">
                <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-6">The Problem We Solve</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        Most paid ad campaigns bleed money. Wrong audiences. Poor creatives. No optimization. You pay. You don't profit.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        TechSolvent runs performance marketing differently. We use AI to eliminate waste, target intent, and scale winning campaigns with full transparency at every step.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    
                    <h2 className="text-4xl font-bold font-display text-center">What Included</h2>
                    <h1 className="mt-3 text-center mb-12">performance marketing service​</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {included.map((item, i) => (
                            <div key={i} className="p-7 rounded-2xl border border-border bg-gradient-to-br from-blue-500/5 to-transparent hover:border-blue-500/30 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5">
                                    <item.icon className="w-6 h-6 text-blue-500" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-light-bg">
                <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-8">Platforms We Run</h2>
                    <div className="flex flex-wrap gap-3">
                        {platforms.map(p => (
                            <span key={p} className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium">{p}</span>
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
                    <h2 className="text-3xl font-bold mb-8">Results You Can Expect</h2>
                    <div className="space-y-4">
                        {results.map((r, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-primary shrink-0" />
                                <span className="text-lg">{r}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12">
                        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
                            Let's work with AI performance marketing agency <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
}
