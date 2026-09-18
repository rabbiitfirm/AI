"use server";

import { db } from "@/lib/db";
import { boards } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBoard(data: { name: string; description?: string; color?: string; category?: string }) {
  await db.insert(boards).values({
    name: data.name,
    description: data.description,
    color: data.color,
    category: data.category,
  });
  revalidatePath("/dashboard");
}

export async function getBoards() {
  return await db.select().from(boards);
}
