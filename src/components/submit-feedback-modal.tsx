"use client";

import { useState, useId } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";
import { Label } from "@/components/ui/label";

interface SubmitFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (d: { title: string; description: string; category: Category }) => Promise<void> | void;
}

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: SubmitFeedbackModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await onSubmit({ title, description, category });
      setTitle(""); setDescription(""); setCategory("Feature");
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
          <button onClick={onClose} aria-label="Close modal"><X size={20}/></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor={titleId}>Title</Label>
            <input id={titleId} className="w-full p-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={descriptionId}>Description</Label>
            <textarea id={descriptionId} className="w-full p-2 border rounded-lg h-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div className="flex gap-2" role="radiogroup" aria-label="Category">
            {(["Feature", "Bug", "UX", "Performance"] as const).map(c => (
              <button key={c} type="button" role="radio" aria-checked={category === c} disabled={isSubmitting} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${category === c ? "bg-slate-900 text-white border-slate-900" : "hover:bg-slate-100"}`}>{c}</button>
            ))}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 disabled:opacity-50">
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16}/>}
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
