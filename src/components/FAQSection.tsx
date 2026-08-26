import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "How do I get started with digital marketing at EZ Rankings?", a: "Getting started is simple. Book a free consultation with our experts to discuss your business goals, target audience, and challenges. We then recommend a strategy tailored to your objectives and start executing a structured plan for measurable growth." },
  { q: "How is your performance-driven strategy different from other agencies?", a: "Unlike other agencies, we build strategies based on data, past learnings, and realistic business goals. Our focus is performance that scales over time, not just flashy dashboards." },
  { q: "How do I know which digital marketing channels are right for my business?", a: "We evaluate business goals, customer behaviour, competition, and budget to select the right channels. We recommend channels based on results, not trends." },
  { q: "How do AI and LLMs improve digital marketing performance?", a: "AI and LLMs like ChatGPT and Gemini improve targeting, reach, and high-intent traffic. EZ Rankings leverages these tools to enhance search visibility, content engagement, and overall marketing performance." },
  { q: "What KPIs do you track in performance marketing campaigns?", a: "We focus on ROI, ROAS, efficiency, conversion quality, cost optimization, and long-term growth impact." },
  { q: "How much does digital marketing cost?", a: "Our services typically start at $2,000/month. The final cost depends on business goals, channels, competition, and strategy depth." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2"
        >
          FAQs
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-10 text-sm"
        >
          Clear answers to help you understand our digital marketing solutions better.
        </motion.p>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-foreground text-sm pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
