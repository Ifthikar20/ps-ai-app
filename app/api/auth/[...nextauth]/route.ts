// import { authConfig } from "@/lib/auth";
// import NextAuth from "next-auth/next";

// const handler = NextAuth(authConfig);

// export { handler as GET, handler as POST };

import {handlers} from "@/lib/auth"

export const {GET, POST}=handlers;