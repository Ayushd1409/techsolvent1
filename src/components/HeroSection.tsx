import { ArrowRight, TrendingUp, CheckCircle, Star, Target, Share2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import heroHand from "@/assets/hero-hand.png";
import heroRobot from "@/assets/hero-robot.png";

const stats = [
  { icon: TrendingUp, label: "BOOSTING REVENUE", value: "2X to 6X", desc: "Proven growth results", color: "bg-gold-bg text-primary" },
  { icon: Target, label: "IMPROVED LEADS", value: "3X to 8X", desc: "Quality lead generation", color: "bg-gold-bg text-primary" },
  { icon: Share2, label: "SOCIAL MEDIA ENGAGEMENT", value: "4X to 8X", desc: "Enhanced audience reach", color: "bg-gold-bg text-primary" },
  { icon: Eye, label: "BRAND EXPOSURE", value: "100 to 1000%", desc: "Massive visibility boost", color: "bg-gold-bg text-primary" },
];

const HeroSection = () => {
  return (
    // <section
    //   className="relative overflow-hidden"
    //   style={{ background: 'linear-gradient(135deg, #244189 0%, #219CBA 55%, #70DAC5 100%)' }}
    // >
       <section className="min-h-screen bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="relative flex items-center justify-center min-h-[500px]">
          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-0 top-0 bottom-0 w-48 md:w-64 hidden md:block"
          >
            <img src={heroHand} alt="Growth" className="h-full object-contain object-left opacity-80" />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-8 left-4 shadow-lg rounded-xl px-4 py-2 flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm text-foreground">10x Growth</span>
            </motion.div>
          </motion.div>

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block border border-primary/30 rounded-full px-6 py-1.5 text-xs font-semibold tracking-widest text-primary uppercase mb-6"
            >
              Performance Marketing
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl font-black tracking-tight mb-2"
            >
              <span style={{ background: "linear-gradient(to right, #FBBF24, #001e53)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>AI-Driven</span>
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl font-semibold text-foreground mb-1"
            >
              Performance Marketing Agency
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              Powering Growth with Precision and AI
            </motion.p>
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 text-[#1a1a1a] px-8 py-4 rounded-full text-base font-semibold transition-colors shadow-lg hover:opacity-90"
              style={{ backgroundColor: '#FFE546' }}
            >
              <ArrowRight className="w-5 h-5" />
              Claim Your Free Strategy
            </motion.a>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <span>Rated 5 Stars Based on 600+ Client Reviews</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute right-0 top-0 bottom-0 w-48 md:w-64 hidden md:block"
          >
            <img src={heroRobot} alt="AI" className="h-full object-contain object-right opacity-80" />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-12 right-4 bg-background shadow-lg rounded-xl px-4 py-2 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm text-foreground">AI-Powered Results</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, boxShadow: "0 10px 30px -10px hsla(64, 100%, 50%, 0.20)" }}
              className=" rounded-xl p-5 group transition-shadow"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              <p className="text-xl font-bold text-primary mt-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
