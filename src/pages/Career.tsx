import { Helmet } from "react-helmet-async";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { Briefcase, ArrowRight, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function Career() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://techsolvent.techsolvent.cloud/api/careers")
      .then(res => res.json())
      .then(data => {
        setJobs(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch careers", err);
        setLoading(false);
      });
  }, []);

  return (
    <PageLayout>
      <Helmet>
        <title>Careers | TechSolvent - Join Our Team</title>
        <meta name="description" content="Explore career opportunities at TechSolvent. Join our team of digital marketing experts, developers, and strategists." />
        <link rel="canonical" href="https://techsolvent.in/career" />
        <meta property="og:title" content="Careers | TechSolvent - Join Our Team" />
        <meta property="og:description" content="Explore career opportunities at TechSolvent. Join our team of digital marketing experts, developers, and strategists." />
        <meta property="og:url" content="https://techsolvent.in/career" />
      </Helmet>

      <PageHero
        variant="contact"
        align="center"
        badge="Join TechSolvent"
        title="Build the Future of"
        highlightedTitle="Digital Growth."
        subtitle="We're always looking for passionate, driven individuals to join our team. Explore our open roles and help us shape the future of marketing and tech."
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Positions</h2>
              <p className="text-muted-foreground text-lg">
                Find your next opportunity at TechSolvent.
              </p>
            </div>

            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading open positions...</div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">No open positions at the moment.</div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="group p-8 rounded-2xl border border-border bg-white hover:border-primary/50 transition-all shadow-sm hover:shadow-md relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                      <div>
                        <div className="flex items-center gap-3 mb-3 text-sm">
                          <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full">
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-4 h-4" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-4 h-4" /> {job.type}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                        <p className="text-muted-foreground max-w-2xl whitespace-pre-line">
                          {job.description}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <Link 
                          to={`/apply?jobId=${job.id}`} 
                          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                          Apply Now <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/10 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Don't see a perfect fit?</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                We're always interested in meeting talented people. Send us your resume and we'll keep you in mind for future roles.
              </p>
              <Link 
                to="/apply" 
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30"
              >
                Send Open Application <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
