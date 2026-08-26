import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export type PageHeroVariant =
    | "about"
    | "services"
    | "contact"
    | "blog"
    | "performance"
    | "seo"
    | "voice"
    | "leads"
    | "web"
    | "shopify"
    | "brand"
    | "influencer";

interface PageHeroProps {
    badge?: string;
    title: string;
    highlightedTitle?: string;
    subtitle: string;
    ctaLabel?: string;
    ctaHref?: string;
    variant: PageHeroVariant;
    align?: "left" | "center";
}

/* ─── Per-variant background SVGs ─────────────────────────────────────────── */
function AboutBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Orbit rings */}
            <circle cx="900" cy="250" r="180" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
            <circle cx="900" cy="250" r="120" stroke="currentColor" strokeOpacity="0.30" strokeWidth="1" />
            <circle cx="900" cy="250" r="60" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
            {/* Dot on orbit */}
            <circle cx="1080" cy="250" r="6" fill="currentColor" fillOpacity="0.55" />
            <circle cx="900" cy="70" r="6" fill="currentColor" fillOpacity="0.55" />
            <circle cx="780" cy="310" r="4" fill="currentColor" fillOpacity="0.40" />
            {/* Grid lines */}
            {[0, 80, 160, 240, 320, 400].map((y) => (
                <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
            ))}
            {[0, 80, 160, 240, 320, 400].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="500" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
            ))}
            {/* People silhouettes */}
            <ellipse cx="100" cy="420" rx="18" ry="22" fill="currentColor" fillOpacity="0.18" />
            <rect x="82" y="440" width="36" height="50" rx="8" fill="currentColor" fillOpacity="0.18" />
            <ellipse cx="160" cy="415" rx="18" ry="22" fill="currentColor" fillOpacity="0.18" />
            <rect x="142" y="435" width="36" height="50" rx="8" fill="currentColor" fillOpacity="0.18" />
        </svg>
    );
}

function ServicesBg() {
    const icons = ["⚡", "🔍", "📊", "🤖", "🎯", "🌐", "🛒", "🏆"];
    const positions = [
        [900, 80], [1020, 140], [1100, 260], [1020, 380], [900, 440], [780, 380], [700, 260], [780, 140]
    ];
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Hexagon grid */}
            {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4].map((col) => {
                    const x = col * 120 + (row % 2) * 60 + 600;
                    const y = row * 104 - 20;
                    return <polygon key={`${row}-${col}`} points={`${x},${y + 30} ${x + 26},${y + 15} ${x + 26},${y - 15} ${x},${y - 30} ${x - 26},${y - 15} ${x - 26},${y + 15}`}
                        stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" fill="none" />;
                })
            )}
            {/* Orbit circle */}
            <circle cx="900" cy="250" r="200" stroke="currentColor" strokeOpacity="0.22" strokeDasharray="6 10" strokeWidth="1" />
            {/* Service dots on orbit */}
            {positions.map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="8" fill="currentColor" fillOpacity="0.40" />
            ))}
        </svg>
    );
}

function ContactBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Pulse rings */}
            <circle cx="200" cy="250" r="60" stroke="currentColor" strokeOpacity="0.30" strokeWidth="1.5" />
            <circle cx="200" cy="250" r="100" stroke="currentColor" strokeOpacity="0.20" strokeWidth="1" />
            <circle cx="200" cy="250" r="140" stroke="currentColor" strokeOpacity="0.13" strokeWidth="1" />
            {/* Message bubbles */}
            <rect x="850" y="80" width="200" height="80" rx="16" stroke="currentColor" strokeOpacity="0.30" strokeWidth="1.5" fill="none" />
            <polygon points="870,160 850,190 900,160" fill="currentColor" fillOpacity="0.20" />
            <rect x="920" y="200" width="160" height="60" rx="16" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" fill="none" />
            {/* Location pin */}
            <circle cx="600" cy="100" r="20" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
            <line x1="600" y1="120" x2="600" y2="150" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
            {/* Dots */}
            <circle cx="400" cy="380" r="5" fill="currentColor" fillOpacity="0.35" />
            <circle cx="1050" cy="380" r="7" fill="currentColor" fillOpacity="0.30" />
            <circle cx="750" cy="420" r="4" fill="currentColor" fillOpacity="0.28" />
        </svg>
    );
}

function BlogBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Book shape */}
            <rect x="820" y="100" width="120" height="160" rx="4" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <line x1="880" y1="100" x2="880" y2="260" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
            <rect x="940" y="100" width="120" height="160" rx="4" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            {/* Text lines */}
            {[140, 160, 180, 200, 220].map((y) => (
                <line key={y} x1="840" y1={y} x2="940" y2={y} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
            ))}
            {[140, 160, 180, 200, 220].map((y) => (
                <line key={y} x1="960" y1={y} x2="1040" y2={y} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
            ))}
            {/* Scattered dots */}
            <circle cx="200" cy="150" r="40" fill="currentColor" fillOpacity="0.12" />
            <circle cx="300" cy="350" r="25" fill="currentColor" fillOpacity="0.10" />
            <circle cx="650" cy="400" r="15" fill="currentColor" fillOpacity="0.12" />
            {/* Tag */}
            <rect x="100" y="300" width="80" height="30" rx="15" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

function PerformanceBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Bar chart */}
            {[
                { x: 820, h: 80 }, { x: 870, h: 130 }, { x: 920, h: 100 }, { x: 970, h: 180 }, { x: 1020, h: 140 }, { x: 1070, h: 220 }
            ].map(({ x, h }, i) => (
                <rect key={i} x={x} y={380 - h} width="36" height={h} rx="4" fill="currentColor" fillOpacity="0.25" />
            ))}
            {/* Baseline */}
            <line x1="810" y1="380" x2="1120" y2="380" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
            {/* Upward trend line */}
            <polyline points="820,380 870,300 940,320 1000,200 1100,100" stroke="currentColor" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="6 4" fill="none" />
            {/* Arrow head */}
            <polygon points="1100,100 1090,120 1110,116" fill="currentColor" fillOpacity="0.45" />
            {/* Blobs */}
            <circle cx="200" cy="200" r="50" fill="currentColor" fillOpacity="0.12" />
            <circle cx="350" cy="380" r="30" fill="currentColor" fillOpacity="0.10" />
            {/* Grid horizontal */}
            {[200, 280, 380].map((y) => (
                <line key={y} x1="810" y1={y} x2="1120" y2={y} stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" />
            ))}
        </svg>
    );
}

function SEOBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Magnifying glass */}
            <circle cx="980" cy="200" r="100" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2.5" fill="none" />
            <line x1="1056" y1="282" x2="1110" y2="360" stroke="currentColor" strokeOpacity="0.35" strokeWidth="8" strokeLinecap="round" />
            {/* Concentric rings */}
            <circle cx="980" cy="200" r="140" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="8 12" strokeWidth="1" />
            <circle cx="980" cy="200" r="180" stroke="currentColor" strokeOpacity="0.10" strokeDasharray="8 12" strokeWidth="1" />
            {/* Search bar */}
            <rect x="100" y="100" width="400" height="50" rx="25" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" fill="none" />
            <circle cx="470" cy="125" r="15" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" fill="none" />
            {/* Ranking steps */}
            {[0, 1, 2].map((i) => (
                <rect key={i} x={200 + i * 80} y={300 + i * 30} width="70" height="30" rx="4" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" fill="none" />
            ))}
        </svg>
    );
}

function VoiceBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Mic body */}
            <rect x="950" y="80" width="60" height="120" rx="30" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <path d="M920 200 Q920 260 980 260 Q1040 260 1040 200" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <line x1="980" y1="260" x2="980" y2="310" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
            <line x1="950" y1="310" x2="1010" y2="310" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" />
            {/* Sound waves */}
            {[1, 2, 3, 4].map((i) => (
                <path key={i} d={`M${210 + i * 60},180 Q${240 + i * 60},250 ${210 + i * 60},320`} stroke="currentColor" strokeOpacity={0.40 - i * 0.06} strokeWidth="2" fill="none" />
            ))}
            {[1, 2, 3, 4].map((i) => (
                <path key={i} d={`M${200 - i * 60},180 Q${170 - i * 60},250 ${200 - i * 60},320`} stroke="currentColor" strokeOpacity={0.40 - i * 0.06} strokeWidth="2" fill="none" />
            ))}
            {/* AI pulse dots */}
            {[600, 640, 680, 720, 760].map((x, i) => (
                <circle key={i} cx={x} cy={250 + Math.sin(i) * 30} r="5" fill="currentColor" fillOpacity="0.40" />
            ))}
            {/* connecting line */}
            <polyline points="600,250 640,220 680,280 720,230 760,260" stroke="currentColor" strokeOpacity="0.30" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

function LeadsBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Funnel */}
            <polygon points="780,60 1120,60 1040,200 860,200" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <polygon points="860,200 1040,200 1000,320 900,320" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <rect x="920" y="320" width="60" height="100" rx="8" stroke="currentColor" strokeOpacity="0.40" strokeWidth="2" fill="none" />
            {/* Drop */}
            <ellipse cx="950" cy="450" rx="14" ry="20" fill="currentColor" fillOpacity="0.35" />
            {/* Flow arrows on left */}
            {[120, 200, 280, 360].map((y, i) => (
                <g key={i}>
                    <line x1="100" y1={y} x2="300" y2={y} stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" />
                    <polygon points={`300,${y - 6} 320,${y} 300,${y + 6}`} fill="currentColor" fillOpacity="0.22" />
                </g>
            ))}
            {/* Conversion dots */}
            {[0, 1, 2].map((i) => (
                <circle key={i} cx={450 + i * 80} cy={380 - i * 60} r="8" fill="currentColor" fillOpacity={0.35 - i * 0.05} />
            ))}
        </svg>
    );
}

function WebBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Browser outline */}
            <rect x="700" y="60" width="420" height="300" rx="12" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <line x1="700" y1="110" x2="1120" y2="110" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
            <circle cx="730" cy="85" r="8" fill="currentColor" fillOpacity="0.25" />
            <circle cx="755" cy="85" r="8" fill="currentColor" fillOpacity="0.25" />
            <circle cx="780" cy="85" r="8" fill="currentColor" fillOpacity="0.25" />
            <rect x="800" y="75" width="200" height="20" rx="10" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" fill="none" />
            {/* Code angle brackets */}
            <text x="100" y="200" fontSize="80" fill="currentColor" fillOpacity="0.20" fontFamily="monospace">{"</"}</text>
            <text x="250" y="350" fontSize="60" fill="currentColor" fillOpacity="0.16" fontFamily="monospace">{">"}  </text>
            {/* Grid mesh */}
            {[0, 1, 2, 3].map((row) =>
                [0, 1, 2, 3, 4, 5].map((col) => (
                    <rect key={`${row}-${col}`} x={col * 100} y={row * 80 + 200} width="95" height="75" rx="2" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" fill="none" />
                ))
            )}
        </svg>
    );
}

function ShopifyBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Shopping cart */}
            <path d="M800 120 L820 120 L860 260 L1050 260 L1080 160 L820 160" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="880" cy="290" r="18" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <circle cx="1030" cy="290" r="18" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            {/* Price tag */}
            <rect x="900" y="320" width="100" height="50" rx="8" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" fill="none" />
            <circle cx="910" cy="335" r="6" fill="currentColor" fillOpacity="0.28" />
            {/* Floating product cards */}
            <rect x="120" y="100" width="100" height="130" rx="8" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" fill="none" />
            <rect x="240" y="150" width="100" height="130" rx="8" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1.5" fill="none" />
            {/* Stars */}
            {[0, 1, 2, 3, 4].map((i) => (
                <text key={i} x={150 + i * 22} y="265" fontSize="18" fill="currentColor" fillOpacity="0.30">★</text>
            ))}
        </svg>
    );
}

function BrandBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Trophy */}
            <path d="M900 100 L960 100 L960 220 Q960 260 930 280 Q900 260 900 220 Z" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <rect x="910" y="280" width="40" height="60" rx="4" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" fill="none" />
            <rect x="890" y="340" width="80" height="20" rx="4" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <path d="M900 130 Q870 130 870 160 Q870 190 900 200" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" fill="none" />
            <path d="M960 130 Q990 130 990 160 Q990 190 960 200" stroke="currentColor" strokeOpacity="0.28" strokeWidth="2" fill="none" />
            {/* Star constellation */}
            {[[200, 150], [260, 100], [310, 170], [280, 230], [220, 220]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="5" fill="currentColor" fillOpacity="0.40" />
            ))}
            {[[200, 150], [260, 100], [310, 170], [280, 230], [220, 220], [200, 150]].reduce((acc, p, i, arr) => {
                if (i === 0) return acc;
                const [x1, y1] = arr[i - 1], [x2, y2] = p;
                return [...acc, <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />];
            }, [] as React.ReactElement[])}
            {/* Positioning matrix */}
            <line x1="550" y1="150" x2="550" y2="400" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
            <line x1="420" y1="275" x2="680" y2="275" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
            <circle cx="480" cy="210" r="12" fill="currentColor" fillOpacity="0.28" />
            <circle cx="620" cy="320" r="8" fill="currentColor" fillOpacity="0.22" />
            <circle cx="620" cy="200" r="16" fill="currentColor" fillOpacity="0.35" />
        </svg>
    );
}

function InfluencerBg() {
    return (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 500" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Camera */}
            <rect x="830" y="120" width="220" height="170" rx="20" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <circle cx="940" cy="205" r="55" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" fill="none" />
            <circle cx="940" cy="205" r="35" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" fill="none" />
            <rect x="870" y="110" width="50" height="20" rx="6" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" fill="none" />
            {/* Floating hearts */}
            {[[200, 200, 0.35], [300, 300, 0.28], [500, 150, 0.22], [600, 350, 0.30]].map(([x, y, o], i) => (
                <text key={i} x={x as number} y={y as number} fontSize="30" fill="currentColor" fillOpacity={o as number}>♥</text>
            ))}
            {/* Follower ticker */}
            <rect x="100" y="350" width="200" height="60" rx="12" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" fill="none" />
            <rect x="320" y="370" width="150" height="40" rx="12" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" fill="none" />
            {/* Signal waves */}
            <circle cx="600" cy="100" r="30" stroke="currentColor" strokeOpacity="0.30" strokeWidth="1.5" fill="none" />
            <circle cx="600" cy="100" r="55" stroke="currentColor" strokeOpacity="0.20" strokeWidth="1" fill="none" />
            <circle cx="600" cy="100" r="80" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" fill="none" />
        </svg>
    );
}

const bgMap: Record<PageHeroVariant, React.FC> = {
    about: AboutBg,
    services: ServicesBg,
    contact: ContactBg,
    blog: BlogBg,
    performance: PerformanceBg,
    seo: SEOBg,
    voice: VoiceBg,
    leads: LeadsBg,
    web: WebBg,
    shopify: ShopifyBg,
    brand: BrandBg,
    influencer: InfluencerBg,
};

/* ─── Main component ───────────────────────────────────────────────────────── */
export function PageHero({
    badge,
    title,
    highlightedTitle,
    subtitle,
    ctaLabel,
    ctaHref = "/contact",
    variant,
    align = "left",
}: PageHeroProps) {
    const BgComponent = bgMap[variant];
    const isCenter = align === "center";

    return (
        <section className="relative min-h-[56vh] flex items-center bg-secondary text-secondary-foreground overflow-hidden">
            {/* Themed SVG background */}
            <div className="absolute inset-0 pointer-events-none select-none text-white">
                <BgComponent />
            </div>

            {/* Gradient glow blob */}
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/6 rounded-full blur-[100px] pointer-events-none" />

            <div className={`container mx-auto px-4 lg:px-8 py-20 relative z-10 ${isCenter ? "text-center" : ""}`}>
                <div className={`${isCenter ? "max-w-3xl mx-auto" : "max-w-3xl"}`}>

                    {/* Badge */}
                    {badge && (
                        <motion.div
                            initial={{ opacity: 0, y: -12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className={`inline-flex items-center gap-2 px-4 py-2 bg-white/15 border border-white/25 rounded-full text-white text-sm font-medium mb-8 ${isCenter ? "mx-auto" : ""}`}
                        >
                            {badge}
                        </motion.div>
                    )}

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6"
                    >
                        {title}
                        {highlightedTitle && (
                            <>
                                <br />
                                <span className="text-gradient-gold">{highlightedTitle}</span>
                            </>
                        )}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={`text-xl text-white/75 leading-relaxed mb-10 max-w-xl ${isCenter ? "mx-auto text-center" : ""}`}
                    >
                        {subtitle}
                    </motion.p>

                    {/* CTA */}
                    {ctaLabel && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                        >
                            {ctaHref.startsWith("#") ? (
                                <button
                                    onClick={() => {
                                        document.querySelector(ctaHref)?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 hover:scale-105"
                                >
                                    {ctaLabel} <ArrowRight className="w-5 h-5" />
                                </button>
                            ) : (
                                <Link
                                    to={ctaHref}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 hover:scale-105"
                                >
                                    {ctaLabel} <ArrowRight className="w-5 h-5" />
                                </Link>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}
