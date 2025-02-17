import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/utils/schema";

// Debugging: Log database connection
console.log("Checking environment DB:", process.env.DB);

if (!process.env.DB) {
  throw new Error("❌ ERROR: Database connection is undefined. Check your Cloudflare D1 bindings.");
}

declare global {
  var drizzleDb: ReturnType<typeof drizzle> | undefined;
}

let db: ReturnType<typeof drizzle>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(process.env.DB, { schema });
} else {
  if (!global.drizzleDb) {
    global.drizzleDb = drizzle(process.env.DB, { schema });
  }
  db = global.drizzleDb;
}

// Debugging: Confirm db instance
console.log("✅ Database initialized:", db);

export { db };
