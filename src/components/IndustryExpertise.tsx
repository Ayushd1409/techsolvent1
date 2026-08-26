import { motion } from "framer-motion";

const industries = [
  "🛒 Ecommerce", "🏠 Real Estate", "🏥 Healthcare", "👗 Fashion & Apparel",
  "💎 Jewelry & Luxury", "🚗 Automotive", "🏭 B2B Brand", "🔧 Home Services",
  "📦 Consumer Goods", "🎓 Education & EdTech", "⚙️ Manufacturing", "🛍️ D2C Brands",
  "💻 SaaS & Technology", "🍽️ Food & Beverage", "💰 Finance",
];

const IndustryExpertise = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
        >
          Industry-Focused Digital Expertise
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto text-sm"
        >
          We understand the unique challenges businesses face across industries.
        </motion.p>
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {industries.map((ind, i) => (
            <motion.span
              key={ind}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="bg-muted text-foreground px-5 py-2.5 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              {ind}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryExpertise;
