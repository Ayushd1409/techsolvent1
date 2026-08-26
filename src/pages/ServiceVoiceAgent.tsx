import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle, Phone, Zap, Clock, Languages, Database, Users } from "lucide-react";


const steps = [
  { step: "01", title: "Lead Enters Your Funnel", desc: "From any source website, ad, WhatsApp, or form the lead is instantly captured into the system." },
  { step: "02", title: "AI Voice Agent Calls Immediately", desc: "Within seconds, a natural-sounding AI voice agent reaches out, introduces your brand, and starts a personalized conversation." },
  { step: "03", title: "Lead Gets Qualified in Real Time", desc: "The AI asks the right questions, handles common objections, and scores the lead based on their responses." },
  { step: "04", title: "Hot Leads Go Straight to Your Team", desc: "Only warm, sales-ready prospects reach your team with a full conversation summary attached." },
  { step: "05", title: "Everything Syncs to Your CRM", desc: "Every call, outcome, and lead score is automatically logged in your CRM and triggers the next follow-up action." },
];

const features = [
  { icon: Phone, title: "Human-Like AI Voice", desc: "Natural conversations, not robotic scripts." },
  { icon: Clock, title: "24/7 Availability", desc: "Calls go out day and night, weekends included." },
  { icon: Zap, title: "Instant Response", desc: "Leads contacted within seconds of entering your funnel." },
  { icon: Users, title: "Scalable Outreach", desc: "Handle thousands of calls simultaneously." },
  { icon: Languages, title: "Multi-Language Support", desc: "Speak to your leads in their preferred language." },
  { icon: Database, title: "CRM Integration", desc: "Seamless sync with your existing sales tools." },
];

const results = [
  "10x Faster lead qualification vs manual calling",
  "60% reduction in wasted sales team hours",
  "3x more conversations from the same lead volume",
];

export default function ServiceVoiceAgent() {
  return (
    <PageLayout>
      <Helmet>
  <title>AI Voice Agent Solutions for Business Automation | TechSolvent</title>
  <meta 
    name="description" 
    content="Automate customer calls and support with a smart AI voice agent from TechSolvent. Improve response time, capture leads, and deliver seamless voice interactions 24/7." 
  />
  <meta 
    name="keywords" 
    content="AI voice automation services, AI voice assistant for business, AI call automation, voice AI customer support" 
  />
  <meta 
    property="og:title" 
    content="AI Voice Agent Solutions for Business Automation | TechSolvent" 
  />
  <meta 
    property="og:description" 
    content="Automate customer calls and support with a smart AI voice agent from TechSolvent. Improve response time, capture leads, and deliver seamless voice interactions 24/7." 
  />
</Helmet>
      <PageHero
        variant="voice"
        badge="AI Voice Agents | Lead Qualification | Sales Automation"
        title="Your Sales Team Just Got"
        highlightedTitle="a 24/7 AI Upgrade."
        subtitle="Our AI voice agents call your leads, have natural conversations, handle objections, qualify prospects, and push hot leads directly to your sales team automatically, around the clock."
        ctaLabel="See How It Works"
        ctaHref="/contact"
      />


      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <h2 className="text-3xl font-bold mb-6">The Problem</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">Your sales team is spending 70% of their time calling leads that never convert. They're leaving voicemails, chasing cold prospects, and burning out while warm leads go cold waiting for a callback. There's a smarter way.</p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="text-4xl font-bold font-display mb-12 text-center">How It Works</h2>
          <div className="relative space-y-0">
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary to-transparent hidden md:block" />
            {steps.map((s, i) => (
              <div key={i} className="relative flex gap-6 pb-10">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0 font-bold text-primary-foreground z-10">{s.step}</div>
                <div className="pt-3">
                  <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold font-display text-center">Key Features</h2>
          <h1 className="mb-12 text-center mt-3">AI voice agent​</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-border hover:border-amber-500/30 transition-all flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0"><f.icon className="w-6 h-6 text-amber-500" /></div>
                <div><h3 className="font-bold mb-1">{f.title}</h3><p className="text-muted-foreground text-sm">{f.desc}</p></div>
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
          <h2 className="text-3xl font-bold mb-8">Results</h2>
          <div className="space-y-4 mb-12">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-primary shrink-0" /><span className="text-lg">{r}</span></div>
            ))}
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
            Deploy Your AI Voice Agent Today <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
