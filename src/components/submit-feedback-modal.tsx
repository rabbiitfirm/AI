"use client";

import { useState, useId } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export interface SubmitFeedbackData {
  title: string;
  description: string;
  category: Category;
}

interface SubmitFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubmitFeedbackData) => Promise<void> | void;
}

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: SubmitFeedbackModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleId = useId();
  const descId = useId();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
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
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-xl font-bold text-gray-900">Submit Feedback</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 transition-colors"
          >
            <X size={20}/>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={titleId} className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id={titleId}
              className="w-full p-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 text-gray-900"
              placeholder="e.g. Add dark mode support"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor={descId} className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id={descId}
              className="w-full p-2 border rounded-lg h-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 text-gray-900"
              placeholder="Describe the feedback or feature request..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <span id="category-label" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </span>
            <div role="radiogroup" aria-labelledby="category-label" className="flex gap-2">
              {(["Feature", "Bug", "UX", "Performance"] as Category[]).map(c => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={category === c}
                  onClick={() => setCategory(c)}
                  disabled={isSubmitting}
                  className={`px-3 py-1 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    category === c ? "bg-slate-900 text-white font-medium" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send size={16}/> Submit Feedback
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
