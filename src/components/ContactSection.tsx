import { useState } from "react";
import { Send, Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you soon.");
  };

  return (
    <section id="contact" className="py-20 bg-light-bg">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-2"
        >
          Let's talk about you
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground mb-10 text-sm"
        >
          Our team looks forward to hearing from you
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-foreground mb-4">Talk to our experts</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Get expert guidance to build the right strategy for your online business growth.
            </p>

            <div className="space-y-4">
              {[
                { icon: Phone, label: "Call us at", value: "🇮🇳 +91-9560133711" },
                { icon: Phone, label: "USA", value: "🇺🇸 +1-855-763-0320" },
                { icon: MessageCircle, label: "Chat", value: "WhatsApp" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href="#"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3 bg-background border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground text-sm">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background rounded-2xl p-8 shadow-lg space-y-4"
          >
            <input type="text" placeholder="Full Name*" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="email" placeholder="Email ID*" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="tel" placeholder="Phone No*" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="">Budget (select a range)</option>
              <option value="500-1000">$500 - $1,000</option>
              <option value="1000-5000">$1,000 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000-25000">$10,000 - $25,000</option>
              <option value="25000+">$25,000+</option>
            </select>
            <textarea placeholder="Description" rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
              Submit
            </motion.button>
            <p className="text-xs text-muted-foreground text-center">
              Or email us at <a href="mailto:contactus@ezrankings.com" className="text-primary">contactus@ezrankings.com</a>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
