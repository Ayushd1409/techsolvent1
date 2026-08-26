import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle, Zap, Smartphone, Layout, Box, Settings, LifeBuoy } from "lucide-react";

const differentiators = [
  { icon: Layout, title: "Conversion-First Design", desc: "Every layout decision is made with one goal turning visitors into buyers. We remove friction, build trust, and guide customers to checkout naturally." },
  { icon: Smartphone, title: "Mobile-First Development", desc: "Over 70% of e-commerce traffic is mobile. Your store is built for mobile first, ensuring a flawless experience on every screen." },
  { icon: Zap, title: "Speed-Optimized Builds", desc: "A 1-second delay kills conversions. Our Shopify stores are built lean and fast consistently scoring above 90 on PageSpeed." },
  { icon: Box, title: "Custom Shopify Theme Development", desc: "No cookie-cutter templates. We build custom themes that look and feel uniquely yours while being optimized for performance." },
  { icon: Settings, title: "App Integration & Automation", desc: "Reviews, loyalty programs, upsells, email flows, inventory management we integrate the right apps for your business model." },
  { icon: LifeBuoy, title: "Ongoing Support & Maintenance", desc: "Your store is never left alone. We provide ongoing maintenance, updates, and optimization to keep performance high." },
];

const shopifyServices = ["New Store Development", "Store Redesign", "Theme Customization", "Migration to Shopify", "App Integration", "Speed Optimization", "Conversion Rate Optimization", "Post-Launch Support"];

export default function ServiceShopify() {
  return (
    <PageLayout>
      <Helmet>
  <title>Shopify Development Services | Custom Shopify Store Experts</title>
  <meta 
    name="description" 
    content="Boost your online business with expert Shopify Development Services. We build fast, user-friendly, conversion-focused Shopify stores tailored to your brand." 
  />
  <meta 
    name="keywords" 
    content="Shopify store development, Shopify Development Services, Shopify website development, Shopify development company" 
  />
  <meta 
    property="og:title" 
    content="Shopify Development Services | Custom Shopify Store Experts" 
  />
  <meta 
    property="og:description" 
    content="Boost your online business with expert Shopify Development Services. We build fast, user-friendly, conversion-focused Shopify stores tailored to your brand." 
  />
</Helmet>
      <PageHero
        variant="shopify"
        badge="Shopify Development | E-Commerce | D2C Brands"
        title="A Shopify Store That"
        highlightedTitle="Actually Sells."
        subtitle="We don't just build Shopify stores we build selling machines. From design to checkout flow, every element is crafted to maximize your conversion rate and grow your revenue."
        ctaLabel="Launch My Shopify Store"
        ctaHref="/contact"
      />


      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold font-display text-center">What Makes Our Shopify Stores Different</h2>
          <h1 className="mb-12 text-center mt-3">Shopify Development Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((d, i) => (
              <div key={i} className="p-7 rounded-2xl border border-border bg-gradient-to-br from-violet-500/5 to-transparent hover:border-violet-500/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-5"><d.icon className="w-6 h-6 text-violet-500" /></div>
                <h3 className="text-lg font-bold mb-2">{d.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
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
          <h2 className="text-3xl font-bold mb-8">Shopify Services</h2>
          <div className="flex flex-wrap gap-3 mb-12">
            {shopifyServices.map((s) => (
              <span key={s} className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-sm">
                <CheckCircle className="w-4 h-4 text-primary" />{s}
              </span>
            ))}
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
            Get Your Shopify Store Built <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
