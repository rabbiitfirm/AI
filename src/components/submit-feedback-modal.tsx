"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export function SubmitFeedbackModal({
  isOpen, onClose, onSubmit
}: {
  isOpen: boolean; onClose: () => void; onSubmit: (d: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Submit Feedback</h2>
          <button onClick={onClose} aria-label="Close modal"><X size={20}/></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit({ title, description, category }); onClose(); }} className="space-y-4">
          <input className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Title" aria-label="Feedback title" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-primary outline-none" placeholder="Description" aria-label="Feedback description" value={description} onChange={e => setDescription(e.target.value)} required />
          <fieldset className="border-none p-0 m-0">
            <legend className="text-sm font-medium mb-2">Category</legend>
            <div className="flex gap-2">
              {["Feature", "Bug", "UX", "Performance"].map(c => (
                <button key={c} type="button" onClick={() => setCategory(c as Category)} aria-pressed={category === c} className={`px-3 py-1 rounded-full border text-sm transition-colors ${category === c ? "bg-primary text-white border-primary" : "hover:bg-muted"}`}>{c}</button>
              ))}
            </div>
          </fieldset>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"><Send size={16}/> Submit</button>
        </form>
      </div>
    </div>
  );
}
