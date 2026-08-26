import { useState } from "react";
import { Search, Palette, Code, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "marketing",
    icon: Search,
    tab: "Marketing",
    title: "Marketing Solutions",
    desc: "We help brands build stronger search visibility, attract high-intent traffic, and generate predictable leads with smart, data-powered digital strategies.",
    items: ["SEO Services", "Local SEO", "Ecommerce SEO", "Amazon SEO", "Google Map Marketing", "Social Media Marketing", "PPC Advertising", "Bing Ads Management", "Meta Ads"],
    tools: ["Google Analytics", "Google Search Console", "AHREFs", "SEMRUSH", "Hootsuite"],
    cta: "Start Marketing Growth",
  },
  {
    id: "branding",
    icon: Palette,
    tab: "Branding",
    title: "Branding Solutions",
    desc: "We help businesses communicate their value, create a strong visual identity, and build trust through consistent branding.",
    items: ["Online Reputation Management", "Content Marketing", "Review Management", "Rebranding", "Logo Designing", "Creative Graphic Design", "Crisis Management"],
    tools: ["Adobe Creative Cloud", "SEMrush", "Brand Monitoring", "Google Alerts", "Canva"],
    cta: "Build Brand Authority",
  },
  {
    id: "development",
    icon: Code,
    tab: "Website / Apps",
    title: "Website & App Development",
    desc: "Create fast, modern, and user-friendly websites or apps. We design and build digital platforms that look great, perform smoothly, and turn visitors into customers.",
    items: ["Website Design", "Website Development", "App Store Marketing", "UI/UX Design", "Custom Web Applications", "Mobile App Development", "Shopify Development"],
    tools: ["PHP", "React", "Angular", "Flutter", "React Native", "Shopify"],
    cta: "Explore Solutions",
  },
];

const ServicesSection = () => {
  const [active, setActive] = useState("marketing");
  const current = services.find((s) => s.id === active)!;

  return (
    <section className="py-20 bg-light-bg">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-10 justify-center"
        >
          {services.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => setActive(s.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                active === s.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-background text-foreground border border-border hover:border-primary/30"
              }`}
            >
              <s.icon className="w-4 h-4" />
              {s.tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="bg-background rounded-2xl shadow-lg p-8 md:p-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{current.title}</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl">{current.desc}</p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold uppercase text-muted-foreground tracking-wide mb-4">Core Services</h4>
                <div className="grid grid-cols-2 gap-2">
                  {current.items.map((item, i) => (
                    <motion.a
                      key={item}
                      href="#"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="text-sm text-foreground hover:text-primary transition-colors py-1"
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase text-muted-foreground tracking-wide mb-4">Key Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {current.tools.map((tool, i) => (
                    <motion.span
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className="bg-muted text-muted-foreground px-3 py-1.5 rounded-full text-xs font-medium"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                {current.cta}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;
