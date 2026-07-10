"use client";

import { useState, useEffect, useCallback } from "react";
import { Zap } from "lucide-react";
import { FeedbackItem, Status } from "@/lib/feedback-data";
import { FeedbackCard } from "@/components/feedback-card";
import { StatusFilter } from "@/components/status-filter";
import { SubmitFeedbackModal, SubmitFeedbackData } from "@/components/submit-feedback-modal";
import { submitFeedback, upvoteFeedback, getFeedback } from "@/app/actions/feedback";

export function FeedbackBoard({ boardId, boardName }: { boardId: number, boardName: string }) {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [activeStatus, setActiveStatus] = useState<Status | "All">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadFeedback = useCallback(async () => {
    const data = await getFeedback(boardId);
    setItems(data as unknown as FeedbackItem[]);
  }, [boardId]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  const handleUpvote = async (id: number) => {
    await upvoteFeedback(id, "user-123");
    loadFeedback();
  };

  const handleSubmit = async (data: SubmitFeedbackData) => {
    await submitFeedback({ boardId, ...data });
    loadFeedback();
  };

  const filtered = activeStatus === "All" ? items : items.filter(i => i.status === activeStatus);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="border-b border-border bg-white sticky top-0 z-30 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold"><Zap className="text-primary"/> {boardName}</div>
          <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm">Submit Feedback</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4 py-8 flex gap-8">
        <aside className="w-56 hidden lg:block"><StatusFilter selected={activeStatus} onChange={setActiveStatus} items={items} /></aside>
        <div className="flex-1 space-y-4">
          {filtered.map(item => <FeedbackCard key={item.id} item={item} onUpvote={() => handleUpvote(item.id)} />)}
        </div>
      </main>
      <SubmitFeedbackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  );
}
