"use client";

import { ChevronUp } from "lucide-react";
import {
  FeedbackItem,
  STATUS_CONFIG,
  CATEGORY_CONFIG,
} from "@/lib/feedback-data";

export function FeedbackCard({ item, onUpvote }: { item: FeedbackItem; onUpvote: () => void }) {
  const status = STATUS_CONFIG[item.status];
  const category = CATEGORY_CONFIG[item.category];

  return (
    <article className="flex items-start gap-4 bg-white border border-border rounded-xl p-5 hover:shadow-md transition-all text-foreground">
      <button
        onClick={onUpvote}
        aria-label={item.upvotedByUser ? "Remove upvote" : "Upvote"}
        aria-pressed={item.upvotedByUser}
        className={`flex flex-col items-center justify-center gap-0.5 min-w-[52px] py-2 rounded-lg border transition-all ${
          item.upvotedByUser ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:border-primary"
        }`}
      >
        <ChevronUp size={16} />
        <span className="text-sm font-bold">{item.upvotes}</span>
      </button>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold mb-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        <div className="flex gap-2">
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${category.bg} ${category.color}`}>{item.category}</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>{status.label}</span>
        </div>
      </div>
    </article>
  );
}
