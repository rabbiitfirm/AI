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
const CATEGORIES: Category[] = ["Feature", "Bug", "UX", "Performance"];

export function SubmitFeedbackModal({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: (d: SubmitFeedbackData) => Promise<void> | void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleId = useId(); const descId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setIsSubmitting(true);
    try {
      await onSubmit({ title, description, category });
      setTitle(""); setDescription(""); setCategory("Feature"); onClose();
    } finally { setIsSubmitting(false); }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-white text-foreground">
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
          <DialogDescription>Share your feedback or feature request with us.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2"><Label htmlFor={titleId}>Title</Label><Input id={titleId} placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
          <div className="space-y-2"><Label htmlFor={descId}>Description</Label><Textarea id={descId} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required className="h-28" /></div>
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex gap-2" role="radiogroup" aria-label="Category">
              {CATEGORIES.map((c) => (
                <button key={c} type="button" role="radio" aria-checked={category === c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full border text-sm transition-colors ${category === c ? "bg-slate-900 text-white border-slate-900" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{c}</button>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
