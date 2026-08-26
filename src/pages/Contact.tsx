import { useState } from "react";
import { submitToGoogleSheet, sendConfirmationEmail } from "@/lib/googleSheets";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { MapPin, Phone, Mail, Clock, ArrowRight, BookOpen, ExternalLink, Instagram, CheckCircle } from "lucide-react";


const services = [
  "AI-Based Performance Marketing",
  "Virtual Influencer Social Media Marketing",
  "SEO, AEO, GEO & AI Optimization",
  "AI Voice Automation Agent",
  "Lead Generation Automation",
  "Custom Website Development",
  "Shopify Store Development",
  "Brand Positioning & Strategic Growth",
  "Other / Not sure yet",
];

const budgets = [
  "Under ₹25,000/mo",
  "₹25,000 – ₹75,000/mo",
  "₹75,000 – ₹2,00,000/mo",
  "₹2,00,000+/mo",
  "One-time project",
];

const timeSlots = [
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "12:00 PM – 1:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM",
  "5:00 PM – 6:00 PM",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", business: "", website: "", service: "", budget: "", date: "", timeSlot: "", goals: "", challenges: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitToGoogleSheet({
      source: "Contact Page Form",
      ...form,
      company: form.business // Map to sheet schema
    });
    // Send confirmation email (fire-and-forget, don't block UI)
    sendConfirmationEmail({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.business,
      date: form.date,
      timeSlot: form.timeSlot,
      service: form.service,
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Contact TechSolvent | Start Your Digital Growth Journey Today</title>
        <meta name="description" content="Contact TechSolvent to discuss your digital marketing, SEO, web development, and branding needs. Let our experts help you grow your business online." />
        <meta name="keywords" content="contact TechSolvent, digital marketing consultation, book strategy call, marketing agency contact" />
        <meta property="og:title" content="Contact TechSolvent | Start Your Digital Growth Journey Today" />
        <meta property="og:description" content="Contact TechSolvent to discuss your digital marketing, SEO, web development, and branding needs. Let our experts help you grow your business online." />
      </Helmet>
      <PageHero
        variant="contact"
        align="center"
        badge="Let's Work Together"
        title="Start Your Growth"
        highlightedTitle="Journey Today."
        subtitle="Book a free strategy call. No pressure, no fluff just a real conversation about how we can help your business grow faster with AI-powered marketing."
      />


      {/* CONTACT BODY */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* FORM */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-border rounded-3xl p-8 md:p-12 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Full Name *</label>
                    <input required name="name" value={form.name} onChange={handleChange} type="text" placeholder="Your full name" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Business Name *</label>
                    <input required name="business" value={form.business} onChange={handleChange} type="text" placeholder="Your business name" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                    <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder="you@company.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                    <input required name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Website URL</label>
                    <input name="website" value={form.website} onChange={handleChange} type="url" placeholder="https://yourwebsite.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Service Interested In</label>
                    <select name="service" value={form.service} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all">
                      <option value="">Select a service…</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Budget Range</label>
                    <select name="budget" value={form.budget} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all">
                      <option value="">Select your budget range…</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Preferred Appointment Date</label>
                    <input name="date" value={form.date} onChange={handleChange} type="date" min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-foreground" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Preferred Time Slot</label>
                    <select name="timeSlot" value={form.timeSlot} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all">
                      <option value="">Select a time slot…</option>
                      {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Primary Business Goals *</label>
                    <textarea required name="goals" value={form.goals} onChange={handleChange} rows={3} placeholder="e.g. increase leads, boost online sales, improve brand visibility..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Biggest Marketing Challenges *</label>
                    <textarea required name="challenges" value={form.challenges} onChange={handleChange} rows={3} placeholder="What is currently holding your growth back?" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">Additional Details (Optional)</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Any other context or specific requirements you'd like to share..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSubmitting ? "Sending..." : <>Let's Talk <ArrowRight className="w-5 h-5" /></>}
                </button>
              </form>
            </div>

            {/* DETAILS */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-border bg-light-bg space-y-5">
                <h3 className="text-xl font-bold">Contact Details</h3>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Phone</p>
                    <a href="tel:+917400557704" className="font-semibold hover:text-primary">+91 7400557704</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Email</p>
                    <a href="mailto:info@techsolvent.in" className="font-semibold hover:text-primary">info@techsolvent.in</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Address</p>
                    <p className="font-semibold text-sm">649, 650, above Lenskart Showroom, Sector A, Mahalaxmi Nagar, Indore, MP</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Business Hours</p>
                    <p className="font-semibold text-sm">Monday – Saturday | 10:00 AM – 7:00 PM IST</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-light-bg">
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link to="/contact" className="flex items-center gap-2 text-sm hover:text-primary transition-colors"><ExternalLink className="w-4 h-4 text-primary" /> Book a Free Strategy Call</Link>
                  <Link to="/services" className="flex items-center gap-2 text-sm hover:text-primary transition-colors"><ExternalLink className="w-4 h-4 text-primary" /> View Our Services</Link>
                  <Link to="/blog" className="flex items-center gap-2 text-sm hover:text-primary transition-colors"><BookOpen className="w-4 h-4 text-primary" /> Read Our Blog</Link>
                  <a href="#" className="flex items-center gap-2 text-sm hover:text-primary transition-colors"><Instagram className="w-4 h-4 text-primary" /> Follow Us on Instagram</a>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-[#0D2E8C] text-center">
                <p className="text-sm text-white/80">Not ready to reach out yet?</p>
                <Link to="/blog" className="inline-flex items-center gap-1 mt-2 text-white font-semibold hover:underline">
                  Read our blog <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-white/60 mt-1">Free growth insights and marketing strategies.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIRMATION POPUP */}
      {submitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Request Sent!</h3>
              <p className="text-gray-500 text-sm mt-2">Thank you for reaching out, {form.name}. Our team will review your details and get back to you shortly.</p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Business</span>
                <span className="font-semibold text-gray-800 text-right">{form.business || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold text-gray-800 text-right">{form.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Service</span>
                <span className="font-semibold text-gray-800 text-right">{form.service || 'N/A'}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2 mb-2 border-b-transparent">
                <span className="text-gray-500">Budget</span>
                <span className="font-semibold text-gray-800 text-right">{form.budget || 'N/A'}</span>
              </div>
              {(form.date || form.timeSlot) && (
                <div className="flex justify-between pt-2 border-t border-gray-200 mt-2">
                  <span className="text-gray-500">Appointment</span>
                  <span className="font-semibold text-gray-800 text-right">{form.date} {form.timeSlot}</span>
                </div>
              )}
            </div>

            <button 
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", email: "", phone: "", business: "", website: "", service: "", budget: "", date: "", timeSlot: "", goals: "", challenges: "", message: "" });
              }}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
