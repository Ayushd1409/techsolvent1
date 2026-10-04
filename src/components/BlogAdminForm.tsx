import { useState, useEffect, useRef, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { 
  FileText, 
  Globe, 
  HelpCircle, 
  Image as ImageIcon, 
  Trash2, 
  Plus, 
  Sparkles, 
  Link as LinkIcon, 
  CheckCircle2, 
  AlertCircle,
  UploadCloud
} from "lucide-react";

const internalLinkSuggestions = [
  { label: "SEO Services", url: "/services/seo" },
  { label: "Performance Marketing", url: "/services/performance-marketing" },
  { label: "Custom Web Dev", url: "/services/custom-web-development" },
  { label: "Lead Generation", url: "/services/lead-generation" },
  { label: "Virtual Influencer", url: "/services/virtual-influencer" },
  { label: "Shopify Dev", url: "/services/shopify-development" },
  { label: "Brand Positioning", url: "/services/brand-positioning" },
  { label: "Contact Us", url: "/contact" },
  { label: "Case Studies", url: "/case-studies" },
];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Compresses an image client-side to keep file size well under the 1MB Nginx limit.
 * Converts to WebP format with a max dimension of 1600px.
 */
async function compressImage(file: File, maxDimension = 1600, quality = 0.8): Promise<File> {
  if (file.type === "image/svg+xml" || file.size <= 300 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const cleanName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                const compressedFile = new File([blob], cleanName, { type: "image/webp" });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            "image/webp",
            quality
          );
        } else {
          resolve(file);
        }
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
}

/**
 * Uploads an image to the backend /api/upload endpoint and returns the hosted URL.
 */
async function uploadCompressedImage(file: File, token: string): Promise<string> {
  const compressed = await compressImage(file);
  const formData = new FormData();
  formData.append("image", compressed);

  const res = await fetch("https://techsolvent.techsolvent.cloud/api/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Upload failed (${res.status}): ${errorText || "File rejected by server"}`);
  }

  const data = await res.json();
  if (data.success && data.url) {
    return data.url;
  }
  throw new Error(data.error || "Image upload failed");
}

/**
 * Scans HTML content for any embedded base64 data URLs (data:image/...) and
 * automatically uploads each one to /api/upload, replacing them with hosted URLs.
 * This prevents the JSON payload from blowing past the server's 1MB limit.
 */
async function extractAndUploadBase64Images(html: string, token: string): Promise<string> {
  const base64Regex = /src=["'](data:image\/([a-zA-Z0-9+]+);base64,([^"']+))["']/g;
  let match;
  let updatedHtml = html;

  while ((match = base64Regex.exec(html)) !== null) {
    const fullMatch = match[1];
    const mimeType = match[2];
    const base64Data = match[3];

    try {
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: `image/${mimeType}` });
      const file = new File([blob], `embedded-${Date.now()}.${mimeType}`, { type: `image/${mimeType}` });

      const uploadedUrl = await uploadCompressedImage(file, token);
      updatedHtml = updatedHtml.split(fullMatch).join(uploadedUrl);
    } catch (err) {
      console.error("Failed to upload embedded base64 image", err);
    }
  }

  return updatedHtml;
}

export function BlogAdminForm({ initialData, onSubmit, onCancel, token }: any) {
  const [activeTab, setActiveTab] = useState<"general" | "content" | "seo" | "faqs">("general");
  const quillRef = useRef<ReactQuill>(null);

  // General state
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || (initialData?.title ? generateSlug(initialData.title) : ""));
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(Boolean(initialData?.slug));
  const [category, setCategory] = useState(initialData?.category || "AI Marketing");
  const [status, setStatus] = useState(initialData?.status || "Published");
  const [author, setAuthor] = useState(initialData?.author || "Team TechSolvent");
  const [authorRole, setAuthorRole] = useState(initialData?.authorRole || "Growth Experts");
  const [date, setDate] = useState(
    initialData?.date || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })
  );
  const [read, setRead] = useState(initialData?.read || "5 min read");
  const [tags, setTags] = useState(initialData?.tags || "");

  // Content & Media state
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || initialData?.content?.slice(0, 180) || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [quote, setQuote] = useState(initialData?.quote || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState(initialData?.image || "");
  const [imageAltText, setImageAltText] = useState(initialData?.imageAltText || "");
  const [uploadStatus, setUploadStatus] = useState<string>("");

  // SEO state
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonicalUrl || "");
  const [metaKeywords, setMetaKeywords] = useState(initialData?.metaKeywords || "");

  // FAQs state (Replacing Key Takeaways)
  const initialFaqs = Array.isArray(initialData?.faqs) && initialData.faqs.length > 0
    ? initialData.faqs
    : initialData?.takeaways && initialData.takeaways.length > 0
    ? initialData.takeaways.map((t: string) => ({ question: "Key Insight", answer: t }))
    : [{ question: "", answer: "" }];

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>(initialFaqs);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-generate slug from title if not manually changed
  useEffect(() => {
    if (!isSlugManuallyEdited && title) {
      setSlug(generateSlug(title));
    }
  }, [title, isSlugManuallyEdited]);

  // Configure Quill modules with custom image uploader
  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: () => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();
          input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
              setUploadStatus("Uploading image to server...");
              try {
                const url = await uploadCompressedImage(file, token);
                const quill = quillRef.current?.getEditor();
                if (quill) {
                  const range = quill.getSelection(true);
                  quill.insertEmbed(range.index, "image", url);
                  quill.setSelection(range.index + 1, 0);
                }
                setUploadStatus("Image inserted successfully!");
                setTimeout(() => setUploadStatus(""), 3000);
              } catch (err: any) {
                console.error(err);
                alert("Failed to upload editor image: " + err.message);
                setUploadStatus("");
              }
            }
          };
        }
      }
    }
  }), [token]);

  const quillFormats = [
    "header",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent",
    "link", "image", "video",
  ];

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isSlugManuallyEdited) {
      setSlug(generateSlug(val));
    }
    if (!metaTitle) {
      setMetaTitle(`${val} | TechSolvent`);
    }
  };

  const handleSlugChange = (val: string) => {
    setIsSlugManuallyEdited(true);
    setSlug(generateSlug(val));
  };

  const handleAddFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqs(faqs.filter((_, idx) => idx !== index));
  };

  const handleFaqChange = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please enter a blog title.");
      return;
    }

    setIsSubmitting(true);
    let imageUrl = existingImage;

    try {
      // 1. Upload thumbnail image if new file selected (with client-side compression)
      if (imageFile) {
        setUploadStatus("Optimizing and uploading thumbnail...");
        imageUrl = await uploadCompressedImage(imageFile, token);
      }

      // 2. Automatically scrub any embedded base64 images inside editor content
      setUploadStatus("Processing content images...");
      const cleanContent = await extractAndUploadBase64Images(content, token);

      // 3. Filter empty FAQs
      const cleanFaqs = faqs.filter(f => f.question.trim() || f.answer.trim());
      const finalSlug = slug.trim() || generateSlug(title);

      const payload = {
        title: title.trim(),
        slug: finalSlug,
        category,
        status,
        author: author.trim() || "Team TechSolvent",
        authorRole: authorRole.trim(),
        date,
        read,
        tags,
        excerpt: excerpt.trim(),
        content: cleanContent,
        quote: quote.trim().replace(/^["'“‘\s]+|["'”’\s]+$/g, ""),
        image: imageUrl,
        imageAltText: imageAltText.trim() || title,
        metaTitle: metaTitle.trim() || `${title} | TechSolvent`,
        metaDescription: metaDescription.trim() || excerpt.trim() || title,
        canonicalUrl: canonicalUrl.trim() || `https://techsolvent.in/blog/${finalSlug}`,
        metaKeywords: metaKeywords.trim() || tags,
        faqs: cleanFaqs,
      };

      setUploadStatus("Saving blog to server...");
      await onSubmit(payload);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Submission failed. Check network or server logs.");
    } finally {
      setIsSubmitting(false);
      setUploadStatus("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Editor Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === "general"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <FileText className="w-4 h-4" /> General Info
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("content")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === "content"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Content & Media
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === "seo"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <Globe className="w-4 h-4" /> SEO Settings
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("faqs")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
            activeTab === "faqs"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          <HelpCircle className="w-4 h-4" /> FAQs ({faqs.filter(f => f.question).length})
        </button>
      </div>

      {uploadStatus && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-semibold flex items-center gap-2 border border-blue-200 dark:border-blue-900 animate-pulse">
          <UploadCloud className="w-4 h-4 animate-bounce" />
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* ── TAB 1: General Info ─────────────────────────── */}
      {activeTab === "general" && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">
              Blog Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. The AI Marketing Revolution: How to Stay Ahead in 2026"
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-bold text-foreground">
                SEO-Friendly URL (Slug) <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsSlugManuallyEdited(false);
                  setSlug(generateSlug(title));
                }}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Auto-generate from Title
              </button>
            </div>
            <div className="flex items-center rounded-xl border border-border bg-muted/40 overflow-hidden focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary">
              <span className="px-3 text-xs sm:text-sm text-muted-foreground font-mono select-none">
                https://techsolvent.in/blog/
              </span>
              <input
                required
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="ai-marketing-revolution-2026"
                className="flex-1 px-3 py-2.5 bg-background text-foreground font-mono text-sm focus:outline-none"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Target keyword or slug using lowercase letters, numbers, and hyphens (-) only. No dynamic numeric IDs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Category</label>
              <input
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. AI Marketing, SEO / AEO, Social Media"
                className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Author Name</label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Team TechSolvent"
                className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Author Role</label>
              <input
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="Growth Experts / AI Strategist"
                className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Display Date</label>
              <input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Oct 2026"
                className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Read Time</label>
              <input
                value={read}
                onChange={(e) => setRead(e.target.value)}
                placeholder="5 min read"
                className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-1">Tags (comma separated)</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ai, seo, marketing"
                className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground"
              />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: Content & Media ──────────────────────── */}
      {activeTab === "content" && (
        <div className="space-y-6 animate-fade-in">
          {/* Featured Image & Alt Text */}
          <div className="p-5 border border-border rounded-2xl bg-muted/20 space-y-4">
            <h4 className="font-bold text-base text-foreground flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" /> Featured Image & Alt Text (Auto-Compressed)
            </h4>

            {existingImage && !imageFile && (
              <div className="rounded-xl overflow-hidden border border-border bg-background p-2">
                <p className="text-xs text-muted-foreground mb-1 font-semibold">Current Image Preview (Full Aspect):</p>
                <img
                  src={existingImage}
                  alt={imageAltText || "Thumbnail Preview"}
                  className="max-h-56 w-auto object-contain rounded-lg mx-auto"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Upload New Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:opacity-90"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Images are automatically compressed to high-efficiency WebP under 500KB before uploading.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Image Alt Text <span className="text-primary">(Crucial for Google Image SEO)</span>
                </label>
                <input
                  value={imageAltText}
                  onChange={(e) => setImageAltText(e.target.value)}
                  placeholder="Descriptive keywords explaining the image"
                  className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Excerpt / Intro */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">
              Introduction / Excerpt Paragraph
            </label>
            <textarea
              required
              rows={3}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A compelling 1-2 sentence lead paragraph that hooks the reader and is used in search snippets..."
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground resize-y text-sm"
            />
          </div>

          {/* Rich Text Editor (ReactQuill with Headings H2/H3/H4, Custom Image Upload, and Links) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <label className="block text-sm font-bold text-foreground">
                Article Body (Rich Text Editor)
              </label>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Supports <strong>H1, H2, H3, H4</strong> headings, <strong>Internal Links</strong> & Cloud Images</span>
              </div>
            </div>

            {/* Quick Internal Links Toolbar */}
            <div className="p-3 bg-muted/40 border border-border rounded-t-xl text-xs space-y-2">
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <LinkIcon className="w-3.5 h-3.5 text-primary" />
                <span>Quick Internal Links (Copy or insert into your text):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {internalLinkSuggestions.map((item) => (
                  <button
                    key={item.url}
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(item.url);
                      alert(`Copied "${item.url}" to clipboard! Use the Quill Link tool to insert it.`);
                    }}
                    className="px-2.5 py-1 bg-background hover:bg-primary hover:text-primary-foreground border border-border rounded-md font-mono text-[11px] transition-colors"
                    title={`Click to copy ${item.url}`}
                  >
                    {item.label}: {item.url}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-t-0 border-border rounded-b-xl overflow-hidden bg-background">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                modules={quillModules}
                formats={quillFormats}
                value={content}
                onChange={(html) => setContent(html)}
                placeholder="Write your article here... Format with H1, H2, H3, H4 headings, bullet lists, blockquotes, and link to related services or blogs."
                style={{ minHeight: "360px" }}
              />
            </div>
          </div>

          {/* Optional Featured Quote */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-1">
              Featured Callout Quote (Optional)
            </label>
            <input
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="e.g. 'To win at AI marketing in 2026, brands must fuse authentic human strategy with real-time automation.'"
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground text-sm"
            />
          </div>
        </div>
      )}

      {/* ── TAB 3: SEO Settings ─────────────────────────── */}
      {activeTab === "seo" && (
        <div className="space-y-5 animate-fade-in">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-bold text-foreground">Meta Title</label>
              <span className={`text-xs ${metaTitle.length > 60 ? "text-amber-500 font-semibold" : "text-muted-foreground"}`}>
                {metaTitle.length} / 60 characters (Recommended: 50-60)
              </span>
            </div>
            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="e.g. AI Marketing Revolution: How to Stay Ahead | TechSolvent"
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-bold text-foreground">Meta Description</label>
              <span className={`text-xs ${metaDescription.length > 160 ? "text-amber-500 font-semibold" : "text-muted-foreground"}`}>
                {metaDescription.length} / 160 characters (Recommended: 150-160)
              </span>
            </div>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Write a concise, keyword-rich summary that Google displays beneath your title in search results..."
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground text-sm resize-y"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Canonical URL</label>
            <input
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder={`https://techsolvent.in/blog/${slug || "your-slug"}`}
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground text-sm font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Defaults to <code>https://techsolvent.in/blog/{slug || "slug"}</code>. Prevents duplicate content issues across web crawlers.
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-foreground mb-1">Meta Keywords</label>
            <input
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              placeholder="ai marketing, seo agency, growth strategies, performance marketing"
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground text-sm"
            />
          </div>

          {/* Search Snippet Preview */}
          <div className="p-4 border border-border rounded-2xl bg-muted/30 mt-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Google Search Preview:
            </p>
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-border/80 shadow-sm max-w-xl">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1 truncate">
                https://techsolvent.in › blog › {slug || "your-slug"}
              </div>
              <h5 className="text-blue-600 dark:text-blue-400 text-base font-semibold leading-snug hover:underline cursor-pointer truncate">
                {metaTitle || title || "Blog Title Goes Here"}
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                {metaDescription || excerpt || "Your meta description or excerpt will appear here in Google search engine result pages."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: FAQs Builder (Replaces Key Takeaways) ─ */}
      {activeTab === "faqs" && (
        <div className="space-y-5 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
            <div>
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" /> Frequently Asked Questions (SEO & User Experience)
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                FAQs provide direct answers for users and are automatically converted into <strong>Google FAQPage Schema Markup</strong> for rich snippet search results.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFaq}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" /> Add FAQ
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="p-5 border border-border rounded-2xl bg-card shadow-sm space-y-3 relative group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    FAQ #{index + 1}
                  </span>
                  {faqs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(index)}
                      className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove FAQ"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Question
                  </label>
                  <input
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, "question", e.target.value)}
                    placeholder="e.g. How does AI impact SEO ranking in 2026?"
                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Answer
                  </label>
                  <textarea
                    rows={3}
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, "answer", e.target.value)}
                    placeholder="Provide a direct, thorough answer that solves the user query..."
                    className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary/40 focus:outline-none bg-background text-foreground text-sm resize-y"
                  />
                </div>
              </div>
            ))}
          </div>

          {faqs.length === 0 && (
            <div className="text-center py-10 border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground text-sm">No FAQs added yet.</p>
              <button
                type="button"
                onClick={handleAddFaq}
                className="mt-3 text-sm text-primary font-bold hover:underline"
              >
                + Add your first FAQ
              </button>
            </div>
          )}
        </div>
      )}

      {/* Form Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 min-w-[200px] py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (uploadStatus || "Saving Article...") : initialData ? "Update Blog Post" : "Publish Blog Post"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="py-3.5 px-6 bg-secondary text-foreground hover:bg-secondary/80 rounded-xl font-bold transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
