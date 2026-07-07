"use client";

import { useState } from "react";
import { X, Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface SubmitFeedbackData {
  title: string;
  description: string;
  category: Category;
}

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (d: SubmitFeedbackData) => Promise<void> | void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const [pending, setPending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setPending(true);
    try { await onSubmit({ title, description, category }); setTitle(""); setDescription(""); onClose(); }
    finally { setPending(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Submit Feedback</h2>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
            <X size={20}/>
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="What should we improve?" value={title} onChange={e => setTitle(e.target.value)} required disabled={pending} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" className="h-32" placeholder="Tell us more about your feedback..." value={description} onChange={e => setDescription(e.target.value)} required disabled={pending} />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex gap-2">
              {["Feature", "Bug", "UX", "Performance"].map(c => (
                <button key={c} type="button" onClick={() => setCategory(c as Category)} disabled={pending} className={`px-3 py-1 rounded-full border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${category === c ? "bg-primary text-white border-primary" : "hover:bg-gray-50 text-muted-foreground"}`}>{c}</button>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full py-6" disabled={pending}>
            {pending ? <Loader2 className="animate-spin" size={16}/> : <Send size={16}/>} Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
