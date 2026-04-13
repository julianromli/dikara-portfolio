CREATE TABLE `hero_portraits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`alt` text NOT NULL,
	`image_url` text NOT NULL,
	`hover_image_url` text NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
