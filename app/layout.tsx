import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
import { NextAuthProvider } from "./providers";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Playstudy",
  description: "Learning the new way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body
        className={inter.className}>
        <NextAuthProvider>   {children}</NextAuthProvider>
      </body>
    </html>
    // </ClerkProvider>

  );
}
