import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import aboutImg from "@/assets/about-image.webp";

const AboutSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold text-primary uppercase tracking-widest mb-2"
        >About Us</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-6 max-w-3xl"
        >
          Best Digital Marketing Agency in India Driving Results and Growth
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-muted-foreground mb-6 leading-relaxed">
              EZ Rankings, known as the best digital marketing agency in India, delivers measurable outcomes through data-driven strategies. With full-funnel digital marketing audits, we help you find growth gaps and key opportunities to maximise conversions across all touchpoints.
            </p>
            <h3 className="text-lg font-semibold text-foreground mb-4">Our Strategic Approach Includes:</h3>
            <ul className="space-y-3 mb-8">
              {[
                "AI-Driven, Performance-Focused Marketing",
                "Full-Funnel Digital Solutions for Higher ROI",
                "Personalized, Multi-Platform Growth Strategies",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Explore How We Drive Growth
            </motion.a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <img
              src={aboutImg}
              alt="Best Digital Marketing Agency"
              className="rounded-2xl shadow-xl w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
