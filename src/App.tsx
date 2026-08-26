import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ServicePerformanceMarketing from "./pages/ServicePerformanceMarketing";
import ServiceVirtualInfluencer from "./pages/ServiceVirtualInfluencer";
import ServiceSEO from "./pages/ServiceSEO";
import ServiceVoiceAgent from "./pages/ServiceVoiceAgent";
import ServiceLeadGen from "./pages/ServiceLeadGen";
import ServiceCustomWeb from "./pages/ServiceCustomWeb";
import ServiceShopify from "./pages/ServiceShopify";
import ServiceBrandPositioning from "./pages/ServiceBrandPositioning";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CaseStudies from "./pages/CaseStudies";
import Career from "./pages/Career";
import JobApplication from "./pages/JobApplication";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
declare global {
  interface Window {
    dataLayer: any[];
  }
}
const queryClient = new QueryClient();
const GTMTracker = () => {
  const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
};
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <GTMTracker />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/career" element={<Career />} />
          <Route path="/apply" element={<JobApplication />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Service Roots */}
          <Route path="/services/performance-marketing" element={<ServicePerformanceMarketing />} />
          <Route path="/services/virtual-influencer" element={<ServiceVirtualInfluencer />} />
          <Route path="/services/seo" element={<ServiceSEO />} />
          <Route path="/services/voice-agent" element={<ServiceVoiceAgent />} />
          <Route path="/services/lead-generation" element={<ServiceLeadGen />} />
          <Route path="/services/custom-web-development" element={<ServiceCustomWeb />} />
          <Route path="/services/shopify-development" element={<ServiceShopify />} />
          <Route path="/services/brand-positioning" element={<ServiceBrandPositioning />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
