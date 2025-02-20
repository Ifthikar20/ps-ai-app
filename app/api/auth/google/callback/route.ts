// app/api/auth/google/callback/route.ts
import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { createSession } from '@/lib/auth';

const REDIRECT_URI = 'http://localhost:3000/api/auth/google/callback';

const client = new OAuth2Client(
  process.env.AUTH_GOOGLE_ID,
  process.env.AUTH_GOOGLE_SECRET,
  REDIRECT_URI
);

export async function GET(request: Request) {
  console.log('Callback received at:', request.url);
  
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    console.error('Google OAuth error:', error);
    return NextResponse.redirect(
      new URL(`/signin?error=${error}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(new URL('/signin?error=no_code', request.url));
  }

  try {
    console.log('Attempting to exchange code for tokens...');
    const { tokens } = await client.getToken(code);
    console.log('Tokens received successfully');
    
    client.setCredentials(tokens);

    const userinfo = await client.request({
      url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    });

    console.log('User info received:', userinfo.data);

    const userData = userinfo.data as {
      email: string;
      name: string;
      picture: string;
      id: string;
    };

    await createSession({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      image: userData.picture,
    });

    return NextResponse.redirect(new URL('/dashboard', request.url));
  } catch (error: any) {
    console.error('Detailed callback error:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    return NextResponse.redirect(
      new URL(`/signin?error=auth_error&message=${encodeURIComponent(error.message)}`, request.url)
    );
  }
}