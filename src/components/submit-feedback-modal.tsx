"use client";

import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; category: Category }) => Promise<void> | void;
}) {
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
          <button onClick={onClose} aria-label="Close modal" className="p-1 hover:bg-muted rounded-md transition-colors">
            <X size={20}/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            aria-label="Feedback title"
          />
          <textarea
            className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-primary outline-none"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            aria-label="Feedback description"
          />
          <div className="flex gap-2" role="group" aria-label="Select category">
            {(["Feature", "Bug", "UX", "Performance"] as Category[]).map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                className={`px-3 py-1 rounded-full border text-sm transition-all ${category === c ? "bg-primary text-white" : "hover:bg-muted"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-white rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16}/>}
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
