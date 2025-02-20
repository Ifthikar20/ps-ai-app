import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Define the expected structure of the user response
interface UserData {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Authorization code missing" }, { status: 400 });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: process.env.REDIRECT_URI!,
        grant_type: "authorization_code",
        code,
      }),
    });

    const tokenData: { access_token: string } = await tokenResponse.json(); // Type assertion

    if (!tokenData.access_token) {
      return NextResponse.json({ error: "Failed to obtain access token" }, { status: 400 });
    }

    // Fetch user info using access token
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData: UserData = await userResponse.json(); // ✅ Type assertion

    if (!userData.email) {
      return NextResponse.json({ error: "Failed to retrieve user data" }, { status: 400 });
    }

    // Generate JWT token for session management
    const token = jwt.sign(
      { id: userData.sub, email: userData.email, name: userData.name, picture: userData.picture },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Set session cookie
    const response = NextResponse.redirect("/");
    response.cookies.set(process.env.SESSION_COOKIE_NAME!, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("OAuth Callback Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
