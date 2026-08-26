import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Trash2, LogOut, Plus, Pencil } from "lucide-react";
import { BlogAdminForm } from "@/components/BlogAdminForm";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"blogs" | "careers" | "applications">("blogs");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
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
        fetch("http://localhost:8080/api/blogs"),
        fetch("http://localhost:8080/api/careers"),
        fetch("http://localhost:8080/api/applications", {
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
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch(`http://localhost:8080/api/${type}/${id}`, {
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
      const url = editingItem ? `http://localhost:8080/api/blogs/${editingItem.id}` : "http://localhost:8080/api/blogs";
      const method = editingItem ? "PUT" : "POST";
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      fetchData();
      setEditingItem(null);
      setIsFormOpen(false);
    } catch (err) {
      console.error(err);
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
      const url = editingItem ? `http://localhost:8080/api/careers/${editingItem.id}` : "http://localhost:8080/api/careers";
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

  return (
    <PageLayout>
      <div className="min-h-screen pt-32 pb-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-all font-semibold">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          {/* Tabs and Add Button */}
          {!isFormOpen && !editingItem && (
            <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
              <div className="flex gap-4">
                <button
                  onClick={() => { setActiveTab("blogs"); setEditingItem(null); }}
                  className={`px-4 py-2 font-semibold transition-all rounded-lg ${activeTab === "blogs" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-white"}`}
                >
                  Blogs
                </button>
                <button
                  onClick={() => { setActiveTab("careers"); setEditingItem(null); }}
                  className={`px-4 py-2 font-semibold transition-all rounded-lg ${activeTab === "careers" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-white"}`}
                >
                  Careers
                </button>
                <button
                  onClick={() => { setActiveTab("applications"); setEditingItem(null); }}
                  className={`px-4 py-2 font-semibold transition-all rounded-lg ${activeTab === "applications" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary hover:text-white"}`}
                >
                  Applications
                </button>
              </div>
              {activeTab !== "applications" && (
                <button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm">
                  <Plus className="w-5 h-5" /> Add New {activeTab === "blogs" ? "Blog" : "Career"}
                </button>
              )}
            </div>
          )}

          <div>
            {isFormOpen || editingItem ? (
              // Form Section
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-border shadow-sm max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 border-b pb-4">
                  {editingItem ? <Pencil className="w-6 h-6 text-primary" /> : <Plus className="w-6 h-6 text-primary" />}
                  {editingItem ? 'Edit' : 'Add New'} {activeTab === "blogs" ? "Blog" : "Career"}
                </h3>

                {activeTab === "blogs" ? (
                  <BlogAdminForm key={editingItem?.id || 'new'} initialData={editingItem} onSubmit={handleBlogSubmitForm} onCancel={() => { setEditingItem(null); setIsFormOpen(false); }} token={token} />
                ) : (
                  <form key={editingItem?.id || 'new-career'} onSubmit={handleSubmitCareer} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input required name="title" defaultValue={editingItem?.title} placeholder="Job Title" className="w-full px-4 py-3 border rounded-xl" />
                      <input required name="department" defaultValue={editingItem?.department} placeholder="Department" className="w-full px-4 py-3 border rounded-xl" />
                      <input required name="location" defaultValue={editingItem?.location} placeholder="Location" className="w-full px-4 py-3 border rounded-xl" />
                      <input required name="type" defaultValue={editingItem?.type} placeholder="Type (e.g. Full-time)" className="w-full px-4 py-3 border rounded-xl" />
                    </div>
                    <textarea required name="description" defaultValue={editingItem?.description} placeholder="Description" rows={6} className="w-full px-4 py-3 border rounded-xl resize-none"></textarea>
                    <div className="flex gap-4 pt-4 border-t">
                      <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold text-lg">{editingItem ? 'Update' : 'Add'} Career</button>
                      <button type="button" onClick={() => { setEditingItem(null); setIsFormOpen(false); }} className="py-3 px-8 bg-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-300 text-lg">Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              // List Section
              <div className="space-y-4 max-w-5xl mx-auto">
                {activeTab === "blogs" ? (
                  blogs.length > 0 ? blogs.map(blog => (
                    <div key={blog.id} className="flex items-center justify-between p-5 bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-5">
                        <img src={blog.image} className="w-20 h-20 object-cover rounded-xl" alt="" />
                        <div>
                          <h4 className="font-bold text-lg mb-1">{blog.title}</h4>
                          <p className="text-sm text-slate-700 font-medium bg-slate-100 inline-flex px-2 py-1 rounded-md">{blog.category}</p>
                          <span className="text-sm text-muted-foreground ml-3">{blog.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => { setEditingItem(blog); setIsFormOpen(true); }} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete("blogs", blog.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )) : <div className="text-center py-20 bg-white rounded-3xl border border-dashed"><p className="text-muted-foreground text-lg">No blogs found.</p></div>
                ) : activeTab === "careers" ? (
                  careers.length > 0 ? careers.map(career => (
                    <div key={career.id} className="flex items-center justify-between p-6 bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div>
                        <h4 className="font-bold text-xl mb-2">{career.title}</h4>
                        <div className="flex gap-3">
                          <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">{career.department}</span>
                          <span className="text-sm text-slate-700 font-medium bg-slate-100 px-3 py-1 rounded-full">{career.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => { setEditingItem(career); setIsFormOpen(true); }} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete("careers", career.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )) : <div className="text-center py-20 bg-white rounded-3xl border border-dashed"><p className="text-muted-foreground text-lg">No careers found.</p></div>
                ) : (
                  applications.length > 0 ? applications.map(app => (
                    <div key={app.id} className="p-6 bg-white border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                      <div className="absolute top-6 right-6">
                        <button onClick={() => handleDelete("applications", app.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-xl">{app.name}</h4>
                          <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-1 rounded-md">
                            Applied for: {app.position}
                          </span>
                        </div>
                        <div className="text-sm text-slate-600 flex gap-4">
                          <span>📧 {app.email}</span>
                          <span>📞 {app.phone}</span>
                          {app.linkedin && <span>🔗 <a href={app.linkedin} target="_blank" className="text-blue-600 hover:underline">LinkedIn</a></span>}
                        </div>
                      </div>

                      {app.coverLetter && (
                        <div className="mb-4 bg-slate-50 p-4 rounded-xl text-sm text-slate-700 border border-slate-100">
                          <strong>Cover Letter:</strong>
                          <p className="mt-1 whitespace-pre-line">{app.coverLetter}</p>
                        </div>
                      )}

                      {app.resumeUrl && (
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all text-sm">
                          📄 View / Download Resume
                        </a>
                      )}
                      <div className="text-xs text-muted-foreground mt-4 border-t pt-3">
                        Applied on: {new Date(app.appliedAt).toLocaleString()}
                      </div>
                    </div>
                  )) : <div className="text-center py-20 bg-white rounded-3xl border border-dashed"><p className="text-muted-foreground text-lg">No applications yet.</p></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
