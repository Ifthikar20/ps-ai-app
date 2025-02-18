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


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Important for JWT signing
};

export const auth = NextAuth(authOptions);
