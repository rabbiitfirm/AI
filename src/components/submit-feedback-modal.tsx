"use client";

import { useState, useId } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (d: any) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId();
  const descId = useId();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit({ title, description, category });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Submit Feedback</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal"><X size={20}/></Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1"><Label htmlFor={titleId}>Title</Label>
          <Input id={titleId} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required disabled={isSubmitting} /></div>
          <div className="space-y-1"><Label htmlFor={descId}>Description</Label>
          <Textarea id={descId} className="h-32" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required disabled={isSubmitting} /></div>
          <div role="radiogroup" aria-label="Category" className="flex gap-2">
            {["Feature", "Bug", "UX", "Performance"].map(c => (
              <button key={c} type="button" role="radio" aria-checked={category === c} onClick={() => setCategory(c as Category)} disabled={isSubmitting} className={`px-3 py-1 rounded-full border text-sm transition-all focus-visible:ring-2 focus-visible:ring-primary ${category === c ? "bg-primary text-white" : "hover:border-primary"}`}>{c}</button>
            ))}
          </div>
          <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={16}/> Submit</>}
          </Button>
        </form>
      </div>
    </div>
  );
}
