import { motion } from "framer-motion";

const problems = [
  {
    num: "01",
    title: "Not Getting Results from Your Marketing",
    desc: "You may be running campaigns, posting content, or boosting ads, but the traffic is not turning into leads or sales. We help fix the gaps that stop your marketing from performing.",
    badge: "Boost ROI by 250%",
  },
  {
    num: "02",
    title: "Getting Traffic, But Not Leads",
    desc: "Your website may get visitors, but if they aren't converting, you're missing qualified inquiries, sales, and real business results.",
    badge: "3x Conversion Rate",
  },
  {
    num: "03",
    title: "No Clear Digital Strategy",
    desc: "Trying SEO, social media, paid ads, or content without a plan leads to wasted effort and slow progress. We create data-driven strategies.",
    badge: "Strategic Clarity",
  },
  {
    num: "04",
    title: "Low Visibility in AI-Powered Search",
    desc: "AI platforms are reshaping how customers discover brands. If your business is not optimised for AI-driven search, you risk being overlooked.",
    badge: "AI-Ready Brand",
  },
];

const ProblemsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm font-semibold text-primary uppercase tracking-widest mb-2 text-center"
        >Problem We Solve</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
        >
          For SMBs to Large Enterprises
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -15px hsla(220, 50%, 15%, 0.1)" }}
              className="bg-muted rounded-2xl p-8 transition-shadow group"
            >
              <span className="text-4xl font-black text-primary/20">{p.num}</span>
              <h3 className="text-xl font-bold text-foreground mt-3 mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.desc}</p>
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-semibold">
                {p.badge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
