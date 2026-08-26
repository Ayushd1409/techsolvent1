import { useState } from "react";
import { Trash2 } from "lucide-react";

export function BlogAdminForm({ initialData, onSubmit, onCancel, token }: any) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [read, setRead] = useState(initialData?.read || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [quote, setQuote] = useState(initialData?.quote || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState(initialData?.image || "");
  const [takeaways, setTakeaways] = useState<string[]>(initialData?.takeaways || []);
  const [sections, setSections] = useState<any[]>(initialData?.sections || []);
  const [sectionImages, setSectionImages] = useState<Record<number, File | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let imageUrl = existingImage;

    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);
        const res = await fetch("http://localhost:8080/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          imageUrl = data.url;
        } else {
          alert("Image upload failed");
          setIsSubmitting(false);
          return;
        }
      }

      const processedSections = [...sections];
      for (let i = 0; i < processedSections.length; i++) {
        if (sectionImages[i]) {
          const formData = new FormData();
          formData.append("image", sectionImages[i] as File);
          const res = await fetch("http://localhost:8080/api/upload", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          });
          const data = await res.json();
          if (data.success) {
            processedSections[i].image = data.url;
          }
        }
      }

      const payload = {
        title,
        metaTitle,
        metaDescription,
        category,
        date,
        read,
        content,
        quote,
        image: imageUrl,
        takeaways,
        sections: processedSections,
      };

      await onSubmit(payload);
    } catch (error) {
      console.error(error);
      alert("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTakeaway = () => setTakeaways([...takeaways, ""]);
  const updateTakeaway = (i: number, val: string) => {
    const newT = [...takeaways];
    newT[i] = val;
    setTakeaways(newT);
  };
  const removeTakeaway = (i: number) => setTakeaways(takeaways.filter((_, idx) => idx !== i));

  const addSection = () => setSections([...sections, { title: "", paragraphs: [""] }]);
  const updateSectionTitle = (i: number, val: string) => {
    const newS = [...sections];
    newS[i].title = val;
    setSections(newS);
  };
  const addParagraph = (sIdx: number) => {
    const newS = [...sections];
    newS[sIdx].paragraphs.push("");
    setSections(newS);
  };
  const updateParagraph = (sIdx: number, pIdx: number, val: string) => {
    const newS = [...sections];
    newS[sIdx].paragraphs[pIdx] = val;
    setSections(newS);
  };
  const removeParagraph = (sIdx: number, pIdx: number) => {
    const newS = [...sections];
    newS[sIdx].paragraphs = newS[sIdx].paragraphs.filter((_:any, idx:number) => idx !== pIdx);
    setSections(newS);
  };
  const removeSection = (i: number) => setSections(sections.filter((_, idx) => idx !== i));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h4 className="font-bold text-lg">Basic Info</h4>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Title" className="w-full px-4 py-2 border rounded-xl" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground ml-1">Meta Title (SEO)</label>
            <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="SEO Title (Optional, defaults to Blog Title)" className="w-full px-4 py-2 border rounded-xl text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground ml-1">Meta Description (SEO)</label>
            <input value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="SEO Description (Optional, defaults to intro)" className="w-full px-4 py-2 border rounded-xl text-sm" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input required value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full px-4 py-2 border rounded-xl" />
          <input required type="text" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date (e.g. Feb 2025)" className="w-full px-4 py-2 border rounded-xl" />
        </div>
        <input required value={read} onChange={(e) => setRead(e.target.value)} placeholder="Read Time (e.g. 5 min read)" className="w-full px-4 py-2 border rounded-xl" />
        
        <div>
          <label className="block text-sm font-medium mb-1">Image (Optional if editing)</label>
          {existingImage && <img src={existingImage} className="w-32 h-20 object-cover rounded-lg mb-2" alt="Preview" />}
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full px-4 py-2 border rounded-xl" />
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        <h4 className="font-bold text-lg">Introduction & Quote</h4>
        <textarea required value={content} onChange={(e) => setContent(e.target.value)} placeholder="Introduction Content" rows={4} className="w-full px-4 py-2 border rounded-xl resize-none"></textarea>
        <textarea value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="Featured Quote (Optional)" rows={2} className="w-full px-4 py-2 border rounded-xl resize-none"></textarea>
      </div>

      <div className="space-y-4 border-t pt-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-lg">Sections</h4>
          <button type="button" onClick={addSection} className="text-sm bg-secondary px-3 py-1 rounded-full">+ Add Section</button>
        </div>
        {sections.map((section, sIdx) => (
          <div key={sIdx} className="border p-4 rounded-xl space-y-3 bg-slate-50 relative">
            <button type="button" onClick={() => removeSection(sIdx)} className="absolute top-4 right-4 text-red-500"><Trash2 className="w-4 h-4"/></button>
            <div className="flex flex-col gap-2">
              <input required value={section.title} onChange={(e) => updateSectionTitle(sIdx, e.target.value)} placeholder={`Section ${sIdx + 1} Title`} className="w-full px-4 py-2 border rounded-lg font-bold" />
              <div>
                 <label className="block text-xs font-medium text-muted-foreground mb-1">Section Image (Optional)</label>
                 {section.image && !sectionImages[sIdx] && <img src={section.image} className="h-16 w-32 object-cover rounded mb-2" alt="Preview" />}
                 <input type="file" accept="image/*" onChange={(e) => setSectionImages({...sectionImages, [sIdx]: e.target.files?.[0] || null})} className="w-full px-3 py-1.5 border rounded-lg text-sm bg-white" />
              </div>
            </div>
            <div className="space-y-3 pl-4 border-l-2 border-primary/20">
              {section.paragraphs.map((p:string, pIdx:number) => (
                <div key={pIdx} className="flex gap-3">
                  <textarea required value={p} onChange={(e) => updateParagraph(sIdx, pIdx, e.target.value)} placeholder="Paragraph text..." rows={5} className="w-full px-4 py-3 border rounded-xl resize-y text-base"></textarea>
                  <button type="button" onClick={() => removeParagraph(sIdx, pIdx)} className="text-red-400 p-2 hover:bg-red-50 rounded-lg h-fit"><Trash2 className="w-5 h-5"/></button>
                </div>
              ))}
              <button type="button" onClick={() => addParagraph(sIdx)} className="text-xs text-primary font-bold">+ Add Paragraph</button>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 border-t pt-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-lg">Takeaways</h4>
          <button type="button" onClick={addTakeaway} className="text-sm bg-secondary px-3 py-1 rounded-full">+ Add Takeaway</button>
        </div>
        {takeaways.map((t, tIdx) => (
          <div key={tIdx} className="flex gap-2">
            <input required value={t} onChange={(e) => updateTakeaway(tIdx, e.target.value)} placeholder="Takeaway point..." className="w-full px-4 py-2 border rounded-xl" />
            <button type="button" onClick={() => removeTakeaway(tIdx)} className="text-red-400 p-2"><Trash2 className="w-5 h-5"/></button>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-6 border-t">
        <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold disabled:opacity-50">
          {isSubmitting ? "Saving..." : initialData ? 'Update Blog' : 'Add Blog'}
        </button>
        {initialData && <button type="button" onClick={onCancel} className="py-3 px-4 bg-gray-200 rounded-xl font-bold text-gray-700">Cancel</button>}
      </div>
    </form>
  );
}
