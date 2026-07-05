"use client";

import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SubmitData {
  title: string;
  description: string;
  category: Category;
}

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (d: SubmitData) => Promise<void> | void }) {
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
      setTitle(""); setDescription(""); setCategory("Feature");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories: Category[] = ["Feature", "Bug", "UX", "Performance"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 id="modal-title" className="text-xl font-bold">Submit Feedback</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal"><X size={20}/></Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" className="h-32" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required disabled={isSubmitting} />
          </div>
          <div className="flex gap-2">
            {categories.map(c => (
              <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category === c} className={`px-3 py-1 rounded-full border text-sm transition-colors ${category === c ? "bg-primary text-white" : ""}`} disabled={isSubmitting}>{c}</button>
            ))}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </div>
    </div>
  );
}
