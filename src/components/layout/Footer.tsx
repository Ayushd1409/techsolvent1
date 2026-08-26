import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import logoImg from "@/assets/logo-white.png";
import mapImg from "@/assets/dotted-world-map.png";

const services = [
    { name: "AI-Based Performance Marketing", path: "/services/performance-marketing" },
    { name: "Virtual Influencer Marketing", path: "/services/virtual-influencer" },
    { name: "SEO, AEO & GEO Optimization", path: "/services/seo" },
    { name: "AI Voice Automation Agent", path: "/services/voice-agent" },
    { name: "Lead Generation Automation", path: "/services/lead-generation" },
    { name: "Custom Website Development", path: "/services/custom-web-development" },
    { name: "Shopify Store Development", path: "/services/shopify-development" },
    { name: "Brand Positioning & Strategy", path: "/services/brand-positioning" },
];

export const Footer = () => {
    return (
        <footer className="bg-secondary text-secondary-foreground pt-20 pb-10 border-t border-white/10 lg:px-8 relative overflow-hidden">
            {/* World Map Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10 z-0"
                style={{
                    backgroundImage: `url(${mapImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link to="/" className="inline-block">
                            <img
                                src={logoImg}
                                alt="TechSolvent"
                                className="h-20 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                            Steps to Make Brands Thrive. We engineer growth through AI-powered strategies, automation, and real results.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://in.linkedin.com/company/techsolvent-digital-marketing-consultant" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Linkedin className="w-5 h-5" /></a>
                            <a href="https://www.instagram.com/techsolvent.in/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
                            <a href="https://www.facebook.com/Techsolventmarketingconsultant/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
                            {/* <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Twitter className="w-5 h-5" /></a> */}
                            {/* <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"><Youtube className="w-5 h-5" /></a> */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Home", path: "/" },
                                { name: "About Us", path: "/about" },
                                { name: "Services", path: "/services" },
                                { name: "Case Studies", path: "/case-studies" },
                                { name: "Career", path: "/career" },
                                { name: "Blog", path: "/blog" },
                                { name: "Contact Us", path: "/contact" }
                            ].map((link) => (
                                <li key={link.name}>
                                    {link.external ? (
                                        <a href={link.path} className="text-white/80 hover:text-yellow-400 transition-colors">
                                            {link.name}
                                        </a>
                                    ) : (
                                        <Link to={link.path} className="text-white/80 hover:text-yellow-400 transition-colors">
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Our Services</h3>
                        <ul className="space-y-4">
                            {services.map((service, idx) => (
                                <li key={idx}>
                                    <Link to={service.path} className="text-white/80 hover:text-yellow-400 transition-colors text-sm">
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-sm text-white/80">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span>649, 650, above Lenskart Showroom, Sector A, Mahalaxmi Nagar, Indore, MP</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <a href="tel:+917400557704" className="hover:text-yellow-400">+91 7400557704</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <a href="mailto:info@techsolvent.in" className="hover:text-yellow-400">info@techsolvent.in</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-white/60">
                        © {new Date().getFullYear()} TechSolvent. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-white/60">
                        <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
