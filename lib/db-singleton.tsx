import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/utils/schema";

console.log("Checking environment DB:", process.env.DB);

if (!process.env.DB) {
  throw new Error("❌ ERROR: Database connection is undefined. Check your Cloudflare D1 bindings.");
}

// Define a local singleton store
const globalForDb = globalThis as unknown as { drizzleDb?: ReturnType<typeof drizzle> };

let db: ReturnType<typeof drizzle>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(process.env.DB, { schema });
} else {
  if (!globalForDb.drizzleDb) {
    globalForDb.drizzleDb = drizzle(process.env.DB, { schema });
  }
  db = globalForDb.drizzleDb;
}

console.log("✅ Database initialized:", db);

export { db };
