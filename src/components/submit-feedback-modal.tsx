"use client";

import { useState, useId } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export interface SubmitFeedbackData {
  title: string;
  description: string;
  category: Category;
}

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
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Submit Feedback</h2>
          <button onClick={onClose} aria-label="Close dialog" type="button"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={titleId} className="block text-sm font-medium mb-1">Title</label>
            <input id={titleId} className="w-full p-2 border rounded-lg" placeholder="Feedback title" value={title} onChange={e => setTitle(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div>
            <label htmlFor={descId} className="block text-sm font-medium mb-1">Description</label>
            <textarea id={descId} className="w-full p-2 border rounded-lg h-32" placeholder="Provide details..." value={description} onChange={e => setDescription(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div role="radiogroup" aria-label="Category" className="flex gap-2">
            {(["Feature", "Bug", "UX", "Performance"] as Category[]).map(c => (
              <button key={c} type="button" role="radio" aria-checked={category === c} onClick={() => setCategory(c)} disabled={isSubmitting} className={`px-3 py-1 rounded-full border text-sm ${category === c ? "bg-primary text-white" : ""}`}>{c}</button>
            ))}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-primary text-white rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16}/>}
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
