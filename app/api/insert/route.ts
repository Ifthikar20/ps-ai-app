import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/utils/schema"; // ✅ Ensure correct path
import { NextResponse } from "next/server";

// ✅ Define Type for Request Body
interface InsertAIOutputRequest {
  formData: Record<string, string>; // 🔥 Fix: Ensure `formData` is an object
  aiResponse?: string | null;
  templateSlug: string;
  createdBy: string;
  createdAt?: string;
}


const dbUrl = process.env.DB;

if (!dbUrl) {
  throw new Error("❌ ERROR: Database connection is undefined. Ensure DB is set in Cloudflare.");
}

// ✅ Initialize Drizzle ORM with Cloudflare D1
const db = drizzle(dbUrl, { schema });

export const runtime = "edge"; // Required for Cloudflare

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as InsertAIOutputRequest; // ✅ Explicitly Cast `body`

    console.log("🔍 Received data:", body);

    if (!body.formData || !body.templateSlug || !body.createdBy) {
      console.error("❌ ERROR: Missing required fields", body);
      return NextResponse.json({ error: "❌ ERROR: Missing required fields." }, { status: 400 });
    }

    // ✅ Convert `formData` to a JSON string before inserting
    const result = await db.insert(schema.AIOutput).values({
      formData: JSON.stringify(body.formData), // 🔥 Fix: Convert object to JSON string
      aiResponse: body.aiResponse ?? null, // ✅ Handle optional value
      templateSlug: body.templateSlug,
      createdBy: body.createdBy,
      createdAt: body.createdAt || new Date().toISOString(),
    });

    console.log("✅ Data inserted successfully:", result);

    return NextResponse.json({ message: "✅ Data inserted successfully!", result }, { status: 200 });
  } catch (error) {
    console.error("❌ ERROR inserting data:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
