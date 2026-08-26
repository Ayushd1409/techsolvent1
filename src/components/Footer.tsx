import * as React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import worldMap from "@/assets/dotted-world-map.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 relative overflow-hidden">

      {/* World Map Background Image */}
      <img
        src={worldMap}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ opacity: 0.1, mixBlendMode: "overlay" }}
      />

      {/* Footer Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-extrabold mb-4">
              <span>Tec</span>
              <span className="text-yellow-400 text-3xl font-black">h</span>
              <span>Solvent</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              TechSolvent is a performance-driven digital marketing agency helping businesses grow with AI-powered strategies.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-white">Services</h4>
            <ul className="space-y-2 text-sm text-white/75">
              {["SEO Services", "PPC Advertising", "Social Media Marketing", "Content Marketing", "Web Development", "App Development"].map((s) => (
                <li key={s}><a href="#" className="hover:text-yellow-400 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-white">Company</h4>
            <ul className="space-y-2 text-sm text-white/75">
              {["About Us", "Our Work", "Careers", "Blog", "Contact Us"].map((s) => (
                <li key={s}><a href="#" className="hover:text-yellow-400 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm text-white">Contact</h4>
            <div className="space-y-3 text-sm text-white/75">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-yellow-400" />
                <span>contact@techsolvent.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-yellow-400" />
                <span>+91-9560133711</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 shrink-0 text-yellow-400" />
                <span>+1-855-763-0320</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-yellow-400" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 text-center text-xs text-white/60">
          © {new Date().getFullYear()} TechSolvent IT Services Pvt Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
