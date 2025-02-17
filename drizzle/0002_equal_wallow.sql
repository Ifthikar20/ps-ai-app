CREATE TABLE `payments` (
	`id` text PRIMARY KEY DEFAULT (hex(randomblob(16))) NOT NULL,
	`amount` integer NOT NULL,
	`status` text(20) NOT NULL,
	`stripe_payment_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`refunded_at` text,
	`user_email` text,
	`price_id` text
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY DEFAULT (hex(randomblob(16))) NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `scores` (
	`id` text PRIMARY KEY DEFAULT (hex(randomblob(16))) NOT NULL,
	`user_id` text NOT NULL,
	`experience_level` text(50) NOT NULL,
	`experience_percentage` real NOT NULL,
	`accuracy_per_quiz` real NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY DEFAULT (hex(randomblob(16))) NOT NULL,
	`user_id` text,
	`full_name` text(100),
	`email` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP,
	`customer_id` text,
	`price_id` text,
	`status` text,
	`avatar` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);