"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User } from "lucide-react";
import SearchBar from "./widgets/SearchBar";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import NavMenu from "./widgets/NavMenu";
import axios from "axios";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Rest of your existing useEffect for scroll...
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed h-20 mb-8 sm:mb-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary_ shadow-lg"
          : "bg-gradient-to-b from-primary_ via-primary_/80 to-transparent"
      }`}
    >
      <div className="px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Left side remains the same... */}
        <div className="flex items-center space-x-8">
          <Link href="/">
            <h1 className="text-accent_ font-extrabold text-3xl hover:text-hover_ transition-colors">
              GameVault
            </h1>
          </Link>

          <div className="hidden md:flex space-x-6 text-base text-light_ items-center">
            {/* Your existing navigation items... */}
            <NavMenu />
          </div>
        </div>

        {/* Right side - Updated with user info */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-light_ p-2 hover:text-accent_ transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Updated with auth */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-primary_/95 backdrop-blur-sm border-t border-gray-800">
          <div className="px-4 py-2 sm:hidden">
            <SearchBar />
          </div>
          <div className="flex flex-col space-y-4 px-6 py-4">
            {/* Your existing mobile menu items... */}
            
           
          </div>
        </div>
      )}
    </nav>
  );
}