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


import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import type { Session, User, Account, Profile } from "next-auth";
import type { AdapterUser } from "next-auth/adapters"; // Needed for `user` in JWT callback

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile | undefined; // ✅ Use generic Profile instead of GoogleProfile
      user?: User | AdapterUser;
    }) {
      if (account && profile) {
        token.accessToken = account.access_token;
        token.id = profile.sub || token.sub;
        token.picture = profile.image || token.picture || ""; // ✅ Use `image` instead of `picture`
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          image: token.picture, // ✅ Now this works correctly
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const auth = NextAuth(authOptions);
