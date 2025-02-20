// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // // Define protected routes
// // // const isProtectedRoute = createRouteMatcher([
// // //   "/dashboard(.*)",
// // //   "/"
// // // ]);

// // Middleware to protect routes
// export default clerkMiddleware(async (auth, req) => {
//   // if (isProtectedRoute(req)) {
//   //   await auth.protect();
//   // }
// });

// // Configuration for the middleware
// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

// // export { auth as middleware } from "@/lib/auth"

// // export const config = {
// //   matcher: [

// //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// //     // Always run for API routes
// //     "/(api|trpc)(.*)",
// //   ],
// // };


// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  'uL9xtAbTF1KZzoW7JVhd7FrVywt5B1fJP922ss2aL44='
);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  // If there's no token and trying to access protected route
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // If there's a token, verify it
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      console.error('Token verification failed:', error);
      // Delete the invalid token
      const response = NextResponse.redirect(new URL('/signin', request.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all dashboard routes
    '/dashboard/:path*',
    // Optionally protect the signin page from authenticated users
    '/signin'
  ]
};