'use client'

import { useState } from 'react';
import { Gamepad } from 'lucide-react';
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY + window.scrollY });
  };

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/timeline");
    } else {
      console.log("Error: ", signInResponse);
      setError("Your Email or Password is wrong!");
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-900 text-white relative"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor Glow Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.3), transparent 50%),
            radial-gradient(200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(168, 85, 247, 0.15), transparent 50%)
          `
        }}
      />

      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Gamepad className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
              <span className="ml-2 text-lg sm:text-xl font-bold">PlayStudy.AI</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Sign In Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-20 blur-xl group-hover:opacity-75 transition duration-1000"></div>
            
            <div className="relative">
              <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Welcome Back
              </h1>

              {/* Google Sign In Button */}
              <button 
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors mb-8 group relative"
              >
                <div className="absolute left-6 top-1/2 -translate-y-1/2">
                  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                    </g>
                  </svg>
                </div>
                <span className="font-semibold">Sign in with Google</span>
              </button>

              <div className="relative flex items-center justify-center mb-8">
                <div className="border-t border-gray-600 w-full"></div>
                <span className="bg-gray-800 px-4 text-gray-400 text-sm">Or continue with email</span>
                <div className="border-t border-gray-600 w-full"></div>
              </div>

              {/* Credentials Form */}
              <form className="w-full text-black font-semibold flex flex-col" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-4 mb-4 text-sm font-semibold text-white bg-red-500 rounded-lg">
                    {error}
                  </div>
                )}
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full px-4 py-3 mb-4 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 mb-4 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                />

                <button
                  type="submit"
                  className="w-full py-3 px-6 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Sign in
                </button>
              </form>

              <p className="text-sm text-gray-400 text-center mt-6">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
}