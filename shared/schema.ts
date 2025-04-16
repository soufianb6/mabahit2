import { pgTable, text, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  description: true,
  icon: true,
  color: true,
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  abstract: text("abstract").notNull(),
  content: text("content").notNull(),
  authors: text("authors").notNull(),
  publishDate: timestamp("publish_date").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  pdfUrl: text("pdf_url").notNull(),
});

export const insertArticleSchema = createInsertSchema(articles).pick({
  title: true,
  abstract: true,
  content: true,
  authors: true,
  publishDate: true,
  categoryId: true,
  pdfUrl: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;
