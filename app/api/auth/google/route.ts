import { NextResponse } from "next/server";

export const runtime = "edge";

// Define expected response type
interface AuthResponse {
  authUrl: string;
}

export async function GET(request: Request) {
  const response = await fetch(`${request.url.split("/api")[0]}/api/auth/google-auth?action=generate-url`);
  
  // Type assertion for response JSON
  const data = (await response.json()) as AuthResponse;

  if (!data.authUrl) {
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 });
  }

  return NextResponse.redirect(new URL(data.authUrl));
}
