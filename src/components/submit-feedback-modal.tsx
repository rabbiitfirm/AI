"use client";

import { useState, useId } from "react";
import { X, Send } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export interface SubmitFeedbackData {
  title: string;
  description: string;
  category: Category;
}

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (d: SubmitFeedbackData) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const titleId = useId();
  const descId = useId();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div role="dialog" aria-modal="true" aria-labelledby="modal-title" className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-xl font-bold">Submit Feedback</h2>
          <button type="button" onClick={onClose} aria-label="Close modal" className="p-1 rounded-md hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={20}/></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit({ title, description, category }); onClose(); }} className="space-y-4">
          <div>
            <label htmlFor={titleId} className="block text-sm font-medium mb-1">Title</label>
            <input id={titleId} className="w-full p-2 border rounded-lg" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label htmlFor={descId} className="block text-sm font-medium mb-1">Description</label>
            <textarea id={descId} className="w-full p-2 border rounded-lg h-32" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          <fieldset>
            <legend className="text-sm font-medium mb-1">Category</legend>
            <div role="radiogroup" aria-label="Category" className="flex gap-2">
              {(["Feature", "Bug", "UX", "Performance"] as Category[]).map(c => (
                <button key={c} type="button" role="radio" aria-checked={category === c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full border text-sm ${category === c ? "bg-primary text-white" : ""}`}>{c}</button>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl flex items-center justify-center gap-2"><Send size={16}/> Submit</button>
        </form>
      </div>
    </div>
  );
}
