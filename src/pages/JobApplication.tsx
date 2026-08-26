import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { ArrowRight, CheckCircle, UploadCloud } from "lucide-react";

export default function JobApplication() {
  const [searchParams] = useSearchParams();
  const preselectedJobId = searchParams.get("jobId");

  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    position: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/careers")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data || []);
        if (preselectedJobId) {
          const preselected = data.find((j: any) => j.id === preselectedJobId);
          if (preselected) {
            setForm((f) => ({ ...f, position: preselected.title }));
          }
        }
        setLoadingJobs(false);
      })
      .catch((err) => {
        console.error("Failed to fetch careers", err);
        setLoadingJobs(false);
      });
  }, [preselectedJobId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("linkedin", form.linkedin);
    formData.append("position", form.position);
    formData.append("coverLetter", form.coverLetter);
    formData.append("resume", resumeFile);

    try {
      const res = await fetch("http://localhost:8080/api/apply-job", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || "Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Apply Now | TechSolvent</title>
        <meta name="description" content="Apply for open positions at TechSolvent." />
      </Helmet>
      
      <PageHero
        variant="contact"
        align="center"
        badge="Join Our Team"
        title="Submit Your"
        highlightedTitle="Application."
        subtitle="We're excited to learn more about you. Please fill out the form below and attach your resume."
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white border border-border rounded-3xl p-8 md:p-12 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Full Name *
                  </label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    required
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number *
                  </label>
                  <input
                    required
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    LinkedIn Profile
                  </label>
                  <input
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Open Position *
                  </label>
                  <select
                    required
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                  >
                    <option value="">Select a position...</option>
                    {!loadingJobs &&
                      jobs.map((job) => (
                        <option key={job.id} value={job.title}>
                          {job.title} ({job.location})
                        </option>
                      ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    name="coverLetter"
                    value={form.coverLetter}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us why you'd be a great fit..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Resume / CV (PDF or Word) *
                  </label>
                  <div className="relative border-2 border-dashed border-border rounded-2xl p-8 hover:bg-slate-50 transition-colors flex flex-col items-center justify-center text-center">
                    <UploadCloud className="w-10 h-10 text-primary mb-3" />
                    <p className="text-sm font-medium mb-1">
                      {resumeFile ? resumeFile.name : "Click or drag file to upload"}
                    </p>
                    <p className="text-xs text-muted-foreground">Max file size: 5MB</p>
                    <input
                      required
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : <>Submit Application <ArrowRight className="w-5 h-5" /></>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SUCCESS POPUP */}
      {submitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-black text-gray-900">Application Received!</h3>
              <p className="text-gray-500 text-sm mt-2">
                Thank you for applying, {form.name}. We've received your application for the{" "}
                <strong>{form.position}</strong> role and will be in touch soon.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  linkedin: "",
                  position: "",
                  coverLetter: "",
                });
                setResumeFile(null);
                window.location.href = "/career"; // redirect back to careers
              }}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all"
            >
              Back to Careers
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}
