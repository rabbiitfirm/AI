"use client";

import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";

interface SubmitFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; category: Category }) => Promise<void>;
}

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: SubmitFeedbackModalProps) {
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
          <button onClick={onClose} aria-label="Close modal"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-2 border rounded-lg" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required aria-label="Title" disabled={isSubmitting} />
          <textarea className="w-full p-2 border rounded-lg h-32" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required aria-label="Description" disabled={isSubmitting} />
          <div className="flex gap-2" role="radiogroup" aria-label="Category">
            {["Feature", "Bug", "UX", "Performance"].map(c => (
              <button key={c} type="button" onClick={() => setCategory(c as Category)} className={`px-3 py-1 rounded-full border text-sm ${category === c ? "bg-primary text-white" : ""}`} role="radio" aria-checked={category === c} disabled={isSubmitting}>{c}</button>
            ))}
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl flex items-center justify-center gap-2" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16}/>}
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
