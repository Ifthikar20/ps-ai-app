// app/api/auth/google/route.ts
import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';

const REDIRECT_URI = 'http://localhost:3000/api/auth/google/callback';

console.log('Using credentials:', {
  clientId: process.env.AUTH_GOOGLE_ID,
  redirectUri: REDIRECT_URI
});

const client = new OAuth2Client(
  process.env.AUTH_GOOGLE_ID,
  process.env.AUTH_GOOGLE_SECRET,
  REDIRECT_URI
);

export async function GET(request: Request) {
  try {
    const authUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ],
      include_granted_scopes: true,
      prompt: 'consent'
    });

    console.log('Generated auth URL:', authUrl);
    return NextResponse.redirect(new URL(authUrl));
  } catch (error) {
    console.error('Error in Google OAuth route:', error);
    return NextResponse.redirect(new URL('/signin?error=auth_error', request.url));
  }
}