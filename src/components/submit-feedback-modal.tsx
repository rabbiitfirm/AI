"use client";

import { useState, useId } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export interface SubmitFeedbackData { title: string; description: string; category: Category; }

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (d: SubmitFeedbackData) => Promise<void> | void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();
  const descId = useId();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ title, description, category });
      setTitle(""); setDescription(""); onClose();
    } finally { setIsSubmitting(false); }
  };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="submit-modal-title" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 id="submit-modal-title" className="text-xl font-bold text-slate-900">Submit Feedback</h2>
          <button type="button" onClick={onClose} aria-label="Close modal" className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={titleId} className="block text-sm font-medium text-slate-700 mb-1">Title <span className="text-red-500">*</span></label>
            <input id={titleId} className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label htmlFor={descId} className="block text-sm font-medium text-slate-700 mb-1">Description <span className="text-red-500">*</span></label>
            <textarea id={descId} className="w-full p-2 border border-slate-300 rounded-lg h-32 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div role="radiogroup" aria-label="Category" className="flex gap-2">
            {(["Feature", "Bug", "UX", "Performance"] as Category[]).map(c => (
              <button key={c} type="button" role="radio" aria-checked={category === c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${category === c ? "bg-slate-900 text-white border-slate-900" : "border-slate-300 text-slate-700 hover:bg-slate-50"}`}>{c}</button>
            ))}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 disabled:opacity-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900">
            {isSubmitting ? <Loader2 size={16} className="animate-spin"/> : <Send size={16}/>}
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
