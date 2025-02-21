import { NextResponse } from "next/server";

export const runtime = "edge";

const CLIENT_ID = process.env.AUTH_GOOGLE_ID!;
const CLIENT_SECRET = process.env.AUTH_GOOGLE_SECRET!;
const REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";
const AUTH_URL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;

// Define the expected token response type
interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token?: string;
  id_token?: string;
}

// Define the expected user response type
interface GoogleUserResponse {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");
  const code = searchParams.get("code");

  if (action === "generate-url") {
    return NextResponse.json({ authUrl: AUTH_URL });
  } else if (action === "get-user" && code) {
    try {
      const user = await getGoogleUserFromCode(code);
      return NextResponse.json(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      return NextResponse.json({ error: "Failed to fetch user data" }, { status: 400 });
    }
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

async function getGoogleUserFromCode(code: string): Promise<GoogleUserResponse> {
  // Exchange authorization code for tokens
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    throw new Error("Failed to exchange authorization code for tokens.");
  }

  // ✅ Use explicit `as` assertion and validate response format
  const tokenData = (await tokenResponse.json()) as unknown as GoogleTokenResponse;

  if (!tokenData.access_token) {
    throw new Error("Invalid token response from Google.");
  }

  // Fetch user profile data
  const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!userResponse.ok) {
    throw new Error("Failed to fetch user information.");
  }

  // ✅ Use explicit `as` assertion and validate response format
  const userData = (await userResponse.json()) as unknown as GoogleUserResponse;

  if (!userData.id || !userData.email) {
    throw new Error("Invalid user data received from Google.");
  }

  return userData;
}
