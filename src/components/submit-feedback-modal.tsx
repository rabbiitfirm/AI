"use client";

import { useState, useId } from "react";
import { X, Send } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export interface SubmitFeedbackData {
  title: string;
  description: string;
  category: Category;
}

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (d: SubmitFeedbackData) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const titleId = useId();
  const descriptionId = useId();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Submit Feedback</h2>
          <button onClick={onClose} aria-label="Close modal" className="p-1 rounded-md hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"><X size={20}/></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit({ title, description, category }); onClose(); }} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor={titleId} className="block text-sm font-medium text-left">Title <span className="text-red-500">*</span></label>
            <input id={titleId} className="w-full p-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <label htmlFor={descriptionId} className="block text-sm font-medium text-left">Description <span className="text-red-500">*</span></label>
            <textarea id={descriptionId} className="w-full p-2 border rounded-lg h-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <div className="space-y-1">
            <span className="block text-sm font-medium text-left">Category</span>
            <div role="radiogroup" aria-label="Category" className="flex gap-2">
              {(["Feature", "Bug", "UX", "Performance"] as Category[]).map(c => (
                <button key={c} type="button" role="radio" aria-checked={category === c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 ${category === c ? "bg-neutral-900 text-white border-neutral-900" : "hover:bg-neutral-100"}`}>{c}</button>
              ))}
            </div>
          </div>
          <button type="submit" className="w-full py-3 bg-neutral-900 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"><Send size={16}/> Submit</button>
        </form>
      </div>
    </div>
  );
}
