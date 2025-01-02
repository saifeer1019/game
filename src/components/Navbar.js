"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import SearchBar from './widgets/SearchBar';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed h-20 w-full z-50 transition-colors duration-300 bg-primary_">
      <div className="px-4 py-4 flex items-center justify-between">
        {/* Left side - Logo and Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/">
            <h1 className="text-accent_ font-extrabold text-4xl">lewd</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 text-lg text-gray-100">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/tv-shows" className="hover:text-gray-300">Categories</Link>
            <Link href="/movies" className="hover:text-gray-300">Games</Link>
            <Link href="/new" className="hover:text-gray-300">New & Popular</Link>
            <Link href="/my-list" className="hover:text-gray-300">My List</Link>
          </div>
        </div>

        {/* Right side - Search and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <SearchBar />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-100 p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-primary_ border-t border-gray-700">
          <div className="px-4 py-2 sm:hidden">
            <SearchBar />
          </div>
          <div className="flex flex-col space-y-4 px-4 py-4">
            <Link 
              href="/" 
              className="text-gray-100 hover:text-gray-300 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/tv-shows" 
              className="text-gray-100 hover:text-gray-300 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              href="/movies" 
              className="text-gray-100 hover:text-gray-300 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Games
            </Link>
            <Link 
              href="/new" 
              className="text-gray-100 hover:text-gray-300 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New & Popular
            </Link>
            <Link 
              href="/my-list" 
              className="text-gray-100 hover:text-gray-300 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              My List
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}