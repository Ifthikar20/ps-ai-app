"use client"
import { Search, Rocket } from 'lucide-react';
import React, { useState, useEffect } from 'react';

function Header() {
    const [glow, setGlow] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setGlow(true);
            setTimeout(() => setGlow(false), 5000); // Glow effect lasts for 5 seconds
        }, 60000); // Triggers every 1 minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-white'>
            <div className='flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white'>
                <Search />
                <input type='text' placeholder='Search here...' className='outline-none' />
            </div>
            <div className='flex items-center gap-2'>
                <Rocket className='text-purple-500' />
                <h2 className={`p-1 rounded-full text-xs text-black px-2 transition-all duration-300 
                    ${glow ? 'animate-pulse scale-110 bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-blue-500/50' : 'bg-purple-500'}
                    hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-purple-500/50`}>
                    Get unlimited access to games for only $9.99/Month
                </h2>
            </div>
        </div>
    );
}

export default Header;
