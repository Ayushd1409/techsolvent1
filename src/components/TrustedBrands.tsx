import { motion } from "framer-motion";

const brands = [
  "Baidyanath", "BR Ceramics", "Coverfox", "Yatra", "Pristyn Care",
  "Kajaria", "Honeywell", "Fab Hotel", "Bathxpertz", "Dreamworkx",
];

const TrustedBrands = () => {
  return (
    <section className="py-12 bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">
          Trusted by Global Brands
        </h2>
        <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto text-sm">
          As a leading digital marketing company in India, EZ Rankings works with global brands to deliver consistent, growth-focused digital results.
        </p>
      </motion.div>

      <div className="relative">
        <div className="flex animate-marquee">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[180px] h-20 mx-4 bg-muted rounded-lg px-6"
            >
              <span className="text-lg font-semibold text-muted-foreground">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
