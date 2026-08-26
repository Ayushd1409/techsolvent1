import { useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const navItems = [
  { label: "Services", hasDropdown: true },
  { label: "White Label", hasDropdown: true },
  { label: "Industry", hasDropdown: true },
  { label: "Our Work", hasDropdown: true },
  { label: "About", hasDropdown: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Franchise banner */}
      <div className="bg-gold-bg py-2 text-center text-sm font-medium">
        <span className="text-foreground">⭐ Proven Model. Trusted Brand. </span>
        <a href="#" className="text-primary font-semibold hover:underline">Start Your Franchise.</a>
      </div>

      <nav className="bg-background sticky top-0 z-50 border-b border-border shadow-sm">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1">
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="text-foreground">e</span>
              <span className="text-gold font-black text-3xl">Z</span>
              <span className="text-foreground">rankings</span>
              <span className="text-gold">™</span>
            </span>
            <span className="text-xs text-muted-foreground block -mt-1 ml-1">Your digital partner</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:bg-navy-light transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            Get Free AI Visibility Audit
          </a>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background pb-4">
            <div className="container mx-auto flex flex-col gap-3 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center justify-between py-2 text-sm font-medium text-foreground"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </button>
              ))}
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-sm font-semibold mt-2"
              >
                <ArrowRight className="w-4 h-4" />
                Get Free AI Visibility Audit
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
