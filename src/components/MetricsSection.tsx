import { motion } from "framer-motion";

const metrics = [
  { value: "9.4X", label: "Average ROAS across all paid campaigns" },
  { value: "162%", label: "Year-over-Year Growth in Online Revenue" },
  { value: "127%", label: "Growth in High-Intent MQLs" },
];

const badges = [
  { emoji: "⭐", text: "16000+ Happy Clients" },
  { emoji: "🏆", text: "Award Winning Agency" },
  { emoji: "🚀", text: "16+ Years Experience" },
];

const MetricsSection = () => {
  return (
    <section className="py-16 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold mb-2"
        >
          Ready to Improve Your Digital Performance?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-secondary-foreground/70 mb-8"
        >
          Get a free consultation and learn how we optimise every channel for growth
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-10"
        >
          {badges.map((b) => (
            <span key={b.text} className="flex items-center gap-2 text-sm font-medium">
              <span className="text-lg">{b.emoji}</span>
              {b.text}
            </span>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {metrics.map((m, i) => (
            <motion.div
              key={m.value}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5, type: "spring" }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-black text-primary mb-2">{m.value}</p>
              <p className="text-sm text-secondary-foreground/70">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;
