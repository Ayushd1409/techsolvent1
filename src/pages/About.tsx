import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, Trophy, Users, Target, Eye, Heart, Lightbulb, Clock, TrendingUp } from "lucide-react";
import CountUp from 'react-countup';
import founderImg from "@/assets/founder.jpg";
// import ishitaImg from "@/assets/ishita.jpg";
import ashishImg from "@/assets/ashish.png";
import nikhilImg from "@/assets/nikhil.png";
import ayushImg from "@/assets/ayush.jpeg";
import tanishaImg from "@/assets/tanisha.png";
import tusharImg from "@/assets/tushar.jpg";
import astitva from "@/assets/astitva.png";
import manjari from "@/assets/manjari.jpeg"


const numbers = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 150, suffix: "+", label: "Clients Served" },
  { value: 200, suffix: "+", label: "Campaigns Delivered" },
  { value: 95, suffix: "%", label: "Client Retention Rate" },
  { value: 8, suffix: "", label: "Core Service Verticals" },
  { value: 4, suffix: "", label: "Countries Served" },
];

const values = [
  { icon: Trophy, title: "Results Over Optics", desc: "We care about conversions, not just clicks. Everything we do is tied to your actual business outcomes." },
  { icon: Eye, title: "Transparency Always", desc: "No jargon, no hiding behind vanity metrics. You'll always know exactly what we're doing and why." },
  { icon: Lightbulb, title: "AI Meets Creativity", desc: "Technology is our engine. Creativity is our soul. Together, they build campaigns that actually move people." },
  { icon: Clock, title: "Long-Term Thinking", desc: "We're not here for a quick win. We build systems, strategies, and brands that grow stronger over time." },
];

const team = [
  { name: "Abhishek Mudgal", role: "Founder & CEO", photo: founderImg },
  
  { name: "Ashish Swami", role: "Performance Marketing Manager", photo: ashishImg },
  { name: "Nikhil Patidar", role: "UI/UX Designer", photo: nikhilImg },
  { name: "Ayush Dewangan", role: "Full Stack Developer", photo: ayushImg },
  { name: "Tanisha Sundarani", role: "Business Development Executive", photo: tanishaImg },
  { name: "Astitva Pathak", role: "Technical Head", photo: astitva },
  { name: "Tushar Verma", role: "SEO Specialist", photo: tusharImg },
  
  { name: "Manjari Jain", role: "Social Media Strategist", photo: manjari },
  
  
  
];

export default function About() {
  return (
    <PageLayout>
      <Helmet>
        <title>AI Marketing Experts in India | About TechSolvent</title>
        <meta name="description" content="Know TechSolvent – a team of experienced AI marketing experts helping brands grow with data-driven SEO, paid ads, automation, and performance marketing solutions." />
        <meta name="keywords" content="AI marketing experts India, about TechSolvent, digital marketing team, AI marketing agency team" />
        <meta property="og:title" content="AI Marketing Experts in India | About TechSolvent" />
        <meta property="og:description" content="Know TechSolvent – a team of experienced AI marketing experts helping brands grow with data-driven SEO, paid ads, automation, and performance marketing solutions." />
      </Helmet>
      <PageHero
        variant="about"
        badge="AI marketing experts"
        title="We're Not Just an Agency."
        highlightedTitle="We're Your Growth Partner."
        subtitle="TechSolvent was built with one goal to help Indian businesses compete and win in the digital world using AI-powered marketing, automation, and genuine expertise."
        ctaLabel="Meet the Team"
        ctaHref="#team"
      />


      {/* OUR STORY */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold font-display mb-8">How It All Started</p>
              <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
                <p>
                  In 2019, <strong className="text-foreground">Abhishek Mudgal</strong> a marketer tired of agencies delivering vanity metrics instead of real results founded TechSolvent with a single goal: make marketing work the way it should.
                </p>
                <p>
                  What started as a one-person consultancy in Indore quickly grew into a full-service digital powerhouse trusted by <strong className="text-foreground">462+ clients</strong> across India, the UK, the USA, and Australia.
                </p>
                <p>
                  Today, TechSolvent leads the way in innovative digital marketing agency & performance marketing agency blending performance marketing, SEO, social media, automation, and web development under one roof, for one purpose: <strong className="text-foreground">your growth.</strong>
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {numbers.map((n, i) => (
                <div key={i} className="p-6 rounded-2xl bg-light-bg border border-border text-center hover:border-primary/30 transition-all">
                  <div className="text-4xl font-bold text-primary mb-2 flex items-center justify-center">
                    <CountUp end={n.value} duration={2.5} enableScrollSpy scrollSpyOnce />
                    {n.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{n.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="py-24 bg-[#0D2E8C] text-white relative overflow-hidden">
        {/* Background graphics */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Radial glow centred behind founder photo side */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#165DFB]/25 rounded-full blur-[90px]" />
          {/* Soft glow on the text side */}
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-indigo-400/15 rounded-full blur-3xl" />

          {/* SVG circuit / network lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            {/* Horizontal grid lines */}
            <line x1="0" y1="25%" x2="100%" y2="25%" stroke="white" strokeWidth="1" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="1" />
            <line x1="0" y1="75%" x2="100%" y2="75%" stroke="white" strokeWidth="1" />
            {/* Vertical grid lines */}
            <line x1="25%" y1="0" x2="25%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="1" />
            <line x1="75%" y1="0" x2="75%" y2="100%" stroke="white" strokeWidth="1" />
            {/* Accent diagonal */}
            <line x1="0" y1="0" x2="40%" y2="100%" stroke="white" strokeWidth="0.5" />
            {/* Node circles */}
            <circle cx="25%" cy="25%" r="4" fill="white" />
            <circle cx="75%" cy="25%" r="4" fill="white" />
            <circle cx="25%" cy="75%" r="4" fill="white" />
            <circle cx="75%" cy="75%" r="4" fill="white" />
            <circle cx="50%" cy="50%" r="6" fill="white" />
          </svg>

          {/* Floating decorative rings — left photo area */}
          <div className="absolute top-8 left-8 w-20 h-20 rounded-full border border-white/10" />
          <div className="absolute bottom-8 left-8 w-32 h-32 rounded-full border border-white/10" />
          {/* Floating decorative rings — right text area */}
          <div className="absolute top-12 right-12 w-24 h-24 rounded-full border border-white/10" />
          <div className="absolute bottom-10 right-8 w-16 h-16 rounded-full border border-white/15" />

          {/* Large decorative quote mark — background */}
          <div className="absolute top-6 right-8 text-[180px] leading-none font-serif text-white/[0.04] select-none">❝</div>

          {/* Dot grid — right half only */}
          <svg className="absolute right-0 top-0 w-1/2 h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="founderDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#founderDots)" />
          </svg>

          {/* Pulsing particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300/50 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
          <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-indigo-300/60 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Photo with glowing ring */}
            <div className="relative">
              {/* Glowing ring behind photo */}
              <div className="absolute inset-0 rounded-3xl bg-[#165DFB]/20 blur-2xl scale-105" />
              <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <img
                  src={founderImg}
                  alt="Abhishek Mudgal – Founder & CEO, TechSolvent"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-2xl font-bold text-white">Abhishek Mudgal</p>
                <p className="text-white/70">Founder & CEO</p>
              </div>
            </div>

            {/* Text side */}
            <div className="relative">
              {/* Small inline quote accent */}
              <span className="text-5xl font-serif text-[#165DFB]/60 leading-none select-none">❝</span>
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 -mt-2">The Mind Behind TechSolvent</h2>
              <p className="text-white/80 text-base mb-2 font-medium">India's Most Creative Marketing Consultant</p>
              <div className="space-y-4 text-white/75 leading-relaxed mt-6">
                <p>
                  Abhishek brings over a decade of hands-on marketing experience across industries ranging from D2C and e-commerce to hospitality, education, and SaaS.
                </p>
                <p>
                  His approach is simple: understand the business deeply, build strategies that scale, and never settle for average.
                </p>
                <p>
                  Under his leadership, TechSolvent has become one of India's most forward-thinking digital marketing agencies known for blending AI with creativity to deliver campaigns that don't just look good but perform exceptionally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To help every brand startup or established compete and win in the digital world through intelligent, data-driven, and creative marketing strategies.
              </p>
            </div>
            <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/10 border border-blue-500/20">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be South Asia's most trusted AI-powered digital marketing partner, known for turning ambitious brands into category leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-light-bg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 bg-[#0D2E8C] text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Glowing orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#165DFB]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-800/10 rounded-full blur-[80px]" />

          {/* SVG dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="teamDots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#teamDots)" />
          </svg>

          {/* Floating rings — top right */}
          <div className="absolute top-10 right-12 w-36 h-36 rounded-full border border-white/10" />
          <div className="absolute top-16 right-18 w-20 h-20 rounded-full border border-white/15" />
          {/* Floating rings — bottom left */}
          <div className="absolute bottom-12 left-10 w-44 h-44 rounded-full border border-white/10" />
          <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full border border-white/15" />

          {/* Subtle diagonal stripe */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="100" />
          </svg>

          {/* Pulsing particles */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1.8s' }} />
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-indigo-300/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">The People Behind Your Growth</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {team.map((member, i) => (
    <div
      key={i}
      className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-center"
    >
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] aspect-square rounded-2xl object-cover object-top mx-auto mb-3 border-2 border-white/20"
        />
      ) : (
        <div className="w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] aspect-square rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-3 text-3xl font-bold text-white">
          {member.name.charAt(0)}
        </div>
      )}

      <p className="font-bold text-xl sm:text-2xl lg:text-3xl text-white mt-3">
        {member.name}
      </p>

      <p className="text-base sm:text-lg lg:text-xl text-white/60 mt-1">
        {member.role}
      </p>
    </div>
  ))}
</div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="mb-3">AI-Driven Digital Marketing Agency</h1>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">Want to Work With a Team That Actually Delivers?</h2>
          <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-full hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/30">
            Let's Talk <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
