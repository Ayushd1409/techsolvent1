import { useState } from "react";
import { createPortal } from "react-dom";
import { submitToGoogleSheet, sendConfirmationEmail } from "@/lib/googleSheets";
import { X, Calendar, User, Mail, Phone, Building2, Clock, CheckCircle, ChevronRight, Globe, Target, IndianRupee, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

const budgetOptions = [
  "Under ₹10,000/mo",
  "₹10,000 – ₹25,000/mo",
  "₹25,000 – ₹50,000/mo",
  "₹50,000 – ₹1,00,000/mo",
  "₹1,00,000+/mo",
];

const serviceOptions = [
  "AI-Based Performance Marketing",
  "SEO / AEO / GEO & AI Optimization",
  "Social Media Marketing",
  "AI Voice Automation Agent",
  "Lead Generation Automation",
  "Custom Website Development",
  "Shopify Store Development",
  "Brand Positioning & Growth",
  "Not sure yet",
];

export const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
  const [step, setStep] = useState<"form" | "thankyou" | "detail" | "success">("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1 fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  // Step 2 (detail) fields
  const [website, setWebsite] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [goals, setGoals] = useState("");
  const [budget, setBudget] = useState("");
  const [challenges, setChallenges] = useState("");
  const [message, setMessage] = useState("");

  const toggleService = (s: string) =>
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const forceClose = () => {
    onClose();
    // Reset after close
    setTimeout(() => {
      setStep("form");
      setName(""); setEmail(""); setPhone(""); setCompany("");
      setDate(""); setTimeSlot("");
      setWebsite(""); setSelectedServices([]); setGoals(""); setBudget(""); setChallenges(""); setMessage("");
    }, 400);
  };

  // Format raw date input ("2026-04-12") → human-readable ("12 April 2026")
  const formatDate = (raw: string): string => {
    if (!raw) return 'To be confirmed';
    const [year, month, day] = raw.split('-');
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ Send confirmation email immediately on Step 1 submit
    sendConfirmationEmail({
      name,
      email,
      phone,
      company,
      date: formatDate(date),  // Human-readable date
      timeSlot,
      service: 'General Consultation', // Services selected in Step 2 later
    });
    setStep("thankyou");
  };

  const handleDetailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Submit full details to Google Sheet
    await submitToGoogleSheet({
      source: "Consultation Modal",
      name, email, phone, company,
      date: formatDate(date),
      timeSlot,
      website,
      service: selectedServices,
      goals,
      budget,
      challenges,
      message
    });
    setIsSubmitting(false);
    setStep("success");
  };

  const handleClose = () => {
    // If user skips/closes on step 2, fire-and-forget submission of step 1 to save the lead
    if (step === "thankyou" && name && email && phone) {
      submitToGoogleSheet({
        source: "Consultation Modal (Skipped Details)",
        name, email, phone, company, date, timeSlot
      });
    }
    forceClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl z-10">

        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* ─── STEP 1: Booking Form ─── */}
        {step === "form" && (
          <div className="p-8 md:p-10">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[#165DFB] rounded-full text-xs font-bold tracking-wide mb-4">
                <Calendar className="w-3.5 h-3.5" /> BOOK FREE CONSULTATION
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                Schedule Your Free<br />
                <span className="text-[#165DFB]">Strategy Session</span>
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                30-minute call with our growth experts. No pitching, just strategy.
              </p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {/* Name + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    required
                    type="text"
                    placeholder="Your Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#165DFB] focus:ring-2 focus:ring-[#165DFB]/10 transition-all"
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Company / Brand Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#165DFB] focus:ring-2 focus:ring-[#165DFB]/10 transition-all"
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    required
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#165DFB] focus:ring-2 focus:ring-[#165DFB]/10 transition-all"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#165DFB] focus:ring-2 focus:ring-[#165DFB]/10 transition-all"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  required
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-[#165DFB] focus:ring-2 focus:ring-[#165DFB]/10 transition-all"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  <Clock className="w-3.5 h-3.5" /> Preferred Time Slot *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={cn(
                        "py-2 px-2 rounded-xl text-xs font-medium border transition-all text-center",
                        timeSlot === slot
                          ? "bg-[#165DFB] text-white border-[#165DFB] shadow-md shadow-[#165DFB]/20"
                          : "border-gray-200 text-gray-600 hover:border-[#165DFB]/50 hover:bg-blue-50"
                      )}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={!timeSlot || isSubmitting}
                className="w-full py-4 bg-[#165DFB] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-[#165DFB]/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
              >
                {isSubmitting ? "Confirming..." : <>Confirm Appointment <ChevronRight className="w-5 h-5" /></>}
              </button>

              <p className="text-center text-xs text-gray-400">
                🔒 Your information is safe and will never be shared.
              </p>
            </form>
          </div>
        )}

        {/* ─── STEP 2: Thank You ─── */}
        {step === "thankyou" && (
          <div className="p-8 md:p-10">
            {/* Success banner */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                Appointment Confirmed! 🎉
              </h2>
              <p className="text-lg text-gray-700 font-semibold mb-2">
                Appointment has been fixed our Team will contact you within <span className="text-[#165DFB]">48 hours.</span>
              </p>
              <p className="text-sm text-gray-500 max-w-md">
                To help our team prepare the best strategy for your brand, please take 2 minutes to fill out the details below.
              </p>
            </div>

            {/* Booking summary */}
            <div className="bg-blue-50 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-400">Name</span><p className="font-semibold text-gray-800">{name}</p></div>
              <div><span className="text-gray-400">Email</span><p className="font-semibold text-gray-800 break-all">{email}</p></div>
              <div><span className="text-gray-400">Phone</span><p className="font-semibold text-gray-800">{phone}</p></div>
              <div><span className="text-gray-400">Date & Time</span><p className="font-semibold text-gray-800">{formatDate(date)} · {timeSlot}</p></div>
            </div>

            {/* Detail form */}
            <form onSubmit={handleDetailSubmit} className="space-y-6">
              <h3 className="text-base font-bold text-gray-800 border-b border-gray-100 pb-3">
                Help Us Prepare Tell Us About Your Business
              </h3>

              {/* Website */}
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  placeholder="Your Website URL (e.g. https://yourbrand.com)"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#165DFB] focus:ring-2 focus:ring-[#165DFB]/10 transition-all"
                />
              </div>

              {/* Services interested in */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  <Target className="w-3.5 h-3.5" /> Services You're Interested In
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleService(s)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                        selectedServices.includes(s)
                          ? "bg-[#165DFB] text-white border-[#165DFB]"
                          : "border-gray-200 text-gray-600 hover:border-[#165DFB]/50 hover:bg-blue-50"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <textarea
                  rows={3}
                  placeholder="What are your primary business goals? (e.g. increase leads, boost online sales, improve brand visibility)"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#165DFB] focus:ring-2 focus:ring-[#165DFB]/10 transition-all resize-none"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  <IndianRupee className="w-3.5 h-3.5" /> Monthly Marketing Budget
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={cn(
                        "py-2 px-3 rounded-xl text-xs font-medium border transition-all text-center",
                        budget === b
                          ? "bg-[#165DFB] text-white border-[#165DFB] shadow-md shadow-[#165DFB]/20"
                          : "border-gray-200 text-gray-600 hover:border-[#165DFB]/50 hover:bg-blue-50"
                      )}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <textarea
                  rows={3}
                  placeholder="What are your biggest marketing challenges right now?"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#165DFB] focus:ring-2 focus:ring-[#165DFB]/10 transition-all resize-none"
                />
              </div>

              {/* Additional Details */}
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                <textarea
                  rows={3}
                  placeholder="Additional Details (Optional) - Any other context or specific requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#165DFB] focus:ring-2 focus:ring-[#165DFB]/10 transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-[#165DFB] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-[#165DFB]/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : <>Submit Details <ChevronRight className="w-5 h-5" /></>}
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 py-4 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all text-sm"
                >
                  Skip & Close
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ─── STEP 3: Success ─── */}
        {step === "success" && (
          <div className="p-8 md:p-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Details Received! 🎉
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-sm">
              Thank you for sharing your project details. This will help our team prepare the perfect custom strategy for you.
            </p>
            <button
              onClick={forceClose}
              className="w-full py-4 bg-[#165DFB] text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg text-base"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>,
    document.body
  );
};
