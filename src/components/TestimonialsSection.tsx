import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sanjiv Nanda",
    role: "Director, Smarthead Consulting",
    text: "I, Sanjiv Nanda, Director of Smarthead Consulting wish to record my appreciation and acknowledgment, for Mrs. Mansi Rana, Director of EZ Rankings IT Services. Her company has given excellent services to our clients in the sphere of making websites for our Real Estate Clients and Defence Sector Clients in record time and at very reasonable costs.",
    initial: "S",
  },
  {
    name: "Ray Adams",
    role: "MD, Alliant Web",
    text: "Thank you for a great experience in working on this project to a successful completion. Your pricing matched the value we received. The site is beautiful and functional and has already received response from those looking for our services.",
    initial: "R",
  },
  {
    name: "Kristin & Jared",
    role: "Clients, Digital Marketing",
    text: "Our experience with EZ Rankings has been incredible - they have surpassed expectations with great quality, whether that is design work, SEO work and development work. Their hard work, dedication and commitment to delivering exceptional quality have really surpassed our expectations.",
    initial: "K",
  },
];

const TestimonialsSection = () => {
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
          What Our Clients Have To Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-4 text-sm"
        >
          We've partnered with more than 16K clients. Here's what they share about our experience.
        </motion.p>
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">600+ reviews</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-background rounded-2xl p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
