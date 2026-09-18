import { pgTable, serial, text, timestamp, integer, varchar, boolean } from "drizzle-orm/pg-core";

export const boards = pgTable("boards", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  color: varchar("color", { length: 50 }).default("#3B82F6"),
  category: varchar("category", { length: 100 }),
  status: varchar("status", { length: 50 }).default("active"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const feedbackItems = pgTable("feedback_items", {
  id: serial("id").primaryKey(),
  boardId: integer("board_id").references(() => boards.id).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 100 }).default("Feature"),
  status: varchar("status", { length: 50 }).default("Under Review"),
  upvotes: integer("upvotes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  feedbackItemId: integer("feedback_item_id").references(() => feedbackItems.id).notNull(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
