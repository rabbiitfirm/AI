"use client";

import { useState, useId } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";

export interface SubmitFeedbackData {
  title: string;
  description: string;
  category: Category;
}

export function SubmitFeedbackModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (d: SubmitFeedbackData) => Promise<void> | void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleId = useId();
  const descriptionId = useId();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="submit-feedback-title"
    >
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 id="submit-feedback-title" className="text-xl font-bold text-gray-900">
            Submit Feedback
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 text-gray-500 hover:text-gray-700 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            disabled={isSubmitting}
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={titleId} className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id={titleId}
              className="w-full p-2 border rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 text-gray-900"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor={descriptionId} className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id={descriptionId}
              className="w-full p-2 border rounded-lg h-32 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 text-gray-900"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">Category</span>
            <div role="radiogroup" aria-label="Category" className="flex gap-2">
              {(["Feature", "Bug", "UX", "Performance"] as Category[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="radio"
                  aria-checked={category === c}
                  onClick={() => setCategory(c)}
                  disabled={isSubmitting}
                  className={`px-3 py-1 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    category === c ? "bg-slate-900 text-white border-slate-900" : "bg-white text-gray-700 hover:bg-gray-50"
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
            className="w-full py-3 bg-slate-900 text-white rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Submitting...
              </>
            ) : (
              <>
                <Send size={16} /> Submit
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
