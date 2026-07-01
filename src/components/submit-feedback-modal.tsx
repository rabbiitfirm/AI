"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Category } from "@/lib/feedback-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function SubmitFeedbackModal({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (d: { title: string; description: string; category: Category }) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Feature");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, category });
    setTitle("");
    setDescription("");
    setCategory("Feature");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Give your feedback a concise title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="h-32"
              placeholder="Tell us more about your feedback..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="flex flex-wrap gap-2">
              {(["Feature", "Bug", "UX", "Performance"] as Category[]).map(
                (c) => (
                  <Button
                    key={c}
                    type="button"
                    variant={category === c ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </Button>
                )
              )}
            </div>
          </div>
          <Button type="submit" className="w-full py-6 text-base">
            <Send size={16} /> Submit Feedback
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
