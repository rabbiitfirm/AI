"use client";

import { useState } from "react";
import { X, Send } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (d: any) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Submit Feedback</h2>
          <button onClick={onClose}><X size={20}/></button>
        </div>
        <form onSubmit={e => { e.preventDefault(); onSubmit({ title, description, category }); onClose(); }} className="space-y-4">
          <input className="w-full p-2 border rounded-lg" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea className="w-full p-2 border rounded-lg h-32" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
          <div className="flex gap-2">
            {["Feature", "Bug", "UX", "Performance"].map(c => (
              <button key={c} type="button" onClick={() => setCategory(c as Category)} className={`px-3 py-1 rounded-full border text-sm ${category === c ? "bg-primary text-white" : ""}`}>{c}</button>
            ))}
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl flex items-center justify-center gap-2"><Send size={16}/> Submit</button>
        </form>
      </div>
    </div>
  );
}
