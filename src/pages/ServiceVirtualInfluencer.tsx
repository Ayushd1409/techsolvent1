import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle, Users, Calendar, MessageCircle, BarChart2, Tv, Zap } from "lucide-react";

const included = [
    { icon: Users, title: "Virtual Influencer Creation", desc: "We design and deploy AI-generated virtual brand personas unique characters that carry your brand voice, engage your audience, and create content at scale." },
    { icon: Calendar, title: "Platform Content Strategy", desc: "Custom content strategy for Instagram, Facebook, LinkedIn, YouTube Shorts, and more built around your audience's behavior and your business goals." },
    { icon: Tv, title: "Content Creation & Scheduling", desc: "High-quality reels, carousels, stories, and posts created, scheduled, and published consistently to keep your brand top of mind." },
    { icon: MessageCircle, title: "Community Management", desc: "We handle comments, DMs, and engagement building a loyal community around your brand every single day." },
    { icon: Zap, title: "Paid Social Campaigns", desc: "Meta and Instagram ad campaigns that amplify your best content to precisely targeted audiences for maximum reach and ROI." },
    { icon: BarChart2, title: "Monthly Performance Reports", desc: "Engagement, reach, follower growth, and conversion data delivered monthly with actionable insights." },
];

const platforms = ["Instagram", "Facebook", "LinkedIn", "YouTube", "Pinterest", "X (Twitter)"];

export default function ServiceVirtualInfluencer() {
    return (
        <PageLayout>
            <Helmet>
  <title>Virtual Influencer Marketing | Social Media Marketing Agency – TechSolvent</title>
  <meta 
    name="description" 
    content="TechSolvent is a results-driven social media marketing agency offering virtual influencer marketing solutions to boost brand visibility, engagement, and online growth." 
  />
  <meta 
    name="keywords" 
    content="AI performance marketing agency, paid advertising services, PPC performance marketing, performance marketing strategy" 
  />
  <meta 
    property="og:title" 
    content="Virtual Influencer Marketing | Social Media Marketing Agency – TechSolvent" 
  />
  <meta 
    property="og:description" 
    content="TechSolvent is a results-driven social media marketing agency offering virtual influencer marketing solutions to boost brand visibility, engagement, and online growth." 
  />
</Helmet>
            <PageHero
                variant="influencer"
                badge="Social Media | Virtual Influencers | Content Strategy"
                title="Your Brand Deserves More"
                highlightedTitle="Than Generic Posts."
                subtitle="We build AI-powered virtual influencers, platform-native content, and paid social campaigns that make your brand impossible to scroll past."
                ctaLabel="Start Growing Your Audience"
                ctaHref="/contact"
            />


            <section className="py-20 bg-light-bg">
                <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-3xl">
                    <h2 className="text-3xl font-bold mb-6">What Sets Us Apart</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Forget stock-photo posts and recycled captions. TechSolvent creates a living, breathing social media presence for your brand including virtual AI influencers that represent your brand 24/7 without contracts, conflicts, or controversies.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-background">
                <div className="container mx-auto px-4 lg:px-8">
                    <h2 className="text-4xl font-bold font-display text-center">What's Included</h2>
                    <h1 className="mb-12 mt-3 text-center">social media marketing agency​</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {included.map((item, i) => (
                            <div key={i} className="p-7 rounded-2xl border border-border bg-gradient-to-br from-pink-500/5 to-transparent hover:border-pink-500/30 transition-all">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-5">
                                    <item.icon className="w-6 h-6 text-pink-500" />
                                </div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
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
                    <h2 className="text-3xl font-bold mb-8">Platforms We Manage</h2>
                    <div className="flex flex-wrap gap-3 mb-12">
                        {platforms.map(p => (<span key={p} className="px-4 py-2 border border-white/10 rounded-full text-sm">{p}</span>))}
                    </div>
                    <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all">
                        Let's Build Your Social Media Presence <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </PageLayout>
    );
}
