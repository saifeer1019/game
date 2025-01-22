"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname(); // Ensure this works with `use client`

  const navItems = [
    { name: "My Games", path: "/admin" },
    { name: "Settings", path: "/admin/fetch" },


  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } h-full bg-primary_ text-light_ transition-all duration-300 mt-14`}
    >
      {/* Toggle Button */}
      <button
        className="w-full p-2 text-light_ hover:bg-hover_"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"}
      </button>

      {/* Navigation Links */}
      <nav className="mt-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block p-3 rounded-md text-light_ hover:bg-hover_ ${
              pathname === item.path ? "bg-accent_" : ""
            }`}
          >
            {isOpen ? item.name : item.name[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
