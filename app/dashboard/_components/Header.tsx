"use client";

import { Search, Rocket } from "lucide-react";
import React, { useState, useEffect } from "react";
import type { SessionUser, SessionResponse } from "@/app/api/auth/session/route";

const greetings = ["Hola", "Hello", "Bonjour", "Welcome"];

function Header() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [animationRunning, setAnimationRunning] = useState(true);

  useEffect(() => {
    // Fetch user session data
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json() as SessionResponse;
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.name && animationRunning) {
      let cycles = 0;
      const interval = setInterval(() => {
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
        cycles++;

        if (cycles >= greetings.length * 2) {
          // Stop animation after 2 full cycles
          clearInterval(interval);
          setGreetingIndex(greetings.length - 1); // Set to "Welcome"
          setAnimationRunning(false);
        }
      }, 300); // Change word every 300ms

      return () => clearInterval(interval);
    }
  }, [user?.name, animationRunning]);

  return (
    <div className="p-5 shadow-sm border-b-2 flex justify-between items-center bg-white">
      <div className="flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white">
        <Search />
        <input type="text" placeholder="Search here..." className="outline-none" />
      </div>
      <div className="flex items-center gap-4">
        {user?.name && (
          <h1 className="text-lg font-semibold text-gray-800 flex gap-1">
            <span className="animate-slide-text transition-all duration-300">
              {greetings[greetingIndex]},
            </span>
            <span className="text-purple-600 font-bold">{user.name.split(" ")[0]} 👋</span>
          </h1>
        )}
        <Rocket className="text-purple-500" />
        <h2 className="p-1 rounded-full text-xs text-black px-2 transition-all duration-300 bg-purple-500 
          hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-purple-500/50">
          Get unlimited access to games for only $9.99/Month
        </h2>
      </div>
    </div>
  );
}

export default Header;