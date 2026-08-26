import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";
import { ConsultationModal } from "./ConsultationModal";

const services = [
    { name: "AI-Based Performance Marketing", path: "/services/performance-marketing" },
    { name: "Virtual Influencer Social Media Marketing", path: "/services/virtual-influencer" },
    { name: "SEO, AEO, GEO & AI Optimization", path: "/services/seo" },
    { name: "AI Voice Automation Agent", path: "/services/voice-agent" },
    { name: "Lead Generation Automation", path: "/services/lead-generation" },
    { name: "Custom Website Development", path: "/services/custom-web-development" },
    { name: "Shopify Store Development", path: "/services/shopify-development" },
    { name: "Brand Positioning & Strategic Growth", path: "/services/brand-positioning" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setServicesOpen(false);
    }, [location.pathname]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                // Mobile: always solid white background
                "bg-background lg:bg-transparent",
                // Desktop only: switch to blurred background on scroll
                isScrolled && "lg:bg-background/80 lg:backdrop-blur-md lg:border-b lg:border-white/10 lg:shadow-sm"
            )}
        >
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center z-50">
                        <img
                            src={logoImg}
                            alt="TechSolvent - Digital Marketing Consultant"
                            className="h-12 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <Link to="/" className={cn("text-base font-semibold transition-colors relative", location.pathname === "/" ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : "hover:text-primary")}>
                            Home
                        </Link>
                        <Link to="/about" className={cn("text-base font-semibold transition-colors relative", location.pathname === "/about" ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : "hover:text-primary")}>
                            About Us
                        </Link>

                        {/* Services Dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <Link to="/services" className={cn("flex items-center gap-1 text-base font-semibold transition-colors py-2 relative", location.pathname.startsWith("/services") ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : "hover:text-primary")}>
                                Services <ChevronDown className="w-4 h-4" />
                            </Link>

                            {/* Dropdown Menu */}
                            <div
                                className={cn(
                                    "absolute top-full -left-4 w-72 bg-background/95 backdrop-blur-xl border border-white/10 shadow-xl rounded-xl p-2 transition-all duration-200 transform origin-top-left",
                                    servicesOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                                )}
                            >
                                {services.map((service, idx) => (
                                    <Link
                                        key={idx}
                                        to={service.path}
                                        className={cn("block px-4 py-2.5 text-sm rounded-lg transition-colors", location.pathname === service.path ? "text-primary bg-primary/10 font-semibold" : "hover:bg-white/5 hover:text-primary")}
                                    >
                                        {service.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link to="/case-studies" className={cn("text-base font-semibold transition-colors relative", location.pathname === "/case-studies" ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : "hover:text-primary")}>
                            Case Studies
                        </Link>
                        <Link to="/career" className={cn("text-base font-semibold transition-colors relative", location.pathname === "/career" ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : "hover:text-primary")}>
                            Career
                        </Link>
                        <Link to="/blog" className={cn("text-base font-semibold transition-colors relative", location.pathname === "/blog" ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : "hover:text-primary")}>
                            Blog
                        </Link>
                        <Link to="/contact" className={cn("text-base font-semibold transition-colors relative", location.pathname === "/contact" ? "text-primary after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full" : "hover:text-primary")}>
                            Contact Us
                        </Link>
                    </nav>

                    {/* CTA */}
                    <div className="hidden lg:flex items-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-2.5 font-medium rounded-full transition-all shadow-lg hover:opacity-90 text-white"
                            style={{ backgroundColor: '#2668FB' }}
                        >
                            Book Free Consultation
                        </button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden p-2 text-foreground z-50"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <div
                className={cn(
                    "fixed inset-0 bg-background z-40 lg:hidden flex flex-col pt-24 px-6 transition-transform duration-300 transform",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <nav className="flex flex-col gap-6">
                    <Link to="/" className={cn("text-2xl font-bold transition-colors", location.pathname === "/" ? "text-primary" : "")}>Home</Link>
                    <Link to="/about" className={cn("text-2xl font-bold transition-colors", location.pathname === "/about" ? "text-primary" : "")}>About Us</Link>
                    <div className="space-y-4">
                        <Link to="/services" className={cn("text-2xl font-bold flex items-center justify-between transition-colors", location.pathname.startsWith("/services") ? "text-primary" : "")}>
                            Services
                        </Link>
                        <div className="flex flex-col gap-3 pl-4 border-l-2 border-white/10">
                            {services.map((service, idx) => (
                                <Link key={idx} to={service.path} className={cn("text-lg transition-colors", location.pathname === service.path ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground")}>
                                    {service.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <Link to="/case-studies" className={cn("text-2xl font-bold transition-colors", location.pathname === "/case-studies" ? "text-primary" : "")}>Case Studies</Link>
                    <Link to="/career" className={cn("text-2xl font-bold transition-colors", location.pathname === "/career" ? "text-primary" : "")}>Career</Link>
                    <Link to="/blog" className={cn("text-2xl font-bold transition-colors", location.pathname === "/blog" ? "text-primary" : "")}>Blog</Link>
                    <Link to="/contact" className={cn("text-2xl font-bold transition-colors", location.pathname === "/contact" ? "text-primary" : "")}>Contact Us</Link>
                </nav>
                <div className="mt-8">
                    <button
                        onClick={() => { setIsOpen(false); setIsModalOpen(true); }}
                        className="block w-full text-center px-6 py-4 font-bold rounded-xl text-white hover:opacity-90 transition-all"
                        style={{ backgroundColor: '#2668FB' }}
                    >
                        Book Free Consultation
                    </button>
                </div>
            </div>

            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </header>
    );
};
