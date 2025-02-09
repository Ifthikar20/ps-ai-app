import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// Debugging: Log database connection
console.log("Checking environment DB:", process.env.DB);

if (!process.env.DB) {
  throw new Error("❌ ERROR: Database connection is undefined. Check your Cloudflare D1 bindings.");
}

// Initialize Drizzle ORM with Cloudflare D1
export const db = drizzle(process.env.DB, { schema });

// Debugging: Confirm db instance
console.log("✅ Database initialized:", db);
