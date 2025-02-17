import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// AI Output Table (Existing)
export const AIOutput = sqliteTable("aiOutput", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  formData: text("formData").notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: text("templateSlug").notNull(),
  createdBy: text("createdBy").notNull(),
  createdAt: text("createdAt"),
});

// Users Table
export const users = sqliteTable("users", {
  id: text("id").primaryKey().default(sql`(hex(randomblob(16)))`), // UUID
  userId: text("user_id").unique(), // Ensuring uniqueness if this is meant to be unique
  fullName: text("full_name", { length: 100 }),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // ✅ NEW: Password field for authentication
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  customerId: text("customer_id"),
  priceId: text("price_id"),
  status: text("status"),
  avatar: text("avatar"),
});

// Payments Table
export const payments = sqliteTable("payments", {
  id: text("id").primaryKey().default(sql`(hex(randomblob(16)))`), // UUID
  amount: integer("amount").notNull(),
  status: text("status", { length: 20 }).notNull(),
  stripePaymentId: text("stripe_payment_id").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  refundedAt: text("refunded_at"),
  userEmail: text("user_email"),
  priceId: text("price_id"),
});

// Posts Table
export const posts = sqliteTable("posts", {
  id: text("id").primaryKey().default(sql`(hex(randomblob(16)))`), // UUID
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Scores Table
export const scores = sqliteTable("scores", {
  id: text("id").primaryKey().default(sql`(hex(randomblob(16)))`), // UUID
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // Foreign key to users
  experienceLevel: text("experience_level", { length: 50 }).notNull(),
  experiencePercentage: real("experience_percentage").notNull(),
  accuracyPerQuiz: real("accuracy_per_quiz").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
