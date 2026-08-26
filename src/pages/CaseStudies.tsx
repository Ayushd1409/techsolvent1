import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Users, Search, CheckCircle, BarChart2, Target, Globe, Star, Heart, ShoppingBag, BookOpen, Award, Zap, Shirt } from "lucide-react";
import { cn } from "@/lib/utils";

import bedfurImg1 from "@/assets/bedfur-1.png";
import bedfurImg2 from "@/assets/bedfur-2.png";
import londonpressImg1 from "@/assets/londonpress-1.png";
import londonpressImg2 from "@/assets/londonpress-2.png";
import rawnutImg1 from "@/assets/rawnut-1.png";
const caseStudies = [
  {
    id: "rawnut",
    brand: "Rawnut",
    category: "D2C Health Brand",
    tag: "Full-Stack D2C Growth",
    tagColor: "from-green-500 to-emerald-600",
    bgAccent: "bg-green-50",
    borderAccent: "border-green-200",
    textAccent: "text-green-600",
    icon: TrendingUp,
    metric1: { value: "~4X–6X", label: "ROAS", sublabel: "on paid campaigns" },
    metric2: { value: "Multi", label: "Channel Presence", sublabel: "Meta, Google, Amazon & Blinkit" },
    metric3: { value: "Scaled", label: "D2C Sales", sublabel: "across all channels" },
    overview:
      "TechSolvent executed an end-to-end D2C growth strategy for Rawnut, a premium health food brand selling organic nuts, seeds, and superfoods online. From building their digital foundation to scaling sales across multiple channels, we owned the full growth journey.",
    challenge:
      "Rawnut needed to build a scalable D2C presence from the ground up. Without a proper website, growth funnel, or multi-channel strategy, they lacked the infrastructure to convert interest into consistent online sales and were missing out on high-intent buyers across search and quick-commerce platforms.",
    strategy: [
      "Designed and developed a conversion-optimised WordPress D2C website tailored for health-conscious shoppers.",
      "Built a full growth strategy and sales funnel from awareness to purchase and retention.",
      "Ran Social Media Marketing campaigns to build brand affinity and drive top-of-funnel traffic.",
      "Implemented SEO + GEO (Generative Engine Optimisation) to capture organic and AI-driven search intent.",
      "Launched and managed Performance Marketing campaigns across Meta, Google, and Amazon Ads for maximum reach.",
      "Listed Rawnut products on Blinkit to unlock quick-commerce demand and expand retail touchpoints.",
    ],
    results:
      "Rawnut scaled D2C sales across all channels, achieving approximately 4X–6X ROAS on paid campaigns. The brand now has a strong multi-channel presence spanning its own D2C website, social media, Google, Amazon, and Blinkit with significantly improved visibility across search and social.",
    images: [rawnutImg1],
    testimonial: {
      text: "The organic growth we've seen since working with TechSolvent has been phenomenal. They truly understand e-commerce SEO.",
      author: "Founder, Rawnut",
    },
  },
  {
    id: "kimirica",
    brand: "Kimirica",
    category: "Luxury Hotel Amenity Brand",
    tag: "Performance Marketing & SEO",
    tagColor: "from-amber-500 to-orange-600",
    bgAccent: "bg-amber-50",
    borderAccent: "border-amber-200",
    textAccent: "text-amber-600",
    icon: Globe,
    metric1: { value: "~8X", label: "ROAS", sublabel: "on paid campaigns" },
    metric2: { value: "50+", label: "Keywords Ranked", sublabel: "on Google" },
    metric3: { value: "High", label: "Lead Quality", sublabel: "from targeted campaigns" },
    overview:
      "TechSolvent has been Kimirica's dedicated Digital Marketing Partner since 2024, driving both performance marketing and search growth. Kimirica is India's leading luxury hotel amenity manufacturer, supplying premium toiletries and guest supplies to top-tier hotels and airlines.",
    challenge:
      "Kimirica needed to scale beyond trade-show dependency and break into high-intent digital channels. Their paid campaigns lacked audience precision and their organic footprint was too limited to capture B2B procurement searches from hospitality decision-makers.",
    strategy: [
      "Launched and optimised performance marketing campaigns across LinkedIn, Meta, and Google Ads with conversion-focused creative and audience segmentation.",
      "Implemented a full SEO + AEO (Answer Engine Optimisation) + GEO (Generative Engine Optimisation) strategy to capture modern search intent.",
      "Built conversion-optimised landing pages aligned to each campaign audience and keyword cluster.",
      "Conducted keyword research and content development to rank 50+ target terms on Google.",
      "Continuously refined campaigns using data-driven insights to maximise ROAS and lead quality.",
    ],
    results:
      "Since partnering in 2024, Kimirica has achieved approximately 8X ROAS on paid campaigns across LinkedIn, Meta, and Google Ads. The brand now ranks for 50+ targeted keywords on Google and consistently generates high-quality B2B leads through a combination of performance marketing and organic search.",
    testimonial: {
      text: "Working with Techsolvent over the past years has been a great experience. They understand our brand well and consistently bring good ideas to the table.",
      author: "Ashwi Bharatkumar Jain, Lead – Branding & Marketing, Kimirica Hunter International LLP",
    },
  },
  {
    id: "stylebuddy",
    brand: "StyleBuddy",
    category: "Fashion Consulting Platform",
    tag: "Social Media, SEO & Performance Marketing",
    tagColor: "from-purple-500 to-violet-600",
    bgAccent: "bg-purple-50",
    borderAccent: "border-purple-200",
    textAccent: "text-purple-600",
    icon: Users,
    metric1: { value: "3X", label: "Qualified Leads", sublabel: "increase in lead volume" },
    metric2: { value: "Strong", label: "Organic Growth", sublabel: "across search channels" },
    metric3: { value: "Better", label: "Brand Engagement", sublabel: "across social platforms" },
    overview:
      "StyleBuddy, a fashion consulting platform, needed strong visibility and consistent lead generation across channels. TechSolvent built an integrated strategy combining SEO, performance marketing, and social media to drive qualified traffic and convert it into leads.",
    challenge:
      "StyleBuddy struggled with low organic visibility, inconsistent social media presence, and a lack of structured performance marketing funnels to generate and qualify leads at scale.",
    strategy: [
      "Implemented full-scale SEO (on-page + off-page) to improve organic rankings and traffic.",
      "Ran Meta Ads lead generation campaigns targeting fashion-conscious audiences.",
      "Built and executed a social media content and brand positioning strategy.",
      "Optimised conversion funnels across landing pages for higher lead quality.",
    ],
    results:
      "StyleBuddy achieved a 3X increase in qualified leads, strong growth in organic traffic, and significantly improved brand engagement across social platforms all driven by a cohesive multi-channel strategy.",
    testimonial: {
      text: "TechSolvent cracked the code on lead generation for us. Our organic and paid channels are now both firing.",
      author: "Co-Founder, StyleBuddy",
    },
  },
  {
    id: "bonayu",
    brand: "Bonayu Health",
    category: "Wellness & Healthcare Brand India, USA & UK",
    tag: "SEO, Social Media & Performance Marketing",
    tagColor: "from-rose-500 to-pink-600",
    bgAccent: "bg-rose-50",
    borderAccent: "border-rose-200",
    textAccent: "text-rose-600",
    icon: Heart,
    metric1: { value: "Scalable", label: "ROAS Growth", sublabel: "on paid campaigns" },
    metric2: { value: "3 Markets", label: "Global Expansion", sublabel: "India, USA & UK" },
    metric3: { value: "Lower", label: "Cost Per Acquisition", sublabel: "with higher conversions" },
    overview:
      "Bonayu Health, a fast-growing wellness and healthcare brand, partnered with TechSolvent to scale its digital presence across India, the United States, and the United Kingdom. The goal was to build a strong omnichannel growth engine combining organic visibility, social engagement, and high-performance paid campaigns.",
    challenge:
      "Bonayu faced low organic visibility in highly competitive health & wellness markets, high customer acquisition costs in international markets, a lack of structured funnel for scaling paid campaigns, and inconsistent brand communication across geographies.",
    strategy: [
      "Built a global + local SEO strategy with keyword targeting tailored for India, US & UK markets.",
      "Executed on-page & technical SEO optimization alongside a content strategy targeting high-intent health queries.",
      "Launched a full-funnel Meta + Google Ads strategy (Awareness → Consideration → Conversion) with continuous creative testing.",
      "Ran Google Ads for high-intent search traffic and Meta Ads for retargeting & scaling purchases.",
      "Developed a consistent social media content strategy aligned with wellness positioning brand storytelling, engagement-driven creatives, and community building.",
    ],
    results:
      "Bonayu Health achieved massive growth in paid campaign performance with scalable ROAS, significant increase in organic traffic and keyword rankings across all three regions, improved cost per acquisition, and higher conversion rates. The brand successfully expanded its digital footprint across India, US, and UK markets.",
    testimonial: {
      text: "TechSolvent built us a real growth engine. The results across our international markets have been outstanding.",
      author: "Team Bonayu Health",
    },
  },
  {
    id: "bedfur",
    brand: "Bed & Fur",
    category: "Pet & Home D2C Brand",
    tag: "SEO & Performance Marketing",
    tagColor: "from-orange-500 to-amber-600",
    bgAccent: "bg-orange-50",
    borderAccent: "border-orange-200",
    textAccent: "text-orange-600",
    icon: ShoppingBag,
    metric1: { value: "5–7X", label: "ROAS", sublabel: "on performance campaigns" },
    metric2: { value: "Higher", label: "Organic Traffic", sublabel: "& product visibility" },
    metric3: { value: "Improved", label: "Conversion Rate", sublabel: "across paid traffic" },
    overview:
      "Bed & Fur partnered with TechSolvent to scale its digital presence and drive consistent revenue through a mix of organic search and paid acquisition strategies.",
    challenge:
      "Bed & Fur needed to grow beyond word-of-mouth and build scalable digital channels. Low organic visibility and untapped paid media potential meant significant growth was being left on the table.",
    strategy: [
      "Built an SEO strategy with keyword clustering and technical optimization for product and category pages.",
      "Launched Google Ads targeting high-intent product searches to capture buyers ready to convert.",
      "Ran Meta Ads for retargeting and catalog sales to recover lost traffic and drive repeat purchases.",
      "Executed conversion rate optimization across landing pages to improve paid traffic efficiency.",
    ],
    results:
      "Bed & Fur achieved 5–7X ROAS on performance campaigns, a significant increase in organic traffic and product visibility, and improved conversion rates across all paid traffic building a reliable and scalable digital revenue engine.",
    images: [bedfurImg1, bedfurImg2],
    testimonial: {
      text: "Our ROAS improved dramatically and organic traffic keeps climbing. TechSolvent delivered exactly what we needed.",
      author: "Founder, Bed & Fur",
    },
  },
  {
    id: "trendoye",
    brand: "TrendOye",
    category: "Fashion eCommerce Brand",
    tag: "SEO & Performance Marketing",
    tagColor: "from-blue-500 to-indigo-600",
    bgAccent: "bg-blue-50",
    borderAccent: "border-blue-200",
    textAccent: "text-blue-600",
    icon: TrendingUp,
    metric1: { value: "Growing", label: "Online Sales", sublabel: "consistent campaign growth" },
    metric2: { value: "Lower", label: "Cost Per Acquisition", sublabel: "improved CPA efficiency" },
    metric3: { value: "Better", label: "ROAS", sublabel: "across Meta & Google" },
    overview:
      "TrendOye, a fashion eCommerce brand, partnered with TechSolvent to scale online sales and improve paid campaign efficiency across Meta and Google platforms.",
    challenge:
      "TrendOye was struggling with high acquisition costs and underperforming paid campaigns. SEO for category and product pages was also underdeveloped, limiting organic discoverability.",
    strategy: [
      "Launched Google Shopping & Search Ads targeting high-intent fashion buyers.",
      "Built Meta Ads campaigns for catalog sales and retargeting lost visitors.",
      "Implemented SEO for category and product pages to grow organic discovery.",
      "Continuously optimized campaigns based on performance data to improve ROAS and reduce CPA.",
    ],
    results:
      "TrendOye saw consistent growth in online sales, a reduced cost per acquisition, and improved ROAS across both Meta and Google platforms creating a scalable and efficient paid acquisition engine.",
    testimonial: {
      text: "TechSolvent has been a game-changer for TrendOye. Their SEO expertise helped us boost our search rankings, increase organic traffic, and attract the right audience. The team is proactive, transparent, and result-driven.",
      author: "Anurag Madan, CEO, TrendOye",
    },
  },
  {
    id: "londonpress",
    brand: "London Press",
    category: "Publishing & Media Brand",
    tag: "Website Design, Development & SEO",
    tagColor: "from-slate-500 to-gray-700",
    bgAccent: "bg-slate-50",
    borderAccent: "border-slate-200",
    textAccent: "text-slate-700",
    icon: BookOpen,
    metric1: { value: "SEO-Ready", label: "Website", sublabel: "high-performing & fast" },
    metric2: { value: "Higher", label: "Search Rankings", sublabel: "improved organic positions" },
    metric3: { value: "Lower", label: "Bounce Rate", sublabel: "better user engagement" },
    overview:
      "London Press required a modern, SEO-friendly website to improve visibility, user experience, and search engine performance. TechSolvent handled the full website redesign alongside a comprehensive SEO implementation.",
    challenge:
      "London Press had an outdated website that was slow, poorly structured for SEO, and failing to engage visitors effectively. Organic search visibility was low and the site was not converting traffic efficiently.",
    strategy: [
      "Executed a complete website redesign with a UI/UX-first approach tailored to the brand.",
      "Built an SEO-optimized site structure and content architecture from the ground up.",
      "Implemented technical SEO including metadata, structured data, page speed, and crawlability improvements.",
      "Optimised performance across devices to reduce bounce rates and improve time-on-site.",
    ],
    results:
      "London Press now has a high-performing, SEO-ready website with improved search rankings, significantly better user engagement, and a lower bounce rate positioning the brand strongly in organic search.",
    images: [londonpressImg1, londonpressImg2],
    testimonial: {
      text: "The new website is exactly what we needed fast, professional, and built to rank. TechSolvent delivered beyond expectations.",
      author: "Team London Press",
    },
  },
  {
    id: "wbr",
    brand: "World Book of Records",
    category: "Global Organization",
    tag: "Lead Generation Meta, Google & LinkedIn",
    tagColor: "from-yellow-500 to-amber-500",
    bgAccent: "bg-yellow-50",
    borderAccent: "border-yellow-200",
    textAccent: "text-yellow-700",
    icon: Award,
    metric1: { value: "High-Quality", label: "International Leads", sublabel: "across multiple regions" },
    metric2: { value: "Global", label: "Campaign Reach", sublabel: "Meta, Google & LinkedIn" },
    metric3: { value: "Consistent", label: "Lead Flow", sublabel: "across all platforms" },
    overview:
      "World Book of Records, a global organization, aimed to generate high-quality leads across multiple regions using a multi-platform paid advertising approach.",
    challenge:
      "Reaching the right audience globally required precise targeting across different platforms and regions, while maintaining lead quality and keeping acquisition costs manageable.",
    strategy: [
      "Launched multi-platform paid campaigns across Meta, Google, and LinkedIn simultaneously.",
      "Built custom audience segmentation and targeting strategies tailored to each platform.",
      "Optimised the full lead generation funnel for quality over volume.",
      "Ran A/B testing across creatives, audiences, and landing pages to improve performance.",
    ],
    results:
      "World Book of Records achieved a consistent flow of high-quality international leads, global campaign reach across three major platforms, and a scalable lead generation system that performs across geographies.",
    testimonial: {
      text: "TechSolvent helped us reach the right audience globally. The quality and consistency of leads has been impressive.",
      author: "Team World Book of Records",
    },
  },
  {
    id: "menhood",
    brand: "Menhood",
    category: "Men's Grooming eCommerce Brand",
    tag: "SEO & Performance Marketing",
    tagColor: "from-zinc-600 to-slate-700",
    bgAccent: "bg-zinc-50",
    borderAccent: "border-zinc-200",
    textAccent: "text-zinc-700",
    icon: Target,
    metric1: { value: "Strong", label: "Organic Growth", sublabel: "impressions & clicks" },
    metric2: { value: "More", label: "Product Sales", sublabel: "via paid & organic"},
    metric3: { value: "Better", label: "Marketing ROI", sublabel: "overall improvement" },
    overview:
      "Menhood, a men's grooming eCommerce brand, aimed to dominate organic search and scale revenue via paid ads. TechSolvent built a combined SEO and performance marketing strategy to grow traffic, conversions, and profitability.",
    challenge:
      "Menhood lacked organic rankings for their core product and category keywords, making them dependent on expensive paid channels with limited return.",
    strategy: [
      "Built SEO strategy targeting high-intent product and category keywords in the men's grooming space.",
      "Launched Google Ads campaigns for purchase-intent search traffic.",
      "Ran Meta Ads for retargeting and audience scaling.",
      "Executed conversion optimization to improve sales across all traffic sources.",
    ],
    results:
      "Menhood achieved strong growth in organic impressions and clicks, increased product sales, and improved overall marketing ROI building a healthier balance between paid and organic acquisition.",
    testimonial: {
      text: "Our organic presence has grown significantly and paid campaigns are more profitable than ever. Great work by the TechSolvent team.",
      author: "Founder, Menhood",
    },
  },
  {
    id: "hushwear",
    brand: "Hush & Wear",
    category: "Fashion D2C Brand",
    tag: "Performance Marketing",
    tagColor: "from-violet-500 to-purple-600",
    bgAccent: "bg-violet-50",
    borderAccent: "border-violet-200",
    textAccent: "text-violet-600",
    icon: Shirt,
    metric1: { value: "Improved", label: "ROAS", sublabel: "across all campaigns" },
    metric2: { value: "Higher", label: "Conversion Rates", sublabel: "from paid traffic" },
    metric3: { value: "Scalable", label: "Revenue Growth", sublabel: "sustainable at scale" },
    overview:
      "Hush & Wear needed a performance-driven strategy to scale revenue profitably through Meta Ads. TechSolvent built and managed a conversion-focused paid media strategy with structured retargeting and creative testing.",
    challenge:
      "Hush & Wear was running ad campaigns without a structured funnel, leading to high acquisition costs and inconsistent ROAS. Creative fatigue and poor budget allocation were limiting scalability.",
    strategy: [
      "Built Meta Ads campaigns focused on conversion-first objectives and ROAS maximization.",
      "Set up a structured retargeting funnel to recover lost visitors and warm audiences.",
      "Ran systematic creative testing to identify winning ad formats and messaging.",
      "Optimised budget allocation in real-time to scale profitable ad sets.",
    ],
    results:
      "Hush & Wear achieved improved ROAS across campaigns, higher conversion rates from paid traffic, and a scalable revenue growth model transforming their paid media from unpredictable spend to a reliable sales engine.",
    testimonial: {
      text: "The improvement in our ad performance has been remarkable. TechSolvent brought structure and results to our paid campaigns.",
      author: "Founder, Hush & Wear",
    },
  },
  {
    id: "wellthya",
    brand: "Wellthya",
    category: "Wellness Brand",
    tag: "Website, Social Media, SEO & Performance Marketing",
    tagColor: "from-teal-500 to-cyan-600",
    bgAccent: "bg-teal-50",
    borderAccent: "border-teal-200",
    textAccent: "text-teal-600",
    icon: Zap,
    metric1: { value: "End-to-End", label: "Brand Growth", sublabel: "across all channels" },
    metric2: { value: "Strong", label: "Organic Traffic", sublabel: "consistent SEO growth" },
    metric3: { value: "Consistent", label: "Lead Generation", sublabel: "& conversions" },
    overview:
      "Wellthya is a wellness brand where TechSolvent handled complete digital growth from scratch building the website, establishing SEO, growing social media presence, and scaling through performance marketing.",
    challenge:
      "Wellthya was a new brand with no established digital presence. They needed a complete go-to-market digital infrastructure built from the ground up.",
    strategy: [
      "Designed and developed a Shopify website optimised for conversions and brand experience.",
      "Implemented SEO from scratch technical foundation, on-page content, and keyword strategy.",
      "Built and executed a social media marketing and content strategy tailored to wellness audiences.",
      "Launched performance marketing across Meta, Google, and LinkedIn to drive traffic and conversions.",
    ],
    results:
      "Wellthya achieved end-to-end brand growth across all channels, strong and consistent organic traffic growth, and a reliable lead generation and conversion engine going from zero digital presence to a fully scalable brand.",
    testimonial: {
      text: "TechSolvent built everything from the ground up for us. From our Shopify store to our ad campaigns it all works together seamlessly.",
      author: "Founder, Wellthya",
    },
  },
];

type TabId = "all" | "rawnut" | "kimirica" | "stylebuddy" | "bonayu" | "bedfur" | "trendoye" | "londonpress" | "wbr" | "menhood" | "hushwear" | "wellthya";

export default function CaseStudies() {
  const [active, setActive] = useState<TabId>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered = active === "all" ? caseStudies : caseStudies.filter((c) => c.id === active);

  return (
    <PageLayout>
      {/* HERO */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #244189 0%, #219CBA 55%, #70DAC5 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/30 rounded-full blur-[80px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-semibold tracking-wide mb-6">
            <BarChart2 className="w-4 h-4" /> Real Results. Real Brands.
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display mb-5 leading-tight">
            Case Studies
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Deep-dives into how TechSolvent helped brands across different industries achieve exceptional, measurable growth.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-10 border-t border-white/10 pt-10">
            {[
              { val: "5–7X", lbl: "ROAS Bed & Fur" },
              { val: "~8X", lbl: "ROAS Kimirica" },
              { val: "3X", lbl: "Leads StyleBuddy" },
              { val: "3 Markets", lbl: "Global Bonayu" },
            ].map((s) => (
              <div key={s.lbl} className="text-center">
                <div className="text-3xl md:text-4xl font-black">{s.val}</div>
                <div className="text-white/60 text-sm mt-1">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {[
              { id: "all" as TabId, label: "All Case Studies" },
              { id: "rawnut" as TabId, label: "Rawnut" },
              { id: "kimirica" as TabId, label: "Kimirica" },
              { id: "stylebuddy" as TabId, label: "StyleBuddy" },
              { id: "bonayu" as TabId, label: "Bonayu Health" },
              { id: "bedfur" as TabId, label: "Bed & Fur" },
              { id: "trendoye" as TabId, label: "TrendOye" },
              { id: "londonpress" as TabId, label: "London Press" },
              { id: "wbr" as TabId, label: "World Book of Records" },
              { id: "menhood" as TabId, label: "Menhood" },
              { id: "hushwear" as TabId, label: "Hush & Wear" },
              { id: "wellthya" as TabId, label: "Wellthya" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                  active === tab.id
                    ? "bg-[#165DFB] text-white shadow-md shadow-[#165DFB]/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY CARDS */}
      <section className="py-20 bg-[#f8faff]">
        <div className="container mx-auto px-4 lg:px-8 space-y-20">
          {filtered.map((cs, idx) => (
            <div
              key={cs.id}
              className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden"
            >
              {/* Top gradient bar */}
              <div className={`h-2 bg-gradient-to-r ${cs.tagColor}`} />

              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${cs.bgAccent} ${cs.textAccent} mb-3`}>
                      {cs.tag}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900">{cs.brand}</h2>
                    <p className="text-gray-500 mt-1">{cs.category}</p>
                  </div>
                  {/* Key Metrics */}
                  <div className="flex flex-wrap gap-4">
                    {[cs.metric1, cs.metric2, cs.metric3].map((m) => (
                      <div key={m.label} className={`${cs.bgAccent} border ${cs.borderAccent} rounded-2xl px-5 py-4 text-center min-w-[100px]`}>
                        <div className={`text-2xl font-black ${cs.textAccent}`}>{m.value}</div>
                        <div className="text-xs font-semibold text-gray-700 mt-0.5">{m.label}</div>
                        <div className="text-xs text-gray-400">{m.sublabel}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Body grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Left */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Overview</h3>
                      <p className="text-gray-700 leading-relaxed">{cs.overview}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">The Challenge</h3>
                      <p className="text-gray-700 leading-relaxed">{cs.challenge}</p>
                    </div>
                    {/* Testimonial */}
                    <div className={`${cs.bgAccent} border ${cs.borderAccent} rounded-2xl p-6`}>
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                      </div>
                      <p className="text-gray-700 italic text-sm leading-relaxed mb-3">"{cs.testimonial.text}"</p>
                      <p className={`text-xs font-bold ${cs.textAccent}`}>— {cs.testimonial.author}</p>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Our Strategy</h3>
                      <ul className="space-y-3">
                        {cs.strategy.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className={`w-5 h-5 shrink-0 mt-0.5 ${cs.textAccent}`} />
                            <span className="text-gray-700 text-sm leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">The Results</h3>
                      <p className="text-gray-700 leading-relaxed">{cs.results}</p>
                    </div>
                  </div>
                </div>

                {/* Render embedded analytics images if they exist - Full Width */}
                {(cs as any).images && (cs as any).images.length > 0 && (
                  <div className="mt-12 pt-10 border-t border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 text-center">Performance Analytics</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {(cs as any).images.map((img: string, i: number) => (
                         <div key={i} className="rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white p-3 cursor-pointer group" onClick={() => setSelectedImage(img)}>
                           <img src={img} alt={`${cs.brand} performance dashboard ${i + 1}`} className="w-full h-auto rounded-lg object-contain group-hover:scale-[1.01] transition-transform duration-300" />
                         </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-24 bg-[#0D2E8C] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#165DFB]/30 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black font-display mb-5">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl text-white/75 mb-10 max-w-xl mx-auto">
            Let's build a strategy tailored to your brand, your market, and your goals.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#0D2E8C] font-bold text-lg rounded-full hover:bg-blue-50 transition-all shadow-xl"
          >
            Start Your Growth Journey <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      {/* IMAGE MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full flex justify-center">
            <button 
              className="absolute -top-12 right-0 text-white font-semibold hover:text-gray-300 flex items-center gap-2"
              onClick={() => setSelectedImage(null)}
            >
              Close <span className="text-3xl leading-none">&times;</span>
            </button>
            <img 
              src={selectedImage} 
              alt="Expanded view" 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
}
