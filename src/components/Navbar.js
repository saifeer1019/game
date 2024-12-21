'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from './widgets/SearchBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed h-20 w-full z-50 transition-colors duration-300 bg-black`}>
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/">
            <Image
              src="/game.jpg"
              alt="Netflix"
              width={92}
              height={24}
              className="cursor-pointer"
            />
          </Link>
          <div className="hidden md:flex space-x-4 text-lg  text-gray-100">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/tv-shows" className="hover:text-gray-300">TV Shows</Link>
            <Link href="/movies" className="hover:text-gray-300">Movies</Link>
            <Link href="/new" className="hover:text-gray-300">New & Popular</Link>
            <Link href="/my-list" className="hover:text-gray-300">My List</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
        <SearchBar />

          <button className="text-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <div className="relative group">
            <Image
              src="/avatar.png"
              alt="Profile"
              width={32}
              height={32}
              className="rounded cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-800">Profile</Link>
              <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-800">Account</Link>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}