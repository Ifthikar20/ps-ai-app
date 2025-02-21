import { NextResponse } from "next/server";
import { createSession } from "@/lib/auth";

export const runtime = "edge"; // ✅ Ensure Edge Runtime is explicitly set

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/signin?error=${error}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/signin?error=no_code", request.url));
  }

  try {
    // Fetch user info from Google
    const userResponse = await fetch(`${request.url.split("/api")[0]}/api/auth/google-auth?action=get-user&code=${code}`);
    if (!userResponse.ok) throw new Error("Failed to fetch user info");

    const userData = (await userResponse.json()) as {
      id: string;
      email: string;
      name: string;
      picture?: string;
    };

    // Create session for the user
    await createSession({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      image: userData.picture ?? null,
    });

    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error: unknown) {
    console.error("OAuth callback error:", error);

    return NextResponse.redirect(
      new URL(`/signin?error=auth_error&message=${encodeURIComponent(error instanceof Error ? error.message : "Unknown error")}`, request.url)
    );
  }
}
