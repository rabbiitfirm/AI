"use client";

import { useState, useId } from "react";
import { Send, Loader2 } from "lucide-react";
import { Category } from "@/lib/feedback-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface SubmitFeedbackData { title: string; description: string; category: Category; }

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (d: SubmitFeedbackData) => Promise<void> | void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId(), descId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ title, description, category });
      setTitle(""); setDescription(""); onClose();
    } finally { setIsSubmitting(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-card text-foreground sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogDescription className="sr-only">Provide details about your feedback.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5"><Label htmlFor={titleId}>Title</Label><Input id={titleId} placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required /></div>
          <div className="space-y-1.5"><Label htmlFor={descId}>Description</Label><Textarea id={descId} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required className="h-28" /></div>
          <div className="space-y-1.5">
            <Label id="category-label">Category</Label>
            <div role="radiogroup" aria-labelledby="category-label" className="flex gap-2">
              {(["Feature", "Bug", "UX", "Performance"] as Category[]).map(c => (
                <button key={c} type="button" role="radio" aria-checked={category === c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full border text-sm transition-colors focus-visible:ring-2 focus-visible:ring-slate-900 ${category === c ? "bg-slate-900 text-white border-slate-900" : "hover:bg-slate-100"}`}>{c}</button>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full text-white bg-slate-900 hover:bg-slate-800">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
