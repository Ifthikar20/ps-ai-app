"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FileClock, Home, Settings, WalletCards } from "lucide-react";
import { usePathname } from "next/navigation";
import UsageTrack from "./UsageTrack";

function SideNav() {
  const menuList = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "History",
      icon: FileClock,
      path: "/dashboard/history",
    },
    {
      name: "Billing",
      icon: WalletCards,
      path: "/dashboard/billing",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/dashboard/setting",
    },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen relative p-5 shadow-sm border bg-black text-white">
      {/* Logo Section */}
      <div className="flex justify-center">
        <Image src={"/image.svg"} alt="logo" width={100} height={100} />
      </div>

      <hr className="my-6 border-gray-600" />

      {/* Navigation Links */}
      <div className="mt-10">
        {menuList.map((menu, index) => (
          <div
            key={menu.path || index}
            className={`flex gap-2 mb-2 p-3 rounded-lg cursor-pointer items-center transition-all 
                        ${
                          path === menu.path
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:bg-gray-700 hover:text-white"
                        }`}
          >
            <menu.icon className="h-6 w-6" />
            <h2 className="text-lg">{menu.name}</h2>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10">
        <UsageTrack/>
      </div>
    </div>
  );
}

export default SideNav;
