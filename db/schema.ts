import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({autoIncrement: true}),
  title: text('title').notNull(),
  imageUrl: text('image_url').notNull(),
  category: text('category').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', {mode: 'timestamp_ms'}).notNull(),
  updatedAt: integer('updated_at', {mode: 'timestamp_ms'}).notNull(),
});
