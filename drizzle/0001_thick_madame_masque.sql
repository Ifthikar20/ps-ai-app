ALTER TABLE `users` RENAME TO `aiOutput`;--> statement-breakpoint
DROP INDEX `users_email_unique`;--> statement-breakpoint
ALTER TABLE `aiOutput` ADD `formData` text NOT NULL;--> statement-breakpoint
ALTER TABLE `aiOutput` ADD `aiResponse` text;--> statement-breakpoint
ALTER TABLE `aiOutput` ADD `templateSlug` text NOT NULL;--> statement-breakpoint
ALTER TABLE `aiOutput` ADD `createdBy` text NOT NULL;--> statement-breakpoint
ALTER TABLE `aiOutput` ADD `createdAt` text;--> statement-breakpoint
ALTER TABLE `aiOutput` DROP COLUMN `name`;--> statement-breakpoint
ALTER TABLE `aiOutput` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `aiOutput` DROP COLUMN `created_at`;