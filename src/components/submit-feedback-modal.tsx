"use client";

import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (d: any) => Promise<void> | void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ title, description, category });
      setTitle("");
      setDescription("");
      setCategory("Feature");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-xl font-bold">Submit Feedback</h2>
          <button onClick={onClose} aria-label="Close modal" className="hover:bg-muted p-1 rounded-full transition-colors"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="title" className="text-sm font-medium">Title</label>
            <input id="title" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div className="space-y-1">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <textarea id="description" className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-primary outline-none" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Category</span>
            <div className="flex flex-wrap gap-2">
              {["Feature", "Bug", "UX", "Performance"].map(c => (
                <button key={c} type="button" onClick={() => setCategory(c as Category)} disabled={isSubmitting} className={`px-3 py-1 rounded-full border text-sm transition-colors ${category === c ? "bg-primary text-white border-primary" : "hover:bg-muted"}`}>{c}</button>
              ))}
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-primary text-white rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50">
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16}/>}
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
