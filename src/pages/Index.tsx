import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import CountUp from 'react-countup';
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ArrowRight, Bot, Users, Search, Phone, Target, Globe, ShoppingBag, Award, CheckCircle, ChevronRight, Star, TrendingUp, Shield, BarChart2 } from "lucide-react";
import kimirikaLogoImg from "@/assets/Kimirica.png";
import ntsLogoImg from "@/assets/nts-logo.png";
import c9labsLogoImg from "@/assets/c9labs-logo.png";
import isclLogoImg from "@/assets/iscl-logo.png";
import dateboxLogo from "@/assets/datebox.png";


const services = [
  { icon: Bot, label: "AI-Based Performance Marketing", desc: "Pay for results, not guesswork. AI-driven paid campaigns that maximize ROI.", path: "/services/performance-marketing", color: "from-blue-500/20 to-purple-500/20" },
  { icon: Users, label: "Virtual Influencer Social Media Marketing", desc: "The future of content is here. AI-powered influencers built for your brand.", path: "/services/virtual-influencer", color: "from-pink-500/20 to-rose-500/20" },
  { icon: Search, label: "SEO, AEO, GEO & AI Optimization", desc: "Rank on Google. Get cited by ChatGPT. Dominate every search engine.", path: "/services/seo", color: "from-green-500/20 to-emerald-500/20" },
  { icon: Phone, label: "AI Voice Automation Agent", desc: "24/7 AI voice agents that call, qualify, and convert leads automatically.", path: "/services/voice-agent", color: "from-amber-500/20 to-orange-500/20" },
  { icon: Target, label: "Lead Generation Automation", desc: "End-to-end automated funnels that fill your pipeline while you sleep.", path: "/services/lead-generation", color: "from-red-500/20 to-pink-500/20" },
  { icon: Globe, label: "Custom Website Development", desc: "Shopify & WordPress websites engineered for speed, beauty, and conversions.", path: "/services/custom-web-development", color: "from-sky-500/20 to-blue-500/20" },
  { icon: ShoppingBag, label: "Shopify Store Development", desc: "Conversion-first Shopify stores that turn visitors into loyal buyers.", path: "/services/shopify-development", color: "from-violet-500/20 to-purple-500/20" },
  { icon: Award, label: "Brand Positioning & Strategic Growth", desc: "Build a brand that commands attention, commands loyalty, commands the market.", path: "/services/brand-positioning", color: "from-teal-500/20 to-cyan-500/20" },
];

const pillars = [
  {
    icon: Bot,
    title: "AI-First Approach",
    desc: "We don't rely on gut feel. Every campaign is powered by machine learning, predictive analytics, and real-time data.",
  },
  {
    icon: TrendingUp,
    title: "Full-Funnel Execution",
    desc: "From first impression to final conversion we own the entire journey, not just one piece of it.",
  },
  {
    icon: Shield,
    title: "Transparent Reporting",
    desc: "No smoke and mirrors. You get live dashboards, weekly updates, and honest performance numbers always.",
  },
  {
    icon: BarChart2,
    title: "Proven Track Record",
    desc: "180% traffic spikes. 3x inbound leads. 300% organic growth. Numbers don't lie, and ours speak loudly.",
  },
];

const caseStudies = [
  {
    brand: "Rawnut",
    category: "D2C Health Brand",
    challenge: "Rank for high-intent product keywords, reduce ad dependency.",
    result: "180% traffic spike, lower ad costs, dominant Google rankings.",
    metric: "180%",
    metricLabel: "Traffic Growth",
    color: "from-green-500 to-emerald-600",
  },
  {
    brand: "Kimirica",
    category: "Luxury Hotel Supplies",
    challenge: "Capture organic B2B traffic, increase hospitality leads.",
    result: "3x inbound enquiries through SEO and content authority.",
    metric: "3×",
    metricLabel: "Inbound Enquiries",
    color: "from-amber-500 to-orange-600",
  },
  {
    brand: "StyleBuddy",
    category: "Fashion Tech",
    challenge: "Generate organic leads across Indian metro cities.",
    result: "300% traffic growth, top Google rankings in key cities.",
    metric: "300%",
    metricLabel: "Organic Growth",
    color: "from-purple-500 to-violet-600",
  },
];

const testimonials = [
  {
    name: "Anurag Madan",
    company: "CEO, TrendOye",
    text: "TechSolvent has been a game-changer for TrendOye. Their SEO expertise helped us boost our search rankings, increase organic traffic, and attract the right audience. The team is proactive, transparent, and result-driven. We truly value their commitment and highly recommend TechSolvent for businesses looking to scale online.",
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlXJF8Yj0sRpQKGQyKOJ_TgfRwaJ2qX9Tgaw&s",
  },
  {
    name: "Ashwi Bharatkumar Jain",
    company: "Lead - Branding & Marketing, Kimirica Hunter International LLP",
    text: "Working with Techsolvent over the past years has been a great experience. They understand our brand well, are always responsive, and consistently bring good ideas to the table. The team makes collaboration easy and the results speak for themselves. We would happily recommend them to anyone looking for a reliable digital marketing partner.",
    photo: kimirikaLogoImg,
  },
  {
    name: "Ankit",
    company: "Founder, Nail The Sale",
    text: "TechSolvent was a one-stop solution for all my digital marketing needs. Their strategies are not just creative but also data-driven. Every campaign is backed with clear insights and measurable results. I have seen real growth since partnering with them.",
    photo: ntsLogoImg,
    bgClass: "bg-slate-900",
  },
  {
    name: "Abhishek Dubey",
    company: "Co-Founder, C9Lab",
    text: "Highly professional, responsive, and detail-oriented. They understood our requirements clearly and delivered digital solutions that helped us strengthen our online presence significantly. A truly reliable partner for any brand looking to grow.",
    photo: c9labsLogoImg,
    bgClass: "bg-slate-900",
  },
  {
    name: "Ravi Bhagel",
    company: "ISCL Organizing Committee",
    text: "Their platform made registrations, networking, and lead tracking effortless. Real-time support and customization exceeded our expectations completely. The TechSolvent team goes above and beyond for every client.",
    photo: isclLogoImg,
  },
  {
    name: "Santosh Shukla",
    company: "London Press",
    text: "Working with Techsolvent on the development of the London Press website has been an exceptional experience from start to finish. What truly stood out was their deep understanding of our vision and their ability to translate it into a clean, functional, and high-quality digital presence.",
    photo: "https://londonpress.uk/wp-content/uploads/2021/09/unnamed-1024x448.png",
  },
  {
    name: "Deepali Jain",
    company: "Managing Director,DateBox",
    text: "Our experience working with your team has been very good. You completed the website before the committed timeline, which was really impressive. The best part of the entire project was the creativity and graphics the website looks very modern, attractive, and professional.",
    photo: dateboxLogo,
    bgClass: "bg-white p-1",
  },
];

const clients = [
  { name: "London Press", initials: "LP", color: "from-blue-600 to-blue-800", logo: "https://londonpress.uk/wp-content/uploads/2021/09/unnamed-1024x448.png" },
  { name: "World Book of Records", initials: "WBR", color: "from-amber-500 to-orange-600", logo: "https://worldbookofrecords.uk/assets/web/images/ad4ab-2a61f-wbr-logo-png1.png" },
  { name: "Kimirica", initials: "KM", color: "from-purple-500 to-violet-700", logo: "https://image.pitchbook.com/zldHebZFn4pCBVAI9lXPy0azYkd1754991168445_200x200" },
  { name: "Bed & Fur", initials: "BF", color: "from-rose-500 to-pink-700", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQp4zIrquiiOIsV1pdyRmrh1bdhM2UOTGhA&s" },
  { name: "Trend Oye", initials: "TO", color: "from-teal-500 to-emerald-700", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlXJF8Yj0sRpQKGQyKOJ_TgfRwaJ2qX9Tgaw&s" },
  { name: "ApplyOn", initials: "AO", color: "from-sky-500 to-cyan-700", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWIGWud7vu89iahFuUlzkrk6mA-8ipd0psFw&s" },
  { name: "Diverse Prism", initials: "DP", color: "from-indigo-500 to-blue-700", logo: "https://diverseprism.com/logo.svg" },
  { name: "StyleBuddy", initials: "SB", color: "from-pink-500 to-rose-700", logo: "https://stylebuddy.in/assets/stylebuddy-logo-B4l3WfW0.jpg" },
  { name: "JSB Wellness", initials: "JSB", color: "from-green-500 to-emerald-700", logo: "https://jsbhealthcare.co.in/cdn/shop/files/jsblogo_130x.webp?v=1750589399" },
  { name: "Raw Nut", initials: "RN", color: "from-lime-500 to-green-700", logo: "https://rawnut.in/wp-content/uploads/2021/08/Black_Rawnut_Logo.png" },
  { name: "Wellthys", initials: "WT", color: "from-cyan-500 to-teal-700", logo: "https://cdn.prod.website-files.com/6655e7b232e3d2753f2e35cb/66568c3d6db486632450c7e2_wellthy-logo.svg" },
  { name: "Menhood", initials: "MH", color: "from-slate-600 to-slate-800", logo: "https://menhood.in/cdn/shop/files/MENHOOD_Reserved_black_91d26069-694c-44cd-a7f8-05366e388650.png?v=1772016679&width=400" },
  { name: "GHN", initials: "GHN", color: "from-orange-500 to-red-700", logo: "https://static.vecteezy.com/system/resources/previews/009/032/580/non_2x/ghn-logo-ghn-letter-ghn-letter-logo-design-initials-ghn-logo-linked-with-circle-and-uppercase-monogram-logo-ghn-typography-for-technology-business-and-real-estate-brand-vector.jpg" },
  { name: "Alma School of London", initials: "ASL", color: "from-blue-500 to-indigo-700", logo: "https://blr1.digitaloceanspaces.com/edudesk.app.media/alma-kids-london-franchise/2024/franchise-logo/logo-1713159368.png" },
  { name: "Absowell", initials: "AW", color: "from-emerald-500 to-teal-700", logo: "https://absowell.com/cdn/shop/files/logo_small_64678b03-7721-4883-a3f3-e709659b8176_280x.png?v=1744005798" },
  { name: "Pax", initials: "PAX", color: "from-violet-500 to-purple-700", logo: "https://logowik.com/content/uploads/images/pax2235.jpg" },
  { name: "eAdvicer", initials: "eA", color: "from-sky-500 to-blue-700", logo: "https://media.licdn.com/dms/image/v2/C4D0BAQHcZr7lnFqiIQ/company-logo_200_200/company-logo_200_200/0/1662446420863/eadvicer_com_logo?e=2147483647&v=beta&t=io3i7fzO8X4A_7Es7wdunm7ToEa3dQMjqObHdn8ynXw" },
  { name: "Chipmunk", initials: "CM", color: "from-amber-500 to-yellow-600", logo: "https://chipmunkforall.com/cdn/shop/files/Chipmunk_footer.png?v=1694692777&width=200" },
  { name: "The Health Souk", initials: "THS", color: "from-green-600 to-emerald-800", logo: "https://thehealthsouk.com/cdn/shop/files/The-Health-Souk-Logo-01.webp?v=1766748607&width=300" },
  { name: "9Lab", initials: "9L", color: "from-red-500 to-rose-700", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuQ3_lYCGxytuB-5okNv_NzVDNN8AfRcJDyg&s" },
  { name: "ALIF", initials: "ALF", color: "from-teal-600 to-cyan-800", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ4bWC3xCsMDgjrtoPskY8q5KwuksJRHhmkw&s" },
  { name: "TDS Trizula", initials: "TDS", color: "from-purple-600 to-indigo-800", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQe63-OKw9HBrD9gIr5nRxh6WULLKu4VnA6rg&s" },
  { name: "ACTO", initials: "ACT", color: "from-orange-500 to-amber-700", logo: "https://acto.com/wp-content/uploads/2024/06/ACTO-Generic-Cover.png" },
  { name: "KOYYO", initials: "KYO", color: "from-pink-600 to-rose-800", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Official_Koyo_Logo.jpg" },
];

function BrandLogo({ client }: { client: typeof clients[0] }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${client.color} flex items-center justify-center shrink-0`}>
        <span className="text-white font-bold text-sm tracking-wide">{client.initials}</span>
      </div>
    );
  }
  return (
    <img
      src={client.logo}
      alt={client.name + " logo"}
      className="w-14 h-14 rounded-2xl object-contain bg-white p-1.5 shrink-0"
      onError={() => setFailed(true)}
    />
  );
}

const faqs = [
  {
    q: "What makes TechSolvent different from other agencies?",
    a: "We're AI-first. We don't just run campaigns we build intelligent growth systems using automation, predictive targeting, and data-backed strategies that compound over time.",
  },
  {
    q: "How quickly can I see results?",
    a: "Paid campaigns show results within days. SEO typically builds momentum within 60–90 days. Lead automation and voice agents go live within 2 weeks of onboarding.",
  },
  {
    q: "Do you work with startups or only large brands?",
    a: "Both. We've scaled early-stage startups from zero to traction and helped established brands break into new markets. Our strategies adapt to your stage and budget.",
  },
  {
    q: "What industries do you work with?",
    a: "E-commerce, D2C, wellness, fashion, education, hospitality, SaaS, real estate, and more. If you have a brand and a goal, we have a strategy.",
  },
  {
    q: "Do you offer one-time projects or ongoing retainers?",
    a: "Both. We offer project-based work for websites and campaigns, and monthly retainers for ongoing SEO, social media, and lead generation.",
  },
];

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <details
      className="group border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all"
      open={isOpen}
      onMouseEnter={() => {
        if (!isClicked) setIsOpen(true);
      }}
      onMouseLeave={() => {
        if (!isClicked) setIsOpen(false);
      }}
    >
      <summary
        className="flex items-center justify-between p-6 cursor-pointer font-semibold hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-primary/20 hover:text-primary transition-all duration-300 list-none"
        onClick={(e) => {
          e.preventDefault();
          const newClickedState = !isClicked;
          setIsClicked(newClickedState);
          setIsOpen(newClickedState);
        }}
      >
        {faq.q}
        <ChevronRight
          className={`w-5 h-5 text-primary transition-transform shrink-0 ml-4 ${isOpen ? "rotate-90" : ""}`}
        />
      </summary>
      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{faq.a}</div>
    </details>
  );
}

export default function Index() {
  return (
    <PageLayout>
      <Helmet>
        <title>AI-Driven Digital Marketing Agency in India | TechSolvent</title>
        <meta name="description" content="TechSolvent is a leading AI-Driven Digital Marketing Agency helping businesses grow with smart SEO, PPC, social media, and data-driven marketing strategies." />
        <meta name="keywords" content="AI-Driven Digital Marketing Agency, AI digital marketing agency, digital marketing agency for ecommerce, AI powered marketing agency, AI marketing services" />
        <meta property="og:title" content="AI-Driven Digital Marketing Agency in India | TechSolvent" />
        <meta property="og:description" content="TechSolvent is a leading AI-Driven Digital Marketing Agency helping businesses grow with smart SEO, PPC, social media, and data-driven marketing strategies." />
      </Helmet>
      {/* HERO Modern Light Layout */}
      {/* <section className="relative lg:min-h-[85vh] flex items-center overflow-hidden bg-[#165DFB]"> */}
      <section
        className="relative lg:min-h-[85vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #244189 0%, #219CBA 55%, #70DAC5 100%)" }}
      >
        {/* Soft gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/40 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[80px]" />
        </div>

        {/* LEFT — Human hand image + badge */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[28%] hidden lg:block pointer-events-none select-none">
          <div className="relative">
            <img
              src="https://www.ezrankings.com/assets/images/home-img/left-h.png"
              alt="Human creativity"
              className="w-full max-w-[400px] h-auto object-contain opacity-95 drop-shadow-2xl animate-float-down"
            />
            {/* Floating badge */}
            <div className="absolute -top-10 left-6 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/20 flex items-center gap-3 z-10">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-white/60 font-medium">Average Growth</div>
                <div className="text-base font-bold text-white">10x Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — AI robot hand + badge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[28%] hidden lg:block pointer-events-none select-none">
          <div className="relative flex flex-col items-end">
            <img
              src="https://www.ezrankings.com/assets/images/home-img/right-h.png"
              alt="AI intelligence"
              className="w-full max-w-[400px] h-auto object-contain opacity-95 drop-shadow-2xl animate-float-up"
            />
            {/* Badge below the AI hand — matches left badge style */}
            <div className="mt-4 mr-4 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl border border-white/20 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-white/60 font-medium">Powered by</div>
                <div className="text-base font-bold text-white">AI Technology</div>
              </div>
            </div>
          </div>
        </div>


        {/* CENTER CONTENT */}
        <div className="relative z-10 w-full flex flex-col items-center text-center px-4 pt-8 pb-12">
          {/* Top pill tag */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-[#ffe546] text-slate-900 rounded-full text-sm font-bold tracking-wide mb-8 shadow-lg shadow-primary/30">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            AI-POWERED DIGITAL MARKETING
          </div>

          {/* Headline */}
          <p className="text-5xl md:text-7xl lg:text-8xl font-black font-display leading-none tracking-tight mb-2 text-white max-w-4xl">
            <span className="text-white drop-shadow-lg">AI-Driven</span>
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white/90 mb-3">
            AI Digital Marketing Agency
          </h2>
          <p className="text-xl md:text-2xl font-semibold text-white mb-8 max-w-2xl leading-snug">
            <h3>Digital marketing agency for ecommerce​</h3>
            <span className="text-white/70 font-normal text-lg leading-relaxed block mt-2">
             <h4> AI marketing services. Real results. From SEO and performance marketing to voice automation. TechSolvent is built for brands that want to win.</h4>
            </span>
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-slate-100 transition-all shadow-xl hover:shadow-cyan-500 hover:-translate-y-0.5 text-base"
            >
              <ArrowRight className="w-5 h-5" />
              Get a Free Strategy Call
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:border-white hover:bg-white/10 transition-all text-base"
            >
              See Our Services <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Star rating trust bar */}
          <div className="flex flex-col items-center justify-center gap-1.5 text-white/90 text-sm mb-6 mt-1">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
            </div>
            <span className="font-medium tracking-wide">Rated 5 Stars Based on 600+ Client Reviews</span>
          </div>

          {/* Core Stats Block */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 w-full max-w-5xl mx-auto py-5 border-t border-b border-white/10 relative z-20">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl md:text-5xl font-black font-display text-white mb-2 flex items-center">
                <CountUp end={150} duration={2.5} enableScrollSpy scrollSpyOnce />+
              </span>
              <span className="text-white/70 font-medium uppercase tracking-wider text-sm">Clients Served</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl md:text-5xl font-black font-display text-white mb-2 flex items-center">
                <CountUp end={95} duration={2.5} enableScrollSpy scrollSpyOnce />%
              </span>
              <span className="text-white/70 font-medium uppercase tracking-wider text-sm">Retention Rate</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl md:text-5xl font-black font-display text-white mb-2 flex items-center">
                <CountUp end={200} duration={2.5} enableScrollSpy scrollSpyOnce />+
              </span>
              <span className="text-white/70 font-medium uppercase tracking-wider text-sm">Campaigns Delivered</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-4xl md:text-5xl font-black font-display text-white mb-2 flex items-center">
                <CountUp end={4} duration={2} enableScrollSpy scrollSpyOnce />
              </span>
              <span className="text-white/70 font-medium uppercase tracking-wider text-sm">Countries</span>
            </div>
          </div>
        </div>

        {/* LOGO MARQUEE — Pushed to bottom */}
        {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden flex bg-white/5 border-t border-white/10 py-6 z-20">
          <div className="flex animate-marquee whitespace-nowrap">
            {clients.map((client, i) => (
              <div key={i} className="flex items-center mx-4">
                <BrandLogo client={client} />
              </div>
            ))}
          </div>
          <div className="flex animate-marquee2 whitespace-nowrap" aria-hidden="true">
            {clients.map((client, i) => (
              <div key={i} className="flex items-center mx-4">
                <BrandLogo client={client} />
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* WHAT WE DO */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-4xl md:text-5xl font-bold font-display mb-4">One Agency. Every Growth Channel.</p>
            <h3 className="text-muted-foreground text-lg">AI powered marketing agency</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <Link key={i} to={svc.path} className={`group relative p-6 rounded-2xl border border-border bg-gradient-to-br ${svc.color} hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10`}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <svc.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors">{svc.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{svc.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
              Explore All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY TECHSOLVENT */}
      <section className="relative py-24 bg-secondary text-secondary-foreground overflow-hidden">
        {/* Top wave */}
        <div className="absolute top-0 left-0 w-full leading-none pointer-events-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,0 L0,0 Z" fill="rgba(255,255,255,0.04)" />
            <path d="M0,60 C360,20 720,80 1080,40 C1260,20 1380,60 1440,50 L1440,0 L0,0 Z" fill="rgba(255,255,255,0.03)" />
          </svg>
        </div>

        {/* Animated background waves */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Wave 1 — slow drift */}
          <svg className="absolute bottom-0 left-0 w-[200%] animate-[wave_10s_linear_infinite]" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,60 C180,100 360,20 540,60 C720,100 900,20 1080,60 C1260,100 1350,40 1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.05)" />
          </svg>
          {/* Wave 2 — faster, slightly different phase */}
          <svg className="absolute bottom-0 left-0 w-[200%] animate-[wave_7s_linear_infinite_reverse]" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,80 C200,40 400,100 600,70 C800,40 1000,90 1200,60 C1320,40 1400,80 1440,70 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.04)" />
          </svg>
          {/* Wave 3 — subtle mid-layer */}
          <svg className="absolute bottom-8 left-0 w-[200%] animate-[wave_14s_linear_infinite]" viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z" fill="rgba(255,255,255,0.03)" />
          </svg>
          {/* Glowing orbs for depth */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full leading-none pointer-events-none">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-16 md:h-20">
            <path d="M0,40 C240,0 480,80 720,40 C960,0 1200,80 1440,40 L1440,80 L0,80 Z" fill="rgba(255,255,255,0.04)" />
            <path d="M0,20 C360,60 720,0 1080,40 C1260,60 1380,20 1440,30 L1440,80 L0,80 Z" fill="rgba(255,255,255,0.03)" />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-4xl md:text-5xl font-bold font-display mb-4">Why 462+ Brands Choose Us</p>
            <h4>AI marketing services</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center mb-5 shadow-inner">
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-white/75 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-4xl md:text-5xl font-bold font-display mb-4">Real Brands. Real Growth. Real Numbers.</p>
            <h1>AI-Driven Digital Marketing Agency</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-xl hover:shadow-primary/5 group">
                <div className={`h-3 bg-gradient-to-r ${cs.color}`} />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">{cs.brand}</h3>
                      <p className="text-muted-foreground text-sm">{cs.category}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold bg-gradient-to-r ${cs.color} bg-clip-text text-transparent`}>{cs.metric}</div>
                      <div className="text-xs text-muted-foreground">{cs.metricLabel}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Challenge</p>
                      <p className="text-sm">{cs.challenge}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Result</p>
                      <p className="text-sm font-medium text-foreground">{cs.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/case-studies" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
              See How We Can Do This For You <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-[#f0f4ff]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-4xl md:text-5xl font-bold font-display mb-3">What Our Clients Say</p>
            <p className="text-muted-foreground text-lg">Real words from real brands we've helped grow.</p>
          </div>

          {/* Single large card slider */}
          {(() => {
            const [activeIdx, setActiveIdx] = useState(0);
            useEffect(() => {
              const timer = setInterval(() => {
                setActiveIdx(prev => (prev + 1) % testimonials.length);
              }, 4000);
              return () => clearInterval(timer);
            }, [activeIdx]);
            const t = testimonials[activeIdx];
            return (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-[2rem] border-2 border-[#165DFB]/15 shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden">
                  {/* Subtle background circles */}
                  <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#165DFB]/5 rounded-full pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/5 rounded-full pointer-events-none" />

                  {/* Logo */}
                  <div className="shrink-0">
                    <div className={`w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-[#165DFB]/20 ${(t as any).bgClass || 'bg-white'} overflow-hidden shadow-lg p-2 md:p-6 flex items-center justify-center`}>
                      <img
                        src={t.photo}
                        alt={t.company}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.company.split(',').pop()!.trim())}&size=200&background=165DFB&color=fff&bold=true`; }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{t.name}</h3>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                      "{t.text}"
                    </p>
                    <p className="text-sm text-[#165DFB] font-medium">– {t.company}</p>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={() => setActiveIdx((activeIdx - 1 + testimonials.length) % testimonials.length)}
                    className="w-11 h-11 rounded-full border-2 border-[#165DFB]/30 flex items-center justify-center text-[#165DFB] hover:bg-[#165DFB] hover:text-white transition-all"
                  >
                    ‹
                  </button>
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeIdx ? "bg-[#165DFB] scale-125" : "bg-gray-300 hover:bg-[#165DFB]/50"
                        }`}
                    />
                  ))}
                  <button
                    onClick={() => setActiveIdx((activeIdx + 1) % testimonials.length)}
                    className="w-11 h-11 rounded-full border-2 border-[#165DFB]/30 flex items-center justify-center text-[#165DFB] hover:bg-[#165DFB] hover:text-white transition-all"
                  >
                    ›
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* CLIENTS */}
      <section className="py-20 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 mb-12 text-center">
          <p className="text-3xl md:text-4xl font-bold font-display">Brands That Trust TechSolvent</p>
          <p className="text-white/70 mt-3 text-base">Proud to have powered growth for 150+ brands across India and beyond.</p>
        </div>

        {/* Fade edges */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-secondary to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-secondary to-transparent" />

          {/* Row 1 — left to right */}
          <div className="flex animate-marquee gap-5 whitespace-nowrap mb-5">
            {[...clients.slice(0, 12), ...clients.slice(0, 12)].map((client, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 hover:bg-white/10 hover:border-primary/30 transition-all shrink-0"
              >
                <BrandLogo client={client} />
                <span className="text-sm font-medium text-secondary-foreground/80">{client.name}</span>
              </div>
            ))}
          </div>

          {/* Row 2 — right to left */}
          <div className="flex animate-marquee-reverse gap-5 whitespace-nowrap">
            {[...clients.slice(12), ...clients.slice(12)].map((client, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 hover:bg-white/10 hover:border-primary/30 transition-all shrink-0"
              >
                <BrandLogo client={client} />
                <span className="text-sm font-medium text-secondary-foreground/80">{client.name}</span>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-4xl md:text-5xl font-bold font-display mb-4">Questions?</p>
            <p className="text-4xl md:text-5xl font-bold font-display mb-4">We've Got Answers.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-24 bg-[#0D2E8C] text-white relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#165DFB]/30 rounded-full blur-[100px]" />
          {/* Top-left accent orb */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
          {/* Bottom-right accent orb */}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

          {/* SVG dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="ctaDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ctaDots)" />
          </svg>

          {/* Floating rings */}
          <div className="absolute top-8 right-16 w-32 h-32 rounded-full border border-white/10" />
          <div className="absolute top-12 right-20 w-20 h-20 rounded-full border border-white/15" />
          <div className="absolute bottom-10 left-16 w-40 h-40 rounded-full border border-white/10" />
          <div className="absolute bottom-16 left-24 w-24 h-24 rounded-full border border-white/15" />

          {/* Diagonal accent line */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="80" />
          </svg>

          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-pulse" />
          <div className="absolute top-3/4 left-1/3 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-blue-200/60 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          <div className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6">Ready to Scale Your Brand?</h2>
          <p className="text-xl text-white/75 mb-10 max-w-2xl mx-auto">Let's build a strategy that actually moves the needle.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-full hover:bg-primary/90 transition-all shadow-xl hover:shadow-primary/30">
            Book Your Free Strategy Call <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
