ALTER TABLE `users` ADD `password` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_user_id_unique` ON `users` (`user_id`);