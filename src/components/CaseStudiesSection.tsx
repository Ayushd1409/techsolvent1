import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const industries = [
  "Travel Industry", "E-commerce", "B2B Sales", "Photography", "Education", "SaaS", "Healthcare", "Local Service", "Construction", "Real Estate",
];

const caseStudies: Record<string, {
  company: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string; detail: string }[];
}> = {
  "Travel Industry": {
    company: "EASE TRAVELS | USA & INDIA",
    challenge: "Over-reliance on OTAs (72%) increased commission costs. Organic traffic stalled at 18K/month.",
    solution: "Destination-based search strategy, high-conversion landing pages, Performance Max with Meta retargeting.",
    results: [
      { value: "+189%", label: "Organic Traffic", detail: "18K → 52K/month" },
      { value: "+259%", label: "Direct Bookings", detail: "320 → 1,150/month" },
      { value: "4.1x", label: "Paid Ads ROAS", detail: "from 1.4x" },
      { value: "3.5x", label: "Revenue Growth", detail: "OTA dependency → 38%" },
    ],
  },
  "E-commerce": {
    company: "THREAD CO. | UK & CANADA",
    challenge: "Despite steady traffic, conversions remained low at 0.9% with 74% cart abandonment.",
    solution: "Funnel-based SEO, Google Shopping restructuring, site speed and checkout UX optimization.",
    results: [
      { value: "3x", label: "Conversion Rate", detail: "0.9% → 2.7%" },
      { value: "3.0x", label: "Monthly Revenue", detail: "£68K → £210K" },
      { value: "5.3x", label: "Paid ROAS", detail: "up from 2.2x" },
      { value: "49%", label: "Cart Abandonment", detail: "reduced from 74%" },
    ],
  },
  "B2B Sales": {
    company: "FOAM INDUSTRIES | INDIA & DUBAI",
    challenge: "Zero inbound leads. Sales relied heavily on exhibitions and referrals.",
    solution: "High-intent B2B keyword targeting, LinkedIn ABM campaigns, CRM-led lead scoring.",
    results: [
      { value: "48-62", label: "Qualified Leads/Month", detail: "from 0-3" },
      { value: "65%", label: "SQL Conversion", detail: "high-intent" },
      { value: "₹2,100", label: "Cost Per Lead", detail: "highly efficient" },
      { value: "₹3.8 Cr", label: "Pipeline Generated", detail: "6 deals/month" },
    ],
  },
};

const CaseStudiesSection = () => {
  const [activeTab, setActiveTab] = useState("Travel Industry");
  const study = caseStudies[activeTab] || caseStudies["Travel Industry"];

  return (
    <section className="py-20 bg-light-bg">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2"
        >
          Growth You Can Measure + Results You Can Trust
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-sm"
        >
          Explore the challenges our clients faced and how our data-driven digital marketing services delivered clear, measurable improvements.
        </motion.p>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {industries.map((ind) => (
            <motion.button
              key={ind}
              onClick={() => setActiveTab(ind)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === ind
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground border border-border hover:border-primary/30"
              }`}
            >
              {ind}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {study ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="bg-background rounded-2xl shadow-lg p-8 md:p-12"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">{study.company}</h3>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-xs font-semibold text-destructive uppercase mb-1">The Challenge</p>
                  <p className="text-sm text-muted-foreground">{study.challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary uppercase mb-1">The Solution</p>
                  <p className="text-sm text-muted-foreground">{study.solution}</p>
                </div>
              </div>
              <h4 className="text-base font-bold text-foreground mb-4">Impact & Results</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {study.results.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.4, type: "spring" }}
                    className="bg-muted rounded-xl p-4 text-center"
                  >
                    <p className="text-2xl font-black text-primary">{r.value}</p>
                    <p className="text-xs font-semibold text-foreground mt-1">{r.label}</p>
                    <p className="text-xs text-muted-foreground">{r.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-background rounded-2xl shadow-lg p-12 text-center text-muted-foreground"
            >
              Case study coming soon.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
