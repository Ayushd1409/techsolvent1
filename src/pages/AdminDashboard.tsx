import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PageLayout } from "@/components/layout/PageLayout";
import { 
  Trash2, 
  LogOut, 
  Plus, 
  Pencil, 
  FileText, 
  Briefcase, 
  Users, 
  ExternalLink, 
  HelpCircle, 
  Sparkles,
  Search,
  CheckCircle2
} from "lucide-react";
import { BlogAdminForm } from "@/components/BlogAdminForm";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"blogs" | "careers" | "applications">("blogs");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchData();
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const [blogsRes, careersRes, appsRes] = await Promise.all([
        fetch("https://techsolvent.techsolvent.cloud/api/blogs"),
        fetch("https://techsolvent.techsolvent.cloud/api/careers"),
        fetch("https://techsolvent.techsolvent.cloud/api/applications", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      const bData = await blogsRes.json();
      const cData = await careersRes.json();
      const aData = await appsRes.json();
      setBlogs(bData || []);
      setCareers(cData || []);
      setApplications(aData || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleDelete = async (type: "blogs" | "careers" | "applications", id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type.slice(0, -1)}? This cannot be undone.`)) return;
    try {
      const res = await fetch(`https://techsolvent.techsolvent.cloud/api/${type}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchData();
      } else {
        alert("Failed to delete.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const handleBlogSubmitForm = async (payload: any) => {
    try {
      const url = editingItem
        ? `https://techsolvent.techsolvent.cloud/api/blogs/${editingItem.id}`
        : "https://techsolvent.techsolvent.cloud/api/blogs";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        if (res.status === 413) {
          throw new Error("Payload Too Large (413): The content exceeds the 1MB server limit. The form now automatically compresses images and uploads them to the cloud to prevent this.");
        }
        const errText = await res.text();
        throw new Error(`Failed to save blog (${res.status}): ${errText || res.statusText}`);
      }

      fetchData();
      setEditingItem(null);
      setIsFormOpen(false);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to save blog post. Check console or server connection.");
    }
  };

  const handleSubmitCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const careerData = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      department: (form.elements.namedItem("department") as HTMLInputElement).value,
      location: (form.elements.namedItem("location") as HTMLInputElement).value,
      type: (form.elements.namedItem("type") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
    };
    try {
      const url = editingItem
        ? `https://techsolvent.techsolvent.cloud/api/careers/${editingItem.id}`
        : "https://techsolvent.techsolvent.cloud/api/careers";
      const method = editingItem ? "PUT" : "POST";
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(careerData)
      });
      fetchData();
      form.reset();
      setEditingItem(null);
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) return null;

  const filteredBlogs = blogs.filter(b => 
    b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.slug?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      <Helmet>
        <title>Admin Dashboard | TechSolvent</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-primary/10 text-primary rounded-xl">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Admin Dashboard</h1>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Manage SEO-friendly blog articles, careers, and job candidate applications.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link 
                to="/blog" 
                target="_blank" 
                className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-secondary transition"
              >
                <span>View Live Blog</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 px-4 py-2 rounded-xl transition-all font-semibold text-sm border border-red-200 dark:border-red-900/50"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div 
              onClick={() => { setActiveTab("blogs"); setIsFormOpen(false); setEditingItem(null); }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === "blogs" 
                  ? "bg-primary/5 border-primary shadow-sm" 
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Blog Articles</p>
                  <p className="text-3xl font-extrabold text-foreground mt-1">{blogs.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => { setActiveTab("careers"); setIsFormOpen(false); setEditingItem(null); }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === "careers" 
                  ? "bg-primary/5 border-primary shadow-sm" 
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Open Careers</p>
                  <p className="text-3xl font-extrabold text-foreground mt-1">{careers.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div 
              onClick={() => { setActiveTab("applications"); setIsFormOpen(false); setEditingItem(null); }}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                activeTab === "applications" 
                  ? "bg-primary/5 border-primary shadow-sm" 
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Candidate Applications</p>
                  <p className="text-3xl font-extrabold text-foreground mt-1">{applications.length}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar (Search & Add Button) */}
          {!isFormOpen && !editingItem && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
              </div>

              {activeTab !== "applications" && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" /> Add New {activeTab === "blogs" ? "Blog Article" : "Job Role"}
                </button>
              )}
            </div>
          )}

          {/* Content Area */}
          <div>
            {isFormOpen || editingItem ? (
              /* Editor Form Container */
              <div className="bg-card p-6 md:p-10 rounded-3xl border border-border shadow-sm">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
                  <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground">
                    {editingItem ? <Pencil className="w-6 h-6 text-primary" /> : <Plus className="w-6 h-6 text-primary" />}
                    {editingItem ? "Edit" : "Create New"} {activeTab === "blogs" ? "Blog Post" : "Career Listing"}
                  </h3>
                  <button
                    onClick={() => { setEditingItem(null); setIsFormOpen(false); }}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border hover:bg-secondary transition"
                  >
                    Close Form
                  </button>
                </div>

                {activeTab === "blogs" ? (
                  <BlogAdminForm
                    key={editingItem?.id || "new-blog"}
                    initialData={editingItem}
                    onSubmit={handleBlogSubmitForm}
                    onCancel={() => { setEditingItem(null); setIsFormOpen(false); }}
                    token={token}
                  />
                ) : (
                  <form key={editingItem?.id || "new-career"} onSubmit={handleSubmitCareer} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1">Job Title</label>
                        <input required name="title" defaultValue={editingItem?.title} placeholder="e.g. Senior AI Strategist" className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1">Department</label>
                        <input required name="department" defaultValue={editingItem?.department} placeholder="e.g. Performance Marketing" className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1">Location</label>
                        <input required name="location" defaultValue={editingItem?.location} placeholder="e.g. Remote / Indore, India" className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1">Employment Type</label>
                        <input required name="type" defaultValue={editingItem?.type} placeholder="e.g. Full-time" className="w-full px-4 py-2.5 border border-border rounded-xl bg-background" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1">Job Description</label>
                      <textarea required name="description" defaultValue={editingItem?.description} placeholder="Describe the responsibilities and qualifications..." rows={6} className="w-full px-4 py-3 border border-border rounded-xl bg-background resize-none"></textarea>
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-border">
                      <button type="submit" className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:bg-primary/90 transition shadow">
                        {editingItem ? "Update Career" : "Publish Career"}
                      </button>
                      <button type="button" onClick={() => { setEditingItem(null); setIsFormOpen(false); }} className="py-3 px-8 bg-secondary text-foreground rounded-xl font-bold">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Lists Section */
              <div className="space-y-4">
                {activeTab === "blogs" ? (
                  filteredBlogs.length > 0 ? (
                    filteredBlogs.map((blog) => (
                      <div
                        key={blog.id}
                        className="p-5 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/60">
                            <img
                              src={blog.image}
                              alt={blog.imageAltText || blog.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                                {blog.category || "General"}
                              </span>
                              <span className="text-xs text-muted-foreground">• {blog.date}</span>
                              {blog.faqs && blog.faqs.length > 0 && (
                                <span className="text-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <HelpCircle className="w-3 h-3" /> {blog.faqs.length} FAQs
                                </span>
                              )}
                              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                                blog.status === "Published" 
                                  ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" 
                                  : "bg-slate-100 text-slate-600"
                              }`}>
                                {blog.status || "Published"}
                              </span>
                            </div>

                            <h4 className="font-bold text-lg text-foreground leading-snug">
                              {blog.title}
                            </h4>

                            <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                              <span>Slug URL:</span>
                              <Link
                                to={`/blog/${blog.slug || blog.id}`}
                                target="_blank"
                                className="text-primary hover:underline flex items-center gap-1 font-semibold"
                              >
                                /blog/{blog.slug || blog.id}
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                          <button
                            onClick={() => { setEditingItem(blog); setIsFormOpen(true); }}
                            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-colors border border-blue-200 dark:border-blue-900/50"
                          >
                            <Pencil className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete("blogs", blog.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors border border-red-200 dark:border-red-900/50"
                            title="Delete Blog"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-card rounded-3xl border border-dashed border-border">
                      <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground font-medium">No blog posts found.</p>
                      <button
                        onClick={() => setIsFormOpen(true)}
                        className="mt-3 text-sm font-bold text-primary hover:underline"
                      >
                        + Create your first blog post
                      </button>
                    </div>
                  )
                ) : activeTab === "careers" ? (
                  careers.length > 0 ? (
                    careers.map((career) => (
                      <div
                        key={career.id}
                        className="flex items-center justify-between p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div>
                          <h4 className="font-bold text-xl mb-2 text-foreground">{career.title}</h4>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                              {career.department}
                            </span>
                            <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full font-medium">
                              {career.location}
                            </span>
                            <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full font-medium">
                              {career.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setEditingItem(career); setIsFormOpen(true); }}
                            className="p-2.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl transition-colors border border-blue-200 dark:border-blue-900/50"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete("careers", career.id)}
                            className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors border border-red-200 dark:border-red-900/50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-card rounded-3xl border border-dashed border-border">
                      <Briefcase className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground font-medium">No open careers found.</p>
                    </div>
                  )
                ) : (
                  applications.length > 0 ? (
                    applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
                      >
                        <div className="absolute top-6 right-6">
                          <button
                            onClick={() => handleDelete("applications", app.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-xl text-foreground">{app.name}</h4>
                            <span className="text-xs bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-md">
                              Applied for: {app.position}
                            </span>
                          </div>
                          <div className="text-sm text-muted-foreground flex flex-wrap gap-4">
                            <span>📧 {app.email}</span>
                            <span>📞 {app.phone}</span>
                            {app.linkedin && (
                              <span>
                                🔗 <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn</a>
                              </span>
                            )}
                          </div>
                        </div>

                        {app.coverLetter && (
                          <div className="mb-4 bg-muted/40 p-4 rounded-xl text-sm text-foreground/90 border border-border">
                            <strong>Cover Letter:</strong>
                            <p className="mt-1 whitespace-pre-line leading-relaxed">{app.coverLetter}</p>
                          </div>
                        )}

                        {app.resumeUrl && (
                          <a
                            href={app.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-foreground font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all text-sm"
                          >
                            📄 View / Download Candidate Resume
                          </a>
                        )}
                        <div className="text-xs text-muted-foreground mt-4 border-t border-border pt-3">
                          Applied on: {new Date(app.appliedAt).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-card rounded-3xl border border-dashed border-border">
                      <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground font-medium">No job applications submitted yet.</p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
