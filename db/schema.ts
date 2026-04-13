import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({autoIncrement: true}),
  title: text('title').notNull(),
  imageUrl: text('image_url').notNull(),
  description: text('description').notNull().default(''),
  category: text('category').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', {mode: 'timestamp_ms'}).notNull(),
  updatedAt: integer('updated_at', {mode: 'timestamp_ms'}).notNull(),
});

export const heroPortraits = sqliteTable('hero_portraits', {
  id: integer('id').primaryKey({autoIncrement: true}),
  alt: text('alt').notNull(),
  imageUrl: text('image_url').notNull(),
  hoverImageUrl: text('hover_image_url').notNull(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: integer('created_at', {mode: 'timestamp_ms'}).notNull(),
  updatedAt: integer('updated_at', {mode: 'timestamp_ms'}).notNull(),
});
