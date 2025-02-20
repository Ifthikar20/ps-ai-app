// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     Credentials({
//       credentials: {},
//       async authorize() {
//         return null; // Add logic to authenticate user here
//       },
//     }),
//   ],
// };

// export const auth = NextAuth(authOptions);
// export const { handlers, signIn, signOut } = auth;


// lib/auth.ts
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'your-secret-key');

export interface UserSession {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

// Type guard to verify the payload has the required UserSession properties
function isUserSession(payload: unknown): payload is UserSession {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'id' in payload &&
    'email' in payload &&
    'name' in payload &&
    'image' in payload &&
    typeof payload.id === 'string' &&
    typeof payload.email === 'string' &&
    (payload.name === null || typeof payload.name === 'string') &&
    (payload.image === null || typeof payload.image === 'string')
  );
}

export async function getUserSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    if (!token) return null;

    const verified = await jwtVerify(token, JWT_SECRET);
    const payload = verified.payload;

    if (!isUserSession(payload)) {
      console.error('Invalid session payload:', payload);
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Error verifying session:', error);
    return null;
  }
}

export async function createSession(user: UserSession) {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
  });

  return token;
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete('auth-token');
}