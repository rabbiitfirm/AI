"use server";

import { db } from "@/lib/db";
import { feedbackItems, votes } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function submitFeedback(data: { boardId: number; title: string; description: string; category?: string }) {
  await db.insert(feedbackItems).values({
    boardId: data.boardId,
    title: data.title,
    description: data.description,
    category: data.category,
  });
  revalidatePath("/");
}

export async function upvoteFeedback(feedbackItemId: number, userId: string) {
  const existingVote = await db.select().from(votes).where(
    and(
      eq(votes.feedbackItemId, feedbackItemId),
      eq(votes.userId, userId)
    )
  );

  if (existingVote.length > 0) {
    await db.delete(votes).where(
      and(
        eq(votes.feedbackItemId, feedbackItemId),
        eq(votes.userId, userId)
      )
    );
    await db.update(feedbackItems)
      .set({ upvotes: sql`${feedbackItems.upvotes} - 1` })
      .where(eq(feedbackItems.id, feedbackItemId));
  } else {
    await db.insert(votes).values({ feedbackItemId, userId });
    await db.update(feedbackItems)
      .set({ upvotes: sql`${feedbackItems.upvotes} + 1` })
      .where(eq(feedbackItems.id, feedbackItemId));
  }
  revalidatePath("/");
}

export async function getFeedback(boardId: number) {
  return await db.select().from(feedbackItems).where(eq(feedbackItems.boardId, boardId)).orderBy(sql`${feedbackItems.upvotes} DESC`);
}
